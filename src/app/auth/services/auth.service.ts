import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, last, map, retry, switchMap, tap } from "rxjs/operators";

import { Observable, from, of } from "rxjs";
//import { RequestRecoveryPassword, SingIn, UserStore } from "@app/models/auth.model";
import { Router } from "@angular/router";
import { User } from "../../interfaces/user.interface";
import { NotificationService } from "../../services/notification/notification.service";
import { RequestRecoveryPassword, SingIn, UserStore } from "../../interfaces/auth.interface";

export interface Renew_Token {
  success: boolean
  token: string
  refresh_token: string
}

interface Response {
  data: string,
  success: boolean
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    if (token === '') {
      console.log('token es string vacio')
      return of(false)
    }

    return this.http.get<Observable<Response>>(`/auth/validate-token`, {
      headers: {
        'token': token
      }
    }).pipe(
      map((resp: any) => {
        console.log('la response en validateToken = ', resp)
        if (resp.data === 'Token Valido') {
          return true
        } else {
          return false
        }
      }),
      catchError(err => of(false))
    );
  }

  validateAdminToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    if (token === '') {
      return of(false)
    }

    return this.http.get<Observable<{ success: boolean, isAdmin: boolean }>>
      (`/auth/validate-admin`, {
        headers: {
          'token': token
        }
      }).pipe(
        map((resp: any) => {
          console.log('la response en validateAdminToken = ', resp)
          if (resp.success && resp.isAdmin) {
            return true
          } else {
            return false
          }
        }),
        catchError(err => of(false))
      );
  }

  validateSuperAdminToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    if (token === '') {
      return of(false)
    }

    return this.http.get<Observable<{ success: boolean, isSuperAdmin: boolean }>>
      (`/auth/validate-superadmin`, {
        headers: {
          'token': token
        }
      }).pipe(
        map((resp: any) => {
          console.log('la response en validateAdminToken = ', resp)
          if (resp.success && resp.isSuperAdmin) {
            return true
          } else {
            return false
          }
        }),
        catchError(err => of(false))
      );
  }

  getUser(): Promise<UserStore | string> {
    return new Promise((result, reject) => {
      try {

        let userData: UserStore | string = localStorage.getItem('user') || '';
  
        if (userData !== '') {
          userData = JSON.parse(userData) as UserStore;

          result(userData)
        } else {
          result('No existe Usuario')
        }

      } catch (error) {
        console.error('Error getUser in Store ', error)
        reject(error)
      }
    })
  }

  getAccountActive(email: string):Observable<{success: boolean, message: string, next: boolean}> {
    return this.http.post<{active_account: boolean, success: boolean, user_validate_email: boolean}>('/auth/account-active', {email: email}).pipe(map((account) => 
    {
      if(account.success){

        if(!account.user_validate_email){
          return {
            success: true,
            message: 'Revisa tu email, tienes un correo con el enlace para que valides tu cuenta.',
            next: false
          }
        } else if(account.user_validate_email && account.active_account){
           //cuenta actica y con email validado
          return {
            success: true,
            message: 'Cuenta Valida y activa',
            next: true
          }
        } else {
          return {
            success: false,
            message: 'No encontramos la cuenta, intentelo de nuevo o contactese a soporte@lexui.com',
            next: false
          }
        }

      } else {
        return {
          success: false,
          message: 'No encontramos la cuenta, intentelo de nuevo o contactese a soporte@lexui.com',
          next: false
        }
      }
    }
    ))
  }

  isTokenValidateToConfirm(token: string): Observable<{title: string, success: boolean, message: string}>{
    return this.http.get<{title: string, success: boolean, message: string}>(`/auth/validate-token-for-comfirm/${token}`)
  }

  resendTokenAccount(token: string, email: string): Observable<{title: string, success: boolean, message: string}>{
    return this.http.post<{title: string, success: boolean, message: string}>(`/auth/resend-token-account`, { token_last: token, email })
  }

  setLocalStorage(data: SingIn) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  register(formData: { email: string, password: string, type_person: string, role: string }): Observable<SingIn>{
    return this.http.post<SingIn>(`/auth/register`, formData,
    )
      .pipe(
        tap((response) => {

          if (response.success) {
            const userData = response as SingIn;
            this.setLocalStorage(userData)
          }
        }),
        map((response) => response))
  }

  completeRegister(name: string, specialist_areas: string[], token: string){
    return this.http.post<{title: string, success: boolean, message: string}>(`/auth//complete-profile/${token}`, {
      name, specialist_areas
    })
  }

  login(formData: { email: string, password: string }): Observable<SingIn> {
    return this.http.post<SingIn>(`/auth/login`, formData,
    )
      .pipe(
        tap((response) => {
          console.log('response user = ', response)
          if (response.success) {
            const userData = response as SingIn;
            this.setLocalStorage(userData)
          }
        }),
        map((response) => response),
        //catchError((err) => err)
      )
  }

  logOut() {
    this.clearLocalStorage();
    this.router.navigate(['/auth/login'])
  }

  signInGoogle(credential: string): Observable<SingIn> {
    return this.http.post<SingIn>(`/auth/google`, {token: credential})
    .pipe(
    tap((response) => {
      console.log('response back in service = ', response)
      if(response.success){
        const userData = response;
        this.setLocalStorage(userData)
      }
    }),
    map((response) => response))
  }

  recoveryAccount(email: string): Observable<RequestRecoveryPassword>{
    return this.http.post<RequestRecoveryPassword>(`/auth/recovery`, { email: email })
  }

  changePassword(pass: string, token: string): Observable<RequestRecoveryPassword>{
    return this.http.post<RequestRecoveryPassword>(`/auth/change-password/${token}`, { password: pass })
  }


}
