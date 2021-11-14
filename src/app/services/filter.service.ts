import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  search = new BehaviorSubject<string>('');
  price = new BehaviorSubject<Array<number>>([]);
  categories = new BehaviorSubject<Array<string>>([]);
  brands = new BehaviorSubject<Array<string>>([]);
  countProducts = new BehaviorSubject<number>(0);

  filterSearch: string = '';
  filteredPrice: number[] = [];
  checkedCategories: string[] = [];
  checkedBrands: string[] = [];

  constructor() { }

  setFilter(title: string, value: any) {
    if (title === 'Search') {
      this.search.next(value);
    }
    if (title === 'Price') {
      this.filteredPrice = value;
      this.price.next(this.filteredPrice);
    }
    if (title === 'Category') {
      this.checkedCategories.includes(value)
        ? this.checkedCategories = this.checkedCategories.filter(val => val !== value)
        : this.checkedCategories.push(value);
      this.categories.next(this.checkedCategories);
    }
    if (title === 'Brand') {
      this.checkedBrands.includes(value)
        ? this.checkedBrands = this.checkedBrands.filter(val => val !== value)
        : this.checkedBrands.push(value);
      this.brands.next(this.checkedBrands);
    }
  }

  setProductsCount(count: number): void {
    this.countProducts.next(count);
  }

  getSearch(): BehaviorSubject<string> {
    return this.search;
  }

  getFilteredPrice(): BehaviorSubject<Array<number>> {
    return this.price;
  }

  getCheckedCategories(): BehaviorSubject<Array<string>> {
    return this.categories;
  }

  getCheckedBrands(): BehaviorSubject<Array<string>> {
    return this.brands;
  }

  getCount(): BehaviorSubject<number> {
    return this.countProducts;
  }

  resetFilters(): void {
    this.filteredPrice = [];
    this.checkedCategories = [];
    this.checkedBrands = [];
    this.filterSearch = '';
    this.price.next(this.filteredPrice);
    this.categories.next(this.checkedCategories);
    this.brands.next(this.checkedBrands);
    this.search.next(this.filterSearch);
  }
}
