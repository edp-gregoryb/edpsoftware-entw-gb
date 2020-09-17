import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aktiveitem'
})
export class AktiveitemPipe implements PipeTransform {

  transform(value: any) {
    // var datumZeit;
    // console.log("pipe",value);
     if (value ){
        var d = new Date();
        var n = d.getTime();
         var p = new Date(value+':'+'00');
        //var akttime = new Date(value.toString().trim());
        console.log("akttime", p);
         }
      return value;
    // }
   
  }

}