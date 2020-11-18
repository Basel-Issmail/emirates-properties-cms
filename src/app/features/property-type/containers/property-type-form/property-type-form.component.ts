import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyTypeApis } from '../../property-type.constants';

@Component({
  selector: 'ep-property-type-form',
  templateUrl: './property-type-form.component.html',
  styleUrls: ['./property-type-form.component.scss']
})
export class PropertyTypeFormComponent implements OnInit {
  propertyTypeForm: FormGroup;
  emptyPropertyTypeObj = { category_id: '', description: '', name: '' };
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

    this.propertyTypeForm = this.fb.group({
      category_id: ["", Validators.required],
      description: [""],
      name: ["", Validators.required],
    });

    // autocomplete data
    this.filteredCategories$ = this.categoryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.categories_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(PropertyTypeApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.propertyTypeForm.patchValue(x));
    }
  }

  get propertyTypeFormControl() {
    return this.propertyTypeForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.propertyTypeForm.valid) {
      this.sharedCrudService.addItem(PropertyTypeApis.add, this.propertyTypeForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.propertyTypeForm.reset(this.emptyPropertyTypeObj);
        });
    }
  }

  edit() {
    if (this.propertyTypeForm.valid) {
      this.sharedCrudService.editItem(PropertyTypeApis.update, this.propertyTypeForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
