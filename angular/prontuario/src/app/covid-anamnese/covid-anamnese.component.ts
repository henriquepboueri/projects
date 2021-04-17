import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchMedia } from '@angular/flex-layout/core/typings/match-media';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-covid-anamnese',
  templateUrl: './covid-anamnese.component.html',
  styleUrls: ['./covid-anamnese.component.css'],
})
export class CovidAnamneseComponent {
  public formCovid: FormGroup = new FormGroup({});
  public usaMedic: boolean = false;

  constructor(private _fb: FormBuilder) {
    this.formCovid = this._fb.group({
      medic_desc: '',
      usa_medic: false,
    });
  }

  onInit() {}

  onSubmit() {
    console.log(this.formCovid.value);
  }

  onUsaMedic(v: boolean) {
    this.usaMedic = v;
  }
}
