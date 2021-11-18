import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit, OnDestroy {
  wishfulProducts: any = [];
  private destroy = new Subject<void>();

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.wishfulProducts = data.filter((p: any) => p.inWishlist);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  clearWishlist = (): void => {
    this.storage.clearWishlist();
  }

}
