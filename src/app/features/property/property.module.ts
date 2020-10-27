import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyTableComponent } from './containers/property-table/property-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PropertyTableComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PropertyModule { }
