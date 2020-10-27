import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsTableComponent } from './containers/requests-table/requests-table.component';

const routes: Routes = [
  { path: '', component: RequestsTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
