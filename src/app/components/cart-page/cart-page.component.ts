import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Card } from 'src/app/core/interfaces/card';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartlist: Card[];
  amount: number;
  totalAmount: number;
  private destroy = new Subject<void>();

  constructor(private storage: StorageService) {
    this.cartlist = [];
    this.amount = 0;
    this.totalAmount = 0;
  }

  ngOnInit(): void {
    this.storage.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.cartlist = data.filter((product: Card) => product.quantity);
      });
    this.totalAmount = this.cartlist.reduce((sum: number, product: Card) => (
      sum + product.quantity * product.price),
      0);
  }

  countTotalPrice = (price: number) => {
    this.totalAmount += price;
  }

  clearCart = (): void => {
    this.storage.clearCartlist();
  }

}
