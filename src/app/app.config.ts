import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Base_Url } from 'auth';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    {
      provide: Base_Url,
      useValue: 'https://exam.elevateegy.com'
    },



    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
}




