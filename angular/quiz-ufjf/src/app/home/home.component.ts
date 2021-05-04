import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('#matricula') matricula;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  chamaQuiz(matricula) {
    this._router.navigate(['quiz'], { queryParams: { matricula: matricula } });
  }
}
