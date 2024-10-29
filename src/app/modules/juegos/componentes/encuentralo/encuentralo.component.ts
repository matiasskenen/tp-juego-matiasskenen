import { CommonModule } from '@angular/common'; // Asegúrate de importar esto
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // También si tienes formularios
import { DataService } from '../../../../service/data.service';
import { PuntuajeService } from '../../../../servicios/puntuaje.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-encuentralo',
  standalone: true,
  imports: [FormsModule, CommonModule], // Aquí debe estar `CommonModule`
  templateUrl: './encuentralo.component.html',
  styleUrls: ['./encuentralo.component.scss']
})
export class EncuentraloComponent implements AfterViewInit {

  resultado = "";
  tiempo = 0;
  time: number = 30; // Tiempo en segundos
  interval: any;
  isRunning: boolean = false;

  imagen!: string;
  imagenjugador!: string;

  juegoinica = false;

  playerPosition = { x: 0, y: 0 };

  puntuacion = 0;
  isLoading = false;

  nombreJugador : any;

  @ViewChild('mainImage') mainImage!: ElementRef<HTMLImageElement>;

  constructor(private authService: Auth, private puntuajeService : PuntuajeService) {

    this.nombreJugador = authService.currentUser?.email;

    this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Fondo%201.jpg?alt=media&token=2bbba74f-fa0f-4588-a2cd-e42b0a2e1be6";
    this.imagenjugador = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/wally-removebg-preview.png?alt=media&token=c7447115-6cc4-478a-9be6-a14a0ff0a921";
  }

  ngAfterViewInit() {
  }

  randomizePlayerPosition() {
    this.resultado = "";
    this.isLoading = true;

    if (this.mainImage) {
      const containerWidth = this.mainImage.nativeElement.offsetWidth;
      const containerHeight = this.mainImage.nativeElement.offsetHeight;
      const playerWidth = 20;
      const playerHeight = 20;

      this.playerPosition.x = Math.random() * (containerWidth - playerWidth);
      this.playerPosition.y = Math.random() * (containerHeight - playerHeight);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      console.log(`Posición X: ${this.playerPosition.x}, Posición Y: ${this.playerPosition.y}`);
    }
  }

  jugador() {
    console.log("new")
    this.resultado = "GANASTE"
    this.puntuacion += 1;
    this.puntuajeService.sendPuntuajeWally('encuentralo', this.puntuacion, this.time, this.nombreJugador);
    this.stopTimer();
    this.startTimer()

  }

  startTimer() {
    this.resetGame();
    this.juegoinica = true;
    this.randomizePlayerPosition();
  
    if (!this.isRunning && this.time > 0) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.time--;
  
        if (this.time <= 0) {
          this.stopTimer();
          this.resultado = "PERDISTE";
          this.puntuajeService.sendPuntuajeWally('encuentralo', this.puntuacion, "Perdedor", this.nombreJugador);
          this.puntuacion = 0;
        }
      }, 1000);
    }
  }

  resetGame() {
    this.time = 30; // Reinicia el tiempo a 30 segundos (o lo que desees)
    this.juegoinica = false; // Reinicia el estado del juego
  }


  stopTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  }



  getFormattedTime(): string {
    const minutes: number = Math.floor(this.time / 60);
    const seconds: number = this.time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
