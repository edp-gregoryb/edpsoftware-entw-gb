import { Component, OnInit, EventEmitter, Output, OnChanges, Input } from '@angular/core';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';
import { Kunden } from '../../../../../shared/entities/kunden';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


import { Observable } from 'rxjs';

@Component({
  selector: 'app-timelinekunde',
  templateUrl: './timelinekunde.component.html',
  styleUrls: ['./timelinekunde.component.css']
})
export class TimelinekundeComponent implements OnInit {

  public kunden: Array<Kunden> = [];
//   public selectedKunde: Kunden;
  privatkunde:string = 'no';
  allekunden:string = 'yes';
  @Input() kunde :any;
  @Input() sicht: string;
  @Output() selectedKunde = new EventEmitter<any>();
  public filter: FormGroup;
  kundenvalue:any;
  color = 'accent';
  checked = false;
  disabled = false;
  checkedKunde = false;
  kundevonurl:string = "";
 formctrl = new FormControl();
 
  
  constructor(private kundenService:AdrkundenService) { 
    let kundevonstorage = sessionStorage.getItem('timelinekunde');
    if (kundevonstorage){
        let temkunde = JSON.parse(kundevonstorage);
        console.log("temkunde",temkunde);
        if ( temkunde.anzeigename ) {
          this.kundenvalue = temkunde.anzeigename;
          this.selectedKunde.next(temkunde.anzeigename);
        } else if( temkunde.beznr ) {
          this.kundenvalue = temkunde.beznr;
          this.selectedKunde.next(temkunde.beznr);
        } else {
          this.kundenvalue = '';
          this.selectedKunde.next(this.kundenvalue);
        }
    }
    
 }

  ngOnInit() {
  // this.kundenvalue = this.kunde;
    // let tempjson = JSON.stringify(this.kunde);
    // sessionStorage.setItem('timelinekunde',tempjson);
  }
  
  public Kunden(event):void {
    console.log("event",event);
 
  if(event === undefined){console.log("event = undefined");} else {
    if(event !== "undefined" && event.length >= 2){

            this.kundenService.getKundeCRM(event, this.privatkunde, this.allekunden, this.sicht)
            .subscribe((kunden: Kunden[])=> {
              
                        this.kunden = kunden;
                        // console.log("this.kunden",this.kunden);
                      },
                      (err) => {
                        console.warn(err);
                      }
                      );
                     
    } else {
                 console.log("zurücksetzen der variable kundenvalue");
                 this.selectedKunde.next('');
               }
               };

}
public additemforsearch(val):void {
  this.selectedKunde.next(val);
  let tempjson = JSON.stringify({"beznr":val.beznr, "anzeigename":val.bfname});
  sessionStorage.setItem('timelinekunde', tempjson);
  
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

public deletekunde(){
   sessionStorage.removeItem('timelinekunde');
   this.selectedKunde.next('');
}
}
