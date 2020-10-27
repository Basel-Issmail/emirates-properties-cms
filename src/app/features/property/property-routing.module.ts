import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTableComponent } from './containers/property-table/property-table.component';

const routes: Routes = [
  { path: '', component: PropertyTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
