import { Component, OnInit } from '@angular/core';
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
  companyForm: FormGroup;
  emptyCompanyObj = { active: true, description: '', email: '', head_office: '', logo: '', name: '', orn_number: '', phone: '' };
  formType = null;
  FormTypes = FormTypes;

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

    this.companyForm = this.fb.group({
      active: [true],
      description: [''],
      email: ['', Validators.email],
      head_office: [''],
      logo: [''],
      name: ['', Validators.required],
      orn_number: [''],
      phone: [''],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CompaniesApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.companyForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(CompaniesApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.companyForm.patchValue(x));
    }
  }

  get companyFormControl() {
    return this.companyForm.controls;
  }

  get prcessedData() {
    return {
      ...this.companyForm.value,
      logo: (Array.isArray(this.images) && this.images.length > 0) ? this.images[0].path : ''
    }
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.companyForm.valid) {
      this.sharedCrudService.addItem(CompaniesApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.companyForm.reset(this.emptyCompanyObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.companyForm.valid) {
      this.sharedCrudService.addItem(CompaniesApis.addDraft, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.companyForm.reset(this.emptyCompanyObj);
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

  editDraft() {
    if (this.companyForm.valid) {
      this.sharedCrudService.editItem(CompaniesApis.updateDraft, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.companyForm.valid) {
      this.sharedCrudService.publish(CompaniesApis.add, CompaniesApis.deleteDraft, this.prcessedData, this.formType.id)
        .subscribe((response: any) => {
          this.router.navigate([`/companies/edit/${response.data.id}`])
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
