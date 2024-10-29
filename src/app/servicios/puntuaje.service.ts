import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Firestore, collection, collectionData,setDoc, DocumentData, doc, addDoc } from '@angular/fire/firestore';
import { orderBy, query, where } from 'firebase/firestore';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class PuntuajeService {

  private sub!: Subscription;
  public loginsCollection : any [] = [];
  useractual : any;
  newMessage: string = '';

  nameGame = "";
  puntosJugador = 0;
  jugador = "";

  constructor(private firestore: Firestore, private auth: Auth, private dataservice : DataService) 
  {

  }

  getData(valor : string): Observable<any[]> {
    const col = collection(this.firestore, valor);

    const filteredQuery = query(
      col, 
      orderBy('fecha', 'desc')
    );

    return collectionData(filteredQuery); // Retorna el observable
  }

  


  sendPuntuaje(nameGame : string, puntosJugador : number, jugador : string) {
      console.log(nameGame)
      let col = collection(this.firestore, nameGame);
  
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
        juego: nameGame,
        puntos: puntosJugador,
        nombre: jugador
      };

  
      addDoc(col, obj)
        .then(() => {
          console.log('Documento agregado con éxito');
        })
        .catch((error) => {
          console.error('Error al agregar documento: ', error);
        });
    
  }

  sendPuntuajeWally(nameGame : string, puntosJugador : number, tiempo: any, jugador : string) {
    console.log(nameGame)
    let col = collection(this.firestore, nameGame);

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
      juego: nameGame,
      puntos: puntosJugador,
      tiempo: tiempo,
      nombre: jugador
    };


    addDoc(col, obj)
      .then(() => {
        console.log('Documento agregado con éxito');
      })
      .catch((error) => {
        console.error('Error al agregar documento: ', error);
      });
  
}



}


