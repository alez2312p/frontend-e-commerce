import { Product } from './product';

interface CartProduct {
  product: Product;
  quantity: number;
  total: number;
}
export interface SavePucharseDto {
  total: number;
  data: CartProduct[];
}
