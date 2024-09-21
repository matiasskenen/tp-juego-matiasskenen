import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {

  words = ["casa", "auto"];
  palabrasecreta = this.words[Math.floor(Math.random() * this.words.length)];
  hiddePalabra = this.palabrasecreta.replace(/./g, "_ ");
  
  constructor()
  {
    this.logWord();
  }
  
  
  logWord() {
    console.log(this.hiddePalabra); // Se mostrará la palabra secreta en la consola
  }

  letraSeleccionada(letra:string)
  {
    console.log(letra)
  }

  evaluarPalabra()
  {
    for(let i = 0; i<this.palabrasecreta.length; i++)
    {
      if()
    }
  }
}
