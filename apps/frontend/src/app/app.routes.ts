import { Route } from '@angular/router';
import { createEventRoutes } from '@devswhorun/create-event';
export const appRoutes: Route[] = [
  ...createEventRoutes,
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component'),
  },
  { path: 'landing', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
