import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterService } from 'src/app/services/filter.service';

const debounce = (callback: any) => {
  let timeout: any;
  return function (argument: any) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 1500, argument);
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  value: string = '';
  results: number = 0;
  private destroy = new Subject<void>();

  constructor(
    private filtering: FilterService
  ) { }

  ngOnInit(): void {
    this.filtering.getCount()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.results = data);

    this.filtering.getSearch()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.value = data);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  modelChange(): void {
    this.setSearch(null);
  }

  setSearch = debounce((): void => {
    this.filtering.setFilter('Search', this.value);
  })

  goToWishlist(): void {
    console.log("Go To Wishlist");
  }

}
