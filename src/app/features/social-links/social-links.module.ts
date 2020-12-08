import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialLinksRoutingModule } from './social-links-routing.module';
import { SocialLinksFormComponent } from './social-links-form/social-links-form.component';
import { SocialLinksTableComponent } from './social-links-table/social-links-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SocialLinksFormComponent, SocialLinksTableComponent],
  imports: [
    CommonModule,
    SocialLinksRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SocialLinksModule { }
