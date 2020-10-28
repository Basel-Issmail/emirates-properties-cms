import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormTypes } from '../constants/form-types';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  constructor() { }

  getFormTypeWithId(activatedRoute) {
    if (activatedRoute.snapshot.routeConfig?.path === 'add') {
      return { type: FormTypes.add, id: null };
    }
    if (activatedRoute.snapshot.routeConfig?.path === 'edit/:id') {
      return { type: FormTypes.edit, id: activatedRoute.snapshot.params['id'] };
    }
    if (activatedRoute.snapshot.routeConfig?.path === 'edit-draft/:id') {
      return { type: FormTypes.editDraft, id: activatedRoute.snapshot.params['id'] };
    }
  }
}
