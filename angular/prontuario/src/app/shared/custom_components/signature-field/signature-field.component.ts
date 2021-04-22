import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFieldComponent),
      multi: true,
    },
  ],
})
export class SignatureFieldComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  @Input() public options: Object = {};
  private _signature: any = null;
  public propagateChange: Function = null;

  constructor() {}

  public get signature(): any {
    return this._signature;
  }

  public set signature(value: any) {
    this._signature = value;
    this.propagateChange(this.signature);
  }

  writeValue(value: any): void {
    console.log(value);
    if (!value) {
      return;
    }

    this._signature = value;

    if (this.signaturePad) {
      this.signaturePad.fromDataURL(this.signature);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {
    console.log('Draw completed');
    // this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
    this.signature = this.signaturePad.toDataURL('image/png', 1);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  ngOnInit(): void {
    this.options = { canvasHeight: 150, canvasWidth: 300 };
  }

  public ngAfterViewInit(): void {
    // this.signaturePad.clear();
    this.signaturePad.fromDataURL(this.signature);
  }
}
