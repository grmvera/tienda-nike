import { Routes } from '@angular/router';
import { HomeComponent }    from './pages/home/home.component';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'productos',
    loadComponent: () => import('./pages/product/product.component')
      .then(m => m.ProductComponent)
  },
  { path: '**', redirectTo: '' }
];
