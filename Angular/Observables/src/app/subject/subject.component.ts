import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.css"]
})
export class SubjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /// - hot
    /// - shares data
    /// - observer can assign value
    /// - subscriber will not receive data streamed before subscription
    console.clear();
    const subject = new Subject();
    subject.subscribe(v => console.log("Observer 1", v));
    subject.next("Message 1  from subject");
    subject.subscribe(v => console.log("Observer 2", v));
    subject.next("Message 2  from subject");
    subject.subscribe(v => console.log("Observer 3", v));

    console.log(
      "Only observer 1 is able to print all the values broadcasted, because he started observing subject before any value brodcasted."
    );
    console.log("------------ 🙏🏻 END of subject story 🙏🏻 ------------------");
  }
}
