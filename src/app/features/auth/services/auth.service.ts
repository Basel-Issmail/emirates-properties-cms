import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthApis } from '../auth.constants';
import { map, catchError, tap } from 'rxjs/operators';
import { UserTokenService } from './user-token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }
  me(): Observable<any> {
    return this.httpClient.post(AuthApis.me, {});
  }

  login(user: any): Observable<{}> {
    return this.httpClient.post(AuthApis.login, user).pipe(map(response => {
      UserTokenService.storeToken(response['access_token']);
      this.user = response['user'];
      return response;
    }), catchError(error => {
      return error;
    }))
  }

  forgetPassword(email: any) {
    return this.httpClient.post(AuthApis.forgetPassword, email);
  }

  resetPassword(user: any) {
    return this.httpClient.post(AuthApis.resetPassword, user);
  }

  logout() {
    this.user = null;
    return this.httpClient.post(AuthApis.logout, {}).pipe(tap(response => {
      UserTokenService.logOut();
    }));
  }


}
