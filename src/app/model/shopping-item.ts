import { Product } from './product';

export class ShoppingItem {
  constructor(initData?: Partial<ShoppingItem>) {
    Object.assign(this, initData);
  }

  id!: number;

  product!: Product;

  count!: number;
}
