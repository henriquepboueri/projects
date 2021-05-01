import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainNavComponent } from 'src/app/shared/main-nav/main-nav.component';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CovidAnamneseComponent },
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
export class CovidRoutingModule {}
