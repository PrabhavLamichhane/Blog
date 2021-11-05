import { Component, OnInit } from '@angular/core';

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

}
