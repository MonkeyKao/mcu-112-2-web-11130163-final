import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  startWith,
  switchMap,
} from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  router = inject(Router);

  private productService = inject(ProductService);

  protected pageSize = 5;

  private readonly refresh$ = new Subject<void>();

  protected readonly formControl = new FormControl<string | undefined>(
    undefined,
    { nonNullable: true }
  );

  private readonly condition$ = new BehaviorSubject<string | undefined>(
    undefined
  );
  get condition() {
    return this.condition$.value;
  }
  set condition(value: string | undefined) {
    this.condition$.next(value);
  }

  private readonly pageIndex$ = new BehaviorSubject<number>(1);
  get pageIndex() {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }

  readonly products$ = combineLatest([
    this.refresh$.pipe(startWith(undefined)),
    this.condition$,
    this.pageIndex$,
  ]).pipe(
    switchMap(([_, condition, pageIndex]) =>
      this.productService.getList(condition, pageIndex, this.pageSize)
    )
  );

  readonly totalCount$ = combineLatest([
    this.refresh$.pipe(startWith(undefined)),
    this.condition$,
  ]).pipe(
    switchMap(([_, condition]) => this.productService.getCount(condition))
  );

  onAdd(): void {
    this.router.navigate(['product', 'form']);
  }

  onAddToCart(product: Product): void {}

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
