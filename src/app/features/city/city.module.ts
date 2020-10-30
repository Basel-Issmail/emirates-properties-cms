import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityTableComponent } from './containers/city-table/city-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityFormComponent } from './containers/city-form/city-form.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [CityTableComponent, CityFormComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5PmefmUHSxICSAawq3mDYlI09Lb2sq9Q'
    }),
  ]
})
export class CityModule { }
