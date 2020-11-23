import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AgentsApis } from '../../agents.constants';

@Component({
  selector: 'ep-agent-password-form',
  templateUrl: './agent-password-form.component.html',
  styleUrls: ['./agent-password-form.component.scss']
})
export class AgentPasswordFormComponent implements OnInit {
  userPasswordForm: FormGroup;
  isOldPassVisible = false;
  isNewPassVisible = false;


  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<AgentPasswordFormComponent>,
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
      this.httpClient.post(`${AgentsApis.changePassword}/${this.data.id}`, { password: this.userFormControl.password.value }).subscribe(
        response => {
          this.dialogRef.close();
        });
    }
  }
}
