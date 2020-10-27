import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { GridTabsComponent } from './components/grid-tabs/grid-tabs.component';
import { GridLoadingComponent } from './components/grid-loading/grid-loading.component';
import { GridColumnsDisplayMenuComponent } from './components/grid-columns-display-menu/grid-columns-display-menu.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [GridTabsComponent, GridLoadingComponent, GridColumnsDisplayMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    GridTabsComponent,
    GridLoadingComponent,
    GridColumnsDisplayMenuComponent
  ]
})
export class SharedModule { }
