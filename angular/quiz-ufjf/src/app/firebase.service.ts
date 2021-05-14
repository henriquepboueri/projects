import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';

import { Resultado } from './models/resultado.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private _firestore: AngularFirestore) {}

  postResultado(resultado: Resultado) {
    return this._firestore
      .collection('resultados')
      .doc(resultado.matricula)
      .set(resultado);
  }

  getResultados() {
    return this._firestore
      .collection('resultados', (ref) =>
        ref.orderBy('acertos', 'desc').orderBy('tempo', 'asc')
      )
      .get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => {
            return doc.data();
          });
        })
      );
  }
}
