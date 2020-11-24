import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { FormTypeService } from 'src/app/shared/services/form-type.service';
import { FormTypes } from 'src/app/shared/constants/form-types';
import { first, startWith, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserApis } from '../../user.constants';

@Component({
  selector: 'ep-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isPassVisible = false;
  userForm: FormGroup;
  emptyUserObj = { active: true, first_name: '', last_name: '', email: '', password: '', role: 'admin', mobile: '' };
  formType = null;
  FormTypes = FormTypes;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formTypeService: FormTypeService,
    private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.formType = this.formTypeService.getFormTypeWithId(this.route);

    const passwordValidators = [];
    if (this.formType.type === FormTypes.add) {
      passwordValidators.push(Validators.required);
    }

    this.userForm = this.fb.group({
      active: [true],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', passwordValidators],
      role: ['admin'],
      mobile: [''],
    });

    if (this.formType.type === FormTypes.edit) {
      this.sharedCrudService.getItemDetails(UserApis.getDetails, this.formType.id)
        .pipe(first(), map(val => {
          val.role = 'admin';
          return val;
        }))
        .subscribe(x => this.userForm.patchValue(x));
    }
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  get userEditValues() {
    return {
      active: this.userFormControl.active.value,
      first_name: this.userFormControl.first_name.value,
      last_name: this.userFormControl.last_name.value,
      email: this.userFormControl.email.value,
      role: this.userFormControl.role.value,
      mobile: this.userFormControl.mobile.value
    };
  }

  addNew(formDirective: FormGroupDirective) {
    if (this.userForm.valid) {
      this.sharedCrudService.addItem(UserApis.add, this.userForm.value)
        .subscribe(response => {
          formDirective.resetForm();
          this.userForm.reset(this.emptyUserObj);
        });
    }
  }

  edit() {
    if (this.userForm.valid) {
      this.sharedCrudService.editItem(UserApis.update, this.userEditValues, this.formType.id)
        .subscribe(response => {
        });
    }
  }
}
