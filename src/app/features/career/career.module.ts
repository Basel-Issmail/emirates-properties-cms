import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerTableComponent } from './containers/career-table/career-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CareerTableComponent],
  imports: [
    CommonModule,
    CareerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CareerModule { }
