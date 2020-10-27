import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsTableComponent } from './containers/news-table/news-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewsTableComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class NewsModule { }
