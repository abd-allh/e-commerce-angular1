import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, SkeletonModule],
})
export class CartModule {}
