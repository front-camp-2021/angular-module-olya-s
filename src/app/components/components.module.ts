import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './master/app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { WishlistPageComponent } from './wishlist-page/wishlist-page.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

const COMPONENTS = [
  AppComponent,
  MainPageComponent,
  NotFoundComponent,
  ProductPageComponent,
  CartPageComponent,
  WishlistPageComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,

    SharedModule,
    AppRoutingModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class ComponentsModule { }
