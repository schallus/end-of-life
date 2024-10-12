import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedModule } from './shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule, MainMenuComponent, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    // Listen for router navigation end event
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          // Traverse down to find the deepest child route
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.headerService.setTitle(data?.['title'] || '');
      });
  }
}
