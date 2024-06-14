import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { CopyComponent } from "./copy/copy.component";
import { InputComponent } from '../../shared/components/form/input/input.component';
import { ModelsOpenAI } from '../../interfaces/training.interface';
import { SearchComponentClick, SearchComponentComponent } from "../../shared/components/form/search-component/search-component.component";
import { LocalStorageService } from '../../services/localStorage/localstorage.service';
import { NotificationService } from '../../services/notification/notification.service';
import { catchError, debounceTime, map, of, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-configuration',
    standalone: true,
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.scss',
    imports: [ReactiveFormsModule, CopyComponent, InputComponent, SearchComponentComponent]
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  awaitValidationKey: boolean = false
  checkValidationKey: boolean = false

  awaitValidationBackend: boolean = false
  checkValidationBackend: boolean = false

  existEnvLocal: boolean = false
  modelsAvailable: ModelsOpenAI[] = []

  backendInspectSub$?: Subscription
  useAwsInspectSub$?: Subscription

  formConfig: FormGroup = this.fb.group({})

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    this.buildForm()
    this.validDataInStore()
    this.inspectForm()
  }

  buildForm(){
    this.formConfig = this.fb.group({
      openAiKey: this.fb.control('', [Validators.required, this.openAIkeyValidator]),
      backendUrl: this.fb.control('', [Validators.required, this.backendUrlValidator]),
      useAws: this.fb.control(false),
      //NotRequired
      awsKeyId: this.fb.control(''),
      awsAccessKey: this.fb.control(''),
      awsBucket: this.fb.control(''),
      awsRegion: this.fb.control(''),
    })

    this.formConfig.get('useAws')?.disable()
  }

  async validDataInStore(){
    const envLocal = await this.localStorageService.getConfiguration()
    if(envLocal.success) {
      this.formConfig.enable()
      this.existEnvLocal = true
      this.formConfig.patchValue( envLocal.env )
      this.checkValidationKey = true
      this.checkValidationBackend = true
      this.formConfig.disable()
    } else {
      this.formConfig.disable()
      this.formConfig.get('backendUrl')?.enable()
    }
  }

  openAIkeyOLDValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^sk-[a-zA-Z0-9]{45}$/;
    return regex.test(control.value) ? null : { openAiKeyError: true };
  }

  openAIkeyValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^sk-[a-zA-Z0-9]+-[a-zA-Z0-9]{48}$/;
    return regex.test(control.value) ? null : { openAiKeyError: true };
  }
  
  backendUrlValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^http:\/\/[a-zA-Z0-9.-]+:[0-9]+$/;
    return regex.test(control.value) ? null : { invalidBackendUrl: true };
  }

  isKeyOpenAI(apiKey: string){
    this.awaitValidationKey = true
    this.formConfig.get('openAiKey')?.setErrors(null)
    this.apiService.getModelsOpenAIAvailable(apiKey)
    .subscribe((res) => {
      if(res.success && res.data.length) {
        this.modelsAvailable = res.data
        this.notificationService.open({
          title: `OpenAI Key Valid`,
          message: `You have access to ${res.data.length} Gpt models from OpenAI.`,
          clase: 'success'
        })

        this.awaitValidationKey = false
        this.checkValidationKey = true
        this.formConfig.enable()
      } else {
        this.awaitValidationKey = false
        this.formConfig.get('openAiKey')?.setErrors({ openAiKeyError: true })

        this.notificationService.open({
          title: `Error OpenAi using Key`,
          message: `${res.message}`,
          clase: 'error'
        })
      }
    })
  }

  isBackendValid(backendUrl: string){
    this.awaitValidationBackend = true
    this.apiService.validateBackend(backendUrl).subscribe({
      next: (response) => {
        if(response.success && response.data.message === 'Server backend Aitrain ready'){
          this.awaitValidationBackend = false
          this.checkValidationBackend = true
          this.formConfig.get('openAiKey')?.enable()
        }
      },
      error: (error: HttpErrorResponse) => {
        this.awaitValidationBackend = false
        this.checkValidationBackend = false
        this.formConfig.get('backendUrl')?.setErrors({ backendError: true })
      }
    })
  }

  getErrorMessage(formName: FormGroup, idControl: string): string {
    const control = formName.get(idControl)
    if(control){
      if (control.hasError('required')) {
        return 'Este campo es requerido';
      }
  
      if (control.hasError('pattern')) {
        return 'Este valor no es compatible con el formato esperado'
      }

      if (control.hasError('invalidBackendUrl')) {
        return 'Esta Url no es compatible con el formato de Backend'
      }

      if (control.hasError('backendError')) {
        return 'No existe un backend valido con esta Url, cambiala.'
      }

      if (control.hasError('invalidOpenAIkey')) {
        return 'Esta Key no es compatible con el formato de Key de OpenAI. Revisala. '
      }

      if (control.hasError('openAiKeyError')) {
        return 'Esta Key no existe en OpenAI o esta inactiva.'
      }
  
      return 'Este campo tiene un error'
    } else {
      return ''
    }
  }

  handlerSearch(event: SearchComponentClick){
    if(event.click) {
      switch (event.control) {
        case 'openAiKey':
          const key = this.formConfig.get('openAiKey')?.value as string
          this.isKeyOpenAI(key)
          break;

        case 'backendUrl':
          const backend = this.formConfig.get('backendUrl')?.value as string
          this.isBackendValid(backend)
          break;
      }
     
    }
  }

  inspectForm(){
    this.backendInspectSub$ = this.formConfig.get('backendUrl')?.valueChanges.pipe(
      debounceTime(800),
      map((data) => data))
      .subscribe((change: string) => {
       if((change && change !== this.formConfig.get('backendUrl')?.value) && this.checkValidationBackend){
        this.checkValidationBackend = false
       }
      })

    const awsKeyId = this.formConfig.get('awsKeyId')
    const awsAccessKey = this.formConfig.get('awsAccessKey')
    const awsBucket = this.formConfig.get('awsBucket')
    const awsRegion = this.formConfig.get('awsRegion')

    this.useAwsInspectSub$ = this.formConfig.get('useAws')?.valueChanges.subscribe((change: boolean) => {
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
    if(this.formConfig.valid && !this.existEnvLocal){

      const savedConfig = await this.localStorageService.setConfiguration(this.formConfig.value)
      const savedModels = await this.localStorageService.setModelsOpenai(this.modelsAvailable)

      if(savedConfig && savedModels){
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
      this.checkValidationBackend = false
      this.formConfig.reset()
    }
  }

  ngOnDestroy(): void {
    this.useAwsInspectSub$?.unsubscribe()
    this.backendInspectSub$?.unsubscribe()
  }
}
