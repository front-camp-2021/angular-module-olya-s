import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FilterItemComponent } from '../filter-item/filter-item.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filters: any = [];
  @Input() title: string = '';

  @ViewChildren(FilterItemComponent)
  checkboxes!: QueryList<FilterItemComponent>;
  constructor() { }

  ngOnInit(): void { }

  reset() {
    this.checkboxes.forEach(checkbox => checkbox.reset())
  }
}
