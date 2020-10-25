import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  { path: '', canActivate: [SessionGuard], loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
