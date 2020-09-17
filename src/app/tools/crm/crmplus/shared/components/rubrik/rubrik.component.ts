import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { RubrikauswahlService } from '../../../../../shared/services/rubrikauswahl.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';


@Component({
  selector: 'app-rubrik',
  templateUrl: './rubrik.component.html',
  styleUrls: ['./rubrik.component.css']
})
export class RubrikComponent implements OnInit {

  rubrikvalue:string;
  public filter: FormGroup;
  formctrl = new FormControl();
  @Output() selectedrubrik = new EventEmitter();
  @Input() obj:any;
  @Input() sicht: string;
  rubs:any;
  
  constructor(private rubrikauswahlService:RubrikauswahlService) { 
      let rub = sessionStorage.getItem('timelinerubrik');
    if (rub){
        let temprub = JSON.parse(rub);
        console.log("rub",rub);
        this.rubrikvalue = temprub.rubrik;
        this.selectedrubrik.next(temprub.rubrik);
    }
    
    let obj = sessionStorage.getItem('timelineobj');
    if (obj){
        let tempobj = JSON.parse(obj);
        console.log("obj",tempobj);
        this.obj = tempobj.objekt;
         this.formctrl.enable();
    }
  }

  ngOnInit() {
     if (this.obj){
       this.formctrl.enable();
     } else {
     this.formctrl.disable();
     }
  }
  
  ngOnChanges(){
    if (this.obj){
      this.formctrl.enable();
    }else {
      // console.log("change else",this.obj);
      this.formctrl.disable();
    }

  }
  
    public getRubrik(event):void {
    console.log("event",event);
    if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2 && this.obj !== ""){
      console.log("getRubrik");
            this.rubrikauswahlService.showRubrikCRM(this.obj, event, this.sicht)
            .subscribe((rub)=> {
              
                        this.rubs = rub;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
               } else {
                 console.log("zurücksetzen der variable rubriktvalue");
                this.selectedrubrik.next('');
               }
               };

}

public additemforsearch(val):void {
  console.log("val",val);
  this.selectedrubrik.next(val);
   let tempjson = JSON.stringify(val);
   sessionStorage.setItem('timelinerubrik', tempjson);
}

public rubrikdelete() {
   sessionStorage.removeItem('timelinerubrik');
}



}
