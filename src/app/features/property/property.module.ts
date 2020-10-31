import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyTableComponent } from './containers/property-table/property-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyFormComponent } from './containers/property-form/property-form.component';


@NgModule({
  declarations: [PropertyTableComponent, PropertyFormComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PropertyModule { }
