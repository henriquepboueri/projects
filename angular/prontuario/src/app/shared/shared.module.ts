import { NgModule } from '@angular/core';

import { NgxMaskModule } from 'ngx-mask';

import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [],
  imports: [MaterialModule, NgxMaskModule.forRoot()],
  exports: [MaterialModule, NgxMaskModule],
  providers: [],
})
export class SharedModule {}
