import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount-pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DiscountPipe],
  template: `
    <div class="bg-white border-2 border-transparent hover:border-orange-500 rounded-2xl p-4 shadow-sm transition-all duration-300">
      <img [src]="product().image" class="w-full h-44 object-contain mb-4 rounded-lg bg-gray-50">
      <h3 class="font-bold text-slate-800 line-clamp-1">{{ product().name }}</h3>
      
      <div class="flex items-center gap-2 my-2">
        <span class="text-xl font-black text-slate-900">{{ product().price | discount:product().discountPercentage }} EGP</span>
        @if(product().discountPercentage){
          <span class="line-through text-gray-400 text-sm italic">{{product().price}}</span>
        }
      </div>

      <div class="flex justify-between items-center">
        <p [class]="product().stock > 0 ? 'text-green-600' : 'text-red-500'" class="text-[10px] font-black uppercase tracking-wider">
          {{ product().stock > 0 ? 'In Stock (' + product().stock + ')' : 'Out of Stock' }}
        </p>
        @if(product().discountPercentage) {
            <span class="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold">-{{product().discountPercentage}}%</span>
        }
      </div>

      <div class="grid grid-cols-2 gap-3 mt-5">
        <button 
          (click)="onBuyClick()"
          [disabled]="product().stock === 0"
          class="bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-95">
          Buy
        </button>
        <a [routerLink]="['/product', product().id]" class="border-2 border-slate-900 text-center font-bold py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">Details</a>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  product = input.required<Product>();
  
  // Emits the Product object
  onBuy = output<Product>();

  onBuyClick() {
    // Emit the current value of the product signal
    this.onBuy.emit(this.product());
  }
}