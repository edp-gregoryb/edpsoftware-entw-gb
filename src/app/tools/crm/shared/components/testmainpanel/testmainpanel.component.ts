import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { TermindetailService } from '../../termindetail.service';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { Subscription ,timer,  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { DelterminService } from '../../services/deltermin.service';
import { RubrikauswahlService } from '../../../../shared/services/rubrikauswahl.service';
import { SavetermindetailService } from '../../services/savetermindetail.service';
import { CommonService } from '../../comm/common.service';
import { DropdownModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { UsdatestringtochstringPipe } from '../../pipes/usdatestringtochstring.pipe';
import { DatumzeitauswahlComponent } from '../datumzeitauswahl/datumzeitauswahl.component';
import { KontaktpersdropmaterialComponent } from '../kontaktpersdropmaterial/kontaktpersdropmaterial.component';
import { AktivitaetdropmaterialComponent } from '../aktivitaetdropmaterial/aktivitaetdropmaterial.component';
import { MitarbeiterdropmaterialComponent } from '../mitarbeiterdropmaterial/mitarbeiterdropmaterial.component';
import { AschluesseldropmaterialComponent } from '../aschluesseldropmaterial/aschluesseldropmaterial.component';
import { WindowrefService } from '../../comm/windowref.service';

@Component({
  selector: 'app-testmainpanel',
  templateUrl: './testmainpanel.component.html',
  styleUrls: ['./testmainpanel.component.css']
})
export class TestmainpanelComponent implements OnInit {

  private termindetaillist: any = null;
  //dialogRef: MatDialogRef<any>;
  needupdate:boolean = false;
  kundevonauswahlnew:any;
  dateValuenew: any;
  dateToday:Date;
  zeitValuenew:Date;
  terminlist: any;
  private subscription: Subscription;
  private subscription1: Subscription;
  rowid:string;
  aktvalue: string;
  kontaktpersvalue: string;
  kontaktpersonen: any = null;
  showEdit: boolean = false;
  canEdit: boolean = false;
  msgs: Message[] = [];
  termkontaktperskunde: string = null;
//  isActiveKontakpers: boolean = false;
  isActiveAktivitaet: boolean = false;
  aktivitaetskunde: string = null;
  termingeloescht:boolean = false;
  beznrkunde: number;
  buttonNeuerTermin:boolean = false;
  jsonzumspeichern: any = null;
  edittrue: boolean = true;
  agenturanwesend: boolean = true;
  bznragentur: number;
  objektanwesend: boolean = true;
  objektrubrik: boolean = true;
  rubrikurubrik: boolean = true;
  urubrikausgabe: boolean = true;
  termrapptext: string = null;
  kontaktpersontext: string;
  neuertermin:boolean = false;
  neueOfferte:boolean = false;
  aschluessel:string;
  //aschluesseldata:any = null;
  mitarbeiterdata:any = null;
  mitarbeiter:string = null;
  kontaktpersnr:string;
  aschluesseltodb:any;
  kontaktperstodb:any;
  aktivitaettodb:any;
  mitarbeitertodb:any;
  agenturtodb:any;
  aktivitaetfordrop:string;
  mitarbeiterbezfordrop:string;
  objektfordrop:any = {};
   objekttodb:any = {};
   display: boolean = false;
   interval:any;
   rappnrfromNext:number;
   _window:Window;
  constructor(private termindetail: TermindetailService,  private commonService: CommonService,
    private adrkundenService: AdrkundenService,
    private objektauswahlService: ObjektauswahlService, private rubrikauswahlService: RubrikauswahlService,
    private savetermindetailService: SavetermindetailService, private router: Router,
    private delterminService:DelterminService, private windowrefService:WindowrefService
    
    ) { 
    this._window = this.windowrefService.getNativeWindow();
    // console.log("this._window",this._window);
    }

  ngOnInit() {
    this.loadmainhaupt();
    if (this.router.url === '/agendaview/agendaitems-show'){
      this.buttonNeuerTermin = false;
    } else if (this.router.url === '/projektview/projekte-show'){
       this.buttonNeuerTermin = false;
    } else {
      this.buttonNeuerTermin = true;
    }
    // let tempdate = new Date().toLocaleDateString();
    // let tempdatearray = tempdate.split('.');
    // this.dateValuenew = tempdatearray[2]+'-'+tempdatearray[1]+'-'+tempdatearray[0];
  }
  loadmainhaupt(){
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'onSubmit') {
        // console.log("test service", res.value.rapnr, res.value.beznr);
        this.termingeloescht = res.value2;
        if (res.value){
        this.termindetail.getTermindetail(res.value.rapnr, res.value.beznr, "", "", "")
          .subscribe(termine => {
            this.termindetaillist = termine;
            if (this.termindetaillist.length !== 0){
            //  console.log("mainhaupt komp",this.termindetaillist);
            this.aschluessel = this.termindetaillist[0].aschlussel;
            this.aschluesseltodb = this.termindetaillist[0].aschlussel;
            this.aktvalue = this.termindetaillist[0].termaktivid;
            this.aktivitaetskunde = this.termindetaillist[0].termaktivid;
            this.rowid = this.termindetaillist[0].ROWID;
            this.kontaktpersontext = this.termindetaillist[0].termkontaktpers;
            this.termkontaktperskunde = this.termindetaillist[0].termkontaktpers;
            this.mitarbeiter = this.termindetaillist[0].mitarbeitername;
            this.objekttodb.value = this.termindetaillist[0].objekt;
            this.kontaktpersnr = this.termindetaillist[0].termKontaktBeznr;
            this.aktivitaetfordrop = this.termindetaillist[0].aktividcd;
            this.mitarbeiterbezfordrop = this.termindetaillist[0].mitbeznr;
            this.objektfordrop = this.termindetaillist[0].objekt;
            //console.log("this.this.kontaktpersnr",this.kontaktpersnr);
            this.beznrkunde = this.termindetaillist[0].beznr;
            if (this.termindetaillist[0].agenturbeznr === 0) {
              // console.log("keine agentur");
            } else {
              this.agenturanwesend = true;
              this.bznragentur = this.termindetaillist[0].agenturbeznr;
            }
            this.showEdit = true;
           // this.getKontaktpers(res.value.beznr);
            if (!this.termindetaillist[0].agenturname) {
              this.agenturanwesend = false;
              // console.log("this.agenturanwesend",this.agenturanwesend);
            }
            if (!this.termindetaillist[0].objekt) {
              this.objektanwesend = false;
              this.objektrubrik = false;
            }
            if (!this.termindetaillist[0].rubrik) {
              this.rubrikurubrik = false;

            }
            if (!this.termindetaillist[0].urubrik) {
              this.urubrikausgabe = false;

            }
            }
            this.needupdate = false;
           
          }, err => {
            console.error(err);
          });
        }
      }
    });
    

    this.subscription1 = this.commonService.notify4Observable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'abbrechen') {
        // console.log("abbrechen", res.value);
        this.canEdit = res.value;
        this.neuertermin = res.value1;
      }
    });

    this.subscription = this.commonService.notify7Observable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'postpone') {
        // console.log("test service MainHauptComponent", res.value);
        //this.needupdate = true;
       
      }
    });
    this.subscription = this.commonService.notify14Observable$.subscribe((res) => {
      if (res.hasOwnProperty('option')&& res.option === 'neuerTermin1') {
        // console.log("neuerTermin1", res.value, res.kunde);
        this.neuertermin = true;
        this.kundevonauswahlnew = res.kunde;
      // this.commonService.notifyOther13({ option: 'neuerTermin', value: 'test notifyOther13' }); 
    }
  });
    

  var datetoday = new Date();
  this.dateToday = this.changeWebToStringzeit(datetoday);

   
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

  showOfferte(data) {
    // this.commonService.notifyOther18({ option: 'offerte', value: data });
    this.router.navigate(['./offertview/offerte-show',data]);
    
  }
   myDbvalueChanged(val){
  // console.log("Objekt",val);
   this.objekttodb = val;
 }
  // NewAschluesselvalueChanged(val){
  //   console.log("Output Event",val);
  //   this.aschluesseltodb = val;
  // }
  // NewKontaktpersonvalueChanged(val){
  //   console.log("Output Event",val);
  //   this.kontaktperstodb = val;
  // }
  // NewAktivitaetonvalueChanged(val){
  //   console.log("Output Event",val);
  //   this.aktivitaettodb = val;
  // }
  // NewMitarbeitertonvalueChanged(val){
  //   console.log("Output Event",val);
  //   this.mitarbeitertodb = val;
  // }
  NewAgenturvalueChanged(val){
    // console.log("Output Event",val);
    this.agenturtodb = val;
  }
  NewkontaktpersonChanged(val){
    // console.log("NewkontaktpersonChanged",val);
    this.kontaktperstodb = val;
  }
  NewaktivitaetonvalueChanged(val){
    // console.log("NewaktivitaetonvalueChanged",val);
    this.aktivitaettodb = val;
  }
  NewmitarbeiteronvalueChanged(val){
    // console.log("NewmitarbeiteronvalueChanged",val);
    this.mitarbeitertodb = val;
  }
  NewausgabeonvalueChanged(val){
    // console.log("NewausgabeonvalueChanged",val);
    this.aschluesseltodb = val;
  }
  
  checkifdateorstringtodb(datum){
    var value;
    if (datum){
      var crmdatumtemp = datum.toLocaleString();
     // console.log("crmdatumtemp",crmdatumtemp);
    var enda = crmdatumtemp.toString().split('.');
    var tempenda0 = enda[0];
    var tempenda1 = enda[1];
    if (enda[0].length < 2) {
      // console.log("enda[0]",enda[0]);
      tempenda0 = "0" + enda[0];
    }
    if (enda[1].length < 2) {
      // console.log("enda[1]",enda[1]);
      tempenda1 = "0" + enda[1];
    }
    var crmdatum1 = tempenda0 + tempenda1 + enda[2];
    var crmdatum = crmdatum1.toString().split(',');
    return value = crmdatum[0];
    } else {
      return value = "";
    }
  }
  checkifzeitorstringtodb(zeit){
    var value;
    if (zeit){
      var crmdatumtemp = zeit.toLocaleString();
      // console.log("crmdatumtemp",crmdatumtemp);
    var enda = crmdatumtemp.toString().split(',');
    var crmdatum = enda[1];//crmdatum1.toString().split(',');
    return value = crmdatum.toString().trim().substring(0,5);
    } else {
      return value = "";
    }
  }
  
  showSuccessandSaveTermin(notiz,  datumzeit) {
    var pasttermin = this.termindetaillist[0];
    var datetime = datumzeit;
    // console.log("datetime",datetime);
    if (datetime.dateValuenew){
      console.log("dateValuenew voll");
      let tempdate = datetime.dateValuenew;
    let tempdatearray = tempdate.split('-');
    var dateValuenew = tempdatearray[2]+'.'+tempdatearray[1]+'.'+tempdatearray[0];
    } else {
        console.log("dateValuenew leer");
      dateValuenew = "";
    }
    // if (tempdatearray){
    //   dateValuenew = "";
    // }
    //var datetodb = this.checkifdateorstringtodb(datumzeit.dateValuenew);
    // console.log("datetodb",datetodb);
    var zeittodb = this.checkifzeitorstringtodb(datumzeit.zeitValuenew);
   //  console.log("datumzeit",datumzeit);
   
    var datetoday = new Date().toLocaleDateString();
    var timenow = new Date().toLocaleTimeString();
    //var dateTodaytemp = this.changeWebToStringzeit(datetoday);
   
    var aschluessel:any = "";
  if (this.aschluesseltodb){
    if (this.aschluesseltodb.value){
    //aschluessel = this.aschluesseltodb.value;
    aschluessel = this.aschluesseltodb.value;
  } else {
    aschluessel = this.aschluessel;
  }
  }
  var kontaktbez = "";
  var kontaktgesname = "";
  if (this.kontaktperstodb){
    kontaktbez = this.kontaktperstodb.value;
    kontaktgesname = this.kontaktperstodb.value1;
  } else {
    kontaktbez = this.kontaktpersnr;
    kontaktgesname = this.termkontaktperskunde;
  }
  var aktivitaet:any = "";
  if (this.aktivitaettodb){
    aktivitaet = this.aktivitaettodb.value;
  } else {
    aktivitaet = this.aktivitaetfordrop;
  }
  var mitarbeiter:any = "";
  if (this.mitarbeitertodb){
    mitarbeiter = this.mitarbeitertodb.value;
    // console.log("mitarbeiter",mitarbeiter);
  } else {
    mitarbeiter = this.mitarbeiterbezfordrop;
  }
  var changeagentur:any = "";
  if (this.agenturtodb){
    changeagentur = this.agenturtodb.value;
  }
    
    this.jsonzumspeichern = {
      ROWID: pasttermin.ROWID,
      agenturbeznr: changeagentur,
      aktioncode: pasttermin.aktioncode,
      aktividcd: aktivitaet,
      aschlussel: aschluessel,
      beznr: pasttermin.beznr,
      firma: pasttermin.firma,
      grundcode: pasttermin.grundcode,
      mitbeznr: mitarbeiter,
      objekt: pasttermin.objekt,
      rapKontaktBeznr:  pasttermin.rapKontaktBeznr,
      rapdatum: datetoday,
      rapptext: notiz,
      rapzeit: timenow.toString().substring(0,5),
      rubrik: pasttermin.rubrik,
      termKontaktBeznr: kontaktbez,
      termaktivcd: aktivitaet,
      termdatum:dateValuenew ,
      termkontaktpers: kontaktgesname,
      termmitbeznr: mitarbeiter,
      termrapptext: notiz,
      termzeit: datetime.timeValuenew,
      urubrik: pasttermin.urubrik,
      fazit: 'yes'
    }

    console.log("neues Fazit", this.jsonzumspeichern);
    var antwortsavetermindetail;
    
    // console.log("this._window", this._window.scrollTo(0, 0));    
    this.savetermindetailService.saveTermindetail(this.jsonzumspeichern)
      .subscribe(termindetail1 => {
        antwortsavetermindetail = termindetail1;
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Neues Fazit', detail: 'wurde gespeichert' });
        this.commonService.notifyOther5({ option: 'TerminFazit', value: true });
        this.termrapptext = "";
        this.isActiveAktivitaet = false;
        this.termrapptext = "";
        
      this._window.scrollTo(0, 0);
      // this.termindetaillist = [];
      }, err => {
        console.error(err);
      });
       
       timer(2000)
          .pipe(map(() => this.msgs = []))
          .subscribe(() => {
            console.log("Anzeige sollte verschwinden" );
            
          }); 
          
         

  }

  editieren() {
    if (this.canEdit === false) {
      this.canEdit = true;
      this.commonService.notifyOther3({ option: 'editieren', value: this.canEdit }); //notifyOther({ option: 'search', value: event, value1: this.selectedPrivatadressen, value2: this.selectedkunden });

    } else {
      this.canEdit = false;
      this.commonService.notifyOther3({ option: 'editieren', value: this.canEdit });

    }

  }
  neuerTermin(){

      this.commonService.notifyOther14({ option: 'neuerTermin1', value: true  });

    //this.neuerTerminbutton = false;
  }

  showDeleteDialog(){
    this.display = true;
  }
  deleteTermin(val){
    var geloschtterm;
    // console.log("this.rowid",this.rowid);
    this.delterminService.delTermin(this.rowid)
         .subscribe(delterm => { geloschtterm = delterm;
      }, err => {
        console.error(err);
      });
      this.termingeloescht = true;
      this.display = false;
      this.commonService.notifyOther5({ option: 'TerminFazit', value: true });
      
  }

  showInfoAbbrechen() {
    if (this.canEdit === true) {
      this.canEdit = false;

      this.edittrue = true;
    } else {
      this.canEdit = true;

      this.edittrue = false;
    }
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: '', detail: 'nicht gespeichert' });
  }

  checkaktuellDate(dateaktuell,timeaktuell){
    let aktuell,datetemp, timetemp;
    
    datetemp = dateaktuell.split('.');
    timetemp = timeaktuell.split(':');
    //console.log("timeaktuell", timetemp);
    aktuell = new Date(datetemp[2]+','+datetemp[1]+','+datetemp[0]+','+timetemp[0]+':'+timetemp[1]+':'+'00');//+','+timetemp[0]+','+timetemp[1]+','+'0'+','+'0'
   // console.log("start, aktuell", start, aktuell);
    return aktuell;
  }
  changeWebToStringzeit(datumoderzeit){
    var crmdatumtemp = datumoderzeit.toLocaleString();
    //var crmdatumtemp1 = crmdatumtemp.toString().split(',');
     var enda = crmdatumtemp.toString().split('.');
     var tempenda0 = enda[0];
       var tempenda1 = enda[1];
      if(enda[0].length < 2) {
       // console.log("enda[0]",enda[0]);
        tempenda0 = "0"+enda[0];
      } 
      if (enda[1].length < 2) {
       // console.log("enda[1]",enda[1]);
        tempenda1 = "0"+enda[1];
      } 
       var crmdatum1 = tempenda0+tempenda1+enda[2];
       var crmdatum;
       return  crmdatum = crmdatum1.toString().split(',');
 }

}
