import { Component, OnInit } from '@angular/core';

const categoryFilterConfig = [
  {
    value: 'category=cell_phones',
    title: 'Cell Phones',
    checked: false
  },
  {
    value: 'category=computer_tablets',
    title: 'Computers & Tablets',
    checked: false
  },
  {
    value: 'category=cell_phones_accessories',
    title: 'Cell Phone Accessories',
    checked: false
  },
  {
    value: 'category=appliances',
    title: 'Appliances',
    checked: false
  },
  {
    value: 'category=audio',
    title: 'Audio',
    checked: false
  }
];

const brandFilterConfig = [
  {
    value: 'brand=insigni',
    title: 'Insigni',
    checked: false
  },
  {
    value: 'brand=samsung',
    title: 'Samsung',
    checked: false
  },
  {
    value: 'brand=apple',
    title: 'Apple',
    checked: false
  }
];

const price = {
  min: 100,
  max: 200,
  title: 'Price',
  selected: {
    from: 100,
    to: 200
  }
};

const filtersInitialState = {
  filters: {
    categories: categoryFilterConfig,
    brands: brandFilterConfig,
    price: price
  },
  search: '',
  error: ''
};

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit {

  filters = filtersInitialState.filters;
  search = filtersInitialState.search;

  constructor() { }

  ngOnInit(): void {
  }

  clearAllFilters(): void {
    console.log("CLEAR");
  }

}