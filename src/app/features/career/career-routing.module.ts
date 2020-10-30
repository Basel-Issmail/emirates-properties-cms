import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerTableComponent } from './containers/career-table/career-table.component';
import { CareerFormComponent } from './containers/career-form/career-form.component';

const routes: Routes = [
  { path: '', component: CareerTableComponent },
  { path: 'add', component: CareerFormComponent },
  { path: 'edit/:id', component: CareerFormComponent },
  { path: 'edit-draft/:id', component: CareerFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
