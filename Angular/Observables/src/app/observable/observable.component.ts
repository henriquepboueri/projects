import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-observable",
  templateUrl: "./observable.component.html",
  styleUrls: ["./observable.component.css"]
})
export class ObservableComponent implements OnInit {
  show: boolean = false;
  constructor() {}

  showCode() {
    this.show = !this.show;
  }

  ngOnInit() {
    /// - cold
    /// - creates copy of data
    /// - observer can not assign value
    console.clear();

    console.log(
      "------------ 🎊 🎉 Lets Start Learning Observables vs Subjects 🎊 🎉 ------------------"
    );

    const observable1 = new Observable(a => {
      console.log("Lets initialize observable 1.");
      a.next(Math.random());
    });

    const observable2 = new Observable(a => {
      console.log("Lets initialize observable 2");
      a.next("Message from Observable 2");
    });

    observable2.subscribe(v => console.log(v));

    console.log(
      "No message from observable 1 since there is no subscriber/observer."
    );
    console.log(
      "Now, 2 observers are subscrided, each one receiving a different value."
    );
    observable1.subscribe(console.log);
    observable1.subscribe(console.log);

    console.log(
      "------------ 🙏🏻 END of observable story 🙏🏻 ------------------"
    );
  }
}
