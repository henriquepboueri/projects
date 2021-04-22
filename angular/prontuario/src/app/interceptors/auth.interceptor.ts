import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthUser } from '../models/auth.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = request.url;

    let token = null;
    return this.authService.usuarioSubject.pipe(
      take(1),
      exhaustMap((resData: AuthUser) => {
        if (resData && resData.token) {
          token = resData.token;
          const modifiedReq = request.clone({
            //params: new HttpParams().set("Authentication", "asas"),
            headers: new HttpHeaders().append(
              'Authorization',
              `Bearer ${token}`
            ),
          });
          return next.handle(modifiedReq);
        }
        return next.handle(request);
      })
    );
  }
}
