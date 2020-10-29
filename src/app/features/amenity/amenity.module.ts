import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenityRoutingModule } from './amenity-routing.module';
import { AmenityTableComponent } from './containers/amenity-table/amenity-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmenityFormComponent } from './containers/amenity-form/amenity-form.component';


@NgModule({
  declarations: [AmenityTableComponent, AmenityFormComponent],
  imports: [
    CommonModule,
    AmenityRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AmenityModule { }
