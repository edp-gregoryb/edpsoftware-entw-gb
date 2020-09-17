import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kachelcolor'
})
export class KachelcolorPipe implements PipeTransform {

  transform(value: any) {
    // var datumZeit;
    console.log("pipe",value);
    // if (value.length > 2){
      // if (value == 0){
      //   return "value";
      // } else {
      //   return ""; 
      // }
      
    // } else {
    //   return null; 
    // }
      
     
    
    // }
   
  }

}