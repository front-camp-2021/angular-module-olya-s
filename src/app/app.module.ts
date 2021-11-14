import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltersListComponent } from './components/filters-list/filters-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterItemComponent } from './components/filter-item/filter-item.component';
import { DoubleSliderComponent } from './components/double-slider/double-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ClearButtonComponent } from './components/clear-button/clear-button.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsListComponent,
    SearchComponent,
    HeaderComponent,
    FiltersListComponent,
    PaginationComponent,
    BreadcrumbsComponent,
    FilterComponent,
    FilterItemComponent,
    DoubleSliderComponent,
    WishlistPageComponent,
    CartPageComponent,
    NotFoundComponent,
    MainPageComponent,
    ProductPageComponent,
    ClearButtonComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
