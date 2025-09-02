import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-error',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2
            class="mt-6 text-3xl font-extrabold text-red-600 dark:text-red-400"
          >
            Authentication Failed
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ errorMessage || 'Something went wrong during authentication.' }}
          </p>
          <button
            (click)="goHome()"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AuthErrorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected errorMessage: string | null = null;

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.queryParams['message'] || null;
    setTimeout(() => this.goHome(), 5000);
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }
}
