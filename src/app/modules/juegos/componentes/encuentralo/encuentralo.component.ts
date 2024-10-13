import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuentralo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './encuentralo.component.html',
  styleUrls: ['./encuentralo.component.scss']
})
export class EncuentraloComponent {
  imagen!: string;
  imagenjugador!: string;

  playerPosition = { x: 0, y: 0 };

  constructor() {
    this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/mati1.jpg?alt=media&token=a885a5b9-b62c-4fd8-a58f-ed46e63071e9";
    this.imagenjugador = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/wally-removebg-preview.png?alt=media&token=c7447115-6cc4-478a-9be6-a14a0ff0a921";
  }

  jugador() {
    console.log("ganaste");
  }

  randomizePlayerPosition() {
    const containerWidth = 800; // Ajusta según el ancho de tu contenedor
    const containerHeight = 600; // Ajusta según la altura de tu contenedor
    const playerWidth = 100; // Ancho de la imagen del jugador
    const playerHeight = 100; // Altura de la imagen del jugador

    // Generar posiciones aleatorias


    this.playerPosition.x = Math.random() * (containerWidth - playerWidth)
    this.playerPosition.y = Math.random() * (containerHeight - playerHeight - 500) + 500;

    console.log(this.playerPosition.x)
    console.log(this.playerPosition.y)
  }
}
