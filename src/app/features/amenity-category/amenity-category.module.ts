import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenityCategoryRoutingModule } from './amenity-category-routing.module';
import { AmenityCategoryTableComponent } from './containers/amenity-category-table/amenity-category-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmenityCategoryFormComponent } from './containers/amenity-category-form/amenity-category-form.component';


@NgModule({
  declarations: [AmenityCategoryTableComponent, AmenityCategoryFormComponent],
  imports: [
    CommonModule,
    AmenityCategoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AmenityCategoryModule { }
