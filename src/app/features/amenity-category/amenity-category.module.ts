import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenityCategoryRoutingModule } from './amenity-category-routing.module';
import { AmenityCategoryTableComponent } from './containers/amenity-category-table/amenity-category-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AmenityCategoryTableComponent],
  imports: [
    CommonModule,
    AmenityCategoryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AmenityCategoryModule { }
