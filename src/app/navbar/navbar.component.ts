import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CartService } from '../cart/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslationService } from '../shared/core/i18n/translation.service';
import { UtilService } from '../shared/services/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  lang: string = '';
  isLoggedIn: boolean = false;
  numOfCartItems: number = 0;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _cartService: CartService,
    private _translationService: TranslationService,
    private _utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    if (this.isLoggedIn) {
      this.getCartItems();
    }
    this.getCartItemsCount();
  }

  checkLogin() {
    this._authService.userToken.subscribe({
      next: () => {
        if (this._authService.userToken.getValue()) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
    });
  }
  getCartItems() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log('getCart ', res);
        // this.cart = res.data;
        this._authService.totalNumOfCartItems.next(res.numOfCartItems);
        // this.numOfCartItems = res.numOfCartItems;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.message, 'Err: ', err);
      },
    });
  }
  getCartItemsCount() {
    this._authService.totalNumOfCartItems.subscribe({
      next: (res) => {
        this.numOfCartItems = res;
      },
    });
  }
  logOut() {
    localStorage.removeItem('userToken');
    this._authService.userToken.next('');
    this.router.navigate(['/login']);
  }

  setLanguage() {
    let lang = localStorage.getItem('lang');
    if (lang && lang === 'en') {
      lang = 'ar';
    } else {
      lang = 'en';
    }
    // set language
    this._translationService.setLanguage(lang);
    // switch direction
    this._utilService.switchDirection(lang);
    // switch direction
    this._utilService.switchLang(lang);
    // reload root after change lang
    location.reload();
    //this.reloadCurrentRoute();
    // Lang
    this.lang = lang;
  }
}
