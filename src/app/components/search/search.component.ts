import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  value: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  modelChange(): void {
    console.log(this.value)
  }

  goToWishlist(): void {
    console.log("Go To Wishlist");
  }

}
