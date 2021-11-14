import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AppError } from '../shared/errors/app-error';
import { BadInput } from '../shared/errors/bad-input';
import { NotFoundError } from '../shared/errors/not-found-error';



// put on seperate file later on
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response',
  // withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3900/api/';

  constructor(
    private http: HttpClient,

  ) {
  }

  login(credentials) {
    return this.http.post(this.url+'auth',
      JSON.stringify(credentials), httpOptions)
      .pipe(
        map((response: any) => {
          if (response && response.body.token) {
            localStorage.setItem('token', response.body.token);
            return true;
          }
          return false;
        }),
        catchError(this.handleError)
      );;
  }

  signUp(credentials) {
    return this.http.post(this.url+'users',
      JSON.stringify(credentials), httpOptions)
      .pipe(
        map((response: any) => {
          if (response && response.headers.get('x-auth-token')) {
            localStorage.setItem('token', response.headers.get('x-auth-token'));
            return true;
          }
          return false;
        }),
        catchError(this.handleError)
      );
  }

  getUsers(){
    return this.http.get(this.url+'users')
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return this.tokenNotExpired();
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);

  }

  tokenGetter() {
    return localStorage.getItem('token');
  }

  
  private tokenNotExpired() {
    let jwtHelper = new JwtHelperService();


    const item: string = this.tokenGetter();
    return item != null && !jwtHelper.isTokenExpired(item);
  }

  handleError(error: any) {
    if (error.status === 400)
      return throwError(new BadInput(error.error));
    

    if (error.status === 404)
      return throwError(new NotFoundError(error.error));

    return throwError(new AppError(error.error));

  }

}
