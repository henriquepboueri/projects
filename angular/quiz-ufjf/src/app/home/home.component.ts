import { Component, OnInit, ViewChild } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  answeredQuiz: boolean
  constructor () {}

  ngOnInit (): void {
    this.answeredQuiz = !!localStorage.getItem('answeredQuiz')
  }
}
