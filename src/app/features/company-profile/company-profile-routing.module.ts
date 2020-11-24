import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyPageComponent } from './containers/company-page/company-page.component';
import { CompanyFormComponent } from './containers/company-form/company-form.component';

const routes: Routes = [
  { path: '', component: CompanyPageComponent },
  { path: 'edit', component: CompanyFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
