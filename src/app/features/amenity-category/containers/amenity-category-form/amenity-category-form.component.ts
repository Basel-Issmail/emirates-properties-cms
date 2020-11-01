import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AmenityCategoryApis } from '../../amenity-category.constants';
@Component({
  selector: 'ep-amenity-category-form',
  templateUrl: './amenity-category-form.component.html',
  styleUrls: ['./amenity-category-form.component.scss']
})
export class AmenityCategoryFormComponent implements OnInit {
  amenityCategoryForm: FormGroup;
  emptyAmenityObj = { name: '' };
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

    this.amenityCategoryForm = this.fb.group({
      name: ["", Validators.required],
    });

    // autocomplete data
    this.filteredCategories$ = this.categoryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.categories_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(AmenityCategoryApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.amenityCategoryForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(AmenityCategoryApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.amenityCategoryForm.patchValue(x));
    }
  }

  get amenityCategoryFormControl() {
    return this.amenityCategoryForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.amenityCategoryForm.valid) {
      this.sharedCrudService.addItem(AmenityCategoryApis.add, this.amenityCategoryForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityCategoryForm.reset(this.emptyAmenityObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.amenityCategoryForm.valid) {
      this.sharedCrudService.addItem(AmenityCategoryApis.addDraft, this.amenityCategoryForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityCategoryForm.reset(this.emptyAmenityObj);
        });
    }
  }

  edit() {
    if (this.amenityCategoryForm.valid) {
      this.sharedCrudService.editItem(AmenityCategoryApis.update, this.amenityCategoryForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.amenityCategoryForm.valid) {
      this.sharedCrudService.editItem(AmenityCategoryApis.updateDraft, this.amenityCategoryForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.amenityCategoryForm.valid) {
      this.sharedCrudService.publish(AmenityCategoryApis.add, AmenityCategoryApis.deleteDraft, this.amenityCategoryForm.value, this.formType.id)
        .subscribe((response: any) => {
          this.router.navigate([`/amenity-category/edit/${response.data.id}`])
        });
    }
  }

}
