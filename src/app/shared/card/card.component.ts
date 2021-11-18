import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Card } from 'src/app/core/interfaces/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  id: string = '';

  @Input() product: Card = {
    id: '',
    images: [],
    title: '',
    rating: 0,
    price: 0,
    category: '',
    brand: '',
    inWishlist: false,
    quantity: 0
  }

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.product.id;
  }

  addToWishlist(): void {
    this.storage.setWishlist(this.product);
  }

  addToCart(): void {
    this.storage.setCartlist(this.product, 1);
  }

  goTo(): void {
    this.router.navigate(['/product', this.id]);
  }

}