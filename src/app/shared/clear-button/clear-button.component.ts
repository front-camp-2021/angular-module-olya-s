import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss']
})
export class ClearButtonComponent implements OnInit {

  @Input() onClick: any;
  constructor() { }

  ngOnInit(): void {
  }

}
