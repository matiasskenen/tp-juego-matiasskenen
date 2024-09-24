import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  private readonly API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

  constructor() { }

  // Función para crear un nuevo mazo de cartas
  async crearMazo(): Promise<string> {
    const response = await fetch(`${this.API_BASE_URL}new/shuffle/`);
    const data = await response.json();
    return data.deck_id;
  }

  // Función para robar cartas del mazo
  async robarCartas(mazoId: string, numberOfCards: number): Promise<any[]> {
    const response = await fetch(`${this.API_BASE_URL}${mazoId}/draw/?count=${numberOfCards}`);
    const data = await response.json();
    return data.cards;
  }

  // Función para mostrar las imágenes de las cartas
  mostrarCartas(cartas: any[], nombreDiv: string): void {
    const dImagenesCartas = document.getElementById(nombreDiv);
    if (dImagenesCartas) {
      dImagenesCartas.innerHTML = "";

      cartas.forEach(carta => {
        const imagenCarta = document.createElement("img");
        imagenCarta.src = carta.image;
        imagenCarta.classList.add("carta");
        imagenCarta.onclick = () => {
          alert(`${carta.value} of ${carta.suit}`);
        };
        imagenCarta.alt = `${carta.value} of ${carta.suit}`;
        dImagenesCartas.appendChild(imagenCarta);
      });
    }
  }
}
