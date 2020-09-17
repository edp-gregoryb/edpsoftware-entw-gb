import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
    transform(value:string, [separator]): string {
        let splits = null;
        splits = value.split(separator);
        if (splits.length > 1) {
            console.log("splits", splits);
            return splits.pop();
        } else {
            return '';
        }
    }

}
