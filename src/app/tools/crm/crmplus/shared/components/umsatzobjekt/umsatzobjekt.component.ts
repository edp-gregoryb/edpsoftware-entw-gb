import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjektauswahlService } from '../../../../../shared/services/objektauswahl.service';
import { RestitobjkeyabfrageService } from '../../services/restitobjkeyabfrage.service';
import { Objekte } from '../../../../../shared/entities/objekte';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-umsatzobjekt',
  templateUrl: './umsatzobjekt.component.html',
  styleUrls: ['./umsatzobjekt.component.css']
})
export class UmsatzobjektComponent implements OnInit {

  //public objekte: Array<Objekte> = [];
  objekte:any;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedobjekt = new EventEmitter();
  @Output() deletedobjekt = new EventEmitter();
  @Input() sicht: string;
  @Input() objektvondefault:string;
 
  objektvalue:string;
  constructor(private objektService: ObjektauswahlService, private restitobjkeyabfrageService:RestitobjkeyabfrageService, private fb: FormBuilder) { 
    
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
    
   
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){

    for (let propName in changes){
        if (propName === 'objektvondefault'){
            let change = changes[propName];
            let curVal  = change.currentValue;
             console.log('objektvondefault',curVal);
            
            if (curVal !== undefined){
            if (curVal.objekt.toString().includes(',')) {
                let objArray = curVal.objekt.toString().split(',');
               // console.log('objArray',objArray);
               for (let tempobjarray of objArray) {
                // console.log('tempobjarray',tempobjarray);
                this.loadStartObjekte(tempobjarray);
               }
            } else {
                 this.loadStartObjekte(curVal.objekt);
            }
            
            }
            
            
        }
    }
  }
  


  public getObjekte(event:string):void {
    console.log("event",event);
    if (event){
    if(event.length >= 1){
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
               };
    }
}

public filterByString(data, filterValue) {
  filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
  return data.filter(e => e.obj_bezeichnung.toLowerCase().includes(filterValue) || e.objekt.toLowerCase().includes(filterValue))
      .sort((a,b) => a.obj_bezeichnung.includes(filterValue) && !b.obj_bezeichnung.includes(filterValue) ? -1 : b.obj_bezeichnung.includes(filterValue) && !a.obj_bezeichnung.includes(filterValue) ? 1 :0);
}



public additemforsearch(val):void {
   console.log("val",val);
  const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
      this.selectedobjekt.next(val);
  itemforsearch.push(this.fb.group({
   objekt: [val.objekt],
   objektbez: [val.obj_bezeichnung]
  }));
}

  public loadStartObjekte(event:string):void {
    console.log("event",event);
    if(event){
            this.restitobjkeyabfrageService.restitgetObjbezeichung(event,this.sicht)
            .subscribe((obj: Objekte[])=> {
                        // this.objekte = obj;
                        // console.log("this.kunden",this.kunden);
                        // let anzeigeObj = this.filterByString(obj, event);
                         
                        let anzeigeObj = obj;
                        // console.log("anzeigeObj",anzeigeObj);
                        for (let anzobj of anzeigeObj){
                            this.additemforsearch(anzobj);
                        }
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };
}



public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
     itemforsearch.removeAt(val );
      this.deletedobjekt.next(val);
}

}
