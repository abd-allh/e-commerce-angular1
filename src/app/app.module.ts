import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forgot/forget-password/forget-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BrandsComponent } from './brands/brands.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpComponent } from './forgot/otp/otp.component';
import { ResetPasswordComponent } from './forgot/reset-password/reset-password.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { searchPipe } from './shared/search-pipe';
import { SearchCategoryPipe } from './shared/search-category.pipe';
import { SearchBrandPipe } from './shared/search-brand.pipe';
import { LoaderComponent } from './shared/loader/loader.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckOutComponent } from './check-out/check-out.component';
import { headersInterceptor } from './shared/interceptors/headers.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { SuperBtnDirective } from './shared/super-btn.directive';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkStepperComponent } from './categories/cdk-stepper/cdk-stepper.component';

import { AddCategoryStepperComponent } from './categories/cdk-stepper/add-category-stepper/add-category-stepper.component';
import { AddCategoryComponent } from './categories/cdk-stepper/add-category-stepper/add-category/add-category.component';
import { AddSubCategoriesComponent } from './categories/cdk-stepper/add-category-stepper/add-sub-categories/add-sub-categories.component';
import { FinishComponent } from './categories/cdk-stepper/add-category-stepper/finish/finish.component';

import { AddCategoryMatStepperComponent } from './categories/add-category-mat-stepper/add-category-mat-stepper.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TableComponent } from './categories/add-category-mat-stepper/table/table.component';
import { MatTableModule } from '@angular/material/table';

const httpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    WishlistComponent,
    BrandsComponent,
    NotFoundComponent,
    ProductComponent,
    CategoriesComponent,
    OtpComponent,
    ResetPasswordComponent,
    ForgotComponent,
    ProductDetailsComponent,
    CategoryProductsComponent,
    SubCategoriesComponent,
    searchPipe,
    SearchCategoryPipe,
    SearchBrandPipe,
    LoaderComponent,
    CheckOutComponent,
    SuperBtnDirective,
    AddCategoryStepperComponent,
    AddCategoryComponent,
    AddSubCategoriesComponent,
    FinishComponent,
    AddCategoryMatStepperComponent,

    CdkStepperComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    InputOtpModule,
    RatingModule,
    CarouselModule,
    SkeletonModule,
    NgxSpinnerModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: httpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
    TranslateModule.forRoot(),
    CdkStepperModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [CdkStepperModule],
  providers: [
    MessageService,
    searchPipe,
    provideHttpClient(
      withInterceptors([
        headersInterceptor,
        errorInterceptor,
        loadingInterceptor,
      ])
    ),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
