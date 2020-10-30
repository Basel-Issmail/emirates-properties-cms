import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryTableComponent } from './containers/country-table/country-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryFormComponent } from './containers/country-form/country-form.component';


@NgModule({
  declarations: [CountryTableComponent, CountryFormComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
