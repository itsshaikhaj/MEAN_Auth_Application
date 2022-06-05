import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public base_url = 'http://ec2-65-0-91-254.ap-south-1.compute.amazonaws.com:3000/';
  authToken: any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // fetch all products
  getAllProducts() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('id_token');
    headers = headers.set('Authorization', token);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.base_url + 'products/', { headers: headers })
      .pipe(map((response: any) => response));
  }

  filterProducts(data: any) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('id_token');
    headers = headers.set('Authorization', token);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.base_url + 'products/filter',data, { headers: headers })
      .pipe(map((response: any) => response));
  }

}
