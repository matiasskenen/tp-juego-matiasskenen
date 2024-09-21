import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

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
  
  isLoading = false;

  constructor(public auth: Auth, private router : Router,  private userService: DataService){

  }

  register()
  {
    
    createUserWithEmailAndPassword(this.auth, this.email, this.password).then((res) => 
    {
      if ( res.user.email !== null)
        {
          this.isLoading = true;
          setTimeout(() => {
            this.userService.setUser(this.email);
            this.isLoading = false;
            this.router.navigate(["/home"]);
          }, 1000);
        } 

      this.flagError = false;
    }).catch((e) => {
      this.flagError = true;
      console.log(e);

      switch(e.code)
      {
        case "auth/weak-password":
          this.msjError = "Contraseña demasiado corta.";
          break;
        case "auth/invalid-email":
          this.msjError = "Correo electrónico no válido.";
          break;
        case "auth/email-already-in-use":
          this.msjError = "El correo electrónico ya está en uso.";
          break;
        case "auth/user-not-found":
          this.msjError = "No se encontró ningún usuario con este correo.";
          break;
        case "auth/wrong-password":
          this.msjError = "Credenciales Invalidas.";
          break;
        case "auth/invalid-credential":
          this.msjError = "Credenciales no válidas.";
          break;
        case "auth/account-exists-with-different-credential":
          this.msjError = "Ya existe una cuenta con un correo diferente.";
          break;
        case "auth/credential-already-in-use":
          this.msjError = "Estas credenciales ya están en uso por otra cuenta.";
          break;
        default:
          this.msjError = "Error: " + e.code;
          break;
      }
    })
  }

  redirectToLogin() {
    this.router.navigate(["/login"]);
  }


    autocompletar(email: string, password: string) 
  {
    this.email = email;
    this.password = password;
  }

}
