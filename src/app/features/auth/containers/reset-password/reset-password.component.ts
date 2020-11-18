import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ep-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email,]],
    password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    }
  }
}
