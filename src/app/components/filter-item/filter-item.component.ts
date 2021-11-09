import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() filter: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  modelChange(): void {
    console.log(this.filter);
  }

}