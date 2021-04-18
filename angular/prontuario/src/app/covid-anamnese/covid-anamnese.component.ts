import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-covid-anamnese',
  templateUrl: './covid-anamnese.component.html',
  styleUrls: ['./covid-anamnese.component.css'],
})
export class CovidAnamneseComponent implements OnInit {
  public formCovid: FormGroup = new FormGroup({});
  public usaMedic: boolean = false;
  searchMoviesCtrl = new FormControl();
  pacientes: any;
  isLoading = false;
  errorMsg: string;

  constructor(private _fb: FormBuilder, private http: HttpClient) {
    this.formCovid = this._fb.group({
      id__paciente: 0,
      id__usuario: 0,
      data_cadastro: new Date(),
      diag_covid: false,
      febre: false,
      prob_resp: false,
      viagem: false,
      contato_infect: false,
      contato_sintomas: false,
      part_reuniao: false,
      prob_card_resp: false,
      prob_outro: false,
      usa_medic: false,
      medic_desc: '',
      temperatura: 0,
      obs: '',
    });
  }

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.pacientes = [];
          this.isLoading = true;
        }),
        switchMap((value) =>
          this.http
            .get('http://localhost:5000/api/v1/pacientes', {
              // headers: { 'App-Finalidade': 'consulta' },
              headers: new HttpHeaders().set('App-Finalidade', 'consulta'),
            })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data) => {
        if (data == undefined || data == []) {
          this.pacientes = [];
        } else {
          this.errorMsg = '';
          this.pacientes = data;
        }
      });
  }

  onSubmit() {
    console.log(this.formCovid.value);
  }

  onUsaMedic(v: boolean) {
    this.usaMedic = v;
  }
}
