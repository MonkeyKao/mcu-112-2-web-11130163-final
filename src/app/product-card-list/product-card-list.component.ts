import {
  Component,
  EventEmitter,
  Input,
  Output,
  numberAttribute,
} from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from './../model/product';

@Component({
  selector: 'app-product-card-list',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.css',
})
export class ProductCardListComponent {
  @Input({ required: true })
  products!: Product[];

  @Input({ required: true, transform: numberAttribute })
  totalCount!: number;

  @Input({ required: true, transform: numberAttribute })
  pageSize!: number;

  @Input({ required: true, transform: numberAttribute })
  pageIndex = 1;
  @Output()
  pageIndexChange = new EventEmitter<number>();

  @Output()
  addToCart = new EventEmitter<Product>();

  @Output()
  view = new EventEmitter<Product>();
}
