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
    this._matricula = val.trim().toUpperCase();
  }

  constructor() {}

  ngOnInit(): void {}
}
