import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsTableComponent } from './containers/agents-table/agents-table.component';
import { AgentsFormComponent } from './containers/agents-form/agents-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { AgentsApis } from './agents.constants';

const routes: Routes = [
  { path: '', component: AgentsTableComponent },
  { path: 'add', component: AgentsFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AgentsApis.builder } },
  { path: 'edit/:id', component: AgentsFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AgentsApis.builder } },
  { path: 'edit-draft/:id', component: AgentsFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AgentsApis.builder } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
