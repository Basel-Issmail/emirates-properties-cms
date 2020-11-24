import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsTableComponent } from './containers/news-table/news-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsFormComponent } from './containers/news-form/news-form.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [NewsTableComponent, NewsFormComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class NewsModule { }
