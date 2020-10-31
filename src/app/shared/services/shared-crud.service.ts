import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessageComponent } from '../components/flash-message/flash-message.component';

@Injectable({
  providedIn: 'root'
})
export class SharedCrudService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getData(url, params) {
    return this.http.get<any[]>(url, { params }).pipe(map(response => {
      return response[params.tab];
    }));
  }

  get(url, params) {
    return this.http.get<any[]>(url, { params });
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
    return this.http.put(`${url}/${id}`, item).pipe(map(response => {
      this.handleSuccess('Updated successfully');
      return response;
    }), catchError(error => {
      this.handleError(error);
      return error
    }));
  }

  changeAttribute(url, items, attribute, value) {
    return this.http.post(url, {
      ids: this.getItemsIdsFromSelection(items),
      attribute: attribute,
      value: value
    });
  }

  handleSuccess(message) {
    this._snackBar.openFromComponent(FlashMessageComponent, {
      duration: 5000,
      panelClass: ["flash-success"],
      data: { title: 'Success', text: message, type: 'success' },
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
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
