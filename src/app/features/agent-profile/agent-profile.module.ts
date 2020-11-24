import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentProfileRoutingModule } from './agent-profile-routing.module';
import { AgentPageComponent } from './containers/agent-page/agent-page.component';
import { AgentFormComponent } from './containers/agent-form/agent-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgentPageComponent, AgentFormComponent],
  imports: [
    CommonModule,
    AgentProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgentProfileModule { }
