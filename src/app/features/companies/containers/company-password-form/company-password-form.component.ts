import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CompaniesApis } from '../../companies.constants';

@Component({
  selector: 'ep-company-password-form',
  templateUrl: './company-password-form.component.html',
  styleUrls: ['./company-password-form.component.scss']
})
export class CompanyPasswordFormComponent implements OnInit {
  userPasswordForm: FormGroup;
  isOldPassVisible = false;
  isNewPassVisible = false;


  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<CompanyPasswordFormComponent>,
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
      this.httpClient.post(`${CompaniesApis.changePassword}/${this.data.id}`, { password: this.userFormControl.password.value }).subscribe(
        response => {
          this.dialogRef.close();
        });
    }
  }
}
