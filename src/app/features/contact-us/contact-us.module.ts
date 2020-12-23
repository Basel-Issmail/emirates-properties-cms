import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsFormComponent } from './containers/contact-us-form/contact-us-form.component';
import { ContactUsPageComponent } from './containers/contact-us-page/contact-us-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [ContactUsFormComponent, ContactUsPageComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuK90MO4imqznsQZziJnQMcgnFDorupkU'
    }),
  ]
})
export class ContactUsModule { }
