import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { environment } from './base/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}api/v1/products/`;
  userToken: BehaviorSubject<string> = new BehaviorSubject('');
  totalNumOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem('userToken')) {
      this.setUserToken();
    }
  }

  setUserToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    this.userToken.next(token);
  }

  register(data: RegisterModel): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/v1/auth/signup/`,
      data
    );
  }

  logIn(data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/v1/auth/signin/`,
      data
    );
  }

  forget(data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/v1/auth/forgotPasswords/`,
      data
    );
  }

  otp(data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/v1/auth/verifyResetCode/`,
      data
    );
  }

  reset(data: object): Observable<any> {
    return this._httpClient.put(
      `${environment.apiUrl}api/v1/auth/resetPassword/`,
      data
    );
  }

  //! GETTERS
  //* Get All Categories
  getCategories(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/categories`);
  }
  //* Get specific category
  // getSpecificCategory(id: string): Observable<any> {
  //   return this._httpClient.get(
  //     `${environment.apiUrl}api/v1/categories/' + id
  //   );
  // }
  //* Get All SubCategories
  getSubCategories(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/subcategories`);
  }

  //* Get specific SubCategory
  // getSpecificSubCategory(id: string): Observable<any> {
  //   return this._httpClient.get(
  //     `${environment.apiUrl}api/v1/subcategories/' + id
  //   );
  // }
  //* Get All SubCategories On Category
  // getSubCategoriesOnCategory(id: string): Observable<any> {
  //   return this._httpClient.get(
  //     `${environment.apiUrl}api/v1/categories/' +
  //       id +
  //       '/subcategories'
  //   );
  // }
  //* Get All Brands
  getBrands(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/brands`);
  }
  //* Get specific Brand
  // getSpecificBrand(id: string): Observable<any> {
  //   return this._httpClient.get(
  //     `${environment.apiUrl}api/v1/brands/' + id
  //   );
  // }
  //* Get All Products
  getProducts(page: number, limit: number): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
  //* Get specific Product
  getSpecificProduct(id: string): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/products/${id}`);
  }
  //* Get WishList
  getWishList(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/wishlist`);
  }
  //* Add to WishList
  addToWishList(data: object): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}api/v1/wishlist/`, data);
    // { "productId": "6428ebc6dc1175abc65ca0b9 }
  }
  //* Delete From WishList
  deleteFromWishList(id: string): Observable<any> {
    return this._httpClient.delete(
      `${environment.apiUrl}api/v1/wishlist/${id}`
    );
  }

  //* CheckOut
  checkOut(id: string, data: object): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}api/v1/orders/${id}`, {
      shippingAddress: data,
    });
  }
  //* CheckOutSession
  checkOutSession(id: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      }
    );
  }
  //* Get All Orders
  getAllOrders(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/v1/orders`);
  }
  //* Get User Orders
  // https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17
  getUserOrders(id: string): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}api/v1/orders/user/${id}`
    );
  }
}
