import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card';
import productsData from '../../../assets/products.json';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="container mx-auto p-10">
      <div class="flex justify-between items-end mb-10 border-b-4 border-brand-dark pb-4">
        <h2 class="text-5xl font-black text-brand-dark">CATALOG</h2>
        <span class="text-brand-orange font-bold">{{ products().length }} ITEMS IN STORE</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (p of products(); track p.id) {
          <app-product-card [product]="p" />
        }
      </div>
    </div>
  `
})
export class ProductsComponent { products = signal<Product[]>(productsData); }