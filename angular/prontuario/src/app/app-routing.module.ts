import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';

const routes: Routes = [
  {
    path: 'covid',
    // outlet: 'nav-router',
    component: MainNavComponent,
    children: [{ path: '', component: CovidAnamneseComponent }],
  },
  {
    path: 'home',
    component: MainNavComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
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
