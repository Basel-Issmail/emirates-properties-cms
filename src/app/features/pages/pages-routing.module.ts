import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesTableComponent } from './containers/pages-table/pages-table.component';
import { PagesFormComponent } from './containers/pages-form/pages-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { PagesApis } from './pages.constants';

const routes: Routes = [
  { path: '', component: PagesTableComponent },
  { path: 'add', component: PagesFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PagesApis.builder } },
  { path: 'edit/:id', component: PagesFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PagesApis.builder } },
  { path: 'edit-draft/:id', component: PagesFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: PagesApis.builder } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
