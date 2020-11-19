import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, switchMap, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PagesApis } from '../../pages.constants';
import { Observable } from 'rxjs';
import { CoreApis } from 'src/app/core/core.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ep-pages-form',
  templateUrl: './pages-form.component.html',
  styleUrls: ['./pages-form.component.scss']
})
export class PagesFormComponent implements OnInit {
  pagesForm: FormGroup;
  emptyPagesObj = {
    active: true, name: '', type: '', url: '', ident: '', content: '', heading: '', image: '', language: '', meta_description: '',
    meta_title: '', parent_id: 0, publish_end_date: '', publish_start_date: '', sort_order: 0
  };
  formType = null;
  FormTypes = FormTypes;
  @ViewChild('imageUploader') imageUploader;

  imageBaseUrl = environment.imageBaseUrl;
  uploadPhoto = CoreApis.uploadPhoto;
  images = [];

  // data to autocomplete
  typeFormControl = new FormControl('');
  filteredTypes$: Observable<any[]>;
  parentFormControl = new FormControl('');
  filteredParents$: Observable<any[]>;
  languageFormControl = new FormControl('');
  filteredLanguages$: Observable<any[]>;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.pagesForm = this.fb.group({
      active: [true],
      name: ['', Validators.required],
      type: ['', Validators.required],
      url: ['', Validators.required],
      ident: ['', Validators.required],
      content: [''],
      heading: [''],
      image: [''],
      language: ['', Validators.required],
      meta_description: [''],
      meta_title: [''],
      parent_id: [0],
      publish_end_date: [''],
      publish_in_date: [true],
      publish_start_date: [''],
      sort_order: [0],
    });

    // meta autofill
    let processedName = '';
    this.pagesFormControl.name.valueChanges.subscribe(value => {
      processedName = (value) ? value.replace(/[^a-zA-Z1-9 ]/g, '').replace(/ /g, '-') : '';
      let url = processedName.toString().toLowerCase();
      url = (processedName) ? processedName.toString().toLowerCase() : '';
      this.pagesFormControl.url.setValue(url);
      this.pagesFormControl.meta_title.setValue(value);
    });

    // autocomplete data
    this.filteredTypes$ = this.typeFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.type_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredParents$ = this.parentFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.parents_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredLanguages$ = this.languageFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.language_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));



    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(PagesApis.getDetails, this.formType.id)
        .pipe(first(), map(value => {
          if (value.parent) value.parent_id = Number(value.parent.id);
          if (value.type) value.type = Number(value.type.id);
          if (value.language) value.language = value.language.id;
          return value;
        }))
        .subscribe(x => this.pagesForm.patchValue(x));
    }
  }

  get pagesFormControl() {
    return this.pagesForm.controls;
  }

  get prcessedData() {
    return {
      ...this.pagesForm.value,
      publish_start_date: (this.pagesFormControl.publish_start_date.value) ? moment(this.pagesFormControl.publish_start_date.value).format('YYYY-MM-DD') : '',
      publish_end_date: (this.pagesFormControl.publish_end_date.value) ? moment(this.pagesFormControl.publish_end_date.value).format('YYYY-MM-DD') : '',
      image: (Array.isArray(this.images) && this.images.length > 0) ? this.images[0].path : ''
    }
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.pagesForm.valid) {
      this.sharedCrudService.addItem(PagesApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.pagesForm.reset(this.emptyPagesObj);
          this.imageUploader.deleteAll();
        });
    }
  }

  edit() {
    if (this.pagesForm.valid) {
      this.sharedCrudService.editItem(PagesApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  clearPublishingInputs($event) {
    this.pagesFormControl.publish_start_date.setValue('');
    this.pagesFormControl.publish_end_date.setValue('');
  }

  getImage(event) {
    this.images = event;
    this.images.forEach(
      (value) => (value.name = value.caption ? value.caption : "Page image")
    );
  }
}
