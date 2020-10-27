import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsTableComponent } from './containers/settings-table/settings-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingsTableComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SettingsModule { }
