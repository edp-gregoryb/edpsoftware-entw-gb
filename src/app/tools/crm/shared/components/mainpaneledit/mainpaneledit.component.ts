import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ng2-cookies';
import { CommonService } from '../../comm/common.service';
import { AutoCompleteModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { SavetermindetailService } from '../../services/savetermindetail.service';
import { DatumzeitauswahlComponent } from '../../components/datumzeitauswahl/datumzeitauswahl.component';
// import { KontaktpersdropComponent } from '../../components/kontaktpersdrop/kontaktpersdrop.component';
// import { ObjektdropComponent } from '../../components/objektdrop/objektdrop.component';
import { ObjektdropmaterialComponent } from '../../components/objektdropmaterial/objektdropmaterial.component';
// import { RubrikdropComponent } from '../../components/rubrikdrop/rubrikdrop.component';
// import { UrubrikdropComponent } from '../../components/urubrikdrop/urubrikdrop.component';
import { RubrikdropmaterialComponent } from '../../components/rubrikdropmaterial/rubrikdropmaterial.component';
import { UrubrikdropmaterialComponent } from '../../components/urubrikdropmaterial/urubrikdropmaterial.component';
import { WindowrefService } from '../../comm/windowref.service';


@Component({
  selector: 'app-mainpaneledit',
  templateUrl: './mainpaneledit.component.html',
  styleUrls: ['./mainpaneledit.component.css']
})
export class MainpaneleditComponent implements OnInit {
  termindetaillist: any = null;
   private subscription:Subscription;
   jsonzumspeichern:any;
 @Input() terminlist: any;
 @Output() editabbrechen = new EventEmitter();
 @Output() terminbearbeitet = new EventEmitter();
    dateValuenew: any;
  zeitValuenew:any;
  aktvalue: string;
  msgs: Message[] = [];
  canEdit: boolean;
  isActiveKunde: boolean = false;
  isActiveAgentur: boolean = false;
  isActiveKontakpers: boolean = false;
  isActiveAktivitaet: boolean = false;
  termrapptextkunde: string = null;
  beznrkunde: string;
  objekttext: string;
  rubriktext: string;
  kontaktpersontext: string;
  aschluesseltext: string = null;
  urubriktext: string = null;
  mitarbeiter:string;
  mitarbeiterdropdown:string = null;
  aktionfordrop:string;
  aktiontodb:string;
  kundetodb:any;
  agenturtodb:any;
  kontaktperstodb:any;
  aschluesseltodb:any;
  rubriktodb:any;
  urubriktodb:any;
  aktivitaettodb:any;
  mitarbeitertodb:any;
  objekttodb:any;
  aktivitaetfordrop:string;
  mitarbeiterbezfordrop:string;
  objektfordrop:string;
  kontaktpersnr:string;
   _window:Window;
  // kundenwechsel:any;
  constructor(private commonService: CommonService, private cookieService: CookieService,
    private savetermindetailService:SavetermindetailService, private windowrefService:WindowrefService
    ) { 
      this._window = this.windowrefService.getNativeWindow();
    // console.log("this._window",this._window);
      // this.kundenwechsel = sessionStorage.getItem('KundenWechsel');
    }

  ngOnInit() {
    //console.log("terminlist",this.terminlist);
     this.beznrkunde = this.terminlist[0].beznr;
  
    this.objekttext = this.terminlist[0].objekt;//objektbezeichnung;
    this.rubriktext = this.terminlist[0].rubrik;
    this.urubriktext = this.terminlist[0].urubrik;
    this.aschluesseltext = this.terminlist[0].aschlussel;
    this.aschluesseltodb = this.terminlist[0].aschlussel;
    this.termrapptextkunde = this.terminlist[0].termrapptext;
    this.objekttodb = this.terminlist[0].objekt; 
    this.kontaktpersontext = this.terminlist[0].termkontaktpers;
    this.aktvalue = this.terminlist[0].aktivid;
    this.mitarbeiterdropdown = this.terminlist[0].termmitarbeitername;
    this.aktivitaetfordrop = this.terminlist[0].aktividcd;
    this.mitarbeiterbezfordrop = this.terminlist[0].termmitbeznr;
    this.objektfordrop = this.terminlist[0].objekt;
    this.aktionfordrop = this.terminlist[0].aktioncode;
    this.aktiontodb = this.terminlist[0].aktioncode;
    this.kontaktpersnr = this.terminlist[0].termKontaktBeznr;
    this.kontaktperstodb = this.terminlist[0].termKontaktBeznr;
    this.rubriktodb = this.terminlist[0].rubrik;
    this.urubriktodb = this.terminlist[0].urubrik;
    this.agenturtodb = this.terminlist[0].agenturbeznr;
     var value = this.terminlist[0].termdatum;
     //console.log("termdatum",value);
     if (value ){
      var temp = value.toString().split('/');
      //const usdatestringtochstring = temp[1]+'.'+temp[0]+'.'+temp[2];
      this.dateValuenew = temp[2]+'-'+temp[0]+'-'+temp[1];
      //  console.log("usdatestringtochstring",usdatestringtochstring);
    // this.dateValuenew = usdatestringtochstring;
    }
     
     this.zeitValuenew = this.terminlist[0].termzeit;
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
 myDbvalueChanged(val){
  // console.log("Objekt",val);
  if (val.value){
   this.objekttodb = val.value;
  }
 }
 NewRubrikvalueChanged(val){
    // console.log("Objekt",val);
    if (val.value){
   this.rubriktodb = val.value;
    }
 }
NewKundevalueChanged(val){
     console.log("Output Event",val);
    if (val){
    this.kundetodb = val;
    }
  }
  NewAgenturvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value === 0){
      console.log("keine Agentur ausgewählt");
    } else {
    this.agenturtodb = val.value;
    }
  }
  NewkontaktpersonChanged(val){
    // console.log("Output Event",val);
    if (val.value){
    this.kontaktperstodb = val.value;
    }
  }
  NewausgabeonvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
      this.aschluesseltodb = val.value;
    } else {
      this.aschluesseltodb = '';
    }
  }
  NewUrubrikonvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
    this.urubriktodb = val.value;
    }
  }
  NewaktivitaetonvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
    this.aktivitaettodb = val.value;
    }
  }
  NewaktionvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
      this.aktiontodb = val.value;
    } else {
      this.aktiontodb = '';
    }
  }
  NewMitarbeitertonvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
    this.mitarbeitertodb = val.value;
    }
  }
  NewmitarbeiteronvalueChanged(val){
     if (val.value){
    this.mitarbeitertodb = val.value;
    }
  }
 
 SaveTermin(notiz, datum, zeit, datumzeit,kontaktpersfromweb,aktivitaetfromweb,mitarbeiterfromweb,aschluesselvalue){
   var pasttermin = this.terminlist[0];
   var datetime = datumzeit;
    // console.log("datetime",datetime);
    let tempdate = datetime.dateValuenew;
    let tempdatearray = tempdate.split('-');
    var dateValuenew = tempdatearray[2]+'.'+tempdatearray[1]+'.'+tempdatearray[0];
    var zeittodb = datetime.timeValuenew;//this.checkifzeitorstringtodb(datumzeit.zeitValuenew);
    var datetoday = new Date().toLocaleDateString();
  
  var beznrkunde = "";
  if (this.kundetodb){
    beznrkunde = this.kundetodb;
  } else {
    beznrkunde = this.beznrkunde;
  }
  var agentbeznr = "";
  if (this.agenturtodb){
    agentbeznr = this.agenturtodb;
  }
  var kontaktbez = "";
  var kontaktgesname = "";
  if (this.kontaktperstodb){
    // console.log("this.kontaktperstodb",this.kontaktperstodb);
    kontaktbez = this.kontaktperstodb;
    kontaktgesname = this.kontaktpersontext;
  } else {
    kontaktbez = this.kontaktperstodb;
  }
  
  var aschluessel = "";
  if (this.aschluesseltodb){
    aschluessel = this.aschluesseltodb;
    }
    
  

  var objekt = "";
  if (this.objekttodb){
    // console.log("objekttodb",this.objekttodb);
        objekt = this.objekttodb;
     }
   
  
  var rubrik = "";
  if (this.rubriktodb){
      rubrik = this.rubriktodb;
    }
  

  var urubrik = "";
  if (this.urubriktodb){
    // console.log("urubriktodb",this.urubriktodb);
   
      urubrik = this.urubriktodb;
    }
  

  var aktivitaet = "";
  if (this.aktivitaettodb){
    aktivitaet = this.aktivitaettodb;
  }else {
    aktivitaet = aktivitaetfromweb.aktivitaet;
  }
  var mitarbeiter = "";
  if (this.mitarbeitertodb){
    mitarbeiter = this.mitarbeitertodb;
  } else {
    mitarbeiter = mitarbeiterfromweb.mitarbeiter;
  }
   if (this.termrapptextkunde === ""){
    var termapte:string = "";
  } else {
      var termapte:string = this.deletelinebreack(this.termrapptextkunde);
  }
  
 this.jsonzumspeichern = {
      ROWID: pasttermin.ROWID,
      agenturbeznr:agentbeznr,
      aktioncode: this.aktiontodb,
      aktividcd: aktivitaet,
      aschlussel: aschluessel,
      beznr : beznrkunde,
      grundcode: "",
      mitarbeitername: JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginVorname + JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginName,
      mitbeznr: JSON.parse(atob(this.cookieService.get('currentUser')))[0].Beznr,
      objekt: objekt,
      rapKontaktBeznr: kontaktbez,
      rapdatum:  datetoday,//tagesdatum
      rapptext: termapte,
      rapzeit: zeittodb,
      rubrik: rubrik,
      termKontaktBeznr: kontaktbez,
      termaktivcd: aktivitaet,
      termdatum: dateValuenew,
      termkontaktpers:kontaktgesname,
      termmitbeznr: mitarbeiter, 
      termrapptext: termapte,
      termzeit: zeittodb,
      urubrik: urubrik,
      kontaktpers:kontaktgesname
    }

    
    console.log(" this.jsonzumspeichern", this.jsonzumspeichern);

     var antwortsavetermindetail;
    this.savetermindetailService.saveTermindetail(this.jsonzumspeichern)
      .subscribe(termindetail => {
        antwortsavetermindetail = termindetail;
        // this.commonService.notifyOther5({ option: 'TerminFazit', value: true });
         this.editabbrechen.next(false);
         this.terminbearbeitet.next(beznrkunde);
      }, err => {
        console.error(err);
      });
      this._window.scrollTo(0, 0);
     // this.commonService.notifyOther4({ option: 'abbrechen', value: this.canEdit, value1: false });
  }

   showInfoAbbrechen() {
    this.canEdit = false;
    // this.commonService.notifyOther4({ option: 'abbrechen', value: this.canEdit, value1: false });
    this.editabbrechen.next(false);
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: '', detail: 'nicht gespeichert' });
  }
  deletelinebreack(str) {
    var temp1 = str.replace(/\n/gi, '%0a');
    var temp2 = temp1.replace(/\n/gi, '%0d')
    console.log("linearray1", temp2);
    var string2 = temp2;
    return string2;
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

}
