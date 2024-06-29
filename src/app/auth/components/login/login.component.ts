import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LogoAitrainComponent } from "../../../shared/components/logo-aitrain/logo-aitrain.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment';
declare const google: any;
@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [LogoAitrainComponent, ReactiveFormsModule]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ){}

  @Input() formState!: 'login' | 'register' | 'recovery'
  @Output() formStateChange = new EventEmitter<'login' | 'register' | 'recovery'>();
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
  })

  get f() {
    return this.form.controls;
  }

  get pass() {
    return this.form.get('password');
  }


  submit() {
    // console.log(this.form.value);
    if(this.form.valid){
      const formData = {
        email: this.form.value.email || '',
        password: this.form.value.password || ''
      }
      
      this.authService.login(formData).subscribe((response) => {
        if(response.success){
          this.router.navigate([`/stats`])
        } else {
        //error login snackbar
          this.notify.open({
            title: 'Error en Ingreso',
            message: `${response.message}`,
            clase: 'error'
          });
        }
      })
    }
  }


}
