import {
  ComponentFactoryResolver,
  ViewChild,
  HostListener
} from "@angular/core";
import { Directive, ViewContainerRef } from "@angular/core";
import { AlertComponent } from "../alert/alert.component";

@Directive({
  selector: "[appPlaceholder]"
})
export class PlaceholderDirective {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener("mouseenter")
  onShowAlert() {
    console.clear();
    /* const alertCmp = new AlertComponent(); won't work*/
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertComponentFactory);
  }
}
