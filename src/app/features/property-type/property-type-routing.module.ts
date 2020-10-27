import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTypeTableComponent } from './containers/property-type-table/property-type-table.component';

const routes: Routes = [
  { path: '', component: PropertyTypeTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyTypeRoutingModule { }
