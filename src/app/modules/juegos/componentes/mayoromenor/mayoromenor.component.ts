import { Component } from '@angular/core';
import { CartasService } from '../../../../servicios/mayoromenor/cartas.service';
import { timeout } from 'rxjs';
import { PuntuajeService } from '../../../../servicios/puntuaje.service';
import { DataService } from '../../../../service/data.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-mayoromenor',
  standalone: false,
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.scss'
})
export class MayoromenorComponent 
{
  mazoIdJugador: string = "";
  cartasJugador: any[] = [];
  valorjugador : string = "";

  mazoIdMaquina: string = "";
  cartasMaquina: any[] = [];
  valorMaquina : string = "";

  resultado : string = "";
  resultadoBool : boolean = false;

  juegoinicia : boolean = false;

  puntuacion = 0;
  vidas = 3;

  mostrarResultado = false;
  resultadoJuego! : string;

  nombreJugador : any;


  constructor(private cartasServicio: CartasService, private puntuajeService : PuntuajeService, private authService: Auth) 
  {
    this.nombreJugador = authService.currentUser?.email;
  }

  async iniciarJuego() {
    // Crear el mazo
    this.mazoIdJugador = await this.cartasServicio.crearMazo();
    console.log("El mazo fue creado con el ID: ", this.mazoIdJugador);

    // Robar cartas
    this.cartasJugador = await this.cartasServicio.robarCartas(this.mazoIdJugador, 1);
    console.log("Las cartas robadas son: ", this.cartasJugador);

    this.cartasJugador.forEach(carta => {
      console.log("El valor de la carta es: ", carta.value);
      this.valorjugador = carta.value;
    });
  }

  async juegoMaquina() 
  {
    this.juegoinicia = true;

    this.cartasMaquina = await this.cartasServicio.robarCartas(this.mazoIdJugador, 1);
    console.log("Las cartas robadas son: ", this.cartasMaquina);

    this.cartasMaquina.forEach(carta => {
      console.log("El valor de la carta es: ", carta.value);
      this.valorMaquina = carta.value;
    });

  }

  async validarMayor() 
  {
    if(this.vidas != 0)
    {
      await this.juegoMaquina();  // Esperar que se robe la carta de la máquina

      // Convertir el valor del jugador y el de la máquina a números
      const valorJugador = this.convertirValorANumero(this.valorjugador);
      const valorMaquina = this.convertirValorANumero(this.valorMaquina);
      
      if (valorJugador > valorMaquina) {
        this.resultado = "Perdiste";
        this.vidas -= 1;
      } else if (valorJugador < valorMaquina) {
        this.resultado = "Ganaste";
        this.puntuacion += 1;
      } else {
        this.resultado = "empate";
      }
      
  
      console.log("Validar MAYOR: JUGADOR: " + valorJugador)
      console.log("Validar MAYOR: Maquina: " + valorMaquina)
  
      this.resultadoBool = true;
      this.cartasJugador = this.cartasMaquina;
      this.valorjugador = this.valorMaquina;
    }
    else
    {
      this.puntuajeService.sendPuntuaje('mayorMenor', this.puntuacion, this.nombreJugador);
      console.log("enviado")
      this.puntuacion = 0;
      this.mostrarResultado = true;
      this.resultadoJuego = "Perdiste"

      setTimeout(() => {
        this.mostrarResultado = false;
        this.vidas = 3;
        this.iniciarJuego();
      }, 1000);

    }
  }

  async validarMenor() 
  {
    if(this.vidas != 0)
    {
      await this.juegoMaquina();  // Esperar que se robe la carta de la máquina

      // Convertir el valor del jugador y el de la máquina a números
      const valorJugador = this.convertirValorANumero(this.valorjugador);
      const valorMaquina = this.convertirValorANumero(this.valorMaquina);
  
      if (valorJugador < valorMaquina) {
        this.resultado = "Perdiste";
        this.vidas -= 1;
      } else if (valorJugador > valorMaquina) {
        this.resultado = "Ganaste";
        this.puntuacion += 1;
      } else {
        this.resultado = "empate";
      }
  
      console.log("Validar Menor: JUGADOR: " + valorJugador)
      console.log("Validar Menor: Maquina: " + valorMaquina)
      this.resultadoBool = true;
  
      this.valorjugador = this.valorMaquina;
      this.cartasJugador = this.cartasMaquina;
    }
    else
    {
      this.puntuajeService.sendPuntuaje('mayorMenor', this.puntuacion, this.nombreJugador);
      console.log("enviado")
      this.puntuacion = 0;
      this.mostrarResultado = true;
      this.resultadoJuego = "Perdiste"

      setTimeout(() => {
        this.mostrarResultado = false;
        this.vidas = 3;
        this.iniciarJuego();
      }, 1000);

    }
  }

  
  convertirValorANumero(valor: string) {
    switch (valor) {
      case "ACE":
        return 1;
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
