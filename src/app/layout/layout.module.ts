import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidenavComponent, DashboardComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
