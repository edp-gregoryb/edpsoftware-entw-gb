import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {

    if (propertyName) {

      return value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
    }
    else{

      return value;
    }

  }
  // transform(items: any[], field: string, reverse: boolean = false): any[] {
  //   if (!items) return [];
  //
  //   if (field) items.sort((a, b) => a[field] > b[field] ? 1 : -1);
  //   else items.sort((a, b) => a > b ? 1 : -1);
  //
  //   if (reverse) items.reverse();
  //
  //   return items;
  // }

}
