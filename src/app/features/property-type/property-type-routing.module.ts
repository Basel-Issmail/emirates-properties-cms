import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyTypeTableComponent } from './containers/property-type-table/property-type-table.component';
import { PropertyTypeFormComponent } from './containers/property-type-form/property-type-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { PropertyTypeApis } from './property-type.constants';

const routes: Routes = [
  { path: '', component: PropertyTypeTableComponent },
  { path: 'add', component: PropertyTypeFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyTypeApis.builder } },
  { path: 'edit/:id', component: PropertyTypeFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyTypeApis.builder } },
  { path: 'edit-draft/:id', component: PropertyTypeFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PropertyTypeApis.builder } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyTypeRoutingModule { }
