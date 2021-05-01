import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { MainNavComponent } from './shared/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: MainNavComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./modules/paciente/paciente.module').then(
        (m) => m.PacienteModule
      ),
  },
  {
    path: 'covid',
    loadChildren: () =>
      import('./modules/covid/covid.module').then((m) => m.CovidModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
