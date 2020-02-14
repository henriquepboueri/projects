import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { PopupHoverDirective } from "./popup-hover/popup-hover.directive";
import { Component, ViewChild, ComponentFactoryResolver } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
  value = 5;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}


}
