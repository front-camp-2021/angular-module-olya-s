import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

// const product = {
//   "id": "76w0hz7015kkr9kjkav",
//   "images": [
//     "https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg",
//     "https://content.rozetka.com.ua/goods/images/big_tile/163399633.jpg"
//   ],
//   "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
//   "rating": 2.89,
//   "price": 15999,
//   "category": "laptops",
//   "brand": "acer",
//   "inWishlist": false,
//   "quantity": 0
// }

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  id: string = '';

  @Input() product: {
    id: string,
    images: string[],
    title: string,
    rating: number,
    price: number,
    inWishlist: boolean,
    quantity: number
  }

  constructor(private storage: StorageService) {
    this.product = {
      id: '',
      images: [],
      title: '',
      rating: 0,
      price: 0,
      inWishlist: false,
      quantity: 0
    };
  }

  ngOnInit(): void {
    this.product = this.product;
    this.id = this.product.id;
  }

  addToWishlist(): void {
    // this.product.inWishlist = !this.product.inWishlist;
    this.storage.setWishlist(this.product);
  }

  addToCart(): void {
    // this.product.quantity++;
    this.storage.setCartlist(this.product, 1);
  }

}