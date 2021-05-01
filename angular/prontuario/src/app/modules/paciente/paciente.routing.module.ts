// import { AdminGuard } from './guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { PacienteListaComponent } from './paciente-lista/paciente-lista.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AuthGuard], // necessita estar logado
    children: [
      { path: '', component: PacienteListaComponent },
      // { path: "add", component: PacienteAddComponent },
      // { path: ":id", component: PacienteComponent },
      // { path: "edit/:id", component: PacienteEditComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}
