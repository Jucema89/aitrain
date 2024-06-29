import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { LogoAitrainComponent } from "../../../shared/components/logo-aitrain/logo-aitrain.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment';
declare const google: any;
@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [LogoAitrainComponent, ReactiveFormsModule]
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ){}

  repeatValid: boolean = false
  showPass: boolean = false
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    type_person: new FormControl('person', [Validators.required]),
    role: new FormControl('user_person', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
    repeat_password: new FormControl('', [Validators.required]),
    accept_terms: new FormControl(false, [Validators.requiredTrue])
  })

  get f() {
    return this.form.controls;
  }

  get pass() {
    return this.form.get('password');
  }

  acceptTerms(event: any){
    console.log('event = ', event)
    if(event){
      this.form.get('accept_terms')?.setValue(true)
      this.form.updateValueAndValidity()
    
    } else {
      this.form.get('accept_terms')?.setValue(false)
      this.form.updateValueAndValidity()
    }
  }

  validRepeatPassInvalid() {
    this.form.get('repeat_password')?.valueChanges.subscribe((pass) => {
      if(pass !== this.form.get('password')?.value){
        return this.repeatValid = false
      } else {
        return this.repeatValid = true
      }
    })
  }


  submit() {
    if(this.form.valid){

      const formData = {
        email: this.form.value.email || '',
        password: this.form.value.password || '',
        type_person: this.form.value.type_person || '',
        role: this.form.value.role || ''
      }

      this.authService.register( formData ).subscribe((response) => {
        if(response.success){
          this.notify.open({
            title: 'Registro Exitoso',
            message: `Te enviamos un Email para validar tu cuenta.`, 
            clase: 'success'
          });
          this.router.navigate(['/auth/login'])
        } else {
        //error login snackbar
        this.notify.open({
          title: 'Error en Registro',
          message: `${response.message}`, 
          clase: 'error'
        });
        }
      })
    }
    //this.router.navigate(['/dashboards/dashboard1']);
  }


}
