import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsTableComponent } from './containers/agents-table/agents-table.component';
import { AgentsFormComponent } from './containers/agents-form/agents-form.component';

const routes: Routes = [
  { path: '', component: AgentsTableComponent },
  { path: 'add', component: AgentsFormComponent },
  { path: 'edit/:id', component: AgentsFormComponent },
  { path: 'edit-draft/:id', component: AgentsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
