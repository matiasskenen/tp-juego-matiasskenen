import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public user: any;

  constructor(private router: Router, private authService: DataService)
  {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });

  }

}
