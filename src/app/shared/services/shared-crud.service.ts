import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedCrudService {

  constructor(private http: HttpClient) { }

  getData(url, params) {
    return this.http.get<any[]>(url, { params }).pipe(map(response => {
      console.log(response[params.tab]);
      return response[params.tab];
    }));
  }

  getItemDetails(url, id) {
    return this.http.get(`${url}/${id}`);
  }

  getItemsIdsFromSelection(items) {
    return items.map(val => val.id)
  }

  delete(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) });
  }

  restore(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) });
  }

  changeAttribute(url, items, attribute, value) {
    return this.http.post(url, {
      ids: this.getItemsIdsFromSelection(items),
      attribute: attribute,
      value: value
    });
  }
}
