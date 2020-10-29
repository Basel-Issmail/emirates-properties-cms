import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { AmenityApis } from '../../amenity.constants';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ep-amenity-form',
  templateUrl: './amenity-form.component.html',
  styleUrls: ['./amenity-form.component.scss']
})
export class AmenityFormComponent implements OnInit {
  amenityForm: FormGroup;
  emptyAmenityObj = { category_id: '', description: '', icon: '', name: '' };
  formType = null;
  FormTypes = FormTypes;
  // data to autocomplete
  categoryFormControl = new FormControl('');
  filteredCategories$: Observable<any[]>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.amenityForm = this.fb.group({
      category_id: ["", Validators.required],
      description: [""],
      icon: ["", Validators.required],
      name: ["", Validators.required],
    });

    // autocomplete data
    this.filteredCategories$ = this.categoryFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.categories_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(AmenityApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.amenityForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(AmenityApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.amenityForm.patchValue(x));
    }
  }

  get amenityFormControl() {
    return this.amenityForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.amenityForm.valid) {
      this.sharedCrudService.addItem(AmenityApis.add, this.amenityForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityForm.reset(this.emptyAmenityObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.amenityForm.valid) {
      this.sharedCrudService.addItem(AmenityApis.addDraft, this.amenityForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityForm.reset(this.emptyAmenityObj);
        });
    }
  }

  edit() {
    if (this.amenityForm.valid) {
      this.sharedCrudService.editItem(AmenityApis.update, this.amenityForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.amenityForm.valid) {
      this.sharedCrudService.editItem(AmenityApis.updateDraft, this.amenityForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
