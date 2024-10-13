import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { EncuentraloComponent } from './componentes/encuentralo/encuentralo.component';

const routes: Routes = [
  {
    path: "juego-1",
    component: AhorcadoComponent
  },
  {
    path: "juego-2",
    component: MayoromenorComponent
  },
  {
    path: "juego-3",
    component: PreguntadosComponent
  },
  {
    path: "juego-4",
    component: EncuentraloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule 
{ 

}
