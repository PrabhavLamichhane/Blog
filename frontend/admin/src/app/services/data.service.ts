import { AppError } from './../shared/errors/app-error';
import { NotFoundError } from './../shared/errors/not-found-error';
import { BadInput } from './../shared/errors/bad-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class DataService {

  constructor(
    private url: string, 
    private http: HttpClient,
    ) { }

  getAll(query) {
    return this.http.get(this.url+ this.getQueryString(query))
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

  // add this on seperate file later on
  handleError(error: any) {
    if (error.status === 400)
      return throwError(new BadInput(error.error));
    

    if (error.status === 404)
      return throwError(new NotFoundError(error.error));

    return throwError(new AppError(error.error));

  }

  /*
  getData(){
    let headers = new Headers();
    let token = localStorage.getItem('token');
    headers.append('Authorization','Bearer'+token);

    let options = new RequestOptions({ headers: headers})

    // no need to pass options if used AuthHttp
    return this.http.get('api/data',options,
      .map(response=>response.json()))

      Authhttp instead of http in angular-jwt
  }
  */


  public getQueryString(query) {
    let queryString = '?';
    for (let key in query) {
        queryString += key + '=' + query[key] + '&';
    }
    return queryString;
}

}
