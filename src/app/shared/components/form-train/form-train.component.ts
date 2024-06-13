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
import { TrainingCreate } from '../../../interfaces/training.interface';

@Component({
    selector: 'app-form-train',
    standalone: true,
    templateUrl: './form-train.component.html',
    styleUrl: './form-train.component.scss',
    imports: [InputComponent, ReactiveFormsModule, AsyncPipe ]
})
export class FormTrainComponent implements OnInit {
  @Input() filesTrain: File[] = []
  @Output() clearForm: EventEmitter<boolean> = new EventEmitter()

  formTrain: FormGroup = this.fb.group({})
  optionsModelGenerator$: Observable<OptionsSelect[]> = of([])
  optionsAnswer: OptionsSelect[] = [
    {
      label: 'Todas: La IA define longitud y tokens de respuestas.',
      value: 'alls'
    },
    {
      label: 'Cortas: respuestas reducidas y concisas.',
      value: 'short'
    },
    {
      label: 'Largas: respuestas amplias y bien explicadas.',
      value: 'long_explained'
    }
  ]

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
  }

  buildForm(){
    this.formTrain = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      role_system: this.fb.control('', Validators.required),
      modelGeneratorData: this.fb.control('', Validators.required),
      type_answer: this.fb.control('', Validators.required)
    })

    this.formTrain.get('modelGeneratorData')?.disable()
  }

  async getModelsAvailables(){
    const modelsResponse = await this.localStorageService.getModelsOpenai()
  
    if(modelsResponse.success && modelsResponse.models.length){

      const arrayModels: OptionsSelect[] = []
      modelsResponse.models.forEach((model) => {
        if( model.id.includes('gpt-') && 
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
      this.formTrain.get('modelGeneratorData')?.enable()
      
    } else {

      this.notificationService.open({
        title: `Configuraciones no Existen`,
        message: `Necesitas agregar tus variables de configuración para comenzar a entrenar.`,
        clase: 'error'
      })

      this.router.navigate(['/configuration'])
    }
  }

  async onSubmit(){
    if(this.formTrain.valid){

      console.log('this.formTrain.value = ', this.formTrain.value)
      const config = (await this.localStorageService.getConfiguration()).env
      

      const training: TrainingCreate = {
        ...this.formTrain.value,
        openAiKey: config.openAiKey,
        files: this.filesTrain,
      }

      const sendData = await this.apiService.createTrain(training)

      if(sendData.success){
        this.notificationService.open({
          title: `Guradado Exitoso.`,
          message: `${sendData.message}`,
          clase: 'success'
        })

        this.formTrain.reset()
        this.clearForm.emit(true)
      } 
    }
  }

}
