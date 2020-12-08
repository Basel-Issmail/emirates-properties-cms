import { Component, OnInit } from '@angular/core';
import { SocialLinksApis } from '../social-links.constant';
import { FormGroupDirective, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { ActivatedRoute } from '@angular/router';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { CoreApis } from 'src/app/core/core.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ep-social-links-form',
  templateUrl: './social-links-form.component.html',
  styleUrls: ['./social-links-form.component.scss']
})
export class SocialLinksFormComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  uploadPhoto = CoreApis.uploadPhoto;
  images = [];
  isSubmitted = false;

  settingsForm: FormGroup;
  emptySettingsObj = { title: '', name: '', code: '', url: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.settingsForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      url: ['', Validators.required],
      icon: [''],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(SocialLinksApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.settingsForm.patchValue(x));
    }
  }

  get settingsFormControl() {
    return this.settingsForm.controls;
  }

  get prcessedData() {
    return {
      ...this.settingsForm.value,
      icon: (Array.isArray(this.images) && this.images.length > 0) ? this.images[0].path : ''
    }
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.settingsForm.valid) {
      this.sharedCrudService.addItem(SocialLinksApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.settingsForm.reset(this.emptySettingsObj);
        });
    }
  }

  edit() {
    if (this.settingsForm.valid) {
      this.sharedCrudService.editItem(SocialLinksApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  getImage(event) {
    this.images = event;
    this.images.forEach(
      (value) => (value.name = value.caption ? value.caption : "Social links icon")
    );

  }
}
