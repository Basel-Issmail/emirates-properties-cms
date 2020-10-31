import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTableComponent } from './containers/property-table/property-table.component';
import { PropertyFormComponent } from './containers/property-form/property-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { PropertyApis } from './property.constants';

const routes: Routes = [
  { path: '', component: PropertyTableComponent },
  { path: 'add', component: PropertyFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyApis.builder } },
  { path: 'edit/:id', component: PropertyFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyApis.builder } },
  { path: 'edit-draft/:id', component: PropertyFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyApis.builder } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
