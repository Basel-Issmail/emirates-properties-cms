import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyTableComponent } from './containers/property-table/property-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyFormComponent } from './containers/property-form/property-form.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [PropertyTableComponent, PropertyFormComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5PmefmUHSxICSAawq3mDYlI09Lb2sq9Q'
    }),
  ]
})
export class PropertyModule { }
