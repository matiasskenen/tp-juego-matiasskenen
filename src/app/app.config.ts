import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { enviromentConfig } from './environmentConfig';
import { provideHttpClient } from '@angular/common/http';
import { ChatService } from './servicios/basedatos/chat.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(enviromentConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ...SweetAlert2Module.forRoot().providers!, 
    ChatService
  ]
};
