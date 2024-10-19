import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Firestore, collection, collectionData,setDoc, DocumentData, doc, addDoc } from '@angular/fire/firestore';
import { orderBy, query, where } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private firestore: Firestore, private auth: Auth) 
  { }

  sendPuntuaje(nombreDeEncuesta : string, edadData : number, telefonoData : number, valor1: string, valor2: string) 
  {
    let col = collection(this.firestore, "encuesta");

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
      nombre: nombreDeEncuesta,
      edad: edadData,
      telefono: telefonoData,
      calificacionPage : valor1,
      interesPage: valor2
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
