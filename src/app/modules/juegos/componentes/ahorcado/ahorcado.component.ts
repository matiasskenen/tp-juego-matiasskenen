import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { WordsService } from '../../../../servicios/palabras/words.service';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {
  randomWord: string = "";
  hiddePalabra: string = "";
  incorrectas: string = "";
  error: boolean = true;
  acumuladorErrores : number = 0;
  imagen : string = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado0.jpg?alt=media&token=f1cbea74-11e6-4dd5-b5d5-756219a250e7"
  gameover = false;
  win = false;
  http = inject(HttpClient);
  
  constructor(private palabras: WordsService) {
    this.palabraRandom();
  }

  palabraRandom(): void {
    this.palabras.getRandomWord().subscribe(wordList => {
      // Filtrar palabras sin acentos
      const palabrasFiltradas = wordList.filter(palabra => 
        palabra.length === 6 && !/[áéíóú]/i.test(palabra)
      );
  
      // Asegúrate de que haya palabras disponibles sin acentos
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
  
  letraSeleccionada(letra: string): void 
  {
    if(this.gameover == false)
    {
      this.error = true; // reiniciar el error para nueva letra
      console.log(letra);
      this.evaluarPalabra(letra);
    }else
    {

    }

  }

  evaluarPalabra(letra: string): void 
  {
    for (let i = 0; i < this.randomWord.length; i++) {
      if (this.randomWord[i] === letra.toLowerCase()) {
        this.hiddePalabra = this.replaceAt(this.hiddePalabra, letra, i * 2);
        this.error = false; // Cambiar a falso si la letra está correcta
      }
    }

    if (this.error) 
    {
      this.letraIncorrecta(letra);
    }

    if (!this.hiddePalabra.includes("_")) 
    {
      this.win = true;
      console.log("¡Ganaste!");
    }
  }

  letraIncorrecta(letra: string): void 
  {
    this.acumuladorErrores += 1;
    this.incorrectas += letra + " ";
    this.validarImagen()
  }

  validarImagen()
  {
    switch (this.acumuladorErrores)
    {
      case 0:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado0.jpg?alt=media&token=f1cbea74-11e6-4dd5-b5d5-756219a250e7";
      break;
      case 1:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado1.jpg?alt=media&token=c9e9a585-43c0-4808-a5d1-70c2248ea064";
      break;
      case 2:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado2.jpg?alt=media&token=5125a7c8-c351-4068-a9bb-03fda1b44c3c";
      break;
      case 3:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado3.jpg?alt=media&token=29a3734f-8e1e-4930-a543-db4e3f9587bf";
      break;
      case 4:
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/tp-juegos-labo4.appspot.com/o/ahoracado4.jpg?alt=media&token=3a343fa3-25cf-4f7b-b310-c4095720fcff";
        this.gameover = true;
      break;
    }
    
  } 

  volverAjugar()
  {
    this.acumuladorErrores = 0;
    this.gameover = false;
    this.incorrectas = "";
    this.palabraRandom()
    this.validarImagen()


  }

  replaceAt(str: string, letra: string, index: number): string {
    return str.substr(0, index) + letra + str.substr(index + 1);
  }
}
