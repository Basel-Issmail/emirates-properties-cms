import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsTableComponent } from './containers/agents-table/agents-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentsFormComponent } from './containers/agents-form/agents-form.component';
import { AgentPasswordFormComponent } from './containers/agent-password-form/agent-password-form.component';


@NgModule({
  declarations: [AgentsTableComponent, AgentsFormComponent, AgentPasswordFormComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgentsModule { }
