import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MemberApis } from '../../member.constants';
@Component({
  selector: 'ep-member-password-form',
  templateUrl: './member-password-form.component.html',
  styleUrls: ['./member-password-form.component.scss']
})
export class MemberPasswordFormComponent implements OnInit {
  userPasswordForm: FormGroup;
  isOldPassVisible = false;
  isNewPassVisible = false;


  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<MemberPasswordFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private httpClient: HttpClient) { }



  ngOnInit(): void {
    this.userPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      // confirm_password: ['', [Validators.required]]
    })
  }

  get userFormControl() {
    return this.userPasswordForm.controls;
  }

  toggleOldPasswordVisibility() {
    this.isOldPassVisible = !this.isOldPassVisible;
  }

  toggleNewPasswordVisibility() {
    this.isNewPassVisible = !this.isNewPassVisible;
  }

  onSubmit() {
    if (this.userPasswordForm.valid) {
      this.httpClient.post(`${MemberApis.changePassword}/${this.data.id}`, { password: this.userFormControl.password.value }).subscribe(
        response => {
          this.dialogRef.close();
        });
    }
  }

}
