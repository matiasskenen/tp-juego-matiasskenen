import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../login/login.component";

import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public user: any;
  isLocked = true;

  constructor(private router: Router, private authService: DataService, private auth: Auth)
  {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLocked = false;
        console.log("Usuario autenticado:", user);
        this.authService.setUser(user)
      } else {
        console.log("No hay usuario autenticado.");
      }
    });

  }



  showButton = true;
  dato : string = "";
  datoPadre :string = "";

  recibirDato(datoHijo: string)
  {
    this.dato = datoHijo;
  }


  juego1() 
  {
    if(this.isLocked == false)
    {
      this.router.navigate(["/juegos/juego-1"]);
    }
    

  }

  juego2() 
  {
    if(this.isLocked == false)
    {
      this.router.navigate(["/juegos/juego-2"]);
    }
  }

  juego3() 
  {
    if(this.isLocked == false)
    {
      this.router.navigate(["/juegos/juego-3"]);
    }
  }
  juego4() 
  {
    if(this.isLocked == false)
    {
      this.router.navigate(["/juegos/juego-4"]);
    }
  }
  

  
}
