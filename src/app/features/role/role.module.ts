import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleTableComponent } from './containers/role-table/role-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleFormComponent } from './containers/role-form/role-form.component';


@NgModule({
  declarations: [RoleTableComponent, RoleFormComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
