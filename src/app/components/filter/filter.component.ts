import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  title: string = '';

  @Input() filters: any[];
  constructor() {
    this.filters = [];
  }

  ngOnInit(): void {
    this.title = this.filters[0].value.split('=')[0][0]
      .toUpperCase() + this.filters[0].value.split('=')[0].slice(1);
  }

}
