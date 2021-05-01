import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
} from 'rxjs/operators';
import * as moment from 'moment';

import { CovidService } from 'src/app/services/covid.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignaturePad } from 'angular2-signaturepad';
import { SignatureFieldComponent } from 'src/app/shared/custom_components/signature-field/signature-field.component';

interface Paciente {
  nome_paciente: string;
  data_nasc_paciente: Date;
}

@Component({
  selector: 'app-covid-anamnese',
  templateUrl: './covid-anamnese.component.html',
  styleUrls: ['./covid-anamnese.component.css'],
})
export class CovidAnamneseComponent implements OnInit {
  public formCovid: FormGroup = new FormGroup({});
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(SignatureFieldComponent) signPad: SignatureFieldComponent;
  pacientes$: Observable<[Paciente]>;
  private searchTerms = new Subject<string>();
  isLoading = false;
  usaMedic = false;
  errorMsg: string;

  constructor(
    private _fb: FormBuilder,
    private covidService: CovidService,
    private _snack: MatSnackBar
  ) {}

  initEmptyForm() {
    this.formCovid = this._fb.group({
      nome_paciente: [''],
      data_nasc_paciente: [null],
      e_paciente: [true, Validators.required],
      id__usuario: [0],
      data_cadastro: [{ value: new Date(), disabled: true }],
      diag_covid: ['0', Validators.required],
      febre: ['0', Validators.required],
      prob_resp: ['0', Validators.required],
      viagem: ['0', Validators.required],
      contato_infect: ['0', Validators.required],
      contato_sintomas: ['0', Validators.required],
      part_reuniao: ['0', Validators.required],
      prob_card_resp: ['0', Validators.required],
      prob_outro: ['0', Validators.required],
      usa_medic: ['0', Validators.required],
      medic_desc: ['0'],
      temperatura: ['0', Validators.required],
      obs: [''],
      assinatura: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.pacientes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => {
        return this.covidService.getPessoaByName(value);
      })
    );
    this.initEmptyForm();
  }

  search(value: string) {
    if (!value) {
      return;
    }
    this.searchTerms.next(value);
  }

  onSubmit() {
    const formAnswers = this.formCovid.value;
    const newDate = moment(new Date()).format('yyyy-MM-DD');
    formAnswers['data_nasc_paciente'] = newDate;
    this.covidService.addCovidForm(formAnswers).subscribe({
      next: (_) => {
        this._snack.open('Registro inserido com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.initEmptyForm();
        this.signPad.clear();
      },
      error: console.log,
    });
  }

  onUsaMedic(value: boolean) {
    this.usaMedic = value;
  }

  displayFn(id: number) {
    switch (id) {
      case 103:
        return 'Teste';
        break;
      case 10:
        return 'Maria';
        break;

      default:
        break;
    }
  }

  onChangeCheckBox(event: MatCheckboxChange) {
    if (event.checked) {
      this.formCovid.controls['nome_paciente'].setValue('');
      this.formCovid.controls['data_nasc_paciente'].setValue(null);
    }
  }
}
