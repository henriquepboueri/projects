import { Component, OnInit } from '@angular/core'

import { FirebaseService } from '../firebase.service'
import { Resultado } from '../models/resultado.model'

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  displayedColumns: string[] = [
    'ranking',
    'matricula',
    'acertos',
    'tempo',
    // 'timestamp'
  ]
  dataSource: Resultado[] = []

  constructor (private _firebase: FirebaseService) {}

  ngOnInit (): void {
    this._firebase.getResultados().subscribe((res: Resultado[]) => {
      this.dataSource = res
    })
  }
}
