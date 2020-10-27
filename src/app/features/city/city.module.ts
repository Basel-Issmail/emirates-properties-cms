import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityTableComponent } from './containers/city-table/city-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CityTableComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CityModule { }
