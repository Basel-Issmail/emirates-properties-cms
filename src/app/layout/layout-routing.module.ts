import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', loadChildren: () => import('../features/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'completion-status', loadChildren: () => import('../features/completion-status/completion-status.module').then(m => m.CompletionStatusModule) },
      { path: 'pages', loadChildren: () => import('../features/pages/pages.module').then(m => m.PagesModule) },
      { path: 'companies', loadChildren: () => import('../features/companies/companies.module').then(m => m.CompaniesModule) },
      { path: 'agents', loadChildren: () => import('../features/agents/agents.module').then(m => m.AgentsModule) },
      { path: 'requests', loadChildren: () => import('../features/requests/requests.module').then(m => m.RequestsModule) },
      { path: 'property', loadChildren: () => import('../features/property/property.module').then(m => m.PropertyModule) },
      { path: 'amenity', loadChildren: () => import('../features/amenity/amenity.module').then(m => m.AmenityModule) },
      { path: 'amenity-category', loadChildren: () => import('../features/amenity-category/amenity-category.module').then(m => m.AmenityCategoryModule) },
      { path: 'property-type', loadChildren: () => import('../features/property-type/property-type.module').then(m => m.PropertyTypeModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
