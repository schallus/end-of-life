import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndOfLifeService {
  private readonly BASE_URL = 'https://endoflife.date/api';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(search?: string): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`${this.BASE_URL}/all.json`)
      .pipe(
        map((products) =>
          search
            ? products.filter((product) =>
                product.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
            : products
        )
      );
  }
}
