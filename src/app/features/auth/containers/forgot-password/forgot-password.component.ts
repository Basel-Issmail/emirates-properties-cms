import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';

@Component({
  selector: 'ep-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email,]]
  })
  constructor(private fb: FormBuilder, private authService: AuthService, private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
  }

  get forgotPasswordFormFormControl() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgetPassword(this.forgotPasswordForm.value).subscribe(
        response => {
          this.sharedCrudService.handleSuccess('Link has been sent to your E-mail');
        });
    }
  }

}
