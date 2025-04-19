import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CheckoutDto } from '../models/checkout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/payment';

  checkout(checkoutDto: CheckoutDto): Observable<{ url: string }> {
    return this.http.post<{ url: string }>(
      `${this.baseUrl}/checkout`,
      checkoutDto
    );
  }
}
