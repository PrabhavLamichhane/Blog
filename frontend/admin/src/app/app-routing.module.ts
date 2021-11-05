import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
