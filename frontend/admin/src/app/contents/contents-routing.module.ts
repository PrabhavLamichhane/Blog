import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { AddBlogComponent } from '../blog/add-blog/add-blog.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: BlogComponent,
  // },
  {
    path: '',
    component: CategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
