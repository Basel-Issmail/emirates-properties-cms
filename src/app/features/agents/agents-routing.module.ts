import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsTableComponent } from './containers/agents-table/agents-table.component';

const routes: Routes = [
  { path: '', component: AgentsTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
