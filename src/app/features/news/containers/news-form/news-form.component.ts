import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApis } from '../../news.constants';
import * as moment from 'moment';
import { CoreApis } from 'src/app/core/core.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ep-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  emptyNewsObj = { active: true, brief: '', content: ' ', date: '', meta_description: '', meta_keywords: '', meta_title: '', name: '', url: '', media: '' };
  formType = null;
  FormTypes = FormTypes;

  @ViewChild('imageUploader') imageUploader;

  imageBaseUrl = environment.imageBaseUrl;
  uploadPhoto = CoreApis.uploadPhoto;
  images = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.newsForm = this.fb.group({
      active: [true],
      brief: ['', Validators.required],
      content: [' ', Validators.required],
      date: ['', Validators.required],
      meta_description: ['', Validators.required],
      meta_keywords: ['', Validators.required],
      meta_title: ['', Validators.required],
      name: ['', Validators.required],
      url: ['', Validators.required],
      media: [''],
    });

    // meta autofill
    let processedName = '';
    this.newsFormControl.name.valueChanges.subscribe(value => {
      processedName = (value) ? value.replace(/[^a-zA-Z1-9 ]/g, '').replace(/ /g, '-') : '';
      let url = processedName.toString().toLowerCase();
      url = (processedName) ? processedName.toString().toLowerCase() : '';
      this.newsFormControl.url.setValue(url);
      this.newsFormControl.meta_title.setValue(value);
    });


    this.newsFormControl.brief.valueChanges.subscribe(value => {
      value = value || '';
      this.newsFormControl.meta_description.setValue(value.substring(0, 256));
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(NewsApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.newsForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(NewsApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.newsForm.patchValue(x));
    }
  }

  get newsFormControl() {
    return this.newsForm.controls;
  }

  get prcessedData() {
    return { ...this.newsForm.value, date: moment(this.newsFormControl.date.value).format('YYYY-MM-DD'), media: this.images }
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.newsForm.valid) {
      this.sharedCrudService.addItem(NewsApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.newsForm.reset(this.emptyNewsObj);
          this.imageUploader.deleteAll();
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.newsForm.valid) {
      this.sharedCrudService.addItem(NewsApis.addDraft, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.newsForm.reset(this.emptyNewsObj);
          this.imageUploader.deleteAll();
        });
    }
  }

  edit() {
    if (this.newsForm.valid) {
      this.sharedCrudService.editItem(NewsApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.newsForm.valid) {
      this.sharedCrudService.editItem(NewsApis.updateDraft, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.newsForm.valid) {
      this.sharedCrudService.publish(NewsApis.add, NewsApis.deleteDraft, this.prcessedData, this.formType.id)
        .subscribe((response: any) => {
          this.router.navigate([`/blog/edit/${response.data.id}`])
        });
    }
  }

  getImages(event) {
    this.images = event;
    this.images.forEach(
      (value, index) => {
        value.name = value.caption ? value.caption : "Image";
        if (index === 0) {
          value.main_photo = true;
        } else {
          value.main_photo = false;
        }
      }
    );
  }
}
