import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyTypeRoutingModule } from './property-type-routing.module';
import { PropertyTypeTableComponent } from './containers/property-type-table/property-type-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyTypeFormComponent } from './containers/property-type-form/property-type-form.component';


@NgModule({
  declarations: [PropertyTypeTableComponent, PropertyTypeFormComponent],
  imports: [
    CommonModule,
    PropertyTypeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PropertyTypeModule { }
