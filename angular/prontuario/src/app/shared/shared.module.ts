import { NgModule } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

import { NgxMaskModule } from 'ngx-mask';
import { SignaturePadModule } from 'angular2-signaturepad';

import { MaterialModule } from '../material.module';
import { SignatureFieldComponent } from './custom_components/signature-field/signature-field.component';

@NgModule({
  declarations: [SignatureFieldComponent],
  imports: [MaterialModule, SignaturePadModule, NgxMaskModule.forRoot()],
  exports: [MaterialModule, NgxMaskModule, SignatureFieldComponent],
  providers: [],
})
export class SharedModule {}
