import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTypeCategoryTableComponent } from './containers/property-type-category-table/property-type-category-table.component';
import { PropertyTypeCategoryFormComponent } from './containers/property-type-category-form/property-type-category-form.component';

const routes: Routes = [
  { path: '', component: PropertyTypeCategoryTableComponent },
  { path: 'add', component: PropertyTypeCategoryFormComponent },
  { path: 'edit/:id', component: PropertyTypeCategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyTypeCategoryRoutingModule { }
