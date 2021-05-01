import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CovidRoutingModule } from './covid.routing.module';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';



@NgModule({
  declarations: [
    CovidAnamneseComponent
  ],
  imports: [
    SharedModule,
    CovidRoutingModule
  ]
})
export class CovidModule { }
