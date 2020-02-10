import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sorter",
  pure: false
})
export class SorterPipe implements PipeTransform {
  transform(value: any, propName: string = "name", orderType?: string): any {
    if (value.length === 0) {
      return value;
    }
    return value.sort((a, b) => {
      const propA = a[propName].toUpperCase();
      const propB = b[propName].toUpperCase();

      let comparison = 0;
      if (propA > propB) {
        comparison = 1;
      } else if (propA < propB) {
        comparison = -1;
      }
      return comparison;
    });
  }
}
