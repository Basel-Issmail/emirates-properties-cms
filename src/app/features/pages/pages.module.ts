import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesTableComponent } from './containers/pages-table/pages-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesFormComponent } from './containers/pages-form/pages-form.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [PagesTableComponent, PagesFormComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class PagesModule { }
