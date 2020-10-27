import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTypeCategoryTableComponent } from './containers/property-type-category-table/property-type-category-table.component';

const routes: Routes = [
  { path: '', component: PropertyTypeCategoryTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyTypeCategoryRoutingModule { }
