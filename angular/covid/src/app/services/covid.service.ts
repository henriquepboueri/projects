import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { API_URL } from 'src/app/app.api';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private http: HttpClient) {}

  getPessoaByName(name: string) {
    return this.http
      .get(`${API_URL}/pacientes/${name}`)
      .pipe(retry(3)) as Observable<
      [{ nome_paciente: string; data_nasc_paciente: Date }]
    >;
  }
  getPessoaById(id: number) {
    return this.http
      .get(`${API_URL}/pacientes/${id}`)
      .pipe(retry(3)) as Observable<
      [{ nome_paciente: string; data_nasc_paciente: Date }]
    >;
  }

  addCovidForm(form: any) {
    return this.http.post(`${API_URL}/covid`, form).pipe(retry(3));
  }
}
