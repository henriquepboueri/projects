import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authservice: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRed = req.clone({
          params: new HttpParams().set("auth", user.token)
        });
        return next.handle(modifiedRed);
      })
    );
  }
}
