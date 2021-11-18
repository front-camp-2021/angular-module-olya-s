import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Card } from 'src/app/core/interfaces/card';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  quantity: number = 0;

  @Input() product: any;
  @Input() countTotalPrice: any;
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.quantity = this.product.quantity;
  }

  minusOne(): void {
    this.quantity--;
    this.storage.setCartlist(this.product, -1);
    this.countTotalPrice(-this.product.price);
  }

  plusOne(): void {
    this.quantity++;
    this.storage.setCartlist(this.product, 1);
    this.countTotalPrice(this.product.price);
  }

}
