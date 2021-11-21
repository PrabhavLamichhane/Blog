import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from './../../services/blog.service';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog:any;
  loading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: BlogService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    // let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.route.paramMap
      .subscribe(params => {
        let id = params.get('id');
        console.log(id);
        this.getDetails(id);
      });

  }

  getDetails(id): void {
    this.loading = true;
    this.service.getOne(id)
      .subscribe(blog=>{
        this.blog = blog;
        this.loading = false;
      });
  }

  transformHtml(htmlTextWithStyle): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

}
