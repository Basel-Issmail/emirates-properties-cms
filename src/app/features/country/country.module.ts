import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryTableComponent } from './containers/country-table/country-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CountryTableComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CountryModule { }
