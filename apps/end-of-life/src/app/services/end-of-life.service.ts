import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndOfLifeService {
  private readonly BASE_URL = 'https://endoflife.date/api';

  constructor(private httpClient: HttpClient) {}

  getAllComponents(search?: string): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`${this.BASE_URL}/all.json`)
      .pipe(
        map((components) =>
          search
            ? components.filter((product) => product.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            : components
        )
      );
  }

  getComponents(component?: string): Observable<Component[]> {
    return this.httpClient.get<Component[]>(`${this.BASE_URL}/${component}.json`);
  }
}
