import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-behaviorsubject",
  templateUrl: "./behaviorsubject.component.html",
  styleUrls: ["./behaviorsubject.component.css"]
})
export class BehaviorsubjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /// - hot
    /// - shares data
    /// - observer can assign value
    /// - subscriber will receive data streamed before subscription
    /// - can set initial value

    console.clear();
    const behaviorSubject = new BehaviorSubject(
      "Initial message from Behavior subject"
    );

    behaviorSubject.subscribe(v => console.log(v));
    behaviorSubject.subscribe(v => console.log(v));

    behaviorSubject.next("Message 2 from Behaviroal subject");

    console.log(
      "------------🙏🏻  END of Behavioral Subject story 🙏🏻 ------------------"
    );
  }
}
