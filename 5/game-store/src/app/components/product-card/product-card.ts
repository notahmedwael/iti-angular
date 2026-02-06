import { Component, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DiscountPipe],
  template: `
    <div class="bg-white border-2 border-transparent hover:border-brand-orange rounded-2xl p-4 shadow-sm transition-all duration-300">
      <img [src]="product().image" class="w-full h-44 object-contain mb-4 rounded-lg bg-gray-50">
      <h3 class="font-bold text-brand-dark line-clamp-1">{{ product().name }}</h3>
      
      <div class="flex items-center gap-2 my-2">
        <span class="text-xl font-black text-brand-dark">{{ product().price | discount:product().discountPercentage }} EGP</span>
        @if(product().discountPercentage){
          <span class="line-through text-gray-400 text-sm italic">{{product().price}}</span>
        }
      </div>

      <p [class]="product().stock > 0 ? 'text-green-500' : 'text-red-500'" class="text-xs font-bold uppercase tracking-wider">
        {{ product().stock > 0 ? 'In Stock' : 'Out of Stock' }}
      </p>

      <div class="grid grid-cols-2 gap-3 mt-5">
        <button [disabled]="product().stock === 0" class="bg-brand-dark text-white font-bold py-2 rounded-lg hover:bg-black disabled:bg-gray-200 disabled:text-gray-400">Buy</button>
        <a [routerLink]="['/product', product().id]" class="border-2 border-brand-dark text-center font-bold py-2 rounded-lg hover:bg-brand-dark hover:text-white transition-colors">Details</a>
      </div>
    </div>
  `
})
export class ProductCardComponent { product = input.required<Product>(); }