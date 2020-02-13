import { Router } from "@angular/router";
import { AuthService, AuthResponseData } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onClose(event) {
    this.error = null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.error = null;

    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
