import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdrvermittlerService } from '../../../../shared/services/adrvermittler.service';
import { Vermittler } from '../../../../../shared/entities/vermittler';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-timelinevermittler',
  templateUrl: './timelinevermittler.component.html',
  styleUrls: ['./timelinevermittler.component.css']
})
export class TimelinevermittlerComponent implements OnInit {

  vermittlervalue:string;
  public vermittler: Array<Vermittler> = [];
  //public selectedVermittler: Vermittler;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedVermittler = new EventEmitter<any>();
  @Input() sicht: string;
  @Input() vermittlervonlink:string;
   
  constructor(private vermittlerService: AdrvermittlerService) { 
      let vermittler = sessionStorage.getItem('timelinevermittler');
    if (vermittler){
        let tempvermittler = JSON.parse(vermittler);
        console.log("vermittler",vermittler);
        if (tempvermittler.beznr) {
            this.vermittlervalue = tempvermittler.anzeigename;
            this.selectedVermittler.next(tempvermittler.beznr);
        } else {
        this.vermittlervalue = tempvermittler.vermittler;
        this.selectedVermittler.next(tempvermittler.vermittler);
        }
    }
  }

  ngOnInit() {
  }

  public Vermittler(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){
            this.vermittlerService.showvermittlerCRM(event, this.sicht)
            .subscribe((vermittler: Vermittler[])=> {
              
                        this.vermittler = vermittler;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      });
          

} else {
                 console.log("zurücksetzen der variable kundenvalue");
                this.selectedVermittler.next('');
               }
               };
}

public additemforsearch(val):void {
   console.log("val",val);
  this.selectedVermittler.next(val);
  let tempjson = JSON.stringify({"beznr":val.beznr, "anzeigename":val.anzeigename});
  sessionStorage.setItem('timelinevermittler', tempjson);
 
}

public deletevermittler(){
     sessionStorage.removeItem('timelinevermittler');
}
}
