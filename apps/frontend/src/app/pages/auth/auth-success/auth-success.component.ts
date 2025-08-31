import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../../shared/services/auth-api';

@Component({
  selector: 'app-auth-success',
  standalone: true,
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2
            class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            {{ isLoading ? 'Completing authentication...' : 'Welcome!' }}
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{
              isLoading
                ? 'Please wait while we set up your account.'
                : 'You have been successfully authenticated.'
            }}
          </p>
        </div>

        @if (error) {
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-red-800">{{ error }}</p>
        </div>
        }
      </div>
    </div>
  `,
})
export class AuthSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authApi = inject(AuthApiService);

  protected isLoading = true;
  protected error: string | null = null;

  ngOnInit(): void {
    this.handleAuthCallback();
  }

  private handleAuthCallback(): void {
    const secret = this.route.snapshot.queryParams['secret'];
    const userId = this.route.snapshot.queryParams['userId'];

    if (!secret || !userId) {
      this.error = 'Invalid authentication callback';
      this.isLoading = false;
      setTimeout(() => this.router.navigate(['/']), 3000);
      return;
    }

    this.authApi.exchangeSecretForSession(secret, userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        } else {
          this.error = 'Failed to complete authentication';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Auth callback error:', error);
        this.error = 'Authentication failed';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
    });
  }
}
