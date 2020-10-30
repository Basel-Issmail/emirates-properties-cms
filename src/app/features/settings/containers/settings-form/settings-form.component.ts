import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsApis } from '../../settings.constants';

@Component({
  selector: 'ep-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  settingsForm: FormGroup;
  emptySettingsObj = { content: '', ident: '', name: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.settingsForm = this.fb.group({
      content: ['', Validators.required],
      ident: ['', Validators.required],
      name: ['', Validators.required]
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(SettingsApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.settingsForm.patchValue(x));
    }
  }

  get settingsFormControl() {
    return this.settingsForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.settingsForm.valid) {
      this.sharedCrudService.addItem(SettingsApis.add, this.settingsForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.settingsForm.reset(this.emptySettingsObj);
        });
    }
  }

  edit() {
    if (this.settingsForm.valid) {
      this.sharedCrudService.editItem(SettingsApis.update, this.settingsForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

}
