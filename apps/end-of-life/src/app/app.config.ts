import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { appRoutes } from './app.routes';

import { reducers } from './reducers';
import { AutocompleteTypeComponent, ChipsAutocompleteType } from './shared/formly-types';

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
        ],
      }),
    ]),
    provideStore(reducers),
    // provideEffects([ProductEffects]),
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
