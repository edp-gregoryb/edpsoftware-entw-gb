import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {MitarbeiterService} from '../../../../shared/services/mitarbeiter.service';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-terminmitarbeiter',
  templateUrl: './terminmitarbeiter.component.html',
  styleUrls: ['./terminmitarbeiter.component.css']
})
export class TerminmitarbeiterComponent implements OnInit {

  mitarbeitervalue:string;
  mitarbeiter:any;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedmitarbeiter = new EventEmitter();
  //@Input() sicht: string;
  //@Input() objvonsearch:string;
  
  constructor(private mitarbeiterService:MitarbeiterService) {
    let obj = sessionStorage.getItem('terminmitarbeiter');
    if (obj){
        let tempobj = JSON.parse(obj);
        console.log("obj",tempobj);
        this.mitarbeitervalue = tempobj.mitarbeiter.gesname;
        this.selectedmitarbeiter.next(tempobj.mitarbeiter.mitbeznr);
     }
      
  }

  ngOnInit() {
  }
  
   public getMitarbeiter(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.mitarbeiterService.getMitarbeiter()
            .subscribe((akt)=> {
                        // this.objekte = obj;
                         console.log("this.mitarbeiter",akt);
                        this.mitarbeiter = this.filterByString(akt, event);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable objektvalue");
                this.selectedmitarbeiter.next('');
               }
               };
}

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
   return data.filter(e => e.gesname.toLowerCase().includes(filterValue) || e.persnr.toLowerCase().includes(filterValue))
       .sort((a,b) => a.gesname.includes(filterValue) && !b.gesname.includes(filterValue) ? -1 : b.gesname.includes(filterValue) && !a.gesname.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   console.log( "val", val);
   this.selectedmitarbeiter.next(val);
   let tempjson = JSON.stringify({ "mitarbeiter" : val});
   sessionStorage.setItem('terminmitarbeiter', tempjson);
}

public mitarbeiterdelete(){
     sessionStorage.removeItem('terminmitarbeiter');
}

}
