import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsTableComponent } from './containers/news-table/news-table.component';

const routes: Routes = [
  { path: '', component: NewsTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
