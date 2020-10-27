import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberTableComponent } from './containers/member-table/member-table.component';

const routes: Routes = [
  {path: '', component: MemberTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
