import { ComponentFactoryResolver } from '@angular/core'
import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Subscription, interval } from 'rxjs'

import { FirebaseService } from '../firebase.service'
import { Question } from '../models/question.model'
import { QuestionHostDirective } from '../question-host.directive'
import { QuestionComponent } from '../question/question.component'
import { QuestionsService } from '../questions.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  matricula: ''
  title = 'quiz-ufjf'
  timerInt = 0
  interval: any
  timerSubscription: Subscription
  currentQuestionIndex = 0
  answers = []
  rightAnswers = []
  finishedAnswering = false
  disabledNextSubmitBtn = true
  questions: Question[]
  @ViewChild(QuestionHostDirective, { static: true })
  questionHost: QuestionHostDirective

  constructor (
    private _service: QuestionsService,
    private _firebase: FirebaseService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _snack: MatSnackBar
  ) {}

  ngOnInit (): void {
    this._route.queryParams.subscribe(params => {
      if (params['matricula']) {
        this.matricula = params['matricula']
      }
    })
    this.questions = this._service.getQuestions()
    this.loadComponent()
    this.timerSubscription = interval(1000).subscribe({
      next: seconds => {
        this.timerInt = seconds
      }
    })
  }

  stopTimer () {
    this.timerSubscription.unsubscribe()
  }

  onNextSubmit () {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      // filtra as respostas corretas
      this.rightAnswers = this.answers.filter(answer => {
        return (
          answer.answerId ===
          this.questions.find(q => {
            return q.id === answer.questionId
          }).answerIndex
        )
      })
      this.timerSubscription.unsubscribe()
      // persiste no Firestore
      this._firebase
        .postResultado({
          acertos: this.rightAnswers.length,
          matricula: this.matricula,
          tempo: this.timerInt,
          timestamp: new Date().toLocaleString()
        })
        .then(_ => {
          this.setLocalStorage()
          this.finishedAnswering = true
          this._router.navigate(['resultado'], {
            state: {
              timer: this.timerInt,
              answers: this.rightAnswers,
              matricula: this.matricula
            }
          })
        })
        .catch(reason => {
          // this._snack.open(`Erro: ${reason.message}`);
          let errorMsg = ''
          switch (reason.message) {
            case 'Missing or insufficient permissions.':
              errorMsg = 'Matrícula já participou do jogo!'
              break
          }
          this._snack.open(`Erro: ${errorMsg || reason.message}`, 'Fechar', {
            duration: 5000
          })
        })
      return
    }
    this.currentQuestionIndex++
    this.disabledNextSubmitBtn = true
    this.loadComponent()
  }

  onPrevious () {
    if (this.currentQuestionIndex === 0) return
    this.currentQuestionIndex--
    this.loadComponent()
  }

  onChosenOption (answer) {
    this.disabledNextSubmitBtn = false
    this.answers[answer.questionId - 1] = answer
  }

  loadComponent () {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      QuestionComponent
    )
    const viewContainerRef = this.questionHost.viewContainerRef
    viewContainerRef.clear()
    const componentRef = viewContainerRef.createComponent<QuestionComponent>(
      componentFactory
    )
    componentRef.instance.question = this.questions[this.currentQuestionIndex]
    componentRef.instance.chosenOption.subscribe(option => {
      this.onChosenOption(option)
    })
  }

  setLocalStorage () {
    localStorage.setItem('answeredQuiz', '1')
  }
}
