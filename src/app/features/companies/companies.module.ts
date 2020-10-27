import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesTableComponent } from './containers/companies-table/companies-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CompaniesTableComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CompaniesModule { }
