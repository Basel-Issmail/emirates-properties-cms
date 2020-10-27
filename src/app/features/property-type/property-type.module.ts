import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyTypeRoutingModule } from './property-type-routing.module';
import { PropertyTypeTableComponent } from './containers/property-type-table/property-type-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PropertyTypeTableComponent],
  imports: [
    CommonModule,
    PropertyTypeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PropertyTypeModule { }
