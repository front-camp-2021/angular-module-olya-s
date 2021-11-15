import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistPageComponent } from './components/wishlist-page/wishlist-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { NightGuard } from './core/guards/night-guard.service';
import { ProductResolver } from './core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    redirectTo: ''
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
    component: ProductPageComponent,
    canActivate: [NightGuard],
    resolve: {
      product: ProductResolver
    }
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
