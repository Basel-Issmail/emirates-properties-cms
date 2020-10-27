import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyTypeCategoryRoutingModule } from './property-type-category-routing.module';
import { PropertyTypeCategoryTableComponent } from './containers/property-type-category-table/property-type-category-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PropertyTypeCategoryTableComponent],
  imports: [
    CommonModule,
    PropertyTypeCategoryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PropertyTypeCategoryModule { }
