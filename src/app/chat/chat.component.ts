import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Firestore, collection, collectionData,setDoc, DocumentData, doc, addDoc } from '@angular/fire/firestore';
import { orderBy, query, where } from 'firebase/firestore';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent 
{
  private sub!: Subscription;
  public loginsCollection : any [] = [];
  useractual : any;
  newMessage: string = '';

  isLocked = true;

  constructor(private firestore: Firestore, private auth: Auth, private dataservice : DataService) 
  {
    console.log(auth.currentUser?.email);
    this.useractual = auth.currentUser?.email;
    this.getData()

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLocked = false;
        console.log("Usuario autenticado:", user);
        this.dataservice.setUser(user)
      } else {
        console.log("No hay usuario autenticado.");
      }
    });

  }


  getData() {
    const col = collection(this.firestore, 'chats'); // Obtiene la referencia a la colección

    const filteredQuery = query(
      col, 
      orderBy('fecha', 'desc'), // Ordena los mensajes por fecha en orden descendente
    );

    const observable = collectionData(filteredQuery);

    observable.subscribe((respuesta: any[]) => {
      this.loginsCollection = respuesta; // Almacena la respuesta en la variable loginsCollection
      console.log(this.loginsCollection); // Muestra los mensajes en la consola
    });
  
  }

send() {
  if(this.isLocked == false) {
    let col = collection(this.firestore, 'chats');

    // Cambiamos el formato de la fecha y hora
    let now = new Date();
    let formattedDate = now.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Formato 24 horas
    });

    let obj = { 
      fecha: formattedDate,
      user: this.auth.currentUser?.email,
      message: this.newMessage
    };

    this.newMessage = "";

    addDoc(col, obj)
      .then(() => {
        console.log('Documento agregado con éxito');
      })
      .catch((error) => {
        console.error('Error al agregar documento: ', error);
      });
  }
}

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Aquí puedes insertar el mensaje en Firebase
      // Algo como:
      // addDoc(col, { message: this.newMessage, fecha: new Date(), user: 'matias.skene@gmail.com' });
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }

}
