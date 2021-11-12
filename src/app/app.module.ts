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
    DoubleSliderComponent
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
