import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from "./core/components/header/header";
import { FooterComponent } from "./core/components/footer/footer";

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class AppComponent {
  title = 'Devs Who Run';
  public readonly themeService = inject(ThemeService);
}
