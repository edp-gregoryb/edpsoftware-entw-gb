import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../comm/common.service';
import { MainsearchService } from '../../comm/mainsearch.service';
import { RadioButtonModule } from 'primeng/primeng';
import { Router } from '@angular/router';
import {OverlayPanelModule} from 'primeng/primeng';
// import {DropdownModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { AschluesselauswahlService } from '../../../../shared/services/aschluesselauswahl.service';

@Component({
  selector: 'app-suchfeld',
  templateUrl: './suchfeld.component.html',
  styleUrls: ['./suchfeld.component.css']
})
export class SuchfeldComponent implements OnInit {
  kundebool: boolean = true;
  objOderkde: string = "kunde";
  text: string;
  speichertextprojekt:string;
  objekte:string;
  aschluessel:string;
  @Input() results: any = null;
  @Input() Objektresult: any = null;
  @Input() Aschluesselresult: any;
  selectedkunden: string = 'M';
  selectedPrivatadressen: boolean = false;
  selectedobjekte: boolean = false;
  isActiveFilter: boolean = false;
  objtrue: boolean = false;
  objektdata:any;
  aschluesseldata:any;
  constructor(private commObserver: CommonService, private _router: Router,private objektauswahlService: ObjektauswahlService,
      private aschluesselauswahlService:AschluesselauswahlService) {
    this._router = _router;
  }

  ngOnInit() {
    // this.search('Test');
    // if (this._router.url === '/projektview/projekte-show') {
    //   this.objtrue = true;
    //   this.showObjekte();
     
    // } else {
    //   this.objtrue = false;
    // }
    
    
  }

  search(event) {
    console.log("_router", this._router.url);
    console.log("event", event);
    // this.selectedPrivatadressen === true || 
    if (this.selectedkunden === 'eigenekunden'){
        this.isActiveFilter = true;
    }
   //console.log("this.selectedPrivatadressen", this.selectedPrivatadressen,this.selectedkunden);
    this.commObserver.notifyOther({ option: 'search', value: event, value1: this.selectedPrivatadressen, value2: this.selectedkunden });
  }
  searchObjekte(event){
    this.commObserver.notifyOther2({ option: 'searchObjekte', value: event});
  }
  searchAschluessel(event){
    this.commObserver.notifyOther15({ option: 'searchAschluessel', value: "", value2: event});
  }
  selectedvalue(daten) {
    console.log("daten", daten);
    console.log("this.speichertextprojekt", this.speichertextprojekt);
    if (this._router.url === '/teamview/team-show') {
      console.log("360");
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten });

    } else if (this._router.url === '/agendaview/agendaitems-show') {
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten, value1: this.objekte, value3:this.selectedkunden });
    } else if (this._router.url === '/projektview/projekte-show') {
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten, value1: this.objekte, value3:this.selectedkunden });
    }
  }
  selectedObjekt(obj,daten){
    console.log("daten", obj);
    if (this._router.url === '/teamview/team-show') {
      console.log("360");
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: obj });

    } else if (this._router.url === '/agendaview/agendaitems-show') {
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten, value1: obj, value3:this.selectedkunden });
       this.isActiveFilter = true;
    } 
    else if (this._router.url === '/projektview/projekte-show') {
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten, value1: obj, value3:this.selectedkunden });
       this.isActiveFilter = true;
    }
    
  }
  selectedAschluessel(aschluessel, obj,daten){
    console.log("aschluessel, obj",aschluessel, obj);
    if (this._router.url === '/projektview/projekte-show') {
      this.commObserver.notifyOther1({ option: 'selectedvalue', value: daten, value1: obj, value2: aschluessel, value3:this.selectedkunden });
       this.isActiveFilter = true;
    }
  }

  unselect() {
    if (this._router.url === '/teamview/team-show') {
      console.log("360");
      this.commObserver.notifyOther1({ option: 'unselect', value: 'unselect' });

    } else if (this._router.url === '/agendaview/agendaitems-show') {
      this.commObserver.notifyOther1({ option: 'unselect', value: 'unselect' });
       this.isActiveFilter = false;
    } else if (this._router.url === '/projektview/projekte-show') {
      this.commObserver.notifyOther1({ option: 'unselect', value: 'unselect' });
     
       this.isActiveFilter = false;
    }

    this.text = "";
    this.objekte = "";
    this.aschluessel = "";
  }


  withprivatadressen(value) {
    console.log("withprivatadressen", value);
    if (value === true){
      this.isActiveFilter = true;
    }
  }
  nachobjektensuchen(value) {
    console.log("nachobjektensuchen", value);
    if (value === true) {
      this.selectedobjekte = true;
      this.objOderkde = 'objekt';
    }
  }
  auswahlanwenden() {
    console.log("auswahlanwenden");
    this.isActiveFilter = true;
    var eigeneOderalle = this.selectedkunden;
  }
  showaschluessel(val){
     this.aschluesselauswahlService.showAschluessel(val, '', '')
        .subscribe(aschluessel => {
          this.aschluesseldata = aschluessel;
          console.log(this.aschluesseldata);
        }, err => {
          console.error(err);
        });
  }
  showObjekte(){
        this.objektauswahlService.showObjekt('','yes').subscribe(objekt => {
        this.objektdata = objekt;
        console.log(this.objektdata);
              // if (this.objektdata){
              //         for (let i= 0; i<= this.objektdata.length -1;i++){
              //         if (this.objekttext === this.objektdata[i].obj_bezeichnung){
              //             this.objektstodb = this.objektdata[i].objekt;
              //             this.dbvalueChanged.next({value:this.objektstodb});
              //             // console.log("this.aktivitaetstodb",this.aktivitaetstodb);
              //         } 
              //     }
              //         }
      }, err => {
        console.error(err);
      });
  }


}
