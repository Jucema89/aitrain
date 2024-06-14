import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../form/input/input.component";
import { OptionsSelect } from '../form/form.interface';
import { LocalStorageService } from '../../../services/localStorage/localstorage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Training, TrainingCreate } from '../../../interfaces/training.interface';

@Component({
    selector: 'app-form-train-ai',
    standalone: true,
    templateUrl: './form-train-ai.component.html',
    styleUrl: './form-train-ai.component.scss',
    imports: [InputComponent, ReactiveFormsModule, AsyncPipe ]
})
export class FormTrainAIComponent implements OnInit {

  formTrainAI: FormGroup = this.fb.group({})
  optionsModelGenerator$: Observable<OptionsSelect[]> = of([])
  optionsDocsTrainingAnswer: OptionsSelect[] = []
  showNameExpected: boolean = false
  loadingButton: boolean = false
  messageNeedConfig: boolean = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.buildForm()
    this.getModelsAvailables()
    this.getDocsTrainers()
    this.inspectForm()
  }

  buildForm(){
    this.formTrainAI = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      model: this.fb.control('', Validators.required),
      idDoc: this.fb.control('', Validators.required)
    })
  }

  inspectForm(){
    const name = this.formTrainAI.get('name')
    const model = this.formTrainAI.get('model')
    const idDoc = this.formTrainAI.get('idDoc')
    this.formTrainAI.valueChanges.subscribe((change) => {
      if(name?.valid && model?.valid && idDoc?.valid){
        this.showNameExpected = true
      } else {
        this.showNameExpected = false
      }
    })
  }

  async getModelsAvailables(){
    const modelsResponse = await this.localStorageService.getModelsOpenai()
  
    if(modelsResponse.success && modelsResponse.models.length){
      this.messageNeedConfig = false
      const arrayModels: OptionsSelect[] = []
      modelsResponse.models.forEach((model) => {
        if( model.id.includes('gpt-3') && 
            !model.id.startsWith('ft:') && 
            !model.id.includes('-instruct') && 
            !model.id.includes('-vision') 
          ){
          arrayModels.push({
            label: model.id,
            value: model.id
          })
        }
      })

      this.optionsModelGenerator$ = of(arrayModels)
      this.formTrainAI.get('modelGeneratorData')?.enable()
      
    } else {
      this.messageNeedConfig = true
      this.formTrainAI.disable()
      // this.notificationService.open({
      //   title: `Configuraciones no Existen`,
      //   message: `Necesitas agregar tus variables de configuración para comenzar a entrenar.`,
      //   clase: 'error'
      // })

      // this.router.navigate(['/configuration'])
    }
  }

  getDocsTrainers(){
    const arrayModels: OptionsSelect[] = []
    this.apiService.getTrainings().subscribe((docs) => {
      docs.forEach((doc) => {
        if(doc.status === 'finish'){
          arrayModels.push({
            label: doc.name,
            value: doc.id
          })
        }
      })

      this.optionsDocsTrainingAnswer = arrayModels
    })
  }

  async onSubmit(){
    if(this.formTrainAI.valid){
      this.loadingButton = true
      const config = (await this.localStorageService.getConfiguration()).env

      this.apiService.createFinetuning({
        apiKey: config.openAiKey,
        ...this.formTrainAI.value
      }).subscribe((res) => {

        if(res.success){
          this.loadingButton = false
          this.notificationService.open({
            title: `Envio Exitoso`,
            message: `Se creo el proceso de finetunning con id:${res.data.id} dentro de OpenAI. Revisa el estado en las tablas de entrenamiento`,
            clase: 'success'
          })
  
          this.formTrainAI.reset()
          this.router.navigate(['/training/list'])
        } else {
          this.loadingButton = false
          this.notificationService.open({
            title: `Ocurrio un Error`,
            message: `${res.message}`,
            clase: 'error'
          })

          this.formTrainAI.reset()
        }
        
      })
    }
  }

}
