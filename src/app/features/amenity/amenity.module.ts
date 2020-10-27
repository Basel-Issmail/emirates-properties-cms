import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenityRoutingModule } from './amenity-routing.module';
import { AmenityTableComponent } from './containers/amenity-table/amenity-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AmenityTableComponent],
  imports: [
    CommonModule,
    AmenityRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AmenityModule { }
