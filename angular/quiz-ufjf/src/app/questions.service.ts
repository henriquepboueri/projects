import { Injectable } from '@angular/core';
import { Question } from './models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  questions: Question[] = [
    {
      id: 1,
      text: 'Quem veio primeiro: o ovo ou a galinha?',
      options: [
        { id: 1, text: 'O ovo' },
        { id: 2, text: 'A galinha' },
      ],
      answerIndex: 1,
    },
    {
      id: 2,
      text: 'Quem descobriu o Brasil?',
      options: [
        { id: 1, text: 'Pedro Álvares Cabral' },
        { id: 2, text: 'Cristovão Colombo' },
      ],
      answerIndex: 1,
    },
    {
      id: 3,
      text: 'Quem veio primeiro: o ovo ou a galinha?',
      options: [
        { id: 1, text: 'O ovo' },
        { id: 2, text: 'A galinha' },
      ],
      answerIndex: 1,
    },
    {
      id: 4,
      text: 'Quem descobriu o Brasil?',
      options: [
        { id: 1, text: 'Pedro Álvares Cabral' },
        { id: 2, text: 'Cristovão Colombo' },
      ],
      answerIndex: 1,
    },
  ];

  constructor() {}

  getQuestions() {
    return this.questions.slice();
  }
}
