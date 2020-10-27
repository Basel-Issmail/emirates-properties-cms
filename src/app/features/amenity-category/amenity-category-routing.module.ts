import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenityCategoryTableComponent } from './containers/amenity-category-table/amenity-category-table.component';

const routes: Routes = [
  { path: '', component: AmenityCategoryTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmenityCategoryRoutingModule { }
