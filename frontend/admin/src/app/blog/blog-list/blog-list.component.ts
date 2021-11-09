import { Component, OnInit } from '@angular/core';

import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

// Add loading
  blogs: any[];

  constructor(
    private service: BlogService,
  ) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(blogs => {
        this.blogs = blogs as any[];
        console.log(this.blogs);
      });
  }

  deleteBlog(blog){
    let index = this.blogs.indexOf(blog);

      
    this.service.delete(blog._id)
    .subscribe(
      () => { 
        this.blogs.splice(index, 1);
      },
      (error: AppError) => {
        // console.log(error,"hello");
          // this.categories.splice(index, 0,category);

          if (error instanceof NotFoundError)
            alert('This post has already been deleted');
          else throw error;
        });
  
  }

}
