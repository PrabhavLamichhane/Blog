import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends DataService{

  constructor(http:HttpClient) { 
    super('http://localhost:3900/api/blogs',http);
  }
}
