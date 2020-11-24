import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import { AgentsApis } from '../../agents.constants';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'ep-agents-form',
  templateUrl: './agents-form.component.html',
  styleUrls: ['./agents-form.component.scss']
})
export class AgentsFormComponent implements OnInit {
  isPassVisible = false;
  agentForm: FormGroup;
  emptyAgentObj = {
    active: true, areas: '', brn: '', company_id: '', description: '', email: '', experienced_since: '', languages: '',
    linkedin: '', name: '', nationality_id: '', phone: '', position: '', whatsapp_number: '', user: { first_name: '', last_name: '', email: '', password: '' }
  };
  formType = null;
  FormTypes = FormTypes;
  // data to autocomplete
  companyFormControl = new FormControl('');
  filteredCompanies$: Observable<any[]>;
  nationalityFormControl = new FormControl('');
  filteredNationalities$: Observable<any[]>;
  languageFormControl = new FormControl('');
  filteredLanguages$: Observable<any[]>;
  areaFormControl = new FormControl('');
  filteredAreas$: Observable<any[]>;
  role: any;
  test: any = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.role = this.auth.user.role;
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    const passwordValidators = [];
    if (this.formType.type === FormTypes.add) {
      passwordValidators.push(Validators.required);
    }

    this.agentForm = this.fb.group({
      active: [true],
      areas: [''],
      brn: [''],
      company_id: ['', Validators.required],
      description: [''],
      email: ['', Validators.email],
      experienced_since: ['', Validators.required],
      languages: [''],
      linkedin: [''],
      name: ['', Validators.required],
      nationality_id: [''],
      phone: [''],
      position: [''],
      whatsapp_number: [''],
      user: this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', passwordValidators]
      })
    });

    // autocomplete data
    if (this.role === 'admin') {
      this.filteredCompanies$ = this.companyFormControl.valueChanges.pipe(
        startWith(''),
        map(userInputValue => this.route.snapshot.data.buidler.company_list.
          filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));
    } else {
      this.filteredCompanies$ = this.route.snapshot.data.buidler.company_list;
      this.agentFormControl.company_id.setValue(this.filteredCompanies$[0].id);
    }
    this.filteredNationalities$ = this.nationalityFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.nationalities_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));


    this.filteredLanguages$ = this.languageFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.languages_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    this.filteredAreas$ = this.areaFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.areas_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(AgentsApis.getDetails, this.formType.id)
        .pipe(first(), map(response => { if (response.areas) response.areas = response.areas.map(value => Number(value.id)); return response }))
        .subscribe(x => {
          this.agentForm.patchValue(x);
        });
    }
  }

  get agentFormControl() {
    return this.agentForm.controls;
  }

  get nestedUserFormControl() {
    return this.agentForm.controls.user['controls'];
  }

  get prcessedData() {
    const data = { ...this.agentForm.value, experienced_since: moment(this.agentFormControl.experienced_since.value).format('YYYY-MM-DD') }

    if (this.formType.type === FormTypes.edit) {
      delete data.user.password;
    }
    return data;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.agentForm.valid) {
      this.sharedCrudService.addItem(AgentsApis.add, this.prcessedData)
        .subscribe(response => {
          formDirective.resetForm();
          this.agentForm.reset(this.emptyAgentObj);
        });
    }
  }

  edit() {
    if (this.agentForm.valid) {
      this.sharedCrudService.editItem(AgentsApis.update, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
