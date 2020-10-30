import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletionStatusTableComponent } from './containers/completion-status-table/completion-status-table.component';
import { CompletionStatusFormComponent } from './containers/completion-status-form/completion-status-form.component';

const routes: Routes = [
  { path: '', component: CompletionStatusTableComponent },
  { path: 'add', component: CompletionStatusFormComponent },
  { path: 'edit/:id', component: CompletionStatusFormComponent },
  { path: 'edit-draft/:id', component: CompletionStatusFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletionStatusRoutingModule { }
