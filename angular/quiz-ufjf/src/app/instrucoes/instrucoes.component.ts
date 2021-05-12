import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.css'],
})
export class InstrucoesComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
