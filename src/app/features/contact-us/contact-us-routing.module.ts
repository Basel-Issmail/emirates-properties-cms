import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsPageComponent } from './containers/contact-us-page/contact-us-page.component';
import { ContactUsFormComponent } from './containers/contact-us-form/contact-us-form.component';

const routes: Routes = [
  { path: '', component: ContactUsPageComponent },
  { path: 'edit', component: ContactUsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
