import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';


@NgModule({
  declarations: [AhorcadoComponent, MayoromenorComponent],
  exports: [AhorcadoComponent, MayoromenorComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule 
{
  
}
