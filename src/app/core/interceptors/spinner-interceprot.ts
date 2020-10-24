import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceprotService  implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.spinnerService.setLoading(true);
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        throw err;
      })
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.spinnerService.setLoading(false);
    }
  }
}
