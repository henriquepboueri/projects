import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private _router: Router) {}

  ngOnInit(): void {}

  showErrorMessage() {
    this._snackBar.open('Usuário ou senha inválidos.', 'Fechar', {
      duration: 5000,
      // verticalPosition: 'bottom',
      // horizontalPosition: 'center',
    });
    this._router.navigate(['/home']);
  }
}
