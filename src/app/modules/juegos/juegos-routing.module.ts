import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';

const routes: Routes = [
  {
    path: "juego-1",
    component: AhorcadoComponent
  },
  {
    path: "juego-2",
    component: MayoromenorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule 
{ 

}
