import { Route } from '@angular/router';
import { createEventRoutes } from '@devswhorun/create-event';
export const appRoutes: Route[] = [
  ...createEventRoutes,
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
