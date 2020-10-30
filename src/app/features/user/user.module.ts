import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './containers/user-table/user-table.component';
import { UserFormComponent } from './containers/user-form/user-form.component';


@NgModule({
  declarations: [UserTableComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
