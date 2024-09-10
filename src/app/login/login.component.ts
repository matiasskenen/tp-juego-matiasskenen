import { CommonModule } from '@angular/common';import { Component } from '@angular/core';
import { Firestore, collection, collectionData,setDoc, DocumentData, doc, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public   user: string = '';
  public countLogins: number = 0;
  public loginsCollection : any [] = [];
  constructor(private firestore: Firestore)
  {
  }

  login() {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), "user": this.user, hoy: "mañana" })
      .then(() => {
        console.log(this.user + "s")
        console.log('Documento agregado con éxito');
        console.log(this.user + "s")
      })
      .catch((error) => {
        console.log(this.user + "s")
        console.error('Error al agregar documento: ', error);
        
      });

      
  }



}
