import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesTableComponent } from './containers/companies-table/companies-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesFormComponent } from './containers/companies-form/companies-form.component';
import { CompanyPasswordFormComponent } from './containers/company-password-form/company-password-form.component';


@NgModule({
  declarations: [CompaniesTableComponent, CompaniesFormComponent, CompanyPasswordFormComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
