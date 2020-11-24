import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { first } from 'rxjs/operators';
import { CompanyProfileApis } from '../../company-profile.constants';
import { environment } from 'src/environments/environment';
import { CoreApis } from 'src/app/core/core.constants';

@Component({
  selector: 'ep-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
  emptyCompanyObj = { description: '', email: '', head_office: '', logo: '', name: '', orn_number: '', phone: '' };

  imageBaseUrl = environment.imageBaseUrl;
  uploadPhoto = CoreApis.uploadPhoto;
  images = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      head_office: [''],
      logo: [''],
      name: ['', Validators.required],
      orn_number: ['', Validators.required],
      phone: ['', Validators.required],
      // user: this.fb.group({
      //   first_name: ['', Validators.required],
      //   last_name: ['', Validators.required],
      //   email: ['', [Validators.required, Validators.email]],
      //   password: ['', passwordValidators]
      // })
    });

    this.sharedCrudService.getItemDetails(CompanyProfileApis.getData)
      .pipe(first())
      .subscribe(x => this.companyForm.patchValue(x));
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

  edit() {
    if (this.companyForm.valid) {
      this.sharedCrudService.addItem(CompanyProfileApis.update, this.prcessedData)
        .subscribe(response => {
          this.sharedCrudService.handleSuccess('Updated successfully')
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
