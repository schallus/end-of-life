import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from '../shared/shared.module';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title?: string;

  constructor(headerService: HeaderService) {
    headerService.title$
      .pipe(takeUntilDestroyed())
      .subscribe((title) => (this.title = title));
  }
}
