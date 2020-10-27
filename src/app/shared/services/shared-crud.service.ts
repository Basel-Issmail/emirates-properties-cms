import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedCrudService {

  constructor(private http: HttpClient) { }

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
