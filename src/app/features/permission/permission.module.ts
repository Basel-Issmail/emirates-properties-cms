import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionTableComponent } from './containers/permission-table/permission-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PermissionTableComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PermissionModule { }
