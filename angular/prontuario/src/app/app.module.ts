import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignaturePad, SignaturePadModule } from 'angular2-signaturepad';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CovidAnamneseComponent } from './covid-anamnese/covid-anamnese.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CovidAnamneseComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SignaturePadModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
    { provide: LOCALE_ID, useValue: 'pt-PT' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
