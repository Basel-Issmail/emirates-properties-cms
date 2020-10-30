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
      return response[params.tab];
    }));
  }

  getItemDetails(url, id) {
    return this.http.get(`${url}/${id}`).pipe(map((response: any) => response.data));
  }

  getDraftItemDetails(url, id) {
    return this.http.get(`${url}/${id}`).pipe(map((response: any) => response.value));
  }

  getItemsIdsFromSelection(items) {
    return items.map(val => val.id)
  }

  delete(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) });
  }

  postRequest(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) });
  }

  restore(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) });
  }

  addItem(url, item) {
    return this.http.post(url, item);
  }

  editItem(url, item, id) {
    return this.http.put(`${url}/${id}`, item);
  }

  changeAttribute(url, items, attribute, value) {
    return this.http.post(url, {
      ids: this.getItemsIdsFromSelection(items),
      attribute: attribute,
      value: value
    });
  }
}
