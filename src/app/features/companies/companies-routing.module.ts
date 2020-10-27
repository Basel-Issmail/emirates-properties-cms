import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesTableComponent } from './containers/companies-table/companies-table.component';

const routes: Routes = [
  { path: '', component: CompaniesTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
