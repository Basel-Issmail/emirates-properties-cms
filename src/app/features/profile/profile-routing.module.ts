import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import { ProfileFormComponent } from './containers/profile-form/profile-form.component';
import { PasswordFormComponent } from './containers/password-form/password-form.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'edit', component: ProfileFormComponent },
  { path: 'change-password', component: PasswordFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
