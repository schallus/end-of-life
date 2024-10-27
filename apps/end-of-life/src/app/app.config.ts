import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { appRoutes } from './app.routes';

import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './effects/product.effects';
import { reducers } from './reducers';
import { AutocompleteTypeComponent, ChipsAutocompleteType, RepeatTypeComponent } from './shared/formly-types';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom([
      FormlyModule.forRoot({
        types: [
          {
            name: 'autocomplete',
            component: AutocompleteTypeComponent,
            wrappers: ['form-field'],
          },
          {
            name: 'chips',
            component: ChipsAutocompleteType,
            wrappers: ['form-field'],
          },
          {
            name: 'repeat',
            component: RepeatTypeComponent,
          },
        ],
      }),
    ]),
    provideStore(reducers),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideEffects([ProductEffects]),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyBhB7ysHekRHsbn_VWXT_0DP2YaDiXQEMw',
        authDomain: 'end-of-life-stemys.firebaseapp.com',
        projectId: 'end-of-life-stemys',
        storageBucket: 'end-of-life-stemys.appspot.com',
        messagingSenderId: '939689570700',
        appId: '1:939689570700:web:8e3dd734b38407f75326a9',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
