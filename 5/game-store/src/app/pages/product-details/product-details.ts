import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { Product } from '../../models/product.model';
import { DiscountPipe } from '../../pipes/discount-pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [DiscountPipe, CommonModule],
  template: `
    @if (product(); as p) {
      <div class="container mx-auto p-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="bg-gray-50 rounded-3xl p-10 border-2 border-slate-100 flex justify-center">
            <img [src]="p.image" [alt]="p.name" class="max-h-125 w-auto mix-blend-multiply transition-transform hover:scale-105 duration-500">
        </div>
        
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-orange-500 font-bold uppercase tracking-widest text-sm">{{p.category}}</span>
            @if(p.rating) {
              <span class="text-slate-900 font-bold text-sm">⭐ {{p.rating}}</span>
            }
          </div>
          
          <h1 class="text-6xl font-black text-slate-900 mb-6 uppercase italic leading-none">{{p.name}}</h1>
          
          @if(p.brand) {
            <p class="text-slate-400 font-bold mb-4">Brand: <span class="text-slate-900">{{p.brand}}</span></p>
          }
          
          <p class="text-slate-500 text-xl mb-8 leading-relaxed">{{p.description}}</p>
          
          <div class="flex items-baseline gap-4 mb-10">
            <span class="text-5xl font-black text-slate-900">
              {{ (p.price | discount:p.discountPercentage) | currency:'EGP':'code':'1.2-2' }}
            </span>
            
            @if(p.discountPercentage) {
              <span class="text-2xl text-slate-300 line-through">
                {{ p.price | currency:'EGP':'code':'1.2-2' }}
              </span>
            }
          </div>

          <div class="flex items-center gap-6">
              <button (click)="onBuy(p)" [disabled]="p.stock === 0"
                class="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-500 transition-all active:scale-95 disabled:bg-slate-200 disabled:text-slate-400">
                {{ p.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK' }}
              </button>

              <div class="text-right shrink-0">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Availability</p>
                <p [class.text-red-500]="p.stock < 5" class="font-black text-slate-900">
                  {{p.stock > 0 ? p.stock + ' IN STOCK' : 'SOLD OUT'}}
                </p>
              </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-900"></div>
      </div>
    }
  `
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private auth = inject(AuthService);

  product = signal<Product | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product.set(data),
        error: (err) => console.error('Could not load product', err)
      });
    }
  }

  onBuy(p: Product) {
    const user = this.auth.currentUser();

    if (!user) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    if (p.stock > 0) {
      if (!user.cart) user.cart = [];
      
      const itemInCart = user.cart.find((item: any) => item.id === p.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        user.cart.push({ ...p, quantity: 1 });
      }

      this.auth.updateUser(user);

      p.stock--;
      this.productService.saveStockOverride(p.id, p.stock);
      
      this.product.set({ ...p });
    }
  }
}