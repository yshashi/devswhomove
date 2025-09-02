import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from './core/components/header/header';
import { FooterComponent } from './core/components/footer/footer';
import { ThemeButtonComponent } from './pages/landing/components/theme-button/theme-button';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ThemeButtonComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'Devs Who Run';
  public readonly themeService = inject(ThemeService);
}
