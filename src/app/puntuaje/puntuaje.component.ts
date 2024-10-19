import { Component } from '@angular/core';
import { PuntuajeService } from '../servicios/puntuaje.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puntuaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puntuaje.component.html',
  styleUrls: ['./puntuaje.component.scss']
})

export class PuntuajeComponent {
  puntuaciones: any[] = [];
  valorTabla : string;

  constructor(private puntuajeService: PuntuajeService) 
  {
    this.valorTabla = "";
  }

  datos(valor : string) {
    this.puntuajeService.getData(valor).subscribe((data: any[]) => {
      this.puntuaciones = data; // Almacena los datos en el array
      console.log(this.puntuaciones); // Muestra los datos en la consola
    });
  }

  valor(valor : string)
  {
    this.valorTabla = valor;
    this.datos(valor);
  }
}
