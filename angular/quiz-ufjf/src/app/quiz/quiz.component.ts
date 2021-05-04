import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Question } from '../models/question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  matricula: '';
  title = 'quiz-ufjf';
  timer = '00:00';
  timerInt = 0;
  interval: any;
  timerSubscription: Subscription;
  currentQuestionIndex = 0;
  answers = [];
  rightAnswers = [];
  finishedAnswering = false;
  disabledNextSubmitBtn = true;
  questions: Question[];

  constructor(
    private _service: QuestionsService,
    private _firebase: FirebaseService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*this._firestore
      .collection('resultados')
      .get()
      .subscribe((res) => {
        res.forEach((doc) => console.log(doc.data()));
      });*/
    this._route.queryParams.subscribe((params) => {
      if (params['matricula']) {
        this.matricula = params['matricula'];
      }
    });
    this.questions = this._service.getQuestions();
    this.timerSubscription = interval(1000).subscribe({
      next: (val) => {
        this.timerInt = val;
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
      this.timerSubscription.unsubscribe();
      this._firebase
        .postResultado({
          acertos: this.rightAnswers.length,
          matricula: this.matricula,
          tempo: this.timerInt,
        })
        .then((res) => {
          console.log(res);
        });
      return;
    }
    this.currentQuestionIndex++;
    this.disabledNextSubmitBtn = true;
  }

  onPrevious() {
    if (this.currentQuestionIndex === 0) return;
    this.currentQuestionIndex--;
  }

  onChosenOption(event) {
    this.disabledNextSubmitBtn = false;
    this.answers[event.questionId - 1] = event;
  }
}
