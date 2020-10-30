import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleApis } from '../../role.constants';
@Component({
  selector: 'ep-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm: FormGroup;
  emptyRoleObj = { active: true, name: '', description: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    this.roleForm = this.fb.group({
      active: [true],
      description: [''],
      name: ['', Validators.required],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(RoleApis.getDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.roleForm.patchValue(x));
    }
    if (this.formType.type === FormTypes.editDraft) {
      this.sharedCrudService.getDraftItemDetails(RoleApis.getDraftDetails, this.formType.id)
        .pipe(first())
        .subscribe(x => this.roleForm.patchValue(x));
    }
  }

  get roleFormControl() {
    return this.roleForm.controls;
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.roleForm.valid) {
      this.sharedCrudService.addItem(RoleApis.add, this.roleForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.roleForm.reset(this.emptyRoleObj);
        });
    }
  }

  saveAsDraft(formDirective: FormGroupDirective) {
    if (this.roleForm.valid) {
      this.sharedCrudService.addItem(RoleApis.addDraft, this.roleForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.roleForm.reset(this.emptyRoleObj);
        });
    }
  }

  edit() {
    if (this.roleForm.valid) {
      this.sharedCrudService.editItem(RoleApis.update, this.roleForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  editDraft() {
    if (this.roleForm.valid) {
      this.sharedCrudService.editItem(RoleApis.updateDraft, this.roleForm.value, this.formType.id)
        .subscribe(response => {
        });
    }
  }

  publish() {
    if (this.roleForm.valid) {
      this.sharedCrudService.addItem(RoleApis.add, this.roleForm.value)
        .pipe(switchMap(addedItem =>
          this.sharedCrudService.delete(RoleApis.deleteDraft, [{ id: this.formType.id }])
            .pipe(map(res => addedItem))
        ))
        .subscribe((response: any) => {
          this.router.navigate([`/roles/edit/${response.data.id}`])
        });
    }
  }

}
