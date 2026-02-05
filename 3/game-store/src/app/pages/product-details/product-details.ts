import { Component, input, computed } from '@angular/core';
import productsData from '../../../assets/products.json';
import { Product } from '../../models/product.model';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  standalone: true,
  imports: [DiscountPipe],
  template: `
    <div class="container mx-auto p-12">
      @if (product()) {
        <div class="flex flex-col lg:flex-row gap-16 items-center">
          <div class="w-full lg:w-1/2 bg-white p-10 rounded-3xl shadow-2xl">
            <img [src]="product()?.image" class="w-full object-contain">
          </div>
          <div class="flex-1">
            <span class="bg-brand-orange text-white px-4 py-1 rounded-full font-bold text-sm">{{ product()?.category }}</span>
            <h1 class="text-6xl font-black text-brand-dark mt-4 mb-2 uppercase">{{ product()?.name }}</h1>
            <p class="text-3xl font-light text-gray-500 mb-8">{{ product()?.brand }}</p>
            
            <p class="text-4xl font-black text-brand-dark mb-6">
              {{ (product()?.price ?? 0) | discount:(product()?.discountPercentage ?? 0) }}EGP
            </p>
            
            <div class="bg-brand-dark text-white p-6 rounded-2xl mb-8">
              <h4 class="font-bold mb-2 uppercase border-b border-gray-600 pb-2">Description</h4>
              <p class="text-gray-300 leading-relaxed">{{ product()?.description }}</p>
            </div>
            
            <button class="w-full bg-brand-orange text-white text-2xl font-black py-6 rounded-2xl hover:scale-105 transition-transform">ADD TO CART</button>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductDetailsComponent {
  id = input.required<string>();
  product = computed(() => (productsData as Product[]).find(p => p.id === Number(this.id())));
}