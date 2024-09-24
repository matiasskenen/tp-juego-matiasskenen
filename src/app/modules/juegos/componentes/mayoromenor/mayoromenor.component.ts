import { Component } from '@angular/core';
import { CartasService } from '../../../../servicios/mayoromenor/cartas.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-mayoromenor',
  standalone: false,
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.scss'
})
export class MayoromenorComponent 
{
  mazoId: string = "";
  cartas: any[] = [];
  valorjugador : string = "";

  mazoIdMaquina: string = "";
  cartasMaquina: any[] = [];
  valorMaquina : string = "";

  resultado : string = "";
  resultadoBool : boolean = false;

  juegoinicia : boolean = false;

  constructor(private cartasServicio: CartasService) 
  {
  }

  async iniciarJuego() {
    // Crear el mazo
    this.mazoId = await this.cartasServicio.crearMazo();
    console.log("El mazo fue creado con el ID: ", this.mazoId);

    // Robar cartas
    this.cartas = await this.cartasServicio.robarCartas(this.mazoId, 1);
    console.log("Las cartas robadas son: ", this.cartas);

    this.cartas.forEach(carta => {
      console.log("El valor de la carta es: ", carta.value);
      this.valorjugador = carta.value;
    });
  }

  async juegoMaquina() {
    this.juegoinicia = true;
    // Crear el mazo
    this.mazoIdMaquina = await this.cartasServicio.crearMazo();
    console.log("El mazo fue creado con el ID: ", this.mazoIdMaquina);

    // Robar cartas
    this.cartasMaquina = await this.cartasServicio.robarCartas(this.mazoIdMaquina, 1);
    console.log("Las cartas robadas son: ", this.cartasMaquina);

    this.cartasMaquina.forEach(carta => {
      console.log("El valor de la carta es: ", carta.value);
      this.valorMaquina = carta.value;
    });
  }

  async validarMayor() {
    await this.juegoMaquina();  // Esperar que se robe la carta de la máquina

    // Convertir el valor del jugador y el de la máquina a números
    const valorJugador = this.convertirValorANumero(this.valorjugador);
    const valorMaquina = this.convertirValorANumero(this.valorMaquina);

    if (valorJugador > valorMaquina) {
      this.resultado = "Perdiste";
    } else if (valorJugador < valorMaquina) {
      this.resultado = "Ganaste";
    } else {
      this.resultado = "empate";
    }

    console.log("Validar MAYOR: JUGADOR: " + valorJugador)
    console.log("Validar MAYOR: Maquina: " + valorMaquina)
    this.resultadoBool = true;

    setTimeout(() => {
      this.juegoinicia = false;
      this.resultadoBool = false;
    }, 5000);
  }

  async validarMenor() {
    await this.juegoMaquina();  // Esperar que se robe la carta de la máquina

    // Convertir el valor del jugador y el de la máquina a números
    const valorJugador = this.convertirValorANumero(this.valorjugador);
    const valorMaquina = this.convertirValorANumero(this.valorMaquina);

    if (valorJugador < valorMaquina) {
      this.resultado = "Ganaste";
    } else if (valorJugador > valorMaquina) {
      this.resultado = "Perdiste";
    } else {
      this.resultado = "empate";
    }

    console.log("Validar Menor: JUGADOR: " + valorJugador)
    console.log("Validar Menor: Maquina: " + valorMaquina)
    this.resultadoBool = true;

    setTimeout(() => {
      this.juegoinicia = false;
      this.resultadoBool = false;
    }, 5000);
  }
  
  convertirValorANumero(valor: string) {
    switch (valor) {
      case "ACE":
        return 14;
      case "KING":
        return 13;
      case "QUEEN":
        return 12;
      case "JACK":
        return 11;
      default:
        return parseInt(valor, 10);
    }
  }

}
