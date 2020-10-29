import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenityCategoryTableComponent } from './containers/amenity-category-table/amenity-category-table.component';
import { AmenityCategoryFormComponent } from './containers/amenity-category-form/amenity-category-form.component';

const routes: Routes = [
  { path: '', component: AmenityCategoryTableComponent },
  { path: 'add', component: AmenityCategoryFormComponent },
  { path: 'edit/:id', component: AmenityCategoryFormComponent },
  { path: 'edit-draft/:id', component: AmenityCategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmenityCategoryRoutingModule { }
