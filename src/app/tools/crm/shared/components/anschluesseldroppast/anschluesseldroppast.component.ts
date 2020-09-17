import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AschluesselauswahlService} from '../../../../shared/services/aschluesselauswahl.service';

@Component({
  selector: 'app-anschluesseldroppast',
  templateUrl: './anschluesseldroppast.component.html',
  styleUrls: ['./anschluesseldroppast.component.css']
})
export class AnschluesseldroppastComponent implements OnInit {

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

  abdatum:any;

  constructor(private aschluesselauswahlService: AschluesselauswahlService) {
    let datetodayYear = new Date().getFullYear();
    let datetodayMonth = new Date().getMonth()
    let datetodayDay = new Date().getDay()

    let dateYearminus3 = datetodayYear - 3;
    this.abdatum = datetodayDay + '.' + datetodayMonth + '.' + dateYearminus3;
  }

  ngOnInit() {
    // console.log("this.objektvalue",this.objektvalue);
    if (this.objektvalue === undefined){//this.objektvalue
      console.log("kein Objekt ausgewählt");
      this.ausgabedata = this.tempschlussel;
      this.objektvalue = "0";
      // this.aschluessel = "kein Objekt ausgewählt";
    } else {

      this.aschluesselauswahlService.showAschluesselAbDatum(this.objektvalue, '', '', this.abdatum)
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
      this.aschluesselauswahlService.showAschluesselAbDatum(obj.value, '', '',this.abdatum)
          .subscribe(aschluessel => {
            this.ausgabedata = aschluessel;
            console.log("this.ausgabedata",this.ausgabedata);
          }, err => {
            console.error(err);
          });
    } else {
      this.aschluesselauswahlService.showAschluesselAbDatum(obj, '', '', this.abdatum)
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
