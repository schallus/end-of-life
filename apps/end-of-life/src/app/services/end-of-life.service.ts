import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ComponentCycle } from '../models';

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

  getComponentCycles(component?: string): Observable<ComponentCycle[]> {
    return this.httpClient.get<ComponentCycle[]>(`${this.BASE_URL}/${component}.json`);
  }
}
