import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../form/input/input.component";
import { OptionsSelect } from '../form/form.interface';

@Component({
    selector: 'app-form-train',
    standalone: true,
    templateUrl: './form-train.component.html',
    styleUrl: './form-train.component.scss',
    imports: [InputComponent, ReactiveFormsModule ]
})
export class FormTrainComponent implements OnInit {

  apiKeyOpenAI: string = ''

  formTrain: FormGroup = this.fb.group({
    files: this.fb.array([]),
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    description: this.fb.control('', Validators.required),
    modelGeneratorData: this.fb.control('', Validators.required),
    DB_VectorName: this.fb.control(''),
    openAiKey: this.fb.control('', [Validators.required, Validators.minLength(12)]),
    useAws: this.fb.control(false),
    //NotRequired
    awsKeyId: this.fb.control(''),
    awsAccessKey: this.fb.control(''),
    awsBucket: this.fb.control(''),
    awsRegion: this.fb.control(''),
  })

  optionsModelGenerator: OptionsSelect[] = [
    {
      label: 'Gtp 3.5',
      value: 'gpt-3.5-turbo-instruct'
    }
  ]

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
    this.getApiKey()

    const name = this.formTrain.get('name')
    const description = this.formTrain.get('description')
    const modelGeneratorData = this.formTrain.get('modelGeneratorData')

    name?.disable()
    description?.disable()
    modelGeneratorData?.disable()

    this.inspectForm()
  }

  getApiKey(){
    let key = localStorage.getItem('openAI_token')
    if(key && typeof(key) === 'string'){
      this.apiKeyOpenAI = key
    }
  }

  inspectForm(){
    //AWS 
    const awsKeyId = this.formTrain.get('awsKeyId')
    const awsAccessKey = this.formTrain.get('awsAccessKey')
    const awsBucket = this.formTrain.get('awsBucket')
    const awsRegion = this.formTrain.get('awsRegion')
    //form
    const name = this.formTrain.get('name')
    const description = this.formTrain.get('description')
    const modelGeneratorData = this.formTrain.get('modelGeneratorData')

    // name?.disable()
    // description?.disable()
    // modelGeneratorData?.disable()

    const openAiKey = this.formTrain.get('openAiKey')
    openAiKey?.valueChanges.subscribe((key: string) => {
      console.log('key = ', key)
      if(openAiKey.valid){
        name?.enable()
        description?.enable()
        modelGeneratorData?.enable()
      } else {
        name?.disable()
        description?.disable()
        modelGeneratorData?.disable()
      }
    })

    this.formTrain.get('useAws')?.valueChanges.subscribe((use: boolean) => {
      if(use){
        awsKeyId?.setValidators(Validators.required)
        awsAccessKey?.setValidators(Validators.required)
        awsBucket?.setValidators(Validators.required)
        awsRegion?.setValidators(Validators.required)
      } else {
        awsKeyId?.clearValidators()
        awsAccessKey?.clearValidators()
        awsBucket?.clearValidators()
        awsRegion?.clearValidators()
      }
    })
  }

  onSubmit(){

  }

}
