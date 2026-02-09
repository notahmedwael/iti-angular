import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto p-10">
      <h2 class="text-4xl font-black italic mb-8 uppercase tracking-tighter">Your Shopping Cart</h2>

      @if (cartItems.length > 0) {
        <div class="space-y-4">
          @for (item of cartItems; track item.id) {
            <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div class="flex items-center gap-6">
                <img [src]="item.image" class="w-20 h-20 object-contain bg-slate-50 rounded-lg p-2">
                <div>
                  <h3 class="font-bold text-slate-800 text-lg">{{ item.name }}</h3>
                  <p class="text-orange-600 font-black">
                    {{ item.price | currency:'EGP':'code':'1.2-2' }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex items-center bg-slate-100 rounded-xl p-1">
                  <button (click)="updateQuantity(item, -1)"
                          class="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold hover:bg-red-50 hover:text-red-500 transition-colors">-</button>
                  
                  <span class="w-12 text-center font-black text-lg">{{ item.quantity }}</span>
                  
                  <button (click)="updateQuantity(item, 1)"
                          [disabled]="productService.getStock(item.id, item.stock) <= 0"
                          class="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold hover:bg-green-50 hover:text-green-500 disabled:opacity-30 transition-colors">+</button>
                </div>
                
                <button (click)="removeItem(item)" class="text-slate-300 hover:text-red-500 transition-colors ml-2">
                    🗑️
                </button>
              </div>
            </div>
          }
        </div>

        <div class="mt-10 bg-slate-900 text-white p-8 rounded-3xl flex justify-between items-center shadow-xl shadow-slate-200">
          <div>
            <p class="text-slate-400 font-bold uppercase text-xs tracking-widest">Estimated Total</p>
            <h3 class="text-4xl font-black">{{ totalAmount }} EGP</h3>
          </div>
          <button class="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition-all active:scale-95">
            CHECKOUT
          </button>
        </div>
      } @else {
        <div class="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p class="text-slate-400 font-bold uppercase tracking-widest">The cart is currently empty</p>
          <a routerLink="/products" class="inline-block mt-4 text-orange-500 font-black hover:underline">Go Shopping →</a>
        </div>
      }
    </div>
  `
})
export class CartComponent {
  auth = inject(AuthService);
  productService = inject(ProductService);

  get cartItems() {
    return this.auth.currentUser()?.cart || [];
  }

  get totalAmount() {
    const total = this.cartItems.reduce((acc: number, item: any) => {
      return acc + (item.price * item.quantity);
    }, 0);
    
    // rounded to 2 decimals
    return parseFloat(total.toFixed(2));
  }

  updateQuantity(item: any, change: number) {
    const user = this.auth.currentUser();
    if (!user) return;

    // Get current stock using the service (checks LocalStorage or fallbacks to item.stock)
    const currentStock = this.productService.getStock(item.id, item.stock);

    if (change > 0 && currentStock > 0) {
      item.quantity++;
      this.productService.saveStockOverride(item.id, currentStock - 1);
    } else if (change < 0 && item.quantity > 0) {
      item.quantity--;
      this.productService.saveStockOverride(item.id, currentStock + 1);
    }

    if (item.quantity === 0) {
      this.removeItem(item);
    } else {
      this.auth.updateUser(user);
    }
  }

  removeItem(item: any) {
    const user = this.auth.currentUser();
    if (!user) return;

    // Return the quantity back to the local stock storage
    const currentStock = this.productService.getStock(item.id, item.stock);
    this.productService.saveStockOverride(item.id, currentStock + item.quantity);

    // Remove item from the cart array
    user.cart = user.cart.filter((i: any) => i.id !== item.id);
    this.auth.updateUser(user);
  }
}