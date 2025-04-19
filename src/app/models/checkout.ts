import { Product } from './product';

interface CheckoutProduct {
  product: Product;
  quantity: number;
}

export interface CheckoutDto {
  data: CheckoutProduct[];
  total: number;
}
