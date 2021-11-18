import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { PageService } from 'src/app/core/services/page/page.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Card } from 'src/app/core/interfaces/card';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit, OnDestroy, DoCheck {
  allProducts: any = [];
  products: any = [];
  price: any;
  categories: string[] = [];
  brands: string[] = [];
  search = '';
  currentPage = 1;
  pageSize = 9;
  private destroy = new Subject<void>();

  constructor(
    private storage: StorageService,
    private filtering: FilterService,
    private page: PageService
  ) { }

  ngOnInit(): void {
    this.storage.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.allProducts = data);

    this.filtering.getSearch()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.search = data);

    this.filtering.getCheckedCategories()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.categories = data);

    this.filtering.getCheckedBrands()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.brands = data);

    this.filtering.getFilteredPrice()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.price = data);

    this.page.getCurrentPage()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.currentPage = data);
  }

  ngDoCheck(): void {
    this.products = this.getProducts(this.allProducts);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getProducts(products: Card[]): any {
    let result = [];
    let categoryProducts: Card[] = [];
    let brandProducts: Card[] = [];
    let filteredProducts: Card[] = [];
    if (!this.categories.length && !this.brands.length) {
      filteredProducts = products.slice();
    } else {
      if (this.categories.length) {
        categoryProducts = products.filter(prod => (
          this.categories.find(title => title.toLowerCase() === prod.category.split('_').join(' '))
        ));
      }
      if (this.brands.length) {
        brandProducts = products.filter(prod => (
          this.brands.find(title => title.toLowerCase() === prod.brand.split('_').join(' '))
        ));
      }
      if (categoryProducts.length && brandProducts.length) {
        filteredProducts = categoryProducts.filter((prodCategory: Card) => {
          const products = brandProducts.filter((prodBrand: Card) => {
            return prodCategory.id === prodBrand.id
          })
          return products.length;
        });
      } else if (categoryProducts.length && !this.brands.length) {
        filteredProducts = categoryProducts.slice();
      } else if (brandProducts.length && !this.categories.length) {
        filteredProducts = brandProducts.slice();
      }
    }
    if (!!this.search) {
      filteredProducts = filteredProducts.filter((prod: Card) =>
        prod.title.toLowerCase().includes(this.search));
    }
    if (this.price.length) {
      filteredProducts = filteredProducts.filter((prod: Card) =>
        (prod.price >= this.price[0]) && (prod.price <= this.price[1]));
    }
    let productsToView = filteredProducts.slice();
    result = productsToView.splice(this.currentPage * this.pageSize - this.pageSize, this.pageSize);
    this.filtering.setProductsCount(filteredProducts.length);
    this.page.setTotalPages(Math.ceil(filteredProducts.length / this.pageSize));
    return result;
  }

  onInput = (event: any) => {
    this.filtering.setFilter('Search', event.target.value.trim());
  }

}