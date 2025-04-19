import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SavePucharseDto } from '../models/save-pucharse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/purchase';

  save(savePucharseDto: SavePucharseDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/save`,
      savePucharseDto
    );
  }
}
