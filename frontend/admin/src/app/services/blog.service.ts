import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends DataService {
  constructor(http: HttpClient) {
    super('http://localhost:3900/api/blogs', http);
  }
  // change url setting later on
  publish(blog: any) {
    return this.http.patch(this.url + '/' + blog._id,'')
      .pipe(map(response => response),
        catchError(this.handleError));
  }
}
