import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryApis } from '../../country.constants';

@Component({
  selector: 'ep-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  countriesForm: FormGroup;
  emptycountriesObj = { ar_name: '', code: '', currency: '', currency_rate: '', fr_name: '', iso2: '', iso3: '', name: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.countriesForm = this.fb.group({
      ar_name: [''],
      code: ['', Validators.required],
      currency: ['', Validators.required],
      currency_rate: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fr_name: [''],
      iso2: [''],
      iso3: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CountryApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.countriesForm.patchValue(x));
    }
  }

  get countriesFormControl() {
    return this.countriesForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.countriesForm.valid) {
      this.sharedCrudService.addItem(CountryApis.add, this.countriesForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.countriesForm.reset(this.emptycountriesObj);
        });
    }
  }

  edit() {
    if (this.countriesForm.valid) {
      this.sharedCrudService.editItem(CountryApis.update, this.countriesForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
