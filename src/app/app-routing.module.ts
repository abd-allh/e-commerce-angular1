import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuardGuard } from './shared/auth-guard.guard';
import { ForgetPasswordComponent } from './forgot/forget-password/forget-password.component';
import { OtpComponent } from './forgot/otp/otp.component';
import { ResetPasswordComponent } from './forgot/reset-password/reset-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { BrandsComponent } from './brands/brands.component';
import { loginGuardGuard } from './shared/login-guard.guard';
import { CheckOutComponent } from './check-out/check-out.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuardGuard], component: HomeComponent },
  // {path:'products', loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},
  {
    path: 'products',
    canActivate: [authGuardGuard],
    component: ProductComponent,
  },
  {
    path: 'product-details/:id',
    canActivate: [authGuardGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'categories',
    canActivate: [authGuardGuard],
    component: CategoriesComponent,
    data: { roles: ['admin', 'superAdmin', 'canAddCategory'] },
  },
  {
    path: 'category-products/:name',
    canActivate: [authGuardGuard],
    component: CategoryProductsComponent,
  },
  {
    path: 'sub-categories',
    canActivate: [authGuardGuard],
    component: SubCategoriesComponent,
  },
  {
    path: 'brands',
    canActivate: [authGuardGuard],
    component: BrandsComponent,
  },
  { path: 'login', canActivate: [loginGuardGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [loginGuardGuard],
    component: RegisterComponent,
  },
  // { path: 'forgot', component: ForgotComponent },
  { path: 'forgot', component: ForgetPasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'reset', component: ResetPasswordComponent },

  // { path: 'cart', canActivate: [authGuardGuard], component: CartComponent },
  {
    path: 'cart',
    canActivate: [authGuardGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'payment/:id',
    canActivate: [authGuardGuard],
    component: CheckOutComponent,
  },
  {
    path: 'allorders',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./allorders/allorders.component').then(
        (c) => c.AllordersComponent
      ),
  },

  //wild card route for 404 page
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
