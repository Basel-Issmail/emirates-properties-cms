import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserTokenService } from 'src/app/features/auth/services/user-token.service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { CoreApis } from '../core.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessageComponent } from 'src/app/shared/components/flash-message/flash-message.component';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(public http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addHeaders(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => { this.handleError(error); return throwError('errorMessage'); }),
      tap(response => {
        if (response instanceof HttpResponse && response.body['refresh_token']) {
          UserTokenService.storeToken(response.body['refresh_token']);
          return new HttpResponse({
            body: response.body['data'],
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            url: response.url
          });
        }
      }, error => {
        if (error.status === 401 && !request.url.includes('auth/me') && !request.url.includes('auth/refresh') && !request.url.includes('reset-password')) {
          this.refreshToken(request);
        }
      })
    );
  }


  addHeaders(request: HttpRequest<any>) {
    if (!request.url.includes('auth/forget-password') || !request.url.includes('auth/reset-password')) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${UserTokenService.getToken()}`,
        'Accept-Language': `en`
      });
      return request.clone({ url: `${environment.baseURL}${request.url}`, headers });
    }
    const headers = new HttpHeaders({
      'Accept-Language': `en`
    });
    return request.clone({ headers });
  }

  refreshToken(req) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${UserTokenService.getToken()}`,
      })
    };
    this.http.post(CoreApis.refresh, {}, options).subscribe(res => {
      UserTokenService.storeToken(res);
    }
      , error => {
        if (!req.url.includes('auth/me') || !req.url.includes('auth/reset-password') || !req.url.includes('auth/forget-password')) {
          this.router.navigate(['auth/login']);
        }
      }
    );
  }

  handleError(error) {
    console.log(error);

    let message = 'Something went wrong, try again later.';
    if (error.message) message = error.message;
    if (error.error && error.error.message) message = error.error.message;
    this._snackBar.openFromComponent(FlashMessageComponent, {
      duration: 5000,
      panelClass: ["flash-error"],
      data: { title: 'Error', text: message, type: 'error' },
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
