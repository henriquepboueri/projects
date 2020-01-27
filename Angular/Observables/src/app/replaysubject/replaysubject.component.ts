import { Component, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "app-replaysubject",
  templateUrl: "./replaysubject.component.html",
  styleUrls: ["./replaysubject.component.css"]
})
export class ReplaysubjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /// - hot
    /// - shares data
    /// - observer can assign value
    /// - subscriber will receive data streamed before subscription
    console.clear();
    const replaySubject = new ReplaySubject();
    replaySubject.subscribe(v => console.log("Observer 1", v));

    replaySubject.next("Message 1  from replay subejct");
    replaySubject.next("Message 2  from replay subejct");

    replaySubject.subscribe(v => console.log("Observer 2", v));

    console.log(
      "both the observers are able to print all the values brodcated, even though they have subscribed the subject at different of time. you got my point."
    );
    console.log(
      "------------ 🙏🏻 END of Replay Subject story 🙏🏻 ------------------"
    );
  }
}
