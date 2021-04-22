import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private http: HttpClient) {}

  getPessoaByName(name: string) {
    return this.http
      .get(`http://localhost:5000/api/v1/pacientes`, {
        params: { field_name: 'nome', field_value: name },
      })
      .pipe(retry(3));
  }
}
