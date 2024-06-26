import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
];
