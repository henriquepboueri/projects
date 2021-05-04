import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Resultado } from './models/resultado.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private _firestore: AngularFirestore) {}

  postResultado(resultado: Resultado) {
    return this._firestore.collection('resultados').add(resultado);
  }

  getResultados(){
    return this._firestore.collection('resultados').get();
  }
}
