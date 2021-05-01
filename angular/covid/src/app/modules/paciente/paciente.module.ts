import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';
import { PacienteDetalhesComponent } from './paciente-detalhes/paciente-detalhes.component';
import { PacientesRoutingModule } from './paciente.routing.module';



@NgModule({
  declarations: [
    PacienteListaComponent,
    PacienteDetalhesComponent
  ],
  imports: [
    SharedModule,
    PacientesRoutingModule
  ]
})
export class PacienteModule { }
