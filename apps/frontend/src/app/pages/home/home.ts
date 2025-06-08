import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Cta } from './components/cta/cta';
import { About } from './components/about/about';
import { Testimonials } from './components/testimonials/testimonials';
import { Features } from './components/features/features';
import { Footer } from './components/footer/footer';
import { ThemeButton } from './components/theme-button/theme-button';
import { testimonials, aboutDetails, features } from './home-constants';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Cta,
    About,
    Testimonials,
    Features,
    Footer,
    ThemeButton,
  ],
  template: `
    <app-theme-button />
    <app-header />
    <app-about [aboutDetails]="aboutDetails()" />
    <app-features [features]="features()" />
    <app-testimonials [testimonials]="testimonials()" />
    <app-cta />
    <app-footer />
  `,
})
export default class Home {
  testimonials = signal(testimonials);
  aboutDetails = signal(aboutDetails);
  features = signal(features);
}
