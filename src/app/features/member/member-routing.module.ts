import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberTableComponent } from './containers/member-table/member-table.component';
import { MemberFormComponent } from './containers/member-form/member-form.component';
import { BuilderResolverService } from 'src/app/shared/services/builder-resolver.service';
import { MemberApis } from './member.constants';

const routes: Routes = [
  { path: '', component: MemberTableComponent },
  { path: 'add', component: MemberFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: MemberApis.builder } },
  { path: 'edit/:id', component: MemberFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: MemberApis.builder } },
  { path: 'edit-draft/:id', component: MemberFormComponent, resolve: { buidler: BuilderResolverService }, data: { builderAPI: MemberApis.builder } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
