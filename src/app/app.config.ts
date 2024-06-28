import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './services/interceptor/app.interceptor';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { ApiService } from './services/api/api.service';
import { BrowserModule } from '@angular/platform-browser/index';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
    ),
    provideHttpClient (
      withInterceptors([appInterceptor]),
    ),
    SvgIconRegistryService
  ],
 
};
