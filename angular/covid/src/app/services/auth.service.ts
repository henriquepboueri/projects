import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { API_URL } from 'src/app/app.api';
import { AuthUser } from '../models/auth.model';
import { LoginModel } from '../models/login.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioSubject = new BehaviorSubject<AuthUser>(null);
  private _url = `${API_URL}/auth/login`;
  private _tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  fazerLogin(email: String, senha: String) {
    return this.http
      .post(this._url, new LoginModel(email, senha) /*, {observe: 'response'}*/)
      .pipe(
        catchError((err) => {
          throw err;
        }),
        tap((res: AuthUser) => {
          this.usuarioSubject.next(res);
          localStorage.setItem('userData', JSON.stringify(res));
          this.autoLogout(res.expires - new Date().getTime());
        })
      );
  }

  autoLogout(expirationDuration: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      alert('Sua sessão expirou. Favor efetuar novo acesso.');
      this.fazerLogout();
    }, expirationDuration);
  }

  fazerLogout() {
    this.usuarioSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: AuthUser = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new AuthUser(
      userData.nome,
      userData.email,
      userData.expires,
      userData.token
    );

    if (loadedUser.token) {
      this.usuarioSubject.next(loadedUser);
      const expirationDuration = userData.expires - new Date().getTime();
      this.autoLogout(expirationDuration);
    } else {
      localStorage.removeItem('userData');
    }
  }
}
