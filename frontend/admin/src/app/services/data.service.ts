import { AppError } from './../shared/errors/app-error';
import { NotFoundError } from './../shared/errors/not-found-error';
import { BadInput } from './../shared/errors/bad-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  getOne(id:any){
    return this.http.get(this.url + '/' + id)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  create(resource: any) {
    return this.http.post(this.url, JSON.stringify(resource),httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError));
  }

  update(resource:any,id:any) {
    console.log(resource);
    return this.http.put(this.url + '/' + id, JSON.stringify(resource),httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError));
  }

  delete(id:any) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        map(response => response),
        // toPromise()
        //retry 2 times if failed
        retry(2),
        catchError(this.handleError));

  }

  handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error));

    if (error.status === 404)
      return Observable.throw(new NotFoundError(error));

    return Observable.throw(new AppError(error));
  }

}
