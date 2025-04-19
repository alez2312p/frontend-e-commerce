import { Component, inject, OnInit, output } from '@angular/core';
import { CartProductComponent } from './componets/cart-product/cart-product.component';
import { CartProduct } from '../models/cart-product';
import { CurrencyPipe } from '@angular/common';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  total: number = 0;

  paymentService = inject(PaymentService);

  ngOnInit(): void {
    this.updateCart();
  }

  updateCart() {
    const storageProducts: CartProduct[] =
      JSON.parse(localStorage.getItem('cart-products') as string) || [];
    this.cartProducts = storageProducts;
    this.total = this.cartProducts.reduce(
      (acc, val) => acc + val.product.price * val.quantity,
      0
    );
  }

  proceedToCheckout() {
    if (this.cartProducts.length === 0) return;
    this.paymentService
      .checkout({
        data: this.cartProducts,
        total: this.total,
      })
      .subscribe((result) => {
        location.href = result.url;
      });
  }
}
