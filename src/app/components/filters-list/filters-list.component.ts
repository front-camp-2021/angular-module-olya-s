import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterService } from 'src/app/services/filter.service';
import { StorageService } from 'src/app/services/storage.service';
import { DoubleSliderComponent } from '../double-slider/double-slider.component';
import { FilterComponent } from '../filter/filter.component';

// const categoryFilterConfig = [
//   {
//     value: 'category=cell_phones',
//     title: 'Cell Phones',
//     checked: false
//   },
//   {
//     value: 'category=computer_tablets',
//     title: 'Computers & Tablets',
//     checked: false
//   },
//   {
//     value: 'category=cell_phones_accessories',
//     title: 'Cell Phone Accessories',
//     checked: false
//   },
//   {
//     value: 'category=appliances',
//     title: 'Appliances',
//     checked: false
//   },
//   {
//     value: 'category=audio',
//     title: 'Audio',
//     checked: false
//   }
// ];

// const brandFilterConfig = [
//   {
//     value: 'brand=insigni',
//     title: 'Insigni',
//     checked: false
//   },
//   {
//     value: 'brand=samsung',
//     title: 'Samsung',
//     checked: false
//   },
//   {
//     value: 'brand=apple',
//     title: 'Apple',
//     checked: false
//   }
// ];

// const price = {
//   min: 100,
//   max: 200,
//   title: 'Price',
//   selected: {
//     from: 100,
//     to: 200
//   }
// };

// const filtersInitialState = {
//   filters: {
//     categories: categoryFilterConfig,
//     brands: brandFilterConfig,
//     price: price
//   },
//   search: '',
//   error: ''
// };

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit, OnDestroy {
  price: any;
  categories: any;
  brands: any;
  private destroy = new Subject<void>();

  @ViewChild(DoubleSliderComponent) private slider!: DoubleSliderComponent;
  @ViewChildren(FilterComponent) private filters!: QueryList<FilterComponent>;
  constructor(
    private storage: StorageService,
    private filtering: FilterService
  ) { }

  ngOnInit(): void {
    this.storage.getPrice()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.price = data);

    this.storage.getCategories()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.categories = data);

    this.storage.getBrands()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.brands = data);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  clearAllFilters(): void {
    this.filtering.resetFilters();
    this.slider.reset();
    this.filters.forEach(filter => filter.reset());
  }

}