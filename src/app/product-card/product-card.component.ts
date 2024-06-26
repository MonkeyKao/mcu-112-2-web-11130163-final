import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, booleanAttribute, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ transform: numberAttribute }) id!: number;
  @Input() productName!: string;
  @Input() authors!: string;
  @Input() company!: string;
  @Input({ transform: booleanAttribute }) isShow!: boolean;
  @Input() imgUrl!: string;

  @Input() createDate!: Date;
  @Input({ transform: numberAttribute }) price!: number;

  @HostBinding('class')
  class = 'product-card';

  @Output()
  view = new EventEmitter<void>();

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  remove = new EventEmitter<void>();
}
