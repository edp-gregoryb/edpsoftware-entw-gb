import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {AktivitaetService} from '../../../../shared/services/aktivitaet.service';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-terminaktivitaet',
  templateUrl: './terminaktivitaet.component.html',
  styleUrls: ['./terminaktivitaet.component.css']
})
export class TerminaktivitaetComponent implements OnInit {

  aktivitaetvalue:string;
  aktivitaet:any;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedaktivitaet = new EventEmitter();
  //@Input() sicht: string;
  //@Input() objvonsearch:string;
  
  constructor(private aktivitaetService:AktivitaetService) {
    let obj = sessionStorage.getItem('terminaktivitaet');
    if (obj){
        let tempobj = JSON.parse(obj);
        //console.log("obj",obj);
        this.aktivitaetvalue = tempobj.aktivitaet;
        this.selectedaktivitaet.next(tempobj.aktivitaet);
     }
      
  }

  ngOnInit() {
  }
  
   public getAktivitaet(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.aktivitaetService.showaktivitaet()
            .subscribe((akt)=> {
                        // this.objekte = obj;
                        // console.log("this.aktivitaet",akt);
                        this.aktivitaet = this.filterByString(akt, event);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable objektvalue");
                this.selectedaktivitaet.next('');
               }
               };
}

public filterByString(data, filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase();
    return data.filter(e => e.bes.toLowerCase().includes(filterValue) || e.aktivid.toLowerCase().includes(filterValue))
        .sort((a,b) => a.bes.includes(filterValue) && !b.bes.includes(filterValue) ? -1 : b.bes.includes(filterValue) && !a.bes.includes(filterValue) ? 1 :0);
 }

public additemforsearch(val):void {
   //console.log("val",val);
   this.selectedaktivitaet.next(val);
   let tempjson = JSON.stringify({"aktivitaet":val.aktivid});
   sessionStorage.setItem('terminaktivitaet', tempjson);
}

public aktivitaetdelete(){
     sessionStorage.removeItem('terminaktivitaet');
}

}
