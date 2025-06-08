import { Component } from '@angular/core';
import { SvgIcon } from 'apps/frontend/src/app/shared/directives';
import { ICON_NAME } from 'apps/frontend/src/app/shared/directives/svg';

@Component({
  selector: 'app-social-login',
  imports: [SvgIcon],
  template: `
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        (click)="handleSocialLogin('google')"
        class="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
        aria-label="Sign in with Google"
      >
        <span appSvgIcon [iconName]="iconName.google" fill="#4285F4" iconClass="w-5 h-5"></span>
        Sign in with Google
      </button>
      <button
        (click)="handleSocialLogin('github')"
        class="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gray-800 rounded-md shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Sign in with GitHub"
      >
        <span appSvgIcon [iconName]="iconName.github" iconClass="w-5 h-5"></span>
        Sign in with GitHub
      </button>
    </div>
  `,
})
export class SocialLogin{

  protected readonly iconName = ICON_NAME;

  handleSocialLogin(provider: 'google' | 'github'): void {
    alert(
      `${
        provider.charAt(0).toUpperCase() + provider.slice(1)
      } login feature coming soon!`
    );
  }
}
