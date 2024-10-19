import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { confirmarCalveValidator } from '../validadores/clave.validator'; 
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
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

  form! : FormGroup;

  constructor(public auth: Auth, private router : Router,  private userService: DataService, private fb: FormBuilder)
  {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl("", Validators.min(18)),
      mail: new FormControl("", Validators.email),
      clave: new FormControl("", Validators.minLength(4)),
      repiteClave: new FormControl("", Validators.required)
  
    }, confirmarCalveValidator());
  }
  
  get usuario() {
    return this.form.get('usuario');
  }
  get nombre() {
    return this.form.get('nombre');
  }
  get edad() {
    return this.form.get('edad');
  }
  get mail() {
    return this.form.get('mail');
  }
  get clave() {
    return this.form.get('clave');
  }
  get repiteClave() {
    return this.form.get('repiteClave');
  }

  enviarForm() {
    console.log(this.form.value);
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
          this.msjError = "Contraseña demasiado corta. Minimo 6 caracteres.";
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
