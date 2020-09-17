import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MitarbeiterService } from '../../services/mitarbeiter.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mitarbeiterdropmaterial',
  templateUrl: './mitarbeiterdropmaterial.component.html',
  styleUrls: ['./mitarbeiterdropmaterial.component.css']
})
export class MitarbeiterdropmaterialComponent implements OnInit {
  mitarbeiterdata:any;
  @Input() mitarbeiter:any;
  @Output() mitarbeiteronvalueChanged = new EventEmitter();
  constructor(private mitarbeiterService:MitarbeiterService) { }

  ngOnInit() {
    console.log("mitarbeiter",this.mitarbeiter);
    this.mitarbeiterService.getMitarbeiter()
      .subscribe(mitarbeiter => { this.mitarbeiterdata = mitarbeiter }, err => {
        console.error(err);
      });
  }
  
  // selectedMitarbeiter(mitarbeitervalue){
  //   if (mitarbeitervalue) {
  //     console.log("mitarbeitervalue",mitarbeitervalue);
  //     this.mitarbeiteronvalueChanged.next({value: mitarbeitervalue.value});
  //     // console.log("obj",objekt);
  //   }
  // }
  
  selectedMitarbeiter(mitarbeitervalue){
     if (mitarbeitervalue) {
       console.log("mitarbeitervalue",mitarbeitervalue);
      this.mitarbeiteronvalueChanged.next(mitarbeitervalue);
    } else {
      console.log("mitarbeitervalue",mitarbeitervalue);
      this.mitarbeiteronvalueChanged.next(mitarbeitervalue);
    }
  }

}
