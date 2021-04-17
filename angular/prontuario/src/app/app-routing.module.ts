import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';

const routes: Routes = [
  {
    path: 'covid',
    // outlet: 'nav-router',
    component: MainNavComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: CovidAnamneseComponent }],
  },
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
