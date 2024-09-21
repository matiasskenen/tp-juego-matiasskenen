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

  constructor(private firestore: Firestore, private auth: Auth, private dataservice : DataService) 
  {
    console.log(auth.currentUser?.email);
    this.useractual = auth.currentUser?.email;
    this.getData()

  }


  getData() {
    const col = collection(this.firestore, 'chats'); // Obtiene la referencia a la colección

    const filteredQuery = query(
      col, 
      orderBy('fecha', 'asc'), // Ordena los mensajes por fecha en orden descendente
    );

    const observable = collectionData(filteredQuery);

    observable.subscribe((respuesta: any[]) => {
      this.loginsCollection = respuesta; // Almacena la respuesta en la variable loginsCollection
      console.log(this.loginsCollection); // Muestra los mensajes en la consola
    });
  
  }

  send() 
  {
    let col = collection(this.firestore, 'chats');

    let obj = { 
      fecha: new Date().toLocaleString('es-AR'),
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

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Aquí puedes insertar el mensaje en Firebase
      // Algo como:
      // addDoc(col, { message: this.newMessage, fecha: new Date(), user: 'matias.skene@gmail.com' });
      this.newMessage = ''; // Limpiar el campo de entrada
    }
  }

}
