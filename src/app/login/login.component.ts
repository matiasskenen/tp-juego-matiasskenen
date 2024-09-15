import { CommonModule } from '@angular/common';import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, collectionData,setDoc, DocumentData, doc, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { orderBy, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public email: string = '';
  public password: string = '';
  public mensagges = "";

  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";

  public countLogins: number = 0;

  private sub!: Subscription;

  public loginsCollection : any [] = [];
  constructor(private firestore: Firestore, private router: Router, private auth : Auth)
  {
    
  }

  /*
  login() 
  {
    let col = collection(this.firestore, 'logins');

    let obj = { fecha: new Date(), "user": this.email}

    addDoc(col, obj)
      .then(() => {
        console.log(this.email + "s")
        console.log('Documento agregado con éxito');
        console.log(this.email + "s")
      })
      .catch((error) => {
        console.log(this.email + "s")
        console.error('Error al agregar documento: ', error);
        
      });
  }

  getData()
  {
    let col = collection(this.firestore, "logins");

    const filteredQuery = query(
      col, //where("user", "==", "matias.skene@gmail.com"), limit(2), orderBy("fecha", "desc")
    );
    
    const observable = collectionData(filteredQuery);

    this.sub = observable.subscribe((respuesta:any) => {
      this.loginsCollection = respuesta;

      this.countLogins = this.loginsCollection.length;

      console.log(respuesta);
    })
    
  }
  */



  loginUser()
  {
    signInWithEmailAndPassword(this.auth, this.email, this.password).then((res) => 
    {
      if ( res.user.email !== null) this.router.navigate(["/home"]);;

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

  redirectToSignIn() {
    this.router.navigate(["/singin"]);
  }
      
}
