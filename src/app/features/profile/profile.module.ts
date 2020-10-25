import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileFormComponent } from './containers/profile-form/profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordFormComponent } from './containers/password-form/password-form.component';


@NgModule({
  declarations: [ProfilePageComponent, ProfileFormComponent, PasswordFormComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
