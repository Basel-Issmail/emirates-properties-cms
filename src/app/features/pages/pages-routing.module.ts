import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesTableComponent } from './containers/pages-table/pages-table.component';

const routes: Routes = [
  { path: '', component: PagesTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
