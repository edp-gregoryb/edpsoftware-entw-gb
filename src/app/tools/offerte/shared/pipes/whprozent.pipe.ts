import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whprozent'
})
export class WhprozentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   let tempvalue = value.filter(val => {
          var val1:number = 0;
          var val2:number = 0;
          var val3:number = 0;
          var val4:number = 0;
             if (val.posKey  == "WR") {
               val1 = val.preisUser;
               console.log("val",val1);
             }
             if (val.posKey  == "BetrRab"){
                val2 = val.preisUser;
               // console.log("val",val2);
             }
              if (val.posKey  == "SpezRab"){
                 val3 = val.preisUser;
                 // console.log("val",val3);
               }
              if (val.posKey  == "BetrRabMan"){
                 val3 = val.preisUser;
                 // console.log("val",val3);
               }
       if (val.posKey  == "MalRb"){
           val4 = val.preisUser;
           // console.log("val",val3);
       }

       let valtot:number = val1 + val2 + val3 + val4;
               console.log("valtot",valtot);
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
       var tpv = tempvalue[0].preisUser;
       return tpv;
       }
       }
      
   }
   
   
    getSum(total, num) {
    return total + num;
}

}
