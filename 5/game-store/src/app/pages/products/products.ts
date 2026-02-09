import { Component, signal, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="container mx-auto p-10">
      <h2 class="text-5xl font-black mb-10 italic">CATALOG</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (p of products(); track p.id) {
          <app-product-card [product]="p" (onBuy)="buyProduct($event)" />
        }
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private auth = inject(AuthService);
  private router = inject(Router);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  buyProduct(product: Product) {
    const user = this.auth.currentUser();
    if (!user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/products' } });
      return;
    }

    if (product.stock > 0) {
      // 1. Update Cart
      if (!user.cart) user.cart = [];
      const item = user.cart.find((i: any) => i.id === product.id);
      item ? item.quantity++ : user.cart.push({ ...product, quantity: 1 });
      this.auth.updateUser(user);

      // 2. Update Stock locally
      product.stock--;
      this.productService.saveStockOverride(product.id, product.stock);
      
      // 3. Refresh Signal to update UI
      this.products.set([...this.products()]);
    }
  }
}