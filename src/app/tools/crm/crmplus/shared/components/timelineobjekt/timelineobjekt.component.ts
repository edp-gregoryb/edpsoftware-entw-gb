import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ObjektauswahlService } from '../../../../../shared/services/objektauswahl.service';
import { Objekte } from '../../../../../shared/entities/objekte';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-timelineobjekt',
  templateUrl: './timelineobjekt.component.html',
  styleUrls: ['./timelineobjekt.component.css']
})
export class TimelineobjektComponent implements OnInit {

  objektvalue:string;
  objekte:any;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedobjekt = new EventEmitter();
  @Input() sicht: string;
  @Input() objvonsearch:string;
  
  constructor(private objektService: ObjektauswahlService) {
      let obj = sessionStorage.getItem('timelineobjekt');
    if (obj){
        let tempobj = JSON.parse(obj);
        console.log("obj",obj);
        this.objektvalue = tempobj.objekt;
        this.selectedobjekt.next(tempobj.objekt);
    }
      
  }

  ngOnInit() {
  }
  
   public getObjekte(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.objektService.showObjektCRM(this.sicht)
            .subscribe((obj: Objekte[])=> {
                        // this.objekte = obj;
                        // console.log("this.kunden",this.kunden);
                        this.objekte = this.filterByString(obj, event);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable objektvalue");
                this.selectedobjekt.next('');
               }
               };
}

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
   return data.filter(e => e.obj_bezeichnung.toLowerCase().includes(filterValue) || e.objekt.toLowerCase().includes(filterValue))
       .sort((a,b) => a.obj_bezeichnung.includes(filterValue) && !b.obj_bezeichnung.includes(filterValue) ? -1 : b.obj_bezeichnung.includes(filterValue) && !a.obj_bezeichnung.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   console.log("val",val);
   this.selectedobjekt.next(val);
   let tempjson = JSON.stringify({"objekt":val.objekt});
   sessionStorage.setItem('timelineobjekt', tempjson);
}

public objdelete(){
    sessionStorage.removeItem('timelineobjekt');
}

}
