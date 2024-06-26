import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './services/interceptor/app.interceptor';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ApiService } from './services/api/api.service';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([appInterceptor]),
    ),
    SvgIconRegistryService
  ],
 
};
