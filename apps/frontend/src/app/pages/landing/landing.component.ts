import { Component, signal } from '@angular/core';
import { CtaComponent } from './components/cta/cta';
import { AboutComponent } from './components/about/about';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { FeaturesComponent } from './components/features/features';

import { ThemeButtonComponent } from './components/theme-button/theme-button';
import { testimonials, aboutDetails, features } from './landing-constants';

@Component({
  selector: 'app-home',
  imports: [
    CtaComponent,
    AboutComponent,
    TestimonialsComponent,
    FeaturesComponent,
    ThemeButtonComponent,
  ],
  template: `
    <app-theme-button />
    <app-about [aboutDetails]="aboutDetails()" />
    <app-features [features]="features()" />
    <app-testimonials [testimonials]="testimonials()" />
    <app-cta />
  `,
})
export default class HomeComponent {
  testimonials = signal(testimonials);
  aboutDetails = signal(aboutDetails);
  features = signal(features);
}
