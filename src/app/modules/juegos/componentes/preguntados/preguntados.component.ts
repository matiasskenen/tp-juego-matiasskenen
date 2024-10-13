import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})



export class PreguntadosComponent {

  api!:any;
  jsoncharacters! : any;

  valor1!:string;
  valor2!:string;
  valor3!:string;

  imagen!:string;

  respuestaMaquina! : string;
  resultado!:any;

  puntuacion = 0;
  vidas = 3;
  constructor()
  {
    this.getCharacters()
  }

  getCharacters = async () => {
    try {
      const api = await fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=20");
      const jsoncharacters: any[] = await api.json();
  
      // Asigna la imagen y la respuesta correcta
      if (jsoncharacters.length >= 3) {
        this.imagen = jsoncharacters[0].image; // Imagen del primer personaje
        this.respuestaMaquina = jsoncharacters[0].character
        const respuestas: string[] = [
          jsoncharacters[0].character, // Respuesta correcta
          jsoncharacters[1].character, // Respuesta incorrecta
          jsoncharacters[2].character  // Respuesta incorrecta
        ];

        // Genera un índice aleatorio para la respuesta correcta
        const randomIndex = Math.floor(Math.random() * 3);

        // Intercambia la respuesta correcta con la posición aleatoria
        switch (randomIndex) {
          case 0:
            this.valor1 = respuestas[0]; // Respuesta correcta
            this.valor2 = respuestas[1];
            this.valor3 = respuestas[2];
            break;
          case 1:
            this.valor1 = respuestas[1];
            this.valor2 = respuestas[0]; // Respuesta correcta
            this.valor3 = respuestas[2];
            break;
          case 2:
            this.valor1 = respuestas[2];
            this.valor2 = respuestas[1];
            this.valor3 = respuestas[0]; // Respuesta correcta
            break;
        }
      } else {
        console.error("No hay suficientes personajes disponibles.");
      }

    } catch (error) {
      console.error("Error al recuperar los personajes:", error);
    }
  };

  validarBoton(valor:number)
  {
    switch(valor)
    {
      case 1:
        if(this.valor1 == this.respuestaMaquina)
        {
          this.puntuacion += 1;
          this.resultado = "Ganaste"
        }
        else
        {
          this.resultado = "Perdiste"
          this.vidas -= 1;
        }


      break;
      case 2:
        if(this.valor2 == this.respuestaMaquina)
          {
            this.puntuacion += 1;
            this.resultado = "Ganaste"
          }
          else
          {
            this.resultado = "Perdiste"
            this.vidas -= 1;
          }
      break;
      case 3:
        if(this.valor3 == this.respuestaMaquina)
          {
            this.puntuacion += 1;
            this.resultado = "Ganaste"
          }
          else
          {
            this.resultado = "Perdiste"
            this.vidas -= 1;
          }
      break;
    }

    setTimeout(() => {
      this.resultado = null;
      this.getCharacters()
      this.imagen = "";
    }, 2000);
    
  }

}
