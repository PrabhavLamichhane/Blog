import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from './../shared/shared.module';




@NgModule({
  declarations: [
    AddBlogComponent,
    BlogListComponent,
    BlogDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BlogRoutingModule,
    SharedModule
  ],
  exports:[
    AddBlogComponent
  ]
})
export class BlogModule { }
