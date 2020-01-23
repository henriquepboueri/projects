export class CounterService {
  inactiveToActive: number;
  activeToInactive: number;

  constructor() {
    this.inactiveToActive = 0;
    this.activeToInactive = 0;
  }

  incCounters(actionType: number) {
    switch (actionType) {
      case 1:
        this.inactiveToActive++;
        console.log("inactiveToActive:" + this.inactiveToActive);
        break;
      case 0:
        this.activeToInactive++;
        console.log("activeToInactive" + this.activeToInactive);
        break;
      default:
        console.log("Wrong action type");
        break;
    }
  }
}
