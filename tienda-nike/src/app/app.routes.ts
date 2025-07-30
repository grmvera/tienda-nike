import { Routes } from '@angular/router';
import { HomeComponent }    from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'productos',
    loadComponent: () => import('./pages/product/product.component')
      .then(m => m.ProductComponent)
  },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'carrito',
    loadComponent: () => import('./pages/cart/cart.component')
      .then(m => m.CartComponent)
  },
  { path: 'compra', loadComponent: () => import('./pages/compra/compra.component')
      .then(m => m.CompraComponent)
  },
  { path: '**', redirectTo: '' }
];
