import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmenityTableComponent } from './containers/amenity-table/amenity-table.component';
import { AmenityFormComponent } from './containers/amenity-form/amenity-form.component';
import { AmenityApis } from './amenity.constants';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';

const routes: Routes = [
  { path: '', component: AmenityTableComponent },
  { path: 'add', component: AmenityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AmenityApis.builder } },
  { path: 'edit/:id', component: AmenityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AmenityApis.builder } },
  { path: 'edit-draft/:id', component: AmenityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: AmenityApis.builder } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmenityRoutingModule { }
