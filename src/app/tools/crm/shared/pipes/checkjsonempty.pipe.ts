import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkjsonempty'
})
export class CheckjsonemptyPipe implements PipeTransform {

  transform(value: any) {
     if (value === "" ){
      console.log("pipe if",value);
      
    }
    return value;
  }

}



 