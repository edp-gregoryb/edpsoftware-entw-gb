import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sPprozent'
})
export class SPprozentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
     let tempvalue = value.filter(val => {
          var val1 = 0;
          var val2 = 0;
          var val3 = 0;
           var val4 = 0;
             if (val.posKey  == "SpezRabBr") {
               val1 = val.preisUser;
               //console.log("val",val1);
             }
             if (val.posKey  == "SpezRabNe"){
                val2 = val.preisUser;
               // console.log("val",val2);
             }
              if (val.posKey  == "WoltRab"){
                 val3 = val.preisUser;
                 // console.log("val",val3);
                
               }
               
                if (val.posKey  == "GratisIns"){
                 val4 = val.preisUser;
                 // console.log("val",val3);
                
               }
               
               let valtot = val1 + val2 + val3 +val4;
               //console.log("valtot",valtot);
               return valtot;
             
            // return null;
          
       });//{
        if (tempvalue.length === 0){console.log("keine werte"); return 0;} else{
       console.log(tempvalue);
       var tpvarray = [];
       if (tempvalue.length > 1) {
        for (var i = 0; i< tempvalue.length;i++){
          tpvarray.push(tempvalue[i].preisUser);
        }
        
        return tpvarray.reduce(this.getSum);;
       }else {
            if (tempvalue.length !== 0){
       var tpv = tempvalue[0].preisUser;
       return tpv;
       }  else {
               return 0;
           }
      
   
       }
        }
  }
    getSum(total, num) {
    return total + num;
}

}
