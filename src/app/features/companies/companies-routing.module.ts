import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesTableComponent } from './containers/companies-table/companies-table.component';
import { CompaniesFormComponent } from './containers/companies-form/companies-form.component';

const routes: Routes = [
  { path: '', component: CompaniesTableComponent },
  { path: 'add', component: CompaniesFormComponent },
  { path: 'edit/:id', component: CompaniesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
