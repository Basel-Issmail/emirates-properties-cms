import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'ep-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  user: any = null;
  userForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.userForm = this.fb.group({
      id: [this.user.id],
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email,]],
      mobile: [this.user.mobile, [Validators.required]],
      profile_picture: [this.user.profile_picture],
      reminder: [this.user.reminder],
      active: [this.user.active]
    })
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.profileService.updateProfile(this.userForm.value).subscribe(
        response => {
        });
      console.table(this.userForm.value);
    }

  }

}
