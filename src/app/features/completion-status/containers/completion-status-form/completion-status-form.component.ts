import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompletionStatusApis } from '../../completion-status.constants';

@Component({
  selector: 'ep-completion-status-form',
  templateUrl: './completion-status-form.component.html',
  styleUrls: ['./completion-status-form.component.scss']
})
export class CompletionStatusFormComponent implements OnInit {
  completionStatusForm: FormGroup;
  emptyCompletionStatusObj = { title: '', description: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.completionStatusForm = this.fb.group({
      description: [""],
      title: ["", Validators.required],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(CompletionStatusApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.completionStatusForm.patchValue(x));
    }
  }

  get completionStatusFormControl() {
    return this.completionStatusForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.completionStatusForm.valid) {
      this.sharedCrudService.addItem(CompletionStatusApis.add, this.completionStatusForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.completionStatusForm.reset(this.emptyCompletionStatusObj);
        });
    }
  }

  edit() {
    if (this.completionStatusForm.valid) {
      this.sharedCrudService.editItem(CompletionStatusApis.update, this.completionStatusForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }
}
