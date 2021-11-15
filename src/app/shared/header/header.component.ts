import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data/data.service';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  purchaseCount: number = 0;

  private destroy = new Subject<void>();
  constructor(
    private data: DataService,
    private storage: StorageService,
    private filtering: FilterService
  ) { }

  ngOnInit(): void {
    this.data.getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe(data =>
        this.storage.setProducts(data.map((p: any) =>
        ({
          ...p,
          inWishlist: false,
          quantity: 0
        })))
      );

    // this.data.getPrice()
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(data => this.storage.setFilter('Price', data));

    // this.data.getCategories()
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(data => this.storage.setFilter('Categories', data));

    // this.data.getBrands()
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe(data => this.storage.setFilter('Brands', data));

    this.storage.getPurchaseCount()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.purchaseCount = data);
  }

  onClick(): void {
    this.filtering.resetFilters();
  }
}
