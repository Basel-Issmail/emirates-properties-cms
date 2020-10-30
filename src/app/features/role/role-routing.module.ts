import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleTableComponent } from './containers/role-table/role-table.component';
import { RoleFormComponent } from './containers/role-form/role-form.component';

const routes: Routes = [
  { path: '', component: RoleTableComponent },
  { path: 'add', component: RoleFormComponent },
  { path: 'edit/:id', component: RoleFormComponent },
  { path: 'edit-draft/:id', component: RoleFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
