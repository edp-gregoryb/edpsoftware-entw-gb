import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findandadd'
})
export class FindandaddPipe implements PipeTransform {
  // temparray:any = [];
 transform(value: any, args?: any): any {
     console.log('FindandaddPipe', value);
  
      let tempvalue = value.filter(val => {
          var val1 = 0;
          var val2 = 0;
          var val3 = 0;
          var val4 = 0;
             if (val.posKey  == "WR") {
               val1 = val.preisUserTotal;
               //console.log("val",val1);
             }
             if (val.posKey  == "BetrRab"){
                val2 = val.preisUserTotal;
               // console.log("val",val2);
             }
              if (val.posKey  == "SpezRab"){
                 val3 = val.preisUserTotal;
                 // console.log("val",val3);
                
               }
               if (val.posKey  == "BetrRabMan"){
                 val3 = val.preisUserTotal;
                 // console.log("val",val3);
                
               }
          if (val.posKey  == "MalRb"){
              val4 = val.preisUserTotal;
              // console.log("val",val3);

          }
               
               let valtot = val1 + val2 + val3 + val4;
               //console.log("valtot",valtot);
               return valtot;
             
            // return null;
          
       });//{
       if (tempvalue.length === 0){console.log("keine werte"); return 0;} else{
       console.log(tempvalue);
       var tpvarray = [];
       if (tempvalue.length > 1) {
        for (var i = 0; i< tempvalue.length;i++){
          tpvarray.push(tempvalue[i].preisUserTotal);
        }
        
        return tpvarray.reduce(this.getSum);;
       }else {
       var tpv = tempvalue[0].preisUserTotal;
       return tpv;
       }
       }
      
   }
   
    getSum(total, num) {
    return total + num;
}
}
