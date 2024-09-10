import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';

export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'quiensoy', component: QuiensoyComponent },
    // La ruta comodin debe ir siempre al final
    //{ path: '**', component: PageNotFoundComponent },
    
];