import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { AdrvermittlerService } from '../../../../shared/services/adrvermittler.service';
import { Vermittler } from '../../../../../shared/entities/vermittler';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-umsatzvermittler',
  templateUrl: './umsatzvermittler.component.html',
  styleUrls: ['./umsatzvermittler.component.css']
})
export class UmsatzvermittlerComponent implements OnInit {

  public vermittler: Array<Vermittler> = [];
  //public selectedVermittler: Vermittler;
  public filter: FormGroup;
  vermittlervalue:string;
  formctrl = new FormControl();
  @Input() sicht: string;
  @Input() vermittlervondefault: string;
  @Output() selectedvermittler = new EventEmitter();
  @Output() deletedvermittler = new EventEmitter();
  
  
  constructor(private vermittlerService: AdrvermittlerService, private fb: FormBuilder) { 
    
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
  }

  ngOnInit() {
  }
  
   ngOnChanges(changes: SimpleChanges){

    for (let propName in changes){
        if (propName === 'vermittlervondefault'){
            let change = changes[propName];
            let curVal  = change.currentValue;
             console.log('vermittlervondefault',curVal);
            
            if (curVal !== undefined){
                if (curVal.vermittler.toString().includes(',')) {
                    let objArray = curVal.vermittler.toString().split(',');
                for (let tempobjarray of objArray) {
                    this.loadStartVermittler(tempobjarray);
                }
                } else {
                 this.loadStartVermittler(curVal.vermittler);
                }
            }
            
            
            
        }
    }
  }
  
  public Vermittler(event:string):void {
    console.log("event",event);
    if (event){
    if(event.length >= 2){
            this.vermittlerService.showvermittlerCRM(event,this.sicht)
            .subscribe((vermittler: Vermittler[])=> {
              
                        this.vermittler = vermittler;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };
    }

}

    public loadStartVermittler(event:string):void {
    console.log("event",event);
    if(event){
            this.vermittlerService.showvermittlerCRM(event,this.sicht)
            .subscribe((vermittler: Vermittler[])=> {
              
                        // this.vermittler = vermittler;
                        // console.log("this.kunden",this.kunden);
                        let anzeigeObj = vermittler;
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

public additemforsearch(val):void {
   console.log("val",val);
  const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
  this.selectedvermittler.next(val);
  itemforsearch.push(this.fb.group({
   firstname: [val.fname],
   lastname: [val.vname],
   kundennummer: [val.beznr]
   
  }));
}

public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
     itemforsearch.removeAt(val );
     this.deletedvermittler.next(val);
}

}
