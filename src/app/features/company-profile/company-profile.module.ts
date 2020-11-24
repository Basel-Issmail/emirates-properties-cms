import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyPageComponent } from './containers/company-page/company-page.component';
import { CompanyFormComponent } from './containers/company-form/company-form.component';


@NgModule({
  declarations: [CompanyPageComponent, CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanyProfileModule { }
