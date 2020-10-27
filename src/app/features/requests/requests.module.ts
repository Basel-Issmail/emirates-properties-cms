import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsTableComponent } from './containers/requests-table/requests-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RequestDetailsComponent } from './containers/request-details/request-details.component';


@NgModule({
  declarations: [RequestsTableComponent, RequestDetailsComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class RequestsModule { }
