import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-523ee","appId":"1:161474153791:web:0af73e2d1e854fd7e0d78a","storageBucket":"ring-of-fire-523ee.appspot.com","apiKey":"AIzaSyAuq2PwBrwmvuuD6v3ehf-mpsBBZjIaS9w","authDomain":"ring-of-fire-523ee.firebaseapp.com","messagingSenderId":"161474153791"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
