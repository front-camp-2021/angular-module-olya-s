import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'products',
    component: MainPageComponent
  },
  {
    path: 'wishlist',
    component: WishlistPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'product/:id',
    component: ProductPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
