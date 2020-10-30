import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$ = new Subject();

  setLoading(value: boolean) {
    this.isLoading$.next(value);
  }

  getLoadingStatus() {
    return this.isLoading$;
  }

  constructor() { }
}
