import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
;
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
  ) {
  }

  canActivate(): Observable<boolean> {

    return this.auth.validateToken()
      .pipe(
        map(isLogged => {
          if (isLogged) {
            return true
          } else {
            this.auth.logOut();
            return false
          }
        })
      );
  }

}