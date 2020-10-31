import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberTableComponent } from './containers/member-table/member-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberFormComponent } from './containers/member-form/member-form.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [MemberTableComponent, MemberFormComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5PmefmUHSxICSAawq3mDYlI09Lb2sq9Q'
    }),
  ]
})
export class MemberModule { }
