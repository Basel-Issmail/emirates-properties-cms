import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesTableComponent } from './containers/pages-table/pages-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagesTableComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
