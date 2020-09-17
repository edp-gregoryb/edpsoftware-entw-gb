import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AschluesselauswahlService } from '../../../../shared/services/aschluesselauswahl.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-aschluesseldropmaterial',
  templateUrl: './aschluesseldropmaterial.component.html',
  styleUrls: ['./aschluesseldropmaterial.component.css']
})
export class AschluesseldropmaterialComponent implements OnInit {
  tempschlussel:any = [{
    aschlussel: "0",
    ausgbez:"kein Objekt ausgewählt",
    erschdat:"",
    fehlercode:"",
    fehlertext:"",
    objekt:"",
    rubrik:"",
    urubrik:""
  }];
  ausgabedata:any;
  @Input() objektvalue:string;
  @Input() aschluessel:any;
  @Input() width:any = '100%';
  @Output() ausgabeonvalueChanged = new EventEmitter();
  constructor(private aschluesselauswahlService:AschluesselauswahlService) { }

  ngOnInit() {
    // console.log("this.objektvalue",this.objektvalue);
    if (this.objektvalue === undefined){//this.objektvalue
      console.log("kein Objekt ausgewählt");
      this.ausgabedata = this.tempschlussel;
      this.objektvalue = "0";
      // this.aschluessel = "kein Objekt ausgewählt";
    } else {
      
      this.aschluesselauswahlService.showAschluessel(this.objektvalue, '', '')
        .subscribe(aschluessel => {
          this.ausgabedata = aschluessel;
          // console.log("this.ausgabedata",this.ausgabedata);
        }, err => {
          console.error(err);
        });
    }
  }
  showAusgabe(obj){
     console.log("obj.value",obj);
     if (obj.value){
       this.aschluesselauswahlService.showAschluessel(obj.value, '', '')
        .subscribe(aschluessel => {
          this.ausgabedata = aschluessel;
           console.log("this.ausgabedata",this.ausgabedata);
        }, err => {
          console.error(err);
        });
     } else {
    this.aschluesselauswahlService.showAschluessel(obj, '', '')
        .subscribe(aschluessel => {
          this.ausgabedata = aschluessel;
           console.log("this.ausgabedata",this.ausgabedata);
        }, err => {
          console.error(err);
        });
    }
  }
  selectedAusgabe(ausgaevalue){
    // console.log("ausgaevalue",ausgaevalue);
    if (ausgaevalue) {
      this.ausgabeonvalueChanged.next({value: ausgaevalue.value});
       console.log("ausgabeonvalueChanged",this.ausgabeonvalueChanged);
    }
  }

}
