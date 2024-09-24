import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../login/login.component";

import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public user: any;

  constructor(private router: Router, private authService: DataService)
  {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });

  }



  showButton = true;
  dato : string = "";
  datoPadre :string = "";

  recibirDato(datoHijo: string)
  {
    this.dato = datoHijo;
  }


  juego1() {
    this.router.navigate(["/juegos/juego-1"]);
  }

  juego2() {
    this.router.navigate(["/juegos/juego-2"]);
  }
  

  
}
