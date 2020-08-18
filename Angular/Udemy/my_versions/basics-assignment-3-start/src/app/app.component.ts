import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  Observer,
  of,
  from,
  interval,
  Scheduler,
  Subject,
  ConnectableObservable,
  BehaviorSubject,
} from "rxjs";
import { map, multicast, refCount } from "rxjs/operators";
import { async } from "@angular/core/testing";

interface Hero {
  name: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: ["p span { color: red; font-size: 100%; }"],
})
export class AppComponent implements OnInit {
  isShown = true;
  logs = [];
  color = "blue";
  hero: Hero;
  subject$: BehaviorSubject<any>;
  data = [1, 2, 3];
  multicasted$: Observable<any>;

  constructor() {
    this.hero = { name: "Puppo" };
  }

  ngOnInit(): void {
    // const promise$ = new Promise((resolve, reject) => {
    //   resolve(Math.random());
    // });
    // promise$.then(() => {
    //   return 1;
    // }).then()
    // let createPromise = (timer) => {
    //   const promise$ = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve("Resolved."), timer);
    //   });
    //   return promise$;
    // };
    // console.log("Before promise");
    // createPromise(2000).then(console.log);
    // console.log("After promise");
    // setTimeout(() => console.log("Time is out"), 0.5);
    // for (let index = 0; index < 999999; index++) {
    //   const element = index ** index;
    // }
    // navigator.geolocation.getCurrentPosition(console.log, console.log);
    // console.log("The end");
    // let mathOperations = {
    //   add: (...args) => {
    //           args.reduce((pv, cv) => {pv + cv}, 0)
    //       }
    //   }
    // const interval$ = new Observable();
    // this.subject$ = new BehaviorSubject(0);
    // this.multicasted$ = interval$.pipe(multicast(this.subject$), refCount());
    // const observable$ = new Observable((obs) => {
    //   setInterval(() => {
    //     obs.next(Math.random());
    //   }, 2000);
    // });
    // const interval$ = interval(1000).subscribe((v) => console.log(v));
    // const subject$ = new Subject();
    // const multicasted$ = observable$.pipe(
    //   multicast(subject$)
    // ) as ConnectableObservable<any>;
    // multicasted$.subscribe(console.log);
    // multicasted$.subscribe(console.log);
    // multicasted$.connect();
    // subject$.subscribe(console.log);
    // subject$.subscribe(console.log);
    // observable$.subscribe(subject$);
    // const subject = new Subject<number>();
    // subject.subscribe({
    //   next: (v) => console.log(`observerA: ${v}`),
    //   complete: () => console.log("Completed (#1)."),
    // });
    // subject.subscribe({
    //   next: (v) => console.log(`observerB: ${v}`),
    //   complete: () => console.log("Completed (#2)."),
    // });
    // const observable = from(this.data);
    // observable.subscribe(subject); // You can subscribe providing a Subject
    // Logs:
    // observerA: 1
    // observerB: 1
    // observerA: 2
    // observerB: 2
    // observerA: 3
    // observerB: 3
    //this.subject$ = new Subject();
    // const obs$ = new Observable((obs) => {
    //   obs.next(Math.random());
    //   console.log(obs.complete);
    // });
    // const subscription = obs$.subscribe({
    //   next: (x) => console.log("The value passed is: ", x),
    //   complete: () => console.log("Observer completed the request."),
    // });
    // const subscription_2 = obs$.subscribe((v) =>
    //   console.log(`The square root of ${v} is ${v}`)
    // );
    // const obs$ = interval(1000).subscribe(console.log);
    // const obs_param = (obs: Observer<any>) => {
    //   obs.next(1);
    //   console.log("I was here");
    //   obs.next(3);
    //   obs.complete();
    // };
    // const observable = new Observable(obs_param);
    // const of_obs = of(...[1, 2, 3]).subscribe(console.log);
    // map((x: any) => x * x)(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
    // const observer = {
    //   next: (x) => console.log("Observer got a next value: " + x),
    //   error: (err) => console.error("Observer got an error: " + err),
    //   complete: () => console.log("Observer got a complete notification"),
    // };
    //const subscription = observable.subscribe(observer);
  }

  onToggle() {
    this.isShown = !this.isShown;
    this.logs.push("The toggle is now:" + this.isShown);
  }

  emit_value() {
    console.log("Subject emitting value");
    this.subject$.next(Math.random());
    this.subject$.next(Math.random());
  }

  subscribe() {
    const subs1 = this.multicasted$.subscribe({
      next: (v) => console.log("#1", v),
      complete: () => console.log("Completed on sub #1"),
    });

    const subs2 = this.multicasted$.subscribe({
      next: (v) => console.log("#2", v),
      complete: () => console.log("Completed on sub #2"),
    });
  }

  complete() {
    this.subject$.complete();
  }

  add_to_array() {
    this.data.push(this.data.length);
    console.log(this.data);
  }
}
