import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"; 
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  public base_url = 'http://ec2-65-0-91-254.ap-south-1.compute.amazonaws.com:3000/';
  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post( this.base_url +'users/register', user, {headers: headers})
    .pipe(map((response: any) => response));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.base_url +'users/authenticate', user, {headers: headers})
    .pipe(map((response: any) => response));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.set('Authorization', this.authToken);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.base_url +'users/profile', {headers: headers})
    .pipe(map((response: any) => response));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
