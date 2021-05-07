import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('#matricula') matricula;
  matriculaControl = new FormControl('', [Validators.required, Validators.pattern('')])

  constructor() {}

  ngOnInit(): void {}


}
