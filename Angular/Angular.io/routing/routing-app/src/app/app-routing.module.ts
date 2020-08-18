import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

import { MyGuardGuard } from './my-guard.guard';
import { MySecondGuard } from './my-second.guard';

const routes: Routes = [
  {
    path: 'first-component',
    component: FirstComponent,
    canActivate: [MyGuardGuard],
    canDeactivate: [MySecondGuard],
  },
  { path: 'second-component', component: SecondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
