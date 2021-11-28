import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, fromEvent, Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { AppError } from 'src/app/shared/errors/app-error';
import { BadInput } from 'src/app/shared/errors/bad-input';
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
    pageSize: 10,
    pageNumber: 1
  }

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(
    private service: BlogService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getBlogs(1);


    this.route.queryParamMap.
      pipe(map(params => params.get('page')))
      .subscribe(page => {
        this.getBlogs(parseInt(page));
      });

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

  publishBlog(blog) {
    this.service.publish(blog)
      .subscribe(
        () => {          
          alert('Published')
        },
        (error: AppError) => {
          if (error instanceof BadInput){
            alert(error.message);
          }
          else throw error;
        });

  }

  pageChange(pageNumber: number) {
    if (pageNumber > 1)
      this.router.navigate([''], { queryParams: { page: pageNumber } });
    else
      this.router.navigate([''])
  }

}
