import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletionStatusTableComponent } from './containers/completion-status-table/completion-status-table.component';

const routes: Routes = [
  { path: '', component: CompletionStatusTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletionStatusRoutingModule { }
