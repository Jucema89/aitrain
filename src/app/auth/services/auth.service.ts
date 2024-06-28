import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, last, map, retry, switchMap, tap } from "rxjs/operators";

import { Observable, from, of } from "rxjs";
//import { RequestRecoveryPassword, SingIn, UserStore } from "@app/models/auth.model";
import { Router } from "@angular/router";
import { User } from "../../interfaces/user.interface";
import { NotificationService } from "../../services/notification/notification.service";
import { SingIn, UserStore } from "../../interfaces/auth.interface";

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

  recoveryPassword(email: string): Observable<string> {
    return of('')
    // return this.http.post<RequestRecoveryPassword>('/auth/recovery-password', { email }).pipe(
    //   map((response) => response.message)
    // );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('Bearer-token') || '';

    if (token === '') {
      // console.log('token es string vacio')
      return of(false)
    }

    return this.http.get<Observable<Response>>(`/auth/validate-token`, {
      headers: {
        'Bearer-token': token
      }
    }).pipe(
      map((resp: any) => {
        // console.log('la response en validateToken = ', resp)
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
    const token = localStorage.getItem('Bearer-token') || '';

    if (token === '') {
      return of(false)
    }

    return this.http.get<Observable<{ success: boolean, isAdmin: boolean }>>
      (`/auth/validate-admin`, {
        headers: {
          'Bearer-token': token
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
    const token = localStorage.getItem('Bearer-token') || '';

    if (token === '') {
      return of(false)
    }

    return this.http.get<Observable<{ success: boolean, isSuperAdmin: boolean }>>
      (`/auth/validate-superadmin`, {
        headers: {
          'Bearer-token': token
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

  renewToken(): Observable<Renew_Token> {

    const refresh_token = localStorage.getItem('Bearer-refresh-token') || '';

    if (refresh_token === '') {
      this.logOut()
    }

    return this.http.post<Renew_Token>(`/auth/renew`, {
      refresh_token
    }).pipe(tap((resp: Renew_Token) => {
      if (resp.success) {
        localStorage.setItem('Bearer-token', resp.token)
        localStorage.setItem('Bearer-refresh-token', resp.refresh_token);
        return of(resp)
      } else {
        this.logOut()
        return of(resp)
      }
    }))
  }

  setLocalStorage(data: SingIn) {
    localStorage.setItem('Bearer-token', data.token);
    localStorage.setItem('Bearer-refresh-token', data.token);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('user', JSON.stringify(data.user));
    // localStorage.setItem('Bearer-role', JSON.stringify(data.role));
  }

  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    // localStorage.removeItem('Bearer-role');
  }

  getUser(): Promise<UserStore | string> {
    return new Promise((result, reject) => {
      try {

        let userData: User | string = localStorage.getItem('user') || '';
        // let roleData: Role | string = localStorage.getItem('Bearer-role') || '';

        // if(userData !== '' && roleData !== '') {
        if (userData !== '' && typeof(userData) !== 'string') {
          //userData = JSON.parse(userData) as User;
          // roleData = JSON.parse(roleData) as Role;
          const user: UserStore = {
            user: JSON.parse(userData) as User,
            // role: roleData,
          }

          result(user)
        } else {
          result('No existe Usuario')
        }

      } catch (error) {
        console.error('Error getUser in Store ', error)
        reject(error)
      }
    })
  }

  getUser$(): Observable<User> {
    return from(this.getUser()).pipe(map((res) => {
      if (typeof (res) === 'string') {
        throw new Error('No hay usuario, vuelve a ingresar')
      } else {
        return res.user
      }
    }))
  }

  login(formData: { email: string, password: string }): Observable<{ success: boolean, data: SingIn | string }> {
    return this.http.post<{ success: boolean, data: SingIn | string }>(`/auth/login`, formData,
    )
      .pipe(
        tap((response) => {

          if (response.success) {
            const userData = response.data as SingIn;
            this.setLocalStorage(userData)
          }
        }),
        map((response) => response))
  }

  logOut() {
    this.clearLocalStorage();
    this.router.navigate(['/auth/login'])
  }

}
