import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { WordsService } from '../../../../servicios/palabras/words.service';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent 
{

  randomWord: string = "";
  hiddePalabra: string = "";
  incorrectas: string = "";
  error: boolean = true;
  acumuladorErrores: number = 0;
  resultadoMostra = false;
  imagen: string = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado0.png?alt=media&token=e59b363d-2452-457e-b205-ac15745a8019";
  gameover = false;
  win = false;
  mostrarResultado = false;
  letrasUsadas: string[] = []; // Array para almacenar letras ya utilizadas
  http = inject(HttpClient);

  puntuacion = 0;

  constructor(private palabras: WordsService) {
    this.palabraRandom();
  }

  palabraRandom(): void {
    this.palabras.getRandomWord().subscribe(wordList => {
      const palabrasFiltradas = wordList.filter(palabra => 
        palabra.length === 6 && !/[áéíóú]/i.test(palabra)
      );
  
      if (palabrasFiltradas.length > 0) {
        this.randomWord = palabrasFiltradas[Math.floor(Math.random() * palabrasFiltradas.length)];
        console.log(this.randomWord);
        this.hiddePalabra = this.randomWord.replace(/./g, "_ ");
        console.log(this.hiddePalabra);
      } else {
        console.log("No hay palabras disponibles sin acentos.");
      }
    });
  }
  
  letraSeleccionada(letra: string): void {
    if (this.gameover == false) {
      // Verificar si la letra ya fue utilizada
      if (this.letrasUsadas.includes(letra)) {
        console.log("Esta letra ya fue usada.");
        return; // Salir si ya fue utilizada
      }

      this.letrasUsadas.push(letra); // Agregar la letra a las usadas
      this.error = true; // Reiniciar el error para nueva letra
      console.log(letra);
      this.evaluarPalabra(letra);

    }
  }

  evaluarPalabra(letra: string): void {
    for (let i = 0; i < this.randomWord.length; i++) {
      if (this.randomWord[i] === letra.toLowerCase()) {
        this.hiddePalabra = this.replaceAt(this.hiddePalabra, letra, i * 2);
        this.error = false; // Cambiar a falso si la letra está correcta
      }
    }

    if (this.error) {
      this.letraIncorrecta(letra);
    }

    if (!this.hiddePalabra.includes("_")) 
    {
      this.mostrarResultado = true;
      this.win = true;
      this.puntuacion += 1;
      setTimeout(() => {
        this.volverAjugar();
      }, 2000);
    }
  }

  replaceAt(str: string, letra: string, index: number): string {
    return str.substr(0, index) + letra + str.substr(index + 1);
  }

  letraIncorrecta(letra: string): void {
    this.acumuladorErrores += 1;
    this.incorrectas += letra + " ";
    this.validarImagen();
  }

  validarImagen(): void {
    switch (this.acumuladorErrores) {
      case 0:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado0.png?alt=media&token=e59b363d-2452-457e-b205-ac15745a8019";
        break;
      case 1:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado1.png?alt=media&token=77d65f3f-2162-419e-84fd-3fa35653ebb3";
        break;
      case 2:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado2.png?alt=media&token=f14a6a89-032c-4a27-a351-3cae4e016a84";
        break;
      case 3:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado3.png?alt=media&token=3430f2d3-80ad-4b80-93e5-2e63e78271f7";
        break;
      case 4:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado4.png?alt=media&token=e236a7c4-f84b-444e-8fc9-9ae6d422ce74";
        break;
      case 5:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/Ahorcado5.png?alt=media&token=704ba0ae-fad4-44bc-8f1b-1e838c48d3b9";
        this.mostrarResultado = true;
        this.gameover = true;
        setTimeout(() => {
          this.volverAjugar();
        }, 2000);
        break;
    }
  }

  volverAjugar(): void {
    this.palabraRandom();
    this.validarImagen();
    this.mostrarResultado = false;
    this.acumuladorErrores = 0;
    this.gameover = false;
    this.incorrectas = "";
    this.letrasUsadas = [];
  }
}
