import { Component } from '@angular/core';

import { interval } from 'rxjs';

import { Question } from './models/question.model';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'quiz-ufjf';
  timer = '00:00';
  interval: any;
  timerSubscription: any;
  currentQuestionIndex = 0;
  // answers: [{ questionId: number; answerId: number }] = [];
  answers = [];
  rightAnswers = [];
  finishedAnswering = false;
  questions: Question[];

  constructor(private _service: QuestionsService) {}

  ngOnInit(): void {
    this.questions = this._service.getQuestions();
    this.timerSubscription = interval(1000).subscribe({
      next: (val) => {
        this.timer = this.parseTime(val);
      },
    });
  }

  stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onNextSubmit() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.rightAnswers = this.answers.filter((answer) => {
        return (
          answer.answerId ===
          this.questions.find((q) => {
            return q.id === answer.questionId;
          }).answerIndex
        );
      });
      this.finishedAnswering = true;
      return;
    }
    this.currentQuestionIndex++;
  }

  onPrevious() {
    if (this.currentQuestionIndex === 0) return;
    this.currentQuestionIndex--;
  }

  onChosenOption(event) {
    this.answers[event.questionId - 1] = event;
  }
}
