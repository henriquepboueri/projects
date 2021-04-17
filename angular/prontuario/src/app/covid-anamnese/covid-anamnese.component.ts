import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

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
      data_cadastro: new Date(),
      diag_covid: false,
      febre: false,
      prob_resp: false,
      viagem: false,
      contato_infect: false,
      contato_sintomas: false,
      part_reuniao: false,
      prob_card_resp: false,
      prob_outro: false,
      usa_medic: false,
      medic_desc: '',
      temperatura: 0,
      obs: '',
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
