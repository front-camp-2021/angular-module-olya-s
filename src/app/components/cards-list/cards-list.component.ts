import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { PageService } from 'src/app/services/page.service';

// const products = [
//   {
//     "id": "76w0hz7015kkr9kjkav",
//     "images": [
//       "https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg",
//       "https://content.rozetka.com.ua/goods/images/big_tile/163399633.jpg"
//     ],
//     "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
//     "rating": 2.89,
//     "price": 15999,
//     "category": "laptops",
//     "brand": "acer",
//     "inWishlist": false,
//     "quantity": 0
//   },
//   {
//     "id": "qeagrlm9lrkr9kjkav",
//     "images": [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/178060622.jpg",
//       "https://content2.rozetka.com.ua/goods/images/big_tile/178060625.jpg"
//     ],
//     "title": "Ноутбук Acer Aspire 7 A715-41G-R9KP (NH.Q8QEU.00L) Charcoal Black",
//     "rating": 1.96,
//     "price": 21500,
//     "category": "laptops",
//     "brand": "acer",
//     "inWishlist": false,
//     "quantity": 0
//   },
//   {
//     "id": "0y9ksratv6akr9kjkav",
//     "images": [
//       "https://content2.rozetka.com.ua/goods/images/big_tile/178060660.jpg",
//       "https://content1.rozetka.com.ua/goods/images/big_tile/178060662.jpg"
//     ],
//     "title": "Ноутбук Acer Aspire 7 A715-75G-51ZW (NH.Q88EU.00P) Charcoal Black",
//     "rating": 2.42,
//     "price": 22999,
//     "category": "laptops",
//     "brand": "acer",
//     "inWishlist": false,
//     "quantity": 0
//   },
//   {
//     "id": "cvr29caokhhkr9kjkav",
//     "images": [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/25101152.jpg",
//       "https://content1.rozetka.com.ua/goods/images/big_tile/25101161.jpg"
//     ],
//     "title": "Ноутбук Acer Nitro 5 AN515-55-56WH (NH.Q7PEU.00L) Obsidian Black Суперцена!!!",
//     "rating": 0.53,
//     "price": 28999,
//     "category": "laptops",
//     "brand": "acer",
//     "inWishlist": false,
//     "quantity": 0
//   },
//   {
//     "id": "k9hb29sfeekr9kjkav",
//     "images": [
//       "https://content1.rozetka.com.ua/goods/images/big_tile/24790127.jpg"
//     ],
//     "title": "Ноутбук Acer Aspire 7 A715-75G-57LR (NH.Q87EU.006) Charcoal Black",
//     "rating": 3.2,
//     "price": 22500,
//     "category": "laptops",
//     "brand": "acer",
//     "inWishlist": false,
//     "quantity": 0
//   }
// ]

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

  getProducts(products: any[]): any {
    let result = [];
    let categoryProducts: any = [];
    let brandProducts: any = [];
    let filteredProducts = [];
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
        filteredProducts = categoryProducts.filter((prodCategory: any) => {
          const products = brandProducts.filter((prodBrand: any) => {
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
      filteredProducts = filteredProducts.filter((prod: any) =>
        prod.title.toLowerCase().includes(this.search));
    }
    filteredProducts = filteredProducts.filter((prod: any) =>
      (prod.price >= this.price[0]) && (prod.price <= this.price[1]));
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
