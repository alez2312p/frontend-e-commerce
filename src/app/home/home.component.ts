import { Component, inject, OnInit } from '@angular/core';
import { ProductOfferComponent } from '../components/product-offer/product-offer.component';
import { Product } from '../models/product';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent, HomeProductComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  products!: Product[];
  productOffers!: Product[];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.productOffers = products.filter((product) => product.previousPrice);
    });
  }
}
