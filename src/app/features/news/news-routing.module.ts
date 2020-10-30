import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsTableComponent } from './containers/news-table/news-table.component';
import { NewsFormComponent } from './containers/news-form/news-form.component';

const routes: Routes = [
  { path: '', component: NewsTableComponent },
  { path: 'add', component: NewsFormComponent },
  { path: 'edit/:id', component: NewsFormComponent },
  { path: 'edit-draft/:id', component: NewsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
