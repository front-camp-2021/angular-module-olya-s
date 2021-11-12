import { Component, Input, OnInit } from '@angular/core';

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

  @Input() product: {
    id: string,
    images: string[],
    title: string,
    rating: number,
    price: number,
    inWishlist: boolean,
    quantity: number
  }

  constructor() {
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
    this.product = {
      ...this.product,
      quantity: 0
    };
  }

  goToProductPage(): void {
    console.log("click");
  }

  addToWishlist(): void {
    this.product.inWishlist = !this.product.inWishlist;
  }

  addToCart(): void {
    this.product.quantity++;
  }

}