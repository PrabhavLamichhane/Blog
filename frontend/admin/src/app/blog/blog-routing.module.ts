import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
    canActivate: [AuthGuardService]  
  },
  {
    path: 'edit-blog/:id',
    component: AddBlogComponent,
    canActivate: [AuthGuardService]  
  },
  {
    path:'blogs/:id/:title',
    component:BlogDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
