import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './services/app.interceptor';
import { SvgIconRegistryService } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([appInterceptor]),
    ),
    SvgIconRegistryService
  ],
 
};
