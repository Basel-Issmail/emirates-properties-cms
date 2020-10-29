import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyTypeCategoryApis } from '../../property-type-category.constants';

@Component({
  selector: 'ep-property-type-category-form',
  templateUrl: './property-type-category-form.component.html',
  styleUrls: ['./property-type-category-form.component.scss']
})
export class PropertyTypeCategoryFormComponent implements OnInit {
  PropertyTypeCategoryForm: FormGroup;
  emptyPropertyTypeCategoryObj = { category_id: '', description: '', name: '' };
  formType = null;
  FormTypes = FormTypes;
  // data to autocomplete
  categoryFormControl = new FormControl('');
  filteredCategories$: Observable<any[]>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.PropertyTypeCategoryForm = this.fb.group({
      name: ["", Validators.required],
    });

    // autocomplete data
    this.filteredCategories$ = this.categoryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.categories_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(PropertyTypeCategoryApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.PropertyTypeCategoryForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(PropertyTypeCategoryApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.PropertyTypeCategoryForm.patchValue(x));
    }
  }

  get PropertyTypeCategoryFormControl() {
    return this.PropertyTypeCategoryForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.PropertyTypeCategoryForm.valid) {
      this.sharedCrudService.addItem(PropertyTypeCategoryApis.add, this.PropertyTypeCategoryForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.PropertyTypeCategoryForm.reset(this.emptyPropertyTypeCategoryObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.PropertyTypeCategoryForm.valid) {
      this.sharedCrudService.addItem(PropertyTypeCategoryApis.addDraft, this.PropertyTypeCategoryForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.PropertyTypeCategoryForm.reset(this.emptyPropertyTypeCategoryObj);
        });
    }
  }

  edit() {
    if (this.PropertyTypeCategoryForm.valid) {
      this.sharedCrudService.editItem(PropertyTypeCategoryApis.update, this.PropertyTypeCategoryForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.PropertyTypeCategoryForm.valid) {
      this.sharedCrudService.editItem(PropertyTypeCategoryApis.updateDraft, this.PropertyTypeCategoryForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.PropertyTypeCategoryForm.valid) {
      this.sharedCrudService.addItem(PropertyTypeCategoryApis.add, this.PropertyTypeCategoryForm.value)
        .pipe(switchMap(addedItem =>
          this.sharedCrudService.delete(PropertyTypeCategoryApis.deleteDraft, [{ id: this.formType.id }])
            .pipe(map(res => addedItem))
        ))
        .subscribe((response: any) => {
          this.router.navigate([`/property-type-category/edit/${response.data.id}`])
        });
    }
  }

}
