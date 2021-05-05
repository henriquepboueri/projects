import { ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Question } from '../models/question.model';
import { QuestionHostDirective } from '../question-host.directive';
import { QuestionComponent } from '../question/question.component';
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
  // @ViewChild(QuestionComponent) question: QuestionComponent;
  @ViewChild(QuestionHostDirective, { static: true })
  questionHost: QuestionHostDirective;

  constructor(
    private _service: QuestionsService,
    private _firebase: FirebaseService,
    private _route: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      if (params['matricula']) {
        this.matricula = params['matricula'];
      }
    });
    this.questions = this._service.getQuestions();
    this.loadComponent();
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

  onChosenOption(answer) {
    console.log(answer);
    this.disabledNextSubmitBtn = false;
    this.answers[answer.questionId - 1] = answer;
  }

  loadComponent() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      QuestionComponent
    );
    const viewContainerRef = this.questionHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<QuestionComponent>(
      componentFactory
    );
    componentRef.instance.question = this.questions[0];
    componentRef.instance.chosenOption.subscribe(this.onChosenOption);
  }
}
