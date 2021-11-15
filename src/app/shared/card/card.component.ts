import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';

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

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
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

  goTo(): void {
    this.router.navigate(['/product', this.id]);
  }

}