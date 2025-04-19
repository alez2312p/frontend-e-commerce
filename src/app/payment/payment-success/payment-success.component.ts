import { Component, inject, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { CartProduct } from '../../models/cart-product';

@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent implements OnInit {
  purchaseService = inject(PurchaseService);
  ngOnInit(): void {
    const cartProducts: CartProduct[] = JSON.parse(
      localStorage.getItem('cart-products') as string
    );

    localStorage.removeItem('cart-products');

    const total = cartProducts.reduce(
      (acc, val) => acc + val.product.price * val.quantity,
      0
    );
    this.purchaseService
      .save({
        total,
        data: cartProducts.map(({ product, quantity }) => {
          return {
            product,
            quantity,
            total: Math.round(product.price * quantity),
          };
        }),
      })
      .subscribe((result) => {
        console.log(result.message);
      });
  }
}
