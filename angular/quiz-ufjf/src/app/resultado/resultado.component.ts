import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent implements OnInit {
  rightAnswers = [];
  timer = '';

  constructor(private route: ActivatedRoute, private _router: Router) {
    const state = this._router.getCurrentNavigation().extras.state;
    this.rightAnswers = state['answers'];
    this.timer = state['timer'];
  }

  ngOnInit() {
    // this.errorMessage = this.route.snapshot.data['message'];
    // console.log(this._router.getCurrentNavigation().extras.state);
  }
}
