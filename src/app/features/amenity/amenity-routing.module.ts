import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenityTableComponent } from './containers/amenity-table/amenity-table.component';

const routes: Routes = [
  { path: '', component: AmenityTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmenityRoutingModule { }
