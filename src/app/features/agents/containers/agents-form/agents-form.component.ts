import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first } from 'rxjs/operators';
import { AgentsApis } from '../../agents.constants';

@Component({
  selector: 'ep-agents-form',
  templateUrl: './agents-form.component.html',
  styleUrls: ['./agents-form.component.scss']
})
export class AgentsFormComponent implements OnInit {
  agentForm: FormGroup;
  emptyAgentObj = { active: true, description: '', email: '', head_office: '', logo: '', name: '', orn_number: '', phone: '' };
  formType = null;
  FormTypes = FormTypes;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.agentForm = this.fb.group({
      active: [false],
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

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(AgentsApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.agentForm.patchValue(x));
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

  addNew(formDirective: FormGroupDirective) {
    if (this.agentForm.valid) {
      this.sharedCrudService.addItem(AgentsApis.add, this.agentForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.agentForm.reset(this.emptyAgentObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.agentForm.valid) {
      this.sharedCrudService.addItem(AgentsApis.addDraft, this.agentForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.agentForm.reset(this.emptyAgentObj);
        });
    }
  }

  edit() {
    if (this.agentForm.valid) {
      this.sharedCrudService.editItem(AgentsApis.update, this.agentForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.agentForm.valid) {
      this.sharedCrudService.editItem(AgentsApis.updateDraft, this.agentForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
