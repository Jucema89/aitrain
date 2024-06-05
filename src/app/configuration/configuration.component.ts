import { Component, inject, Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { CopyComponent } from "./copy/copy.component";
import { InputComponent } from '../shared/components/form/input/input.component';
import { ModelsOpenAI } from '../interfaces/training.interface';
import { SearchComponentComponent } from "../shared/components/form/search-component/search-component.component";

@Component({
    selector: 'app-configuration',
    standalone: true,
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.scss',
    imports: [ReactiveFormsModule, CopyComponent, InputComponent, SearchComponentComponent]
})
export class ConfigurationComponent {

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ){}

  awaitValidationKey: boolean = false
  modelsAvailable: ModelsOpenAI[] = []

  formConfig: FormGroup = this.fb.group({
    openAiKey: this.fb.control('', [Validators.required, Validators.minLength(12)]),
    postgresUrl: this.fb.control('', [Validators.required, Validators.minLength(3), this.postgresUrlValidator]),
    qdrantUrl: this.fb.control('', [Validators.minLength(3), this.qdrantUrlValidator]),
    useAws: this.fb.control(false),
    //NotRequired
    awsKeyId: this.fb.control(''),
    awsAccessKey: this.fb.control(''),
    awsBucket: this.fb.control(''),
    awsRegion: this.fb.control(''),
  })

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
    this.apiService.getModelsOpenAIAvailable(apiKey).subscribe((res) => {
      console.log('res = ', res)
      if(res.length) {
        this.awaitValidationKey = false
      }
    })
  }

  handlerSearch(event: boolean){
    if(event) {
      this.isKeyOpenAI(this.formConfig.get('openAiKey')?.value)
    }
  }

 


  onsubmit(){

  }
}
