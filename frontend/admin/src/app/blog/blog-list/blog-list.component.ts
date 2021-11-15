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

  blogs: any[];
  loading: boolean = false;
  deleting: boolean = false;
  count: number;

  query = {
    pageSize: 2,
    pageNumber: 1
  }

  constructor(
    private service: BlogService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getBlogs(1)
  }

  getBlogs(pageNumber) {
    this.query.pageNumber = pageNumber;
    
    this.service.getAll(this.query)
      .subscribe((blogs: any) => {
        this.blogs = blogs.blogs as any[];
        this.count = blogs.count;
        this.loading = false;
      });
  }

  deleteBlog(blog) {
    let index = this.blogs.indexOf(blog);
    this.deleting = true;

    this.service.delete(blog._id)
      .subscribe(
        () => {
          this.blogs.splice(index, 1);
          this.deleting = false;
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
