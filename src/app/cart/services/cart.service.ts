import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../shared/base/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}

  //* Add to Cart
  addToCart(id: string): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}api/v1/cart`, {
      productId: id,
    });
  }

  //* Get Cart
  getCart(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/cart`);
  }
  //* Update Cart
  updateCart(id: string, count: number): Observable<any> {
    return this._httpClient.put(`${environment.apiUrl}api/v1/cart/${id}`, {
      count: count,
    });
  }

  //* Remove Product From Cart
  removeProductFromCart(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}api/v1/cart/${id}`);
  }

  //* Clear Cart
  clearCart(): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}api/v1/cart`);
  }
}
