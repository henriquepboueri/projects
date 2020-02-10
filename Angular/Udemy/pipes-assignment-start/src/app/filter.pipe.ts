import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, propName: string, filterValue: string): any {
    const filteredArray = [];
    if (value.length === 0 || filterValue === "") {
      return value;
    }
    for (const item of value) {
      if ((item[propName] = filterValue)) {
        filteredArray.push(item);
      }
    }
    return filteredArray;
  }
}
