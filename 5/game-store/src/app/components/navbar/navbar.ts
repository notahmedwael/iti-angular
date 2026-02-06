import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-brand-dark text-white p-4 flex justify-between items-center shadow-lg">
      <h1 class="text-brand-orange text-2xl font-black italic">G-STORE</h1>
      <div class="flex gap-6 font-bold">
        <a routerLink="/products" routerLinkActive="text-brand-orange border-b-2 border-brand-orange">Store</a>
        <a routerLink="/cart" routerLinkActive="text-brand-orange border-b-2 border-brand-orange">Cart</a>
        <a routerLink="/login" class="hover:text-brand-orange transition-colors">Login</a>
      </div>
    </nav>
  `
})
export class NavbarComponent {}