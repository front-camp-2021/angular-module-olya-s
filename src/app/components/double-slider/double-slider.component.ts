import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss']
})
export class DoubleSliderComponent implements OnInit {
  range: number = 0;
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: <number>0,
    ceil: <number>0
  };

  @Input() price: any = {};
  @Input() title: string = '';
  constructor(private filtering: FilterService) { }

  ngOnInit(): void {
    this.value = this.price.selected.from;
    this.highValue = this.price.selected.to;
    this.options = {
      floor: this.price.min,
      ceil: this.price.max
    }
  }

  modelChange(): void {
    this.filtering.setFilter(this.title, this.range);
  }

  reset(): void {
    this.range = this.price.min;
    this.value = this.price.min;
    this.highValue = this.price.max;
  }

}