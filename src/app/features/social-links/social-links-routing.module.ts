import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialLinksTableComponent } from './social-links-table/social-links-table.component';
import { SocialLinksFormComponent } from './social-links-form/social-links-form.component';

const routes: Routes = [
  { path: '', component: SocialLinksTableComponent },
  { path: 'add', component: SocialLinksFormComponent },
  { path: 'edit/:id', component: SocialLinksFormComponent },
  { path: 'edit-draft/:id', component: SocialLinksFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialLinksRoutingModule { }
