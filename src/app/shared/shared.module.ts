import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardComponent } from './card/card.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ClearButtonComponent } from './clear-button/clear-button.component';
import { HeaderComponent } from './header/header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DoubleSliderComponent } from './double-slider/double-slider.component';
import { FilterComponent } from './filter/filter.component';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { FiltersListComponent } from './filters-list/filters-list.component';
import { SearchComponent } from './search/search.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

const components = [
  BreadcrumbsComponent,
  CardComponent,
  CardsListComponent,
  CartItemComponent,
  ClearButtonComponent,
  DoubleSliderComponent,
  FilterComponent,
  FilterItemComponent,
  FiltersListComponent,
  HeaderComponent,
  PaginationComponent,
  SearchComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,

    NgxSliderModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
