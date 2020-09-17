import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdatestringtochstring'
})
export class UsdatestringtochstringPipe implements PipeTransform {

  transform(value: any) {
    //console.log("pipe",value);
    if (value ){
     // console.log("pipe if",value);
      var temp = value.toString().split('/');
      const usdatestringtochstring = temp[1]+'.'+temp[0]+'.'+temp[2];
       // console.log("usdatestringtochstring",usdatestringtochstring);
      return usdatestringtochstring;
    }
    return null;
  }

}
