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
  { path: '**', redirectTo: '' }
];
