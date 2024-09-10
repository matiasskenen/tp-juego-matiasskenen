import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => 
    initializeApp({"projectId":"tp-juegos-labo4","appId":"1:72978880966:web:edea831367194e969ffac7","storageBucket":"tp-juegos-labo4.appspot.com","apiKey":"AIzaSyCNdEW84sG5qn1Is4b-s7MVw6Ho8N_Nwcg","authDomain":"tp-juegos-labo4.firebaseapp.com","messagingSenderId":"72978880966","measurementId":"G-J3SBZF63TQ"})), 
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
