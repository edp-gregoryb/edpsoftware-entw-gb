import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-objektdropmaterial',
  templateUrl: './objektdropmaterial.component.html',
  styleUrls: ['./objektdropmaterial.component.css']
})
export class ObjektdropmaterialComponent implements OnInit {

  objektdata:any;
  @Input() objekt:string;
  @Input() objekttext:any;
  @Output() dbvalueChanged =new EventEmitter();
  constructor(private objektauswahlService: ObjektauswahlService) { }

  ngOnInit() {
    // console.log("objekt",this.objekt);
    if (this.objektdata){
      this.objektdata = this.objekttext;
      //console.log("daten",this.objekttext);
    } else {

      console.log("keine daten");
    }
    
    // console.log("start Objekt");
    this.objektauswahlService.showObjekt('','yes').subscribe(objekt => {
        this.objektdata = objekt;
      }, err => {
        console.error(err);
      });
      
  }
  
  selectedObjekt(objekt) {
    if (objekt) {
      this.dbvalueChanged.next({value: objekt.value});
      // console.log("obj",objekt);
    }
  }

}
