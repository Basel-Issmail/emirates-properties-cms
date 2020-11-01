import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'ep-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  user: any = null;
  passwordForm: FormGroup;
  isOldPassVisible = false;
  isNewPassVisible = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]]
    })
  }

  get userFormControl() {
    return this.passwordForm.controls;
  }

  toggleOldPasswordVisibility(){
    this.isOldPassVisible = !this.isOldPassVisible;
  }

  toggleNewPasswordVisibility(){
    this.isNewPassVisible = !this.isNewPassVisible;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.profileService.changePassword(this.passwordForm.value).subscribe(
        response => {
        });
    }

  }


}
