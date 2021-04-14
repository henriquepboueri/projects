import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SharedModule } from './shared/shared.module';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';
import { LoginComponent } from './login/login.component';
// import { AppLoginComponent } from '.login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CovidAnamneseComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
