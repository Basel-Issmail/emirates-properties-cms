import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleTableComponent } from './containers/role-table/role-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RoleTableComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class RoleModule { }
