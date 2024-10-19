import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth.service';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public user: any;

  constructor(private router: Router, private authService: DataService, private auth : Auth,  private userService: DataService)
  {
    this.checkUser();
  }

  checkUser()
  {
    this.authService.getUserNow().subscribe((user) => {
      if (user) {
        this.user = user.email;
        console.log('Usuario:', this.user);
      } else {
        console.log('No hay usuario disponible.');
      }
    });
  }

  toHome()
  {
    this.router.navigate(['/home'])
  }

  toQuiensoy()
  {
    this.router.navigate(['/quiensoy'])
  }


  toChat()
  {
    this.router.navigate(['/chat'])
  }

  toPuntuaje()
  {
    this.router.navigate(['/puntuaje'])
  }

  toEncuesta()
  {
    this.router.navigate(['/encuesta'])
  }

  async signOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  

}
