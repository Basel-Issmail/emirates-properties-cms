import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { CompaniesApis } from '../../companies.constants';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreApis } from 'src/app/core/core.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ep-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss']
})
export class CompaniesFormComponent implements OnInit {
  isPassVisible = false;
  companyForm: FormGroup;
  emptyCompanyObj = { active: true, description: '', email: '', head_office: '', logo: '', name: '', orn_number: '', phone: '', user: { first_name: '', last_name: '', email: '', password: '' } };
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

    const passwordValidators = [];
    if (this.formType.type === FormTypes.add) {
      passwordValidators.push(Validators.required);
    }

    this.companyForm = this.fb.group({
      active: [true],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      head_office: [''],
      logo: [''],
      name: ['', Validators.required],
      orn_number: ['', Validators.required],
      phone: ['', Validators.required],
      user: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidators]
      })
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CompaniesApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.companyForm.patchValue(x));
    }
  }

  get companyFormControl() {
    return this.companyForm.controls;
  }

  get nestedUserFormControl() {
    return this.companyForm.controls.user['controls'];
  }

  get prcessedData() {
    const data = {
      ...this.companyForm.value,
      logo: (Array.isArray(this.images) && this.images.length > 0) ? this.images[0].path : ''
    }
    if (this.formType.type === FormTypes.edit) {
      delete data.user.password;
    }
    return data;
  }

  addNew(formDirective: FormGroupDirective) {
    console.log(this.prcessedData);

    if (this.companyForm.valid) {
      this.sharedCrudService.addItem(CompaniesApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.companyForm.reset(this.emptyCompanyObj);
          this.imageUploader.deleteAll();
        });
    }
  }

  edit() {
    if (this.companyForm.valid) {
      this.sharedCrudService.editItem(CompaniesApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  getImage(event) {
    this.images = event;
    this.images.forEach(
      (value) => (value.name = value.caption ? value.caption : "Page image")
    );
  }
}
