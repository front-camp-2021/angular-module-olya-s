import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from 'src/app/core/services/filter/filter.service';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {
  checked: boolean;

  @Input() filter: {};
  @Input() title: string;
  constructor(private filtering: FilterService) {
    this.filter = {};
    this.title = '';
    this.checked = false;
  }

  ngOnInit(): void {
  }

  modelChange(): void {
    this.filtering.setFilter(this.title, this.filter);
  }

  reset(): void {
    this.checked = false;
  }

}