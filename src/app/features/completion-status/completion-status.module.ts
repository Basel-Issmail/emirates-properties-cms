import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletionStatusRoutingModule } from './completion-status-routing.module';
import { CompletionStatusTableComponent } from './containers/completion-status-table/completion-status-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompletionStatusFormComponent } from './containers/completion-status-form/completion-status-form.component';


@NgModule({
  declarations: [CompletionStatusTableComponent, CompletionStatusFormComponent],
  imports: [
    CommonModule,
    CompletionStatusRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompletionStatusModule { }
