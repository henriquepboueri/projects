import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login = new LoginModel('', '');
  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.usuarioSubject.subscribe((res) => {
      if (res) {
        this._router.navigate(['/home']);
      }
    });
  }

  showErrorMessage(msg?) {
    this._snackBar.open(msg || 'Usuário ou senha inválidos.', 'Fechar', {
      duration: 5000,
      // verticalPosition: 'bottom',
      // horizontalPosition: 'center',
    });
  }

  onSubmit() {
    console.log(this.login);
    this.authService.fazerLogin(this.login.email, this.login.senha).subscribe({
      next: (res) => {
        this._router.navigate(['/home']);
      },
      error: (err: Error) => {
        console.log(err.message);
        this.showErrorMessage(err.message);
      },
    });
  }
}
