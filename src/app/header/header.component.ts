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
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
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

  async signOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  

}
