import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RestitosdynabfrageService } from '../../services/restitosdynabfrage.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-umsatzdynamisch',
  templateUrl: './umsatzdynamisch.component.html',
  styleUrls: ['./umsatzdynamisch.component.css']
})
export class UmsatzdynamischComponent implements OnInit {

  public filter: FormGroup;
  formctrl = new FormControl();
  @Input() dynName: any;
  @Input() sicht: string;
  @Input() dynvondefault:string;
  @Output() selecteddyn = new EventEmitter();
  @Output() deleteddyn = new EventEmitter();
  dyndata:any;
  nameforplaceh:string;
  dynvalue:string;
  constructor(private restitosdynabfrageService:RestitosdynabfrageService, private fb: FormBuilder) {
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
    
  }

  ngOnInit() {
    // console.log("dynName", this.dynName);
    // this.nameforplaceh = this.dynName.list;
    // console.log(" this.dynName.list", this.dynName.list);
    // this.restitosdynabfrageService.getosdynabfrage('','A',this.dynName.liste).subscribe(data => {
    //   console.log("getosdynabfrage",data);
    //   this.dyndata = data;
    // })
  }
  
    ngOnChanges(changes: SimpleChanges){
    console.log('changes umsatzdynamisch',changes);
    for (let propName in changes){
        if (propName === 'dynvondefault'){
            let change = changes[propName];
             console.log('change umsatzdynamisch nach if',change);
            let curVal  = change.currentValue;
             console.log('dynvondefault',curVal);
            
            if (curVal !== undefined){
                if (curVal.dyn.toString().includes(',')) {
                    let objArray = curVal.dyn.toString().split(',');
                    for (let tempobjarray of objArray) {
                    this.loadStartDyn(tempobjarray);
                }
                } else {
                 this.loadStartDyn(curVal.dyn);
                }
            
            }
            
            
        }
    }
  }
  
  public getdyn(event:string):void{
    if (event){
    if(event.length >= 2){
             this.restitosdynabfrageService.getosdynabfrage(event, this.sicht,this.dynName.liste).subscribe(data => {
              console.log("getosdynabfrage",data);
              this.dyndata = this.filterByString(data, event);
              
               },
              (err) => {
                console.warn(err);
              });
               };
    }
  }
  
   public loadStartDyn(event:string):void{
    if(event){
             this.restitosdynabfrageService.getosdynabfrage(event, this.sicht,this.dynName.liste).subscribe(data => {
              console.log("getosdynabfrage",data);
            //   this.dyndata = data;
              let anzeigeObj = data;// = this.filterByString(data, event);
              
              for (let anzobj of anzeigeObj){
                            this.additemforsearch(anzobj);
                        }
               },
              (err) => {
                console.warn(err);
              });
               };
  }
  
  public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
   return data.filter(e => e.feld2.toLowerCase().includes(filterValue) || e.feld1.toLowerCase().includes(filterValue))
       .sort((a,b) => a.feld2.includes(filterValue) && !b.feld2.includes(filterValue) ? -1 : b.feld2.includes(filterValue) && !a.feld2.includes(filterValue) ? 1 :0);
}
  
  public additemforsearch(val):void {
   console.log("val",val);
   const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
   this.selecteddyn.next(val);
   itemforsearch.push(this.fb.group({
    feld1: [val.feld1],
    feld2: [val.feld2],
    keyn: [val.keyn]
   
   }));
}

public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
    itemforsearch.removeAt(val );
    this.deleteddyn.next(val);
}

}
