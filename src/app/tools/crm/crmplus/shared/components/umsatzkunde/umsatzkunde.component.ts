import { Component, OnInit, EventEmitter, Output, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';
import { Kunden } from '../../../../../shared/entities/kunden';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-umsatzkunde',
  templateUrl: './umsatzkunde.component.html',
  styleUrls: ['./umsatzkunde.component.css']
})
export class UmsatzkundeComponent implements OnInit {

 public kunden: Array<Kunden> = [];
//   public selectedKunde: Kunden;
  privatkunde:string = 'yes';
  allekunden:string = 'yes';
  @Input() sicht: string;
  @Input() kundevondefault:string;
  @Output() selectedKunde = new EventEmitter<any>();
  @Output() deletedKunde = new EventEmitter<any>();
  public filter: FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;
  checkedKunde = false;
   formctrl = new FormControl();
  
  constructor(private kundenService:AdrkundenService, private fb: FormBuilder) { 
    
    this.filter = fb.group({
      'itemforsearch': fb.array([])
    });
 }

  ngOnInit() {
   
  }
  
  ngOnChanges(changes: SimpleChanges){

    for (let propName in changes){
        if (propName === 'kundevondefault'){
            let change = changes[propName];
            let curVal  = change.currentValue;
             console.log('kundevondefault',curVal);
            
            if(curVal){
                if (curVal.kunde.toString().includes(',')) {
                    let objArray = curVal.kunde.toString().split(',');
                   // console.log('objArray',objArray);
                   for (let tempobjarray of objArray) {
                    // console.log('tempobjarray',tempobjarray);
                    this.loadStartKunden(tempobjarray);
                   }
                } else {
                     this.loadStartKunden(curVal.kunde);
                }
            }
            
        }
    }
  }
  
  public Kunden(event):void {
    console.log("event",event);
    if(event.length >= 2){
            this.kundenService.getKundeCRM(event, this.privatkunde, this.allekunden, this.sicht)
            .subscribe((kunden: Kunden[])=> {
              
                        this.kunden = kunden;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };

}


public additemforsearch(val):void {
//   console.log("val",val);
  const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
  this.selectedKunde.next(val);
  itemforsearch.push(this.fb.group({
   firstname: [val.fname],
   lastname: [val.vname],
   kundennummer: [val.beznr]
   
  }));
}

public deleteitemforsearch(val): void {
    const itemforsearch = this.filter.controls['itemforsearch'] as FormArray;
    console.log("deletekunde",val);
     itemforsearch.removeAt(val );
     this.deletedKunde.next(val);
}

public changecheckedKunde(){
   
  if (this.checkedKunde === false){
    this.checkedKunde = true;
    this.privatkunde = "yes";
    console.log("checkedKunde true", this.checkedKunde);
  } else {
    this.checkedKunde = false;
    this.privatkunde = "no";
    console.log("checkedKunde false", this.checkedKunde);
  }
}

public loadStartKunden(event:string):void {
  console.log("event",event);
    if(event){
            this.kundenService.getKundeCRM(event, this.privatkunde, this.allekunden, this.sicht)
            .subscribe((kunden: Kunden[])=> {
              
                        //this.kunden = kunden;
                         console.log("this.kunden",kunden);
                        let anzeigeKunden = kunden;
                        for (let anzobj of anzeigeKunden){
                            this.additemforsearch(anzobj);
                        }
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               };
}

}
