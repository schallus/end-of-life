import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  constructor(private titleService: Title) {}

  setTitle(title: string) {
    this.titleSubject.next(title);
    this.titleService.setTitle(title);
  }
}
