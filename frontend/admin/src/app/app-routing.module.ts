import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { NoAccessComponent } from './shared/components/no-access/no-access.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./blog/blog.module')
      .then(m => m.BlogModule),
    
  },
  {
    path: 'categories',
    loadChildren: () => import('./contents/contents.module')
      .then(m => m.ContentsModule),
    canActivate: [AuthGuardService] 
    // canActivate: [AuthGuardService,AdminAuthGuardService] 
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path:'no-access',
    component:NoAccessComponent
  }
  // {
  // path:'**',
  // component:PageNotFound
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
