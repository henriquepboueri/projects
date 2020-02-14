import {
  Directive,
  HostListener,
  ComponentFactoryResolver
} from "@angular/core";
import { AlertComponent } from "../alert/alert.component";

@Directive({
  selector: "[appPopupHover]"
})
export class PopupHoverDirective {
  alertHost: any;
  closeSubscription: any;
  viewContainerRef: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  @HostListener("mouseenter") onMouseEnter() {

  }

  @HostListener("mouseleave") onMouseLeave() {
    console.log("onMouseLeave()");
  }


}
