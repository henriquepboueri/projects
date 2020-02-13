import { PlaceholderDirective } from "./../shared/placeholder/placeholder.directive";
import { Router } from "@angular/router";
import { AuthService, AuthResponseData } from "./auth.service";
import { NgForm } from "@angular/forms";
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.showErrorAlert(errorRes);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  private showErrorAlert(message: string) {
    /* const alertCmp = new AlertComponent(); won't work*/
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(event => {
      console.log(event);
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
