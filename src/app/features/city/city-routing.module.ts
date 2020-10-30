import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityTableComponent } from './containers/city-table/city-table.component';
import { CityFormComponent } from './containers/city-form/city-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { CityApis } from './city.constants';

const routes: Routes = [
  { path: '', component: CityTableComponent },
  { path: 'add', component: CityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: CityApis.builder } },
  { path: 'edit/:id', component: CityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: CityApis.builder } },
  { path: 'edit-draft/:id', component: CityFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: CityApis.builder } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
