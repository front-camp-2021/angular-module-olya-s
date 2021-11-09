import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss']
})
export class DoubleSliderComponent implements OnInit {
  range: number = 0;
  title: string = '';
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0
  };

  @Input() price: any = {};

  constructor() { }

  ngOnInit(): void {
    this.title = this.price.title;
    this.value = this.price.selected.from;
    this.highValue = this.price.selected.to;
    this.options = {
      floor: this.price.min,
      ceil: this.price.max
    }
  }

  modelChange(): void {
    // console.log(this.range)
  }

}