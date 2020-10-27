import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerTableComponent } from './containers/career-table/career-table.component';

const routes: Routes = [
  { path: '', component: CareerTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
