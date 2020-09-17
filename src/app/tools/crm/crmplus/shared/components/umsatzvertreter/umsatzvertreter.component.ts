import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';
import { RestitgebabfrageService } from '../../services/restitgebabfrage.service';

@Component({
  selector: 'app-umsatzvertreter',
  templateUrl: './umsatzvertreter.component.html',
  styleUrls: ['./umsatzvertreter.component.css']
})
export class UmsatzvertreterComponent implements OnInit {

  public filter: FormGroup;
  formctrl = new FormControl();
  vertreters:any;
  vertretervalue:string;
  @Input() sicht: string;
  @Input() vertretervondefault: string;
  @Output() selectedvertreter = new EventEmitter();
  @Output() deletedvertreter = new EventEmitter();
  
  constructor(private restitgebabfrageService:RestitgebabfrageService, private fb: FormBuilder) { 
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
  }

  ngOnInit() {
    
  }
  
  ngOnChanges(changes: SimpleChanges){

    for (let propName in changes){
        if (propName === 'vertretervondefault'){
            let change = changes[propName];
            let curVal  = change.currentValue;
             console.log('vertretervondefault',curVal);
            
            if (curVal !== undefined) {
                if (curVal.vertreter.toString().includes(',')) {
                    let objArray = curVal.vertreter.toString().split(',');
                // console.log('objArray',objArray);
                for (let tempobjarray of objArray) {
                    // console.log('tempobjarray',tempobjarray);
                 this.loadStartVertreter(tempobjarray);
                }
                } else {
                 this.loadStartVertreter(curVal.vertreter);
                }
            }
            
            
            
        }
    }
  }
  
    public Vertreterchange(event:string):void {
    console.log("event",event);
    if (event){
    if(event.length >= 1){
            this.restitgebabfrageService.getVertreter( this.sicht)
            .subscribe((vert)=> {
              
                        this.vertreters = this.filterByString(vert, event);
                        
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };
    }

}

public loadStartVertreter(event:string):void {
    console.log("event",event);
    if(event){
            this.restitgebabfrageService.getVertreter( this.sicht)
            .subscribe((vert)=> {
              
                       
                        let anzeigeObj = this.filterByString(vert, event);
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

public filterByString(data, filterValue) {
   filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // || e.objekt.toLowerCase().includes(filterValue)
   return data.filter(e => e.vertreter.toLowerCase().includes(filterValue))
       .sort((a,b) => a.vertreter.includes(filterValue) && !b.vertreter.includes(filterValue) ? -1 : b.vertreter.includes(filterValue) && !a.vertreter.includes(filterValue) ? 1 :0);
}

public additemforsearch(val):void {
   console.log("val",val);
  const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
  this.selectedvertreter.next(val);
  itemforsearch.push(this.fb.group({
   firstname: [val.fname],
   lastname: [val.vname],
   kundennummer: [val.beznr]
   
  }));
}

public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
     itemforsearch.removeAt(val );
     this.deletedvertreter.next(val);
}

}
