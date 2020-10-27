import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsTableComponent } from './containers/requests-table/requests-table.component';
import { RequestDetailsComponent } from './containers/request-details/request-details.component';

const routes: Routes = [
  { path: '', component: RequestsTableComponent },
  { path: ':id', component: RequestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
