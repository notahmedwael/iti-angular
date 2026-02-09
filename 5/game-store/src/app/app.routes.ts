import { CartComponent } from './pages/cart/cart';
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then(m => m.ProductsComponent)
    },
    
    // Protected Route
    {
        path: 'product/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetailsComponent)
    },
    
    // Auth Routes
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
    },

    {
        path: 'not-found',
        loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
    },

    // Cart page
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    
    // Wildcard
    { path: '**', redirectTo: 'not-found' }
];