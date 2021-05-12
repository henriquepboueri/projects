import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.css'],
})
export class InstrucoesComponent implements OnInit {
  private _matricula = '';
  get matricula() {
    return this._matricula.trim();
  }
  set matricula(val) {
    console.log(val);
    this._matricula = val.trim();
  }
  public patrocinadores = [
    {
      empresa: 'Bar do Fred',
      logo: '../../assets/logo_bar_fred.jpg',
      socials: 'https://www.instagram.com/bardofredgv',
    },
    {
      empresa: 'Versenza Clinic',
      logo: '../../assets/logo_versenza_clinic.jpg',
      socials: 'https://www.instagram.com/versenzaclinic',
    },
  ];

  onInput(event) {
    console.log(event.data);
  }
  constructor() {}

  ngOnInit(): void {}
}
