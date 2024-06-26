import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly url = 'http://localhost:3000/products';
  private readonly httpClient = inject(HttpClient);

  getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${productId}`);
  }

  getList(
    name: string | undefined,
    pageIndex: number,
    pageSize: number
  ): Observable<Product[]> {
    const query: { [key: string]: string | number } = {
      _page: pageIndex,
      _limit: pageSize,
    };
    if (name) query['name'] = name;
    const params = new HttpParams({ fromObject: query });
    return this.httpClient.get<Product[]>(this.url, { params });
  }

  getCount(name?: string): Observable<number> {
    const option = name ? { params: new HttpParams().set('name', name) } : {};
    return this.httpClient
      .get<Product[]>(this.url, option)
      .pipe(map((data) => data.length));
  }

  add(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, { ...product });
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/${product.id}`, product);
  }

  remove(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.url}/${productId}`);
  }
}
