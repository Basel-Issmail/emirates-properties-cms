import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryTableComponent } from './containers/country-table/country-table.component';
import { CountryFormComponent } from './containers/country-form/country-form.component';

const routes: Routes = [
  { path: '', component: CountryTableComponent },
  { path: 'add', component: CountryFormComponent },
  { path: 'edit/:id', component: CountryFormComponent },
  { path: 'edit-draft/:id', component: CountryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
