import { Injectable } from '@angular/core'

import { Question } from './models/question.model'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions: Question[] = [
    {
      id: 1,
      text:
        'O campus avançado da UFJF iniciou suas atividades em GV no ano de 2012.  Qual o mês de início dos trabalhos?',
      options: [
        { id: 1, text: 'Março' },
        { id: 2, text: 'Junho' },
        { id: 3, text: 'Novembro' }
      ],
      answerIndex: 3
    },
    {
      id: 2,
      text:
        'Em outubro de 2016, a UFJF-GV realizou a primeira colação de grau do campus avançado. Qual curso celebrou este importante momento?',
      options: [
        { id: 1, text: 'Ciências Econômicas' },
        { id: 2, text: 'Educação Física' },
        { id: 3, text: 'Administração' }
      ],
      answerIndex: 1
    },
    {
      id: 3,
      text:
        'Antes da chegada da Covid-19, todos os calouros podiam participar de uma gincana que unia os novos estudantes e também ajudava instituições beneficentes. Só na edição de agosto de 2019, a atividade arrecadou 9 toneladas de alimentos não perecíveis. Qual o nome da Gincana?',
      options: [
        { id: 1, text: 'Gincana Universitária' },
        { id: 2, text: 'Gincana Solidária' },
        { id: 3, text: 'Gincana Integração' }
      ],
      answerIndex: 2
    },
    {
      id: 4,
      text:
        'Um grande potencial da UFJF-GV é sua articulação com a comunidade, com destaque para os projetos de Extensão. Em abril de 2021, qual o número de atividades de extensão em andamento?',
      options: [
        { id: 1, text: '60' },
        { id: 2, text: '65' },
        { id: 3, text: '70' }
      ],
      answerIndex: 2
    },
    {
      id: 5,
      text:
        'A formação acadêmica acontece de muitas formas e, um espaço muito importante na universidade são as bibliotecas. A UFJF-GV conta com duas unidades de Biblioteca Universitária: Biblioteca Centro e unidade Vila Bretas. Em tempos normais, sem distanciamento social, qual o horário de atendimento nas bibliotecas?',
      options: [
        { id: 1, text: '7h as 19h' },
        { id: 2, text: '8h as 20h' },
        { id: 3, text: '7h as 18h' }
      ],
      answerIndex: 1
    },
    {
      id: 6,
      text:
        'Além de excelente corpo técnico, a UFJF-GV conta com diferentes espaços para que os estudantes coloquem em prática seu conhecimento. Um desses espaços está ligado ao curso de Fisioterapia, que foi inaugurado em 2016 e que atende mensalmente 700 pessoas. Qual o nome desse espaço?',
      options: [
        { id: 1, text: 'Clínica Formativa de Fisioterapia' },
        { id: 2, text: 'Centro de Fisioterapia' },
        { id: 3, text: 'Clínica Escola de Fisioterapia' }
      ],
      answerIndex: 3
    },
    {
      id: 7,
      text:
        'Além das ações de Ensino, Pesquisa, Extensão e Inovação, a UFJF-GV também desenvolve inúmeras atividades de Arte e Cultura. Muitas dessas ações estão ligadas ao setor de Comunicação, Cultura e Eventos. Até o segundo semestre de 2019, antes da pandemia, quantos projetos eram desenvolvidos pelo setor?',
      options: [
        { id: 1, text: 'Quatro' },
        { id: 2, text: 'Cinco' },
        { id: 3, text: 'Seis' }
      ],
      answerIndex: 3
    },
    {
      id: 8,
      text:
        'Todos os estudantes da UFJF-GV contam com importante suporte nas áreas de Pedagogia, Psicologia e Serviço Social. O setor foi implantado em agosto de 2014. Qual o nome desse setor?',
      options: [
        { id: 1, text: 'Apoio Estudantil' },
        { id: 2, text: 'SPPS' },
        { id: 3, text: 'Suporte Estudantil' }
      ],
      answerIndex: 1
    },
    {
      id: 9,
      text:
        'A Pesquisa dentro das instituições de ensino é muito importante para o desenvolvimento da ciência. Seis cursos da UFJF-GV já formalizaram grupos de pesquisa. Quantos grupos o campus avançado já tem?',
      options: [
        { id: 1, text: '8 grupos' },
        { id: 2, text: '10 grupos' },
        { id: 3, text: '12 grupos' }
      ],
      answerIndex: 2
    },
    {
      id: 10,
      text:
        'Assim como o campus de Juiz de Fora, GV realiza anualmente a Semana de Ciência, Tecnologia e Sociedade, um importante evento que integra ensino, pesquisa, extensão e inovação. Em 2019 o campus avançado realizou qual edição do evento?',
      options: [
        { id: 1, text: '4ª edição' },
        { id: 2, text: '5ª edição' },
        { id: 3, text: '6ª edição' }
      ],
      answerIndex: 1
    }
  ]

  constructor () {}

  getQuestions () {
    return this.questions.slice()
  }
}
