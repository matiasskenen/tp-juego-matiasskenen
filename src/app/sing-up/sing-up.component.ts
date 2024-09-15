import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {

  public email: string = '';
  public password: string = '';
  public mensagges = "";

  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";

  constructor(public auth: Auth, private router : Router){

  }

  register()
  {
    createUserWithEmailAndPassword(this.auth, this.email, this.password).then((res) => 
    {
      if ( res.user.email !== null) this.loggedUser = res.user.email;

      this.flagError = false;
    }).catch((e) => {
      this.flagError = true;
      console.log(e);

      switch(e.code)
      {
        case "auh/invalid-email":
          this.msjError = "Email Invalido";
        break;
        case "auh/email-already-in-use":
          this.msjError = "Email Ya en uso";
        break;
        default:
          this.msjError = e.code;
        break;
      }
    })
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }


}
