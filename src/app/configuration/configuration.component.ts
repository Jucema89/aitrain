import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { CopyComponent } from "./copy/copy.component";
import { InputComponent } from '../shared/components/form/input/input.component';
import { ModelsOpenAI } from '../interfaces/training.interface';
import { SearchComponentComponent } from "../shared/components/form/search-component/search-component.component";
import { LocalStorageService } from '../services/localStorage/localstorage.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
    selector: 'app-configuration',
    standalone: true,
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.scss',
    imports: [ReactiveFormsModule, CopyComponent, InputComponent, SearchComponentComponent]
})
export class ConfigurationComponent implements OnInit {

  awaitValidationKey: boolean = false
  checkValidationKey: boolean = false
  existEnvLocal: boolean = false
  modelsAvailable: ModelsOpenAI[] = []

  formConfig: FormGroup = this.fb.group({})

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.validDataInStore()
    this.buildForm()
  }

  buildForm(){
    this.formConfig = this.fb.group({
      openAiKey: this.fb.control('', [Validators.required, Validators.minLength(12)]),
      postgresUrl: this.fb.control('', [Validators.required, Validators.minLength(3), this.postgresUrlValidator]),
      qdrantUrl: this.fb.control('', [Validators.minLength(3), this.qdrantUrlValidator]),
      useAws: this.fb.control(false),
      useVectorDatabase: this.fb.control(false),
      //NotRequired
      awsKeyId: this.fb.control(''),
      awsAccessKey: this.fb.control(''),
      awsBucket: this.fb.control(''),
      awsRegion: this.fb.control(''),
    })

    this.inspectForm()
  }

  async validDataInStore(){
    const envLocal = await this.localStorageService.getConfiguration()
    console.log('envLocal == ', envLocal)
    if(envLocal.success) {
      this.formConfig.enable()
      this.existEnvLocal = true
      this.checkValidationKey = true
      this.formConfig.patchValue( envLocal.env )
      this.formConfig.disable()
    } else {
      this.formConfig.disable()
      this.formConfig.get('openAiKey')?.enable()
    }
  }

  postgresUrlValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^postgresql:\/\/[a-zA-Z0-9]+:[a-zA-Z0-9]+@[a-zA-Z0-9.-]+:[0-9]+\/[a-zA-Z0-9]+$/;
    return regex.test(control.value) ? null : { invalidPostgresUrl: true };
  }

  qdrantUrlValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^http:\/\/[a-zA-Z0-9.-]+:[0-9]+$/;
    return regex.test(control.value) ? null : { invalidQdrantUrl: true };
  }

  isKeyOpenAI(apiKey: string){
    this.awaitValidationKey = true
    this.apiService.getModelsOpenAIAvailable(apiKey)
    .subscribe((res) => {
      console.log('res = ', res)
      if(res && res.length) {

        this.notificationService.open({
          title: `OpenAI Key Valid`,
          message: `You have access to ${res.length} Gpt models from OpenAI.`,
          clase: 'success'
        })

        this.awaitValidationKey = false
        this.checkValidationKey = true
        this.formConfig.enable()
      } else {
        this.awaitValidationKey = false
      }
    })
  }

  handlerSearch(event: boolean){
    if(event) {
      const key = this.formConfig.get('openAiKey')?.value as string
      this.isKeyOpenAI(key)
    }
  }

  inspectForm(){

    const awsKeyId = this.formConfig.get('awsKeyId')
    const awsAccessKey = this.formConfig.get('awsAccessKey')
    const awsBucket = this.formConfig.get('awsBucket')
    const awsRegion = this.formConfig.get('awsRegion')

    this.formConfig.get('useAws')?.valueChanges.subscribe((change: boolean) => {
      if(change){
        //set validators for options connect AWS
        awsKeyId?.setValidators([Validators.required, Validators.minLength(4)])
        awsAccessKey?.setValidators([Validators.required, Validators.minLength(4)])
        awsBucket?.setValidators([Validators.required, Validators.minLength(4)])
        awsRegion?.setValidators([Validators.required, Validators.minLength(4)])
      } else {{
        awsKeyId?.clearValidators()
        awsKeyId?.updateValueAndValidity()
        awsAccessKey?.clearValidators()
        awsAccessKey?.updateValueAndValidity()
        awsBucket?.clearValidators()
        awsBucket?.updateValueAndValidity()
        awsRegion?.clearValidators()
        awsRegion?.updateValueAndValidity()
      }}
    })
  }


  async onsubmit(){
    console.log('onsubmit = ', this.formConfig)
    if(this.formConfig.valid && !this.existEnvLocal){
      const saved = await this.localStorageService.setConfiguration(this.formConfig.value)
      if(saved){
        this.notificationService.open({
          title: `Environment Saved`,
          message: `Your variables and secrets saved in this computer.`,
          clase: 'success'
        })

      this.validDataInStore()

      }
    }

    if(this.existEnvLocal){
      this.formConfig.enable()
      this.existEnvLocal = false
      this.checkValidationKey = false
    }
  }
}
