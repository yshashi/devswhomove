import { Component, inject } from '@angular/core';
import { ThemeService } from 'apps/frontend/src/app/core/services/theme.service';
import { SvgIcon } from 'apps/frontend/src/app/shared/directives';
import { ICON_NAME } from 'apps/frontend/src/app/shared/directives/svg';

@Component({
  selector: 'app-theme-button',
  imports: [SvgIcon],
  template: `
    <button
      class="fixed top-4 right-4 z-50 bg-gray-200 rounded-full transition-colors duration-300 w-12 h-12 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle dark mode"
      role="switch"
      [attr.aria-checked]="themeService.isDarkMode()"
      (click)="toggleTheme()"
    >
      @if (themeService.isDarkMode()) {
      <span appSvgIcon [iconName]="iconName.sun" iconClass="w-5 h-5 m-auto text-gray-800 dark:text-gray-200"></span>
      } @else {
      <span appSvgIcon [iconName]="iconName.moon" iconClass="w-5 h-5 m-auto text-gray-800 dark:text-gray-200"></span>
      }
    </button>
  `,
})
export class ThemeButton {
  protected readonly themeService = inject(ThemeService);

  protected readonly iconName = ICON_NAME;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
