import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuilderResolverService implements Resolve<any> {

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.httpClient.get(route.data['builderAPI']).pipe(map(response => {
      // make all ids of lists as numbers
      for (const [key, value] of Object.entries(response)) {
        if (key.includes('list') && key !== 'language_list') {
          response[key].forEach(item => {
            item.id = Number(item.id);
          });
        }
      }
      return response;
    }));
  }

}
