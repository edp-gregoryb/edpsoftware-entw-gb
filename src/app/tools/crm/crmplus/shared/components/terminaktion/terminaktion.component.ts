import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { RestitgetaktionService} from '../../../../shared/services/restitgetaktion.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-terminaktion',
  templateUrl: './terminaktion.component.html',
  styleUrls: ['./terminaktion.component.css']
})
export class TerminaktionComponent implements OnInit {

  aktionvalue:string;
  aktion:any;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedaktion = new EventEmitter();
  //@Input() sicht: string;
  //@Input() objvonsearch:string;
  
  constructor(private aktionService: RestitgetaktionService) {
    let obj = sessionStorage.getItem('terminaktion');
    if (obj){
        let tempobj = JSON.parse(obj);
        //console.log("obj",obj);
        this.aktionvalue = tempobj.aktion;
        this.selectedaktion.next(tempobj.aktion);
     }
      
  }

  ngOnInit() {
  }
  
   public getAktion(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.aktionService.getAktionen()
            .subscribe((akt)=> {
                        // this.objekte = obj;
                         console.log("this.aktion",akt);
                        this.aktion = this.filterByString(akt, event);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable objektvalue");
                this.selectedaktion.next('');
               }
               };
}

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
   return data.filter(e => e.bes.toLowerCase().includes(filterValue) || e.aktid.toLowerCase().includes(filterValue))
       .sort((a,b) => a.bes.includes(filterValue) && !b.bes.includes(filterValue) ? -1 : b.bes.includes(filterValue) && !a.bes.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   //console.log("val",val);
   this.selectedaktion.next(val);
   let tempjson = JSON.stringify({"aktion":val.aktid});
   sessionStorage.setItem('terminaktion', tempjson);
}

public aktiondelete(){
     sessionStorage.removeItem('terminaktion');
}

}
