import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartlist: any = [];
  amount: number = 0;
  totalAmount: number = 0;
  private destroy = new Subject<void>();

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.cartlist = data.filter((p: any) => p.quantity);
      });
    this.totalAmount = this.cartlist.reduce((sum: number, product: any) => (
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
