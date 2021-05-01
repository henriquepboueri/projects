import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMaskModule } from 'ngx-mask';
import { SignaturePadModule } from 'angular2-signaturepad';

import { MaterialModule } from '../material.module';
import { SignatureFieldComponent } from './custom_components/signature-field/signature-field.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { InputAutocompleteComponent } from './custom_components/input-autocomplete/input-autocomplete.component';

@NgModule({
  declarations: [
    SignatureFieldComponent,
    MainNavComponent,
    InputAutocompleteComponent
  ],
  imports: [
    MaterialModule,
    SignaturePadModule,
    NgxMaskModule.forRoot(),
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule,
    MaterialModule,
    NgxMaskModule,
    SignatureFieldComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [],
})
export class SharedModule {}
