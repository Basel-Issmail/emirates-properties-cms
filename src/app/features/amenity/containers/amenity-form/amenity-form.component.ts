import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { AmenityApis } from '../../amenity.constants';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreApis } from 'src/app/core/core.constants';
import { environment } from 'src/environments/environment';

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

  imageBaseUrl = environment.imageBaseUrl;
  uploadPhoto = CoreApis.uploadPhoto;
  images = [];
  isSubmitted = false;

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

    this.amenityForm = this.fb.group({
      category_id: ["", Validators.required],
      description: [""],
      icon: [""],
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

  get prcessedData() {
    return {
      ...this.amenityForm.value,
      icon: (Array.isArray(this.images) && this.images.length > 0) ? this.images[0].path : ''
    }
  }

  addNew(formDirective: FormGroupDirective) {
    this.isSubmitted = true;
    if (this.amenityForm.valid && this.prcessedData.icon) {
      this.sharedCrudService.addItem(AmenityApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityForm.reset(this.emptyAmenityObj);
          this.isSubmitted = false;
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    this.isSubmitted = true;
    if (this.amenityForm.valid && this.prcessedData.icon) {
      this.sharedCrudService.addItem(AmenityApis.addDraft, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.amenityForm.reset(this.emptyAmenityObj);
          this.isSubmitted = false;
        });
    }
  }

  edit() {
    this.isSubmitted = true;
    if (this.amenityForm.valid && this.prcessedData.icon) {
      this.sharedCrudService.editItem(AmenityApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    this.isSubmitted = true;
    if (this.amenityForm.valid && this.prcessedData.icon) {
      this.sharedCrudService.editItem(AmenityApis.updateDraft, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    this.isSubmitted = true;
    if (this.amenityForm.valid && this.prcessedData.icon) {
      this.sharedCrudService.addItem(AmenityApis.add, this.prcessedData)
        .pipe(switchMap(addedItem =>
          this.sharedCrudService.delete(AmenityApis.deleteDraft, [{ id: this.formType.id }])
            .pipe(map(res => addedItem))
        ))
        .subscribe((response: any) => {
          this.router.navigate([`/amenity/edit/${response.data.id}`])
        });
    }
  }

  getImage(event) {
    this.images = event;
    this.images.forEach(
      (value) => (value.name = value.caption ? value.caption : "Amenity logo")
    );
  }

}
