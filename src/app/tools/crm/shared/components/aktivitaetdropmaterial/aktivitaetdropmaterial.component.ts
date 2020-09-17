import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AktivitaetService } from '../../services/aktivitaet.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-aktivitaetdropmaterial',
  templateUrl: './aktivitaetdropmaterial.component.html',
  styleUrls: ['./aktivitaetdropmaterial.component.css']
})
export class AktivitaetdropmaterialComponent implements OnInit {
   aktivitaetdata:any;
  @Input() aktivitaet:string;
 
   @Output() aktivitaetonvalueChanged = new EventEmitter();
   
  constructor(private aktivitservice: AktivitaetService) { }

  ngOnInit() {
    this.aktivitservice.showaktivitaet()
      .subscribe(aktivitaeten => { this.aktivitaetdata = aktivitaeten }, err => {
        console.error(err);
      });
  }
  
  selectedAktivitaet(aktivivalue){
    if (aktivivalue) {
      this.aktivitaetonvalueChanged.next({value: aktivivalue.value});
      // console.log("obj",objekt);
    }
  }

}
