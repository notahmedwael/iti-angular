import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: any[] }>(this.apiUrl).pipe(
      map(res => res.products.map(p => this.transform(p)))
    );
  }

  // Fetch a single product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.transform(p))
    );
  }

  /**
   * New Helper: getStock
   * Prioritizes the local override. If not found, uses the passed fallback
   * (which should be the stock value from the API).
   */
  getStock(productId: number, fallbackStock: number): number {
    const localStock = localStorage.getItem(`stock_override_${productId}`);
    return localStock !== null ? parseInt(localStock) : fallbackStock;
  }

  // Helper to sync API data with your Product Model
  private transform(p: any): Product {
    // We use the new getStock helper right here during transformation
    const stockValue = this.getStock(p.id, p.stock);
    
    return {
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.thumbnail,
      category: p.category,
      description: p.description,
      stock: stockValue,
      discountPercentage: p.discountPercentage,
      brand: p.brand,
      rating: p.rating,
    };
  }

  // Persist stock changes locally
  saveStockOverride(productId: number, newStock: number) {
    localStorage.setItem(`stock_override_${productId}`, newStock.toString());
  }
}