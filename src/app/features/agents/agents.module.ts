import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsTableComponent } from './containers/agents-table/agents-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgentsTableComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AgentsModule { }
