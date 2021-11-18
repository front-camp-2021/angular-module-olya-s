import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterService } from 'src/app/core/services/filter/filter.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { DoubleSliderComponent } from '../double-slider/double-slider.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit, OnDestroy {
  price: any;
  categories: string[];
  brands: string[];
  isPrice: boolean;
  private destroy = new Subject<void>();

  @ViewChild(DoubleSliderComponent) private slider!: DoubleSliderComponent;
  @ViewChildren(FilterComponent) private filters!: QueryList<FilterComponent>;
  constructor(
    private data: DataService,
    private filtering: FilterService
  ) {
    this.price = {};
    this.categories = [];
    this.brands = [];
    this.isPrice = false;
  }

  ngOnInit(): void {
    this.data.getPrice()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.price = data;
        this.isPrice = true;
      });

    this.data.getCategories()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.categories = data);

    this.data.getBrands()
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.brands = data);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  clearAllFilters = (): void => {
    this.filtering.resetFilters();
    this.slider.reset();
    this.filters.forEach(filter => filter.reset());
  }

}