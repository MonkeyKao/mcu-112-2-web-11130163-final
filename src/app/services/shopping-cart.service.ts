import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingItem } from '../model/shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  data: ShoppingItem[] = [];

  addProduct(product: Product): void {
    const item = this.data.find((item) => item.id === product.id);
    if (item) {
      item.count++;
    } else {
      const id =
        this.data.length === 0
          ? 1
          : Math.max(...this.data.map((item) => item.id)) + 1;

      this.data.push(new ShoppingItem({ id, product, count: 1 }));
    }
  }
}
