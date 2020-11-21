import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.user && this.authService.user.role === 'admin') {
    //   return true;
    // }

    return this.authService.me().pipe(map(response => {
      this.authService.user = response;
      if (state.url.includes('companies')) {
        if (this.authService.user.role === 'admin') return true;
        else return false;
      }
      if (state.url.includes('agents')) {
        if (this.authService.user.role === 'admin' || this.authService.user.role === 'Company') return true;
        return false;
      }
      return true;
    }),
      catchError(() => {
        this.router.navigate(['auth/login']);
        return of(false);
      })
    );
  }

}
