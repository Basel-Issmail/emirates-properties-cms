import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ep-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token = null;
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email,]],
    password: ['', Validators.required],
    token: ['']
  })
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }
    this.resetPasswordForm.controls.token.setValue(this.token);
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
        response => {
          this.sharedCrudService.handleSuccess('Password Changed Successfully');
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
