import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoggingService {
  public subject = new BehaviorSubject<number>(1);

  constructor() {}
}
