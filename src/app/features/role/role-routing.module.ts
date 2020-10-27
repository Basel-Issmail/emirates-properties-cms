import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleTableComponent } from './containers/role-table/role-table.component';

const routes: Routes = [
  { path: '', component: RoleTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
