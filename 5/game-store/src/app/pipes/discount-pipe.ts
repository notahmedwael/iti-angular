import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage: number = 0): string {
    if (!discountPercentage) return price.toFixed(2);
    
    const discountedPrice = price - (price * (discountPercentage / 100));
    return discountedPrice.toFixed(2);
  }
}