import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  price = new BehaviorSubject<Array<any>>([]);
  categories = new BehaviorSubject<Array<string>>([]);
  brands = new BehaviorSubject<Array<string>>([]);
  products = new BehaviorSubject<Array<any>>([]);
  purchaseCount = new BehaviorSubject<number>(0);

  productsList: any = [{}];

  constructor() { }

  setFilter(title: string, value: any): void {
    if (title === 'Price') {
      this.price.next(value);
    }
    if (title === 'Categories') {
      this.categories.next(value);
    }
    if (title === 'Brands') {
      this.brands.next(value);
    }
  }

  setProducts(products: any): void {
    this.productsList = products.slice();
    this.products.next(this.productsList);
  }

  setWishlist(product: any): void {
    this.productsList = this.productsList.map((p: any) =>
      p.id === product.id
        ? { ...p, inWishlist: !p.inWishlist }
        : p
    );
    this.products.next(this.productsList);
  }

  setCartlist(product: any, quantity: number): void {
    this.productsList = this.productsList.map((p: any) =>
      p.id === product.id
        ? { ...p, quantity: p.quantity + quantity }
        : p
    );
    this.products.next(this.productsList);
    this.purchaseCount.next(this.productsList.
      reduce((sum: number, product: any) => (sum + product.quantity), 0));
  }

  getProducts(): BehaviorSubject<Array<any>> {
    return this.products;
  }

  clearWishlist(): void {
    this.productsList = this.productsList.map((p: any) => ({ ...p, inWishlist: false }));
    this.products.next(this.productsList);
  }

  clearCartlist(): void {
    this.productsList = this.productsList.map((p: any) => ({ ...p, quantity: 0 }));
    this.products.next(this.productsList);
    this.purchaseCount.next(this.productsList.
      reduce((sum: number, product: any) => (sum + product.quantity), 0));
  }

  getPurchaseCount(): BehaviorSubject<number> {
    return this.purchaseCount;
  }

}
