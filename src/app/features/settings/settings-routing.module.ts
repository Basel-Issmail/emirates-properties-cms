import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsTableComponent } from './containers/settings-table/settings-table.component';
import { SettingsFormComponent } from './containers/settings-form/settings-form.component';

const routes: Routes = [
  { path: '', component: SettingsTableComponent },
  { path: 'add', component: SettingsFormComponent },
  { path: 'edit/:id', component: SettingsFormComponent },
  { path: 'edit-draft/:id', component: SettingsFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
