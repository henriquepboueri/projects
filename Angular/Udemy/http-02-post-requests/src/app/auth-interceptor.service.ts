import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
/*     console.log("Ongoing request!");
    console.log(req.url); */
    const modifiedRequest = req.clone({
      headers: req.headers.append("AuthKey", "xypto123")
    });
    return next.handle(modifiedRequest);
  }
}
