import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentPageComponent } from './containers/agent-page/agent-page.component';
import { AgentFormComponent } from './containers/agent-form/agent-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { AgentProfileApis } from './agent-profile.constants';

const routes: Routes = [
  { path: '', component: AgentPageComponent },
  { path: 'edit', component: AgentFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AgentProfileApis.builder }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentProfileRoutingModule { }
