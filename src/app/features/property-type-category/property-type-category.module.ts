import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyTypeCategoryRoutingModule } from './property-type-category-routing.module';
import { PropertyTypeCategoryTableComponent } from './containers/property-type-category-table/property-type-category-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyTypeCategoryFormComponent } from './containers/property-type-category-form/property-type-category-form.component';


@NgModule({
  declarations: [PropertyTypeCategoryTableComponent, PropertyTypeCategoryFormComponent],
  imports: [
    CommonModule,
    PropertyTypeCategoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PropertyTypeCategoryModule { }
