import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthApis } from '../auth.constants';
import { map, catchError } from 'rxjs/operators';
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
    }),catchError(error => {
      this._snackBar.open('Invalid email or password', '', {
        duration: 2000,
      });
      return error;
    }))
  }

 
}
