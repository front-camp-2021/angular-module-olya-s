import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  id: string = '';
  product: any;

  private destroy = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) { }

  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        this.id = params.id;
        this.getProduct();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getProduct(): void {
    this.data.getProduct(this.id)
      .pipe(takeUntil(this.destroy))
      .subscribe(data => this.product = data);
  }

}
