import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, map, startWith } from 'rxjs/operators';
import { AgentsApis } from '../../agents.constants';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'ep-agents-form',
  templateUrl: './agents-form.component.html',
  styleUrls: ['./agents-form.component.scss']
})
export class AgentsFormComponent implements OnInit {
  agentForm: FormGroup;
  emptyAgentObj = {
    active: true, areas: '', brn: '', company_id: '', description: '', email: '', experienced_since: '', languages: '',
    linkedin: '', name: '', nationality_id: '', phone: '', position: '', whatsapp_number: ''
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

  test: any = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);
    this.agentForm = this.fb.group({
      active: [true],
      areas: [''],
      brn: [''],
      company_id: [''],
      description: [''],
      email: ['', Validators.email],
      experienced_since: [''],
      languages: [''],
      linkedin: [''],
      name: ['', Validators.required],
      nationality_id: [''],
      phone: [''],
      position: [''],
      whatsapp_number: [''],
    });

    // autocomplete data
    this.filteredCompanies$ = this.companyFormControl.valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.route.snapshot.data.buidler.company_list.
        filter(itemObj => itemObj.name.toLowerCase().indexOf(userInputValue) === 0)));

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
          this.agentFormControl.company_id.setValue(35);
        });
    }

    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(AgentsApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.agentForm.patchValue(x));
    }
  }

  get agentFormControl() {
    return this.agentForm.controls;
  }

  get prcessedData() {
    return { ...this.agentForm.value, experienced_since: moment(this.agentFormControl.experienced_since.value).format('YYYY-MM-DD') }
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

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.agentForm.valid) {
      this.sharedCrudService.addItem(AgentsApis.addDraft, this.prcessedData)
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

  editDraft() {
    if (this.agentForm.valid) {
      this.sharedCrudService.editItem(AgentsApis.updateDraft, this.prcessedData, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
