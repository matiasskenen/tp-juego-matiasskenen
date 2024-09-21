import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    {
        path: 'juegos', 
        loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    },
    { path: 'chat', component: ChatComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'quiensoy', component: QuiensoyComponent },
    { path: 'singin', component: SingUpComponent },
];
