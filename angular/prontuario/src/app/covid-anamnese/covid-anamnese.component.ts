import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-covid-anamnese',
  templateUrl: './covid-anamnese.component.html',
  styleUrls: ['./covid-anamnese.component.css'],
})
export class CovidAnamneseComponent {
  public formCovid: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formCovid = this._fb.group(['']);
  }

  onSubmit() {}
}
