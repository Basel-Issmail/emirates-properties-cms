import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryTableComponent } from './containers/country-table/country-table.component';

const routes: Routes = [
  { path: '', component: CountryTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
