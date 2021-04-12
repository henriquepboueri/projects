import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';

const routes: Routes = [{
  path: "covid",
  component: CovidAnamneseComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
