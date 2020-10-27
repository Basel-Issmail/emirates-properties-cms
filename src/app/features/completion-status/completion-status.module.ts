import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletionStatusRoutingModule } from './completion-status-routing.module';
import { CompletionStatusTableComponent } from './containers/completion-status-table/completion-status-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CompletionStatusTableComponent],
  imports: [
    CommonModule,
    CompletionStatusRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CompletionStatusModule { }
