import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { startWith, map, first } from 'rxjs/operators';
import { AgentProfileApis } from '../../agent-profile.constants';
import * as moment from 'moment';

@Component({
  selector: 'ep-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  emptyAgentObj = {
    active: true, areas: '', brn: '', company_id: '', description: '', email: '', experienced_since: '', languages: '',
    linkedin: '', name: '', nationality_id: '', phone: '', position: '', whatsapp_number: ''
  };

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
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.role = this.auth.user.role;

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
      whatsapp_number: ['']
    });

    // autocomplete data
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

    this.sharedCrudService.getItemDetails(AgentProfileApis.getData)
      .pipe(first(), map(response => { if (response.areas) response.areas = response.areas.map(value => Number(value.id)); return response }))
      .subscribe(x => {
        this.agentForm.patchValue(x);
      });
  }

  get agentFormControl() {
    return this.agentForm.controls;
  }

  get nestedUserFormControl() {
    return this.agentForm.controls.user['controls'];
  }

  get prcessedData() {
    return { ...this.agentForm.value, experienced_since: moment(this.agentFormControl.experienced_since.value).format('YYYY-MM-DD') }
  }

  edit() {
    if (this.agentForm.valid) {
      this.sharedCrudService.addItem(AgentProfileApis.update, this.prcessedData)
        .subscribe(response => {
          this.sharedCrudService.handleSuccess('Updated successfully')
        });
    }
  }
}
