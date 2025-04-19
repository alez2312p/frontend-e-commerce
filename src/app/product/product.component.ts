import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { CartProduct } from '../models/cart-product';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  id = input<string>('');
  productService = inject(ProductService);
  product?: Product;

  ngOnInit(): void {
    this.productService.getProduct(this.id()).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart(): void {
    const cartProducts: CartProduct[] =
      JSON.parse(localStorage.getItem('cart-products') as string) || [];
    const matched = cartProducts.find(
      ({ product, quantity }) => product.id === this.id()
    );
    if (matched) {
      matched.quantity++;
    } else {
      cartProducts.push({
        product: this.product!,
        quantity: 1,
      });
    }
    localStorage.setItem('cart-products', JSON.stringify(cartProducts));
  }
}
