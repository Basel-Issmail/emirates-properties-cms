import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerTableComponent } from './containers/career-table/career-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CareerFormComponent } from './containers/career-form/career-form.component';


@NgModule({
  declarations: [CareerTableComponent, CareerFormComponent],
  imports: [
    CommonModule,
    CareerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CareerModule { }
