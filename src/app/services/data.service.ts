import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private HttpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.HttpClient.get('http://localhost:3001/products');
  }

  getPrice(): Observable<any> {
    return this.HttpClient.get('http://localhost:3001/price');
  }

  getCategories(): Observable<any> {
    return this.HttpClient.get('http://localhost:3001/categories');
  }

  getBrands(): Observable<any> {
    return this.HttpClient.get('http://localhost:3001/brands');
  }

  getProduct(id: string): Observable<any> {
    return this.HttpClient.get('http://localhost:3001/products/' + id);
  }

}
