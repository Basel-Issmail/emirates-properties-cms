import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompletionStatusApis } from '../completion-status.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompletionStatusService {

  constructor(private http: HttpClient) { }

  getData(params) {
    return this.http.get<any[]>(CompletionStatusApis.getData, { params }).pipe(map(response => {
      console.log(response[params.tab]);
      return response[params.tab];
    }));
  }
}
