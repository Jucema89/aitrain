import { Component, Input, OnInit } from '@angular/core';
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

  formTrain: FormGroup = this.fb.group({})
  optionsModelGenerator$: Observable<OptionsSelect[]> = of([])
  optionsAnswer: OptionsSelect[] = [
    {
      label: 'Alls, IA define long text and Tokens',
      value: 'alls'
    },
    {
      label: 'Short Answers',
      value: 'short'
    },
    {
      label: 'Long and Explained answers',
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
      description: this.fb.control('', Validators.required),
      modelGeneratorData: this.fb.control('', Validators.required),
      type_answer: this.fb.control('alls')
    })

    this.formTrain.get('modelGeneratorData')?.disable()
  }

  async getModelsAvailables(){
    const modelsResponse = await this.localStorageService.getModelsOpenai()
   // this.optionsModelGenerator$ = of(modelsResponse.models)
    console.log('models Response = ', modelsResponse)
    if(modelsResponse.success && modelsResponse.models.length){

      const arrayModels: OptionsSelect[] = []
      modelsResponse.models.forEach((model) => {
        arrayModels.push({
          label: model.id,
          value: model.id
        })
      })

      this.optionsModelGenerator$ = of(arrayModels)
      this.formTrain.get('modelGeneratorData')?.enable()
      
    } else {

      this.notificationService.open({
        title: `Environment not Exist`,
        message: `You need to create your environment configuration to be able to train.`,
        clase: 'error'
      })

      this.router.navigate(['/configuration'])
    }
  }

  async onSubmit(){
    if(this.formTrain.valid){

      const conf = await this.localStorageService.getConfiguration()

      const training: TrainingCreate = {
        ...this.formTrain.value,
        files: this.filesTrain,
        environment: conf.env
      }

      console.log('Training Data to Create = ', training)

      this.apiService.createTrain(training).subscribe((res) => {
        console.log('create training = ', res)
      })
    }
  }

}
