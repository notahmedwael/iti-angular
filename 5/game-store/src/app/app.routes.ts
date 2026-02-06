import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'products',
        loadComponent: () => import('../app/pages/products/products').then(m => m.ProductsComponent)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('../app/pages/product-details/product-details').then(m => m.ProductDetailsComponent)
    },
    
    // I will implement them next lab isa
    { path: 'cart', loadComponent: () => import('../app/pages/products/products').then(m => m.ProductsComponent) },
    { path: 'login', loadComponent: () => import('../app/pages/products/products').then(m => m.ProductsComponent) },
    
    { path: '**', redirectTo: 'products' }
];