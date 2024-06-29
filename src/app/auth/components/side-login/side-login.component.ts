import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LogoAitrainComponent } from "../../../shared/components/logo-aitrain/logo-aitrain.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { environment } from '../../../../environments/environment';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { RecoveryComponent } from "../recovery/recovery.component";
declare const google: any;
@Component({
    selector: 'app-side-login',
    standalone: true,
    templateUrl: './side-login.component.html',
    styleUrl: './side-login.component.scss',
    imports: [LogoAitrainComponent, ReactiveFormsModule, LoginComponent, RegisterComponent, RecoveryComponent]
})
export class SideLoginComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ){}

  componentState: 'login' | 'register' | 'recovery' = 'register'
  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]),
  })

  formRegister = new FormGroup({

  })

  formRecovery = new FormGroup({

  })


  get fLogin() {
    return this.formLogin.controls;
  }

  get fRegister() {
    return this.formRegister.controls;
  }

  get fRecovery() {
    return this.formRecovery.controls;
  }

  get pass() {
    return this.formLogin.get('password');
  }

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){

    google.accounts.id.initialize({
      client_id: environment.google.id,
      callback: (response: any) => this.handleCredentialResponse( response )
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { 
        'theme': "outline", 
        'size': "large",
        'longtitle': true,
      } 
    );
  }

  handleCredentialResponse(response: any){
    console.log('response signin Google = ', response)
    if(response){
      this.authService.signInGoogle(response.credential).subscribe((response) => {
        if(response.success){
          console.log('response = ', response)
          this.router.navigate([`/stats`])
        } else {
        //error login snackbar
          this.notify.open({
            title: 'Error en Ingreso',
            message: `Tenemos problemas para conectar con Google`,
            clase: 'error'
          })
        }
      })
    }
  }

  // submit() {
  //   // console.log(this.form.value);
  //   if(this.form.valid){
  //     const formData = {
  //       email: this.form.value.email || '',
  //       password: this.form.value.password || ''
  //     }
      
  //     this.authService.login(formData).subscribe((response) => {
  //       if(response.success){
  //         this.router.navigate([`/stats`])
  //       } else {
  //       //error login snackbar
  //         this.notify.open({
  //           title: 'Error en Ingreso',
  //           message: `${response.message}`,
  //           clase: 'error'
  //         });
  //       }
  //     })
  //   }
  // }


}
