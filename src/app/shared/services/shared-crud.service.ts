import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMap } from 'rxjs/operators';
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

  delete(url, items, showMessage = true) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) }).pipe(map(response => {
      if (showMessage) this.handleSuccess('Deleted successfully');
      return response;
    }));
  }

  postRequest(url, items, message) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) }).pipe(map(response => {
      this.handleSuccess(message);
      return response;
    }));
  }

  restore(url, items) {
    return this.http.post(url, { ids: this.getItemsIdsFromSelection(items) }).pipe(map(response => {
      this.handleSuccess('Restored successfully');
      return response;
    }));
  }

  addItem(url, item, showMessage = true) {
    return this.http.post(url, item).pipe(map(response => {
      if (showMessage) this.handleSuccess('Added successfully');
      return response;
    }));
  }

  editItem(url, item, id) {
    return this.http.put(`${url}/${id}`, item).pipe(map(response => {
      this.handleSuccess('Updated successfully');
      return response;
    }));
  }

  changeAttribute(url, items, attribute, value) {
    return this.http.post(url, {
      ids: this.getItemsIdsFromSelection(items),
      attribute: attribute,
      value: value
    }).pipe(map(response => {
      this.handleSuccess('Attribute changed successfully');
      return response;
    }));
  }

  publish(addUrl, deleteUrl, value, id) {
    return this.addItem(addUrl, value, false)
      .pipe(switchMap(addedItem =>
        this.delete(deleteUrl, [{ id: id }], false)
          .pipe(map(res => {
            this.handleSuccess('Published successfully');
            return addedItem
          }))
      ))
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


}
