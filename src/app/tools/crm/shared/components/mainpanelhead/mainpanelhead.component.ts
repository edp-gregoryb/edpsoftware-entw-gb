import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    ViewContainerRef,
    ViewChild,
    ElementRef,
    Inject
} from '@angular/core';
import { Router, NavigationEnd,RoutesRecognized } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { TermindetailService } from '../../termindetail.service';
import { SavetermindetailService } from '../../services/savetermindetail.service';
import { DelterminService } from '../../services/deltermin.service';
import { WindowrefService } from '../../comm/windowref.service';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/primeng';
import { CommonService } from '../../comm/common.service';
import { AuftragxlsxService } from '../../services/auftragxlsx.service';
import { TeleupdateService } from '../../services/teleupdate.service';
import { AdrvermittlerService } from '../../services/adrvermittler.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AgenturwechselComponent } from '../../components/agenturwechsel/agenturwechsel.component';
import { TerminverschiebenService } from '../../services/terminverschieben.service';
import { SearchpanelcalendarComponent } from '../../dialogs/searchpanelcalendar/searchpanelcalendar.component';
import { CrmMailversandService } from '../../../../shared/services/restcrmmailversand.service';
import { CrmEmailidService } from '../../../../shared/services/restcrmemailid.service';
import { UploadDateiService } from '../../../shared/services/uploaddatei.service';
import { RestitdownloaddateiService } from '../../../shared/services/restitdownloaddatei.service';
import { RestitgetdateienService } from '../../../shared/services/restitgetdateien.service';
import { OpendocumentsService } from '../../services/opendocuments.service';
import { RestsygetdefaultService } from '../../../crmplus/shared/services/restsygetdefault.service';
import {map} from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-mainpanelhead',
  templateUrl: './mainpanelhead.component.html',
  styleUrls: ['./mainpanelhead.component.css']
})
export class MainpanelheadComponent implements OnChanges {
termindetaillist:any;
@Input() rapnr:any;
@Input() beznr:any;
@Input() terminneu:any;
@Input() returnlink:any;
@Input() kundevonsuche:any;
@Input() postponerefresh:boolean;
@Input() datumToday: string;
@Output() progressbar = new EventEmitter();
@Output() rapnrvonfazit = new EventEmitter();
@Output() kundenbezvonneu = new EventEmitter();
@Output() kundenbezvonedit = new EventEmitter();
@Output() kundenbezvonfazit = new EventEmitter();
@Output() termzeitvonfazit = new EventEmitter();
@Output() gleichertermin = new EventEmitter();
@Output() terminpost15 = new EventEmitter();

canEdit:boolean = false;
aschluessel:string;
aschluesseltodb:string;
aktvalue:string;
aktivitaetskunde:string;
rowid:string;
kontaktpersontext:string;
termkontaktperskunde:string;
mitarbeiter:string;
objekttodb:any;
rubriktext:string;
rubriktodb:any;
urubriktext:string;
urubriktodb:any;
kontaktpersnr:number;
aktionfordrop:string;
aktiontodb:string;
aktivitaetfordrop:string;
mitarbeiterbezfordrop:string;
objektfordrop:string;
beznrkunde:string;
beznrkontakt: string;
agenturanwesend:boolean;
bznragentur:string;
showEdit:boolean;
objektanwesend:boolean;
objektrubrik:boolean;
rubrikurubrik:boolean;
urubrikausgabe:boolean;
agenturtodb:string;
kontaktperstodb:any = "";
aktivitaettodb:string;
mitarbeitertodb:any = "";
jsonzumspeichern:any;
defaultNotiz:string;
termrapptext:string;
private subscription: Subscription;
msgs: Message[] = [];
_window:Window;
neuertermin:boolean = false;
showContent:boolean = false;
kundevonauswahlnew:any;
display: boolean;
termingeloescht:boolean;
telge:any;
telpriv:any;
telgedi:any;
telnatel:any;

//editorContent: string: '';

telgek:any;
telprivk:any;
telgedik:any;
telnatelk:any;
emailk:any

email:any;
telnummertelgebearbeiten:boolean = false;
telnummertelgedibearbeiten:boolean = false;
telnummernatelbearbeiten:boolean = false;
telnummerprivbearbeiten:boolean = false;
emailbearbeiten:boolean = false
agenturdata:any;
 window:Window;
agentureditieren:boolean = false;
//agenturneu:boolean = false;
vnameagentur:string;
fnameagentur: string;
zusatz1: string;
zusatz2: string;
fnamefirma:string;
zusatz1firma:string;
zusatz2firma:string;
strasseagentur:string;
agenturort:string;
agenturneu:any;
agenturgeloescht:boolean = false;
agenturanzeigen:boolean = false;
addagenturbool:boolean = true;
dialogRef: MatDialogRef<AgenturwechselComponent>;
dialogRef1: MatDialogRef<SearchpanelcalendarComponent>;
dialogRef2: MatDialogRef<MainpanelheadDialog>;
minlata_15:boolean = true;
minlata_60:boolean = true;
minlata_1T:boolean = true;
myControl = new FormControl();
agenturneuhtml:string;
newbez:any;
telupdate:boolean = false;
telgeupdate:string = "";
telgediupdate:string = "";
telnatelupdate:string = "";
telprivupdate:string = "";
tempdatafornew:any;
post15:boolean = false;

mailinnendienst:string;
valueinnendienst:string;

anzeigeplus15:any;
anzeigeplus60:any;
anzeigeplus24:any;

showloc:boolean = false;
strasse:string;
ort:string;
gesperrt: string;
region:string;
plz:string;
    datumTodaytrue: string = '';
    saveimage: boolean = false;
    dokus: Array<string> = [];
    selected: string;

  constructor(public dialog: MatDialog,                                       public viewContainerRef: ViewContainerRef,
              private termindetail: TermindetailService,                      private savetermindetailService: SavetermindetailService,
              private router: Router,                                         private windowrefService:WindowrefService,
              private delterminService:DelterminService,                      private auftragxlsxService:AuftragxlsxService,
              private teleupdateService:TeleupdateService,                    private adrvermittlerService:AdrvermittlerService,
              private terminverschieb:TerminverschiebenService,               private crmEmailidService:CrmEmailidService,
              private crmMailversandService:CrmMailversandService,            private uploadDateiService:UploadDateiService,
              private restitdownloaddateiService:RestitdownloaddateiService,  private  restitgetdateienService:RestitgetdateienService,
              private opendocumentsService: OpendocumentsService,             private cookieService: CookieService,
              private commonService: CommonService,                           private restsygetdefaultService:RestsygetdefaultService) {
                 this._window = this.windowrefService.getNativeWindow();
                //Von Dialog Agentur
              this.subscription = this.commonService.notify18Observable$.subscribe((res) => {
              if (res.hasOwnProperty('option')&& res.option === 'NeueAgentur') {
                this.agenturneu = res.value;
                console.log("this.agenturneu",this.agenturneu);
                if (this.agenturneu){
                this.agenturanzeigen = this.agenturneu.agenturAnzeigen;
                this.agenturneugenerieren(this.agenturneu);
                }
              }
              });
              
                //Versuch von Offerte zurück und mainpanelnew anzeigen
                var tempkundestring = sessionStorage.getItem('tempterminkunde');
                var tempdatastring = sessionStorage.getItem('temptermindata');
                if(tempkundestring){
                  sessionStorage.removeItem('tempterminkunde');
                  sessionStorage.removeItem('temptermindata');
                  var tempkunde = JSON.parse(tempkundestring);
                  var tempdata = JSON.parse(tempdatastring);
                  this.neuertermin = true;
                  this.kundevonauswahlnew = tempkunde;
                  this.tempdatafornew = tempdata;
                  console.log("tempkunde",tempkunde);
                }

                // this.router.events
                // .pipe(filter((e: any) => e instanceof RoutesRecognized),
                //             pairwise()
                //         ).subscribe((e: any) => {
                          
                //           sessionStorage.setItem('previousUrl', e[0].urlAfterRedirects);
                          
                //         });
                
                //bestimmt woher default geholt werden soll
                let defaultFrom;
                if (this.router.url === '/agendaview/agendaitems-show'){ //VEAG
                  defaultFrom = 'crm-mainpanel-Agenda';
                } else if (this.router.url === '/projektview/projekte-show'){ //VEAU
                  defaultFrom = 'crm-mainpanel-Ausgabe';
                } else if (this.router.url.indexOf('/kundenview/kunden-show') !== -1){ //VETN
                  defaultFrom = 'crm-mainpanel-Adresse';
                }
                
                console.log(defaultFrom);
                if(defaultFrom){
                  //holt default
                  this.restsygetdefaultService.getdefault(defaultFrom, '')
                    .subscribe( ret => {
                      console.log(ret);
                      for(let i = 0; i < ret.length; i++){
                        //setzt default-notiz
                        if(ret[i].feld === "Notiz"){
                          this.defaultNotiz = ret[i].wert;
                          this.termrapptext = this.defaultNotiz;
                        }
                      }
                    }, err => {
                      console.log(err);
                  });
                }


              }

  ngOnChanges(changes:SimpleChanges) {
    console.log("changes",changes);
    
    if(changes.rapnr){
      this.showContent = true;
    } else {
      this.showContent = false;
    }
    
    this.startmethode();

    if (this.postponerefresh === true){
      this.startmethode();
    }

    if (this.datumToday) {
        console.log('Datumtoday', this.datumToday);
        this.datumTodaytrue = this.datumToday;
    }

    this.refreshDateien();
  }
  
  /*public options: Object = {
    charCounterCount: false,
    toolbarInline: true,
    toolbarVisibleWithoutSelection: true,
    zIndex: 200,
    toolbarButtons: ['bold', 'italic', 'underline', '|', 'fontSize', 'color', 'paragraphStyle', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertTable', 'specialCharacters', 'insertHR', '|', 'clearFormatting', 'undo', 'redo'],
    language: environment.language,
    key: 'xC6B4G5D3iB3B9A6C7C2C4A4H3G3C2C-22NGNb1IODMGYNSFKV==',
    tableResizerOffset: 10,
    tableResizingLimit: 50
  }*/
  
  public refreshDateien() {
      this.restitgetdateienService.GetDatei(this.beznr, this.rapnr, 'rapport')
          .subscribe(temp => {console.log('restitgetdateienService', temp);
              this.dokus = temp;
              if (this.dokus.length > 0) {
                  this.selected = temp[0].datei;
              }


          });
  }

  public startmethode(){  
    if (this.terminneu){
      this.neuertermin = true;
    }
    
    
    this.agenturanzeigen = false;
    this.termingeloescht = false;
     console.log("this.rapnr, this.beznr",this.rapnr, this.beznr);
     
    if (this.rapnr !== undefined  || this.beznr  !== undefined){
    this.termindetail.getTermindetail(this.rapnr, this.beznr, "", "", "")
          .subscribe(termine => {
            this.termindetaillist = termine;
            console.log("this.termindetaillist",this.termindetaillist);
                        if (this.termindetaillist.length !== 0){
            //  console.log("mainhaupt komp",this.termindetaillist);
            this.aschluessel = this.termindetaillist[0].aschlussel;
            this.aschluesseltodb = this.termindetaillist[0].aschlussel;
            // this.aschluesseltodb = "";
            this.aktvalue = this.termindetaillist[0].termaktivid;
            this.aktivitaetskunde = this.termindetaillist[0].termaktivid;
            this.rowid = this.termindetaillist[0].ROWID;
            this.kontaktpersontext = this.termindetaillist[0].termkontaktpers;
            this.termkontaktperskunde = this.termindetaillist[0].termkontaktpers;
            //this.mitarbeiter = this.termindetaillist[0].mitarbeitername;
            this.objekttodb = this.termindetaillist[0].objekt;
            this.rubriktext = this.termindetaillist[0].rubrik;
            this.rubriktodb = this.termindetaillist[0].rubrik;
            this.urubriktext = this.termindetaillist[0].urubrik;
            this.urubriktodb = this.termindetaillist[0].urubrik;
            this.kontaktperstodb = 0;
            this.kontaktpersnr = this.termindetaillist[0].termKontaktBeznr;
            this.kontaktperstodb = this.termindetaillist[0].termKontaktBeznr;
            // this.aktivitaettodb = 0;
            // this.mitarbeitertodb = 0;
            // this.aschluesseltodb = 0;
            this.aktionfordrop = this.termindetaillist[0].aktioncode;
            this.aktiontodb = this.termindetaillist[0].aktioncode;
            this.aktivitaetfordrop = this.termindetaillist[0].aktividcd;
            this.aktivitaettodb = this.termindetaillist[0].aktividcd;
            this.mitarbeiterbezfordrop = this.termindetaillist[0].termmitbeznr;
            this.objektfordrop = this.termindetaillist[0].objekt;
            console.log("this.this.kontaktpersnr",this.kontaktpersnr);
            this.beznrkontakt = this.termindetaillist[0].termKontaktBeznr;
            this.beznrkunde = this.termindetaillist[0].beznr;
            this.bznragentur = "";
            if (this.termindetaillist[0].agenturbeznr === 0) {
              // console.log("keine agentur");
              // this.agenturanwesend = true;
              this.addagenturbool = true;
            } else {
              this.agenturanwesend = true;
              this.addagenturbool = false;
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
            this.strasse = this.termindetaillist[0].strasse;
            this.ort = this.termindetaillist[0].ort;
            this.gesperrt = this.termindetaillist[0].bsperrtext;

            }
          }, err => {
            console.error(err);
          });
    }
      this.subscription = this.commonService.notify14Observable$.subscribe((res) => {
        if (res.hasOwnProperty('option')&& res.option === 'neuerTermin1') {
          console.log("neuerTermin1", res.kunde);
          
          this.neuertermin = true;
          this.kundevonauswahlnew = res.kunde;
        }
      });
      
      this.bznragentur = "";
      this.vnameagentur = "";
      this.fnameagentur = "";
      this.zusatz1 = "";
      this.zusatz2 = "";
      this.fnamefirma = "";
      this.zusatz1firma = "";
      this.zusatz2firma = "";
      this.agenturort = "";
      this.strasseagentur = "";
      //this.myControl = null;
      
      console.log("this.telnummertelgedibearbeiten",this.telnummertelgedibearbeiten);
  }


   ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  editieren(){
    this.canEdit = !this.canEdit;
  }
  editabbrechenchanged(val){
    // console.log("editabbrechenchanged",val);
    this.canEdit = val;
  }
  neuabbrechenchanged(val){
    // console.log("neuabbrechenchanged",val);
    this.neuertermin = val;
  }
   showOfferte(data) {
     console.log("showOfferte",data);
     this.progressbar.next(true);
     let tempdata = JSON.stringify(data);
     //sessionStorage.setItem('previousUrl','/agendaview/agendaitems-show;"'+tempdata+'"');
     this.router.navigate(['./offertview/offerte-show',data]);
  }
  
  NewRubrikvalueChanged(val){
    // console.log("Objekt",val);
    if (val.value){
      this.rubriktodb = val.value;
    } else if(val.value === undefined){
      this.rubriktodb = '';
    }
  }
  
  NewUrubrikonvalueChanged(val){
    // console.log("Output Event",val);
    if (val.value){
      this.urubriktodb = val.value;
    } else if(val.value === undefined){
      this.urubriktodb = '';
    }
  }
  
   NewAgenturvalueChanged(val){
     console.log("NewAgenturvalueChanged",val);
     if (val.value === 0){
       this.agenturtodb = val.value;
       console.log("keine Agentur ausgewählt");
     } else{
    this.agenturtodb = val.value;
    this.bznragentur = val.value;
     }
  }
  NewkontaktpersonChanged(val){
     console.log("NewkontaktpersonChanged",val.value);
     if (val.value !== "") {
         this.kontaktpersnr = val.value;
         this.kontaktperstodb = val.value;
         console.log("this.kontaktperstodb",this.kontaktperstodb);
     }
  }
  NewaktivitaetonvalueChanged(val){
     console.log("NewaktivitaetonvalueChanged",val);
     if (val.value){
    this.aktivitaettodb = val.value;
     }
  }
  NewaktionvalueChanged(val){
    console.log("NewaktionvalueChanged",val);
    if (val.value){
      this.aktiontodb = val.value;
    } else {
      this.aktiontodb = '';
    }
  }
  NewmitarbeiteronvalueChanged(val){
     console.log("NewmitarbeiteronvalueChanged",val);
     if (val !== ""){
    this.mitarbeitertodb = val;
     }
  }
  NewausgabeonvalueChanged(val){
    console.log("NewausgabeonvalueChanged",val);
    if (val.value){
      this.aschluesseltodb = val.value;
    } else {
      this.aschluesseltodb = "";
    }
  }
  neuerterminerstelltevent(val){
    console.log("neuerterminerstelltevent",val);
    this.kundenbezvonneu.next(val);
    var d = new Date();
    var newtime = d.getTime();
    this.gleichertermin.next(newtime);
  }
  terminbearbeitetevent(val){
     console.log("terminbearbeitetevent",val);
     this.kundenbezvonedit.next(val);
     
     //Daten neu laden (fuer objekt-, rubrik-,... aenderungen)
     this.ngOnChanges({});
  }
  termzeitevent(val){
    console.log("termzeitevent",val);
    
  }
  
   showSuccessandSaveTermin(notiz,  datumzeit) {
     
    var tempRubrik = "";
    if (this.rubriktodb){
      tempRubrik = this.rubriktodb;
    }
    
    var urubrik = "";
    if (this.urubriktodb){
      urubrik = this.urubriktodb;
    }
    
    var pasttermin = this.termindetaillist[0];
    var datetime = datumzeit;
    // console.log("datetime",datetime);
    if (datetime.dateValuenew){
      // console.log("dateValuenew voll");
    let tempdate = datetime.dateValuenew;
    let tempdatearray = tempdate.split('-');
    var dateValuenew = tempdatearray[2]+'.'+tempdatearray[1]+'.'+tempdatearray[0];
    } else {
        console.log("dateValuenew leer");
      dateValuenew = "";
    }

    var zeittodb = this.checkifzeitorstringtodb(datumzeit.zeitValuenew);
   
    var datetoday = new Date().toLocaleDateString();
    var timenow = new Date().toLocaleTimeString();

    var aschluessel:any = this.aschluessel;
    if (this.aschluesseltodb !== undefined){
      // if (this.aschluesseltodb.value){
      //aschluessel = this.aschluesseltodb.value;
      aschluessel = this.aschluesseltodb;
    }
  // else {
  //   aschluessel = this.aschluessel;
  // }
  // }
  var kontaktbez = "";
  var kontaktgesname = "";
  if (this.kontaktperstodb !== ""){
    kontaktbez = this.kontaktperstodb;
    console.log("if kontaktbez",kontaktbez);
    // kontaktgesname = this.kontaktperstodb.value1;
  } else {
    //kontaktbez = this.kontaktpersnr;
    kontaktgesname = this.termkontaktperskunde;
     console.log("else kontaktbez",kontaktbez);
  }
  var aktivitaet:any = "";
  if (this.aktivitaettodb){
    aktivitaet = this.aktivitaettodb;
  } else {
    aktivitaet = this.aktivitaetfordrop;
  }
  
  var mitarbeiter:any = "";
  if (this.mitarbeitertodb  !== ""){
    mitarbeiter = this.mitarbeitertodb;
     console.log("mitarbeiter1",mitarbeiter);
  } else {
    console.log("mitarbeiter2",mitarbeiter);
    mitarbeiter = this.mitarbeiterbezfordrop;
  }
  var changeagentur:any = "";//Update 07.08.2017 dl
//   if (this.agenturtodb){
//     changeagentur = this.agenturtodb;
//   }
 if (this.bznragentur){
    changeagentur = this.bznragentur;
  }
  if (notiz === "" || notiz === undefined){
    var termapte:string = "";
  } else {
    // console.log("notiz",notiz);
     var termapte:string = this.deletelinebreack(notiz);
  }
      
        //let loginBeznr = JSON.parse(atob(this.cookieService.get('currentUser')))[0].Beznr; //beznr aus fisextanmeld
        //console.log(JSON.parse(atob(this.cookieService.get('currentUser')))[0], this.termindetaillist[0].mitarbeitername, this.termindetaillist[0].mitbeznr);
    this.jsonzumspeichern = {
      ROWID: pasttermin.ROWID,
      agenturbeznr: changeagentur,
      aktioncode: this.aktiontodb,
      aktividcd: aktivitaet,
      aschlussel: aschluessel,
      beznr: pasttermin.beznr,
      firma: pasttermin.firma,
      grundcode: pasttermin.grundcode,
      mitarbeitername: JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginVorname + JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginName,
      mitbeznr: JSON.parse(atob(this.cookieService.get('currentUser')))[0].Beznr, //mitarbeiter, ängerung 19.11. cg
      objekt: this.objektfordrop,//pasttermin.objekt, änderung 03.08 dl
      rapKontaktBeznr:  pasttermin.rapKontaktBeznr,
      rapdatum: datetoday,
      rapptext: termapte,
      rapzeit: timenow.toString().substring(0,5),
      rubrik: tempRubrik,//pasttermin.rubrik,
      termKontaktBeznr: kontaktbez,
      termaktivcd: aktivitaet,
      termdatum:dateValuenew ,
      termkontaktpers: kontaktgesname,
      termmitbeznr: mitarbeiter,
      termrapptext: termapte,
      termzeit: datetime.timeValuenew,
      urubrik: urubrik, //pasttermin.urubrik,
      fazit: 'yes'
    }

    console.log("neues Fazit", this.jsonzumspeichern);
    var antwortsavetermindetail;
    this.agentureditieren = false;
    // console.log("this._window", this._window.scrollTo(0, 0));    
    this.savetermindetailService.saveTermindetail(this.jsonzumspeichern)
      .subscribe(termindetail => {
        antwortsavetermindetail = termindetail;
          console.log("termindetail", termindetail);
          if (termindetail[0].fehlercode !== '00') {
              this.dialogRef2 = this.dialog.open(MainpanelheadDialog, {
                  width: '250px',
              });
          }
        this.termrapptext = "";
        if(this.defaultNotiz){
          this.termrapptext = this.defaultNotiz;
        }
        this.rapnrvonfazit.next(pasttermin.rapnr);
        this.kundenbezvonfazit.next(pasttermin.beznr);
        console.log("pasttermin.termzeit",pasttermin.termzeit);
        this.termzeitvonfazit.next(pasttermin.termzeit);
        this._window.scrollTo(0, 0);
      }, err => {
        console.error(err);
      });
       
      // Observable.timer(2000)
      //     .map(() => this.msgs = [])
      //     .subscribe(() => {
      //       console.log("Anzeige sollte verschwinden" );
            
      //     }); 
      //Löschen der Variablem nach dem Saven von den Dropdowns 17.11.17 dli
     // this.kontaktperstodb = '';
     // this.aktivitaettodb = '0';
      this.mitarbeitertodb = '';

      if (this.returnlink){
        console.log("returnlink",this.returnlink);
        this.router.navigate([this.returnlink]);

      }
      //this.bznragentur ='0';
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
     
     if (this.router.url === '/agendaview/agendaitems-show'){
      this.commonService.notifyOther5({ option: 'TerminFazit', value: true });
     }
     if (this.router.url === '/projektview/projekte-show'){
       var vonfilter:any = sessionStorage.getItem('AusgabeSuche');
       //console.log("vonfilter",vonfilter);
       var tempvonfilter = JSON.parse(vonfilter);
       let obj = tempvonfilter.value1;
       let aschl = tempvonfilter.value2;
       console.log("obj aschl",obj, aschl);
      this.commonService.notifyOther5({ option: 'TerminAusgabe',  value1: obj, value2:aschl });//{"value1":"hotel","value2":"2017010","value3":"M"}
     }
     
     if (this.router.url === '/kundenview/kunden-show'){
       console.log("TerminKunden",this.beznrkunde);
      this.commonService.notifyOther5({ option: 'TerminKunden', value: true, value1: this.beznrkunde });
     }
  }
  deletelinebreack(str) {
    var temp1 = str.replace(/\n/gi, '%0a');
    var temp2 = temp1.replace(/\n/gi, '%0d')
    console.log("linearray1", temp2);
    var string2 = temp2;
    return string2;
    }
    
  openkundenexcel(val){
    console.log("openkundenexcel",val);
    var blobUrl = "";
    var blob = null;
    this.auftragxlsxService.getexcelfile(val.objekt, val.beznr, val.termKontaktBeznr, val.agenturbeznr, val.termmitbeznr)
         .subscribe(excel => {
        var mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
        if (excel.length >= 1){
        blob = this.opendocumentsService.base64dataToBlob(excel[0].excel, mimetype);//this.base64dataToBlob(excel[0].excel, mimetype);
        blobUrl = URL.createObjectURL(blob);
           console.log("blob",blob);
        // this.tempbase64pdf = blobUrl;
        this.window = this.windowrefService.getNativeWindow();
        this.window.open(blobUrl, '_blank');
        }
      }, err => {
        console.error(err);
      });
  }
  
  /*base64dataToBlob(base64data, mimeType) {
            // this.window = this.windowrefService.getNativeWindow();
            // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
            // console.log("base64data",base64data);
            var byteCharactersString =  window.atob(base64data);

            // Erstelle einen Array-Buffer im Umfang des Strings aus Byte-Zeichen
            var arrayBuffer = new ArrayBuffer(byteCharactersString.length);

            // Erstelle einen Byte-Array in der Grösse vom Array-Buffer
            var byteArray = new Uint8Array(arrayBuffer);

            // Schleife über alle Zeichen des Strings aus Byte-Zeichen
            for (var i = 0; i < byteCharactersString.length; i++) {

                // an aktueller Position den Unicode-Wert des Byte-Zeichens auslesen und an derselben Position in den Byte-Array eintragen
                byteArray[i] = byteCharactersString.charCodeAt(i);

            }

            var blob = new Blob([arrayBuffer], { type: mimeType });
            return blob;

        }*/
        
        telefonwahl(termine){
          //console.log("telefonwahl");
          if (termine){
            this.telge = '<a href="tel:'+termine.agenturtelge+'">'+termine.agenturtelge+'</a>';
            this.telgedi = '<a href="tel:'+termine.agenturtelgedi+'">'+termine.agenturtelgedi+'</a>';
            this.telpriv = '<a href="tel:'+termine.agenturtelpriv+'">'+termine.agenturtelpriv+'</a>';
            this.telnatel = '<a href="tel:'+termine.agenturnatel+'">'+termine.agenturnatel+'</a>';
            this.email = '<a href="mailto:'+termine.agenturemail+'">'+termine.agenturemail+'</a>';
          }
        }
        //agentur
        telefonwahlAgentur(termine){
          //console.log("telefonwahl");
          if (termine){
            this.telge = '<a href="tel:'+termine.telgeforupdate+'">'+termine.telgeforupdate+'</a>';
            this.telgedi = '<a href="tel:'+termine.telgediforupdate+'">'+termine.telgediforupdate+'</a>';
            this.telpriv = '<a href="tel:'+termine.telprivforupdate+'">'+termine.telprivforupdate+'</a>';
            this.telnatel = '<a href="tel:'+termine.telnatelforupdate+'">'+termine.telnatelforupdate+'</a>';
            this.email = termine.email;
            console.log(this.email);
          }
        }
        
         telefonwahlKunde(termine){
          console.log("telefonwahlKunde", termine);
          if (termine){
            this.telgek = '<a href="tel:'+termine.kontakttelge+'">'+termine.kontakttelge+'</a>';
            this.telgedik = '<a href="tel:'+termine.kontakttelgedi+'">'+termine.kontakttelgedi+'</a>';
            //this.telprivk = '<a href="tel:'+termine.telpriv+'">'+termine.telpriv+'</a>';
            this.telnatelk = '<a href="tel:'+termine.kontaktnatel+'">'+termine.kontaktnatel+'</a>';
            this.emailk = '<a href="mailto:'+termine.kontaktemail+'">'+termine.kontaktemail+'</a>';
          }
        }
        
        myDbvalueChanged(val){
          //console.log("Objekt",val);
          if (val.value){
            this.objektfordrop = val.value;
          } else if(val.value === undefined){ //change 21.11. cg
            this.objektfordrop = '';
          }
        }
      telnummertelge(val){
        console.log("test",val);
        this.telnummertelgebearbeiten = val;
      }
      
      changetelgenummer(natel,telge,telgedi,telpriv,email,beznr){
        
         var telnummer;
    if (this.telnummertelgebearbeiten === true){
         console.log("telnummertelge", natel,telge,telgedi,telpriv,beznr);
         var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
                this.telge = '<a href="tel:'+telge+'">'+telge+'</a>';
                this.telgek = '<a href="tel:'+telge+'">'+telge+'</a>';
                this.telnummertelgebearbeiten = false;
            }, err => {
        console.error(err);
        });
     }
      }
      
      telnummertelgedi(val){
        this.telnummertelgedibearbeiten = val;
      }
      
      changetelgedinummer(natel,telge,telgedi,telpriv,email,beznr){
    var telnummer;
    console.log("this.telnummertelgedibearbeiten",this.telnummertelgedibearbeiten);
    if (this.telnummertelgedibearbeiten === true){
         console.log("telnummertelgedi", natel,telge,telgedi,telpriv,beznr);
        var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
                this.telgedi = '<a href="tel:'+telgedi+'">'+telgedi+'</a>';
                this.telgedik = '<a href="tel:'+telgedi+'">'+telgedi+'</a>';
                this.telnummertelgedibearbeiten = false;
            }, err => {
        console.error(err);
      });
     }
  }
  
  telnummernatel(val){
    this.telnummernatelbearbeiten = val;
  }
  
  changenatelnummer(natel,telge,telgedi,telpriv,email,beznr){
      var telnummer;
     if (this.telnummernatelbearbeiten === true){
       console.log("telnummernatel", natel,telge,telgedi,telpriv,beznr);
       var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
              this.telnatel = '<a href="tel:'+natel+'">'+natel+'</a>';
              this.telnatelk = '<a href="tel:'+natel+'">'+natel+'</a>';
              this.telnummernatelbearbeiten = false;
            }, err => {
        console.error(err);
      });
     } 
  }
  telnummerpriv(val){
    this.telnummerprivbearbeiten = val;
  }
  
  changeprivnummer(natel,telge,telgedi,telpriv,email,beznr){
    var telnummer;
    if (this.telnummerprivbearbeiten === true){
         console.log("telnummerpriv", natel,telge,telgedi,telpriv,beznr);
        var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
                this.telpriv = '<a href="tel:'+telpriv+'">'+telpriv+'</a>';
                this.telnummerprivbearbeiten = false;
            }, err => {
        console.error(err);
      });
     }
  }
  
  editEmail(val){
    this.emailbearbeiten = val;
  }
  
  changeemail(natel,telge,telgedi,telpriv,email,beznr){
    var telnummer;
    if (this.emailbearbeiten === true){
         console.log("telnummerpriv", natel,telge,telgedi,telpriv,email,beznr);
        var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
                this.email = '<a href="mailto:'+email+'">'+email+'</a>';
                this.emailk = '<a href="mailto:'+email+'">'+email+'</a>';
                this.emailbearbeiten = false;
            }, err => {
        console.error(err);
      });
     }
  }


    editAgentur(){
    var selectedAgentur:any;
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    // console.log("terminsuche");
    this.dialogRef = this.dialog.open(AgenturwechselComponent, {
         height: '250px',
        width: '900px',
    });
    this.dialogRef.componentInstance = this.termindetaillist;
    this.dialogRef.afterClosed().subscribe(result => {
      //console.log('result: ' + result);
      this.dialogRef = null;
    });

  }
  
  agenturneugenerieren(agenturdata){
    this.bznragentur = agenturdata.bznragentur;
    this.agenturanwesend = false;
     this.agenturgeloescht = true;
     this.addagenturbool= false;
    // this.agenturneuhtml = "<label style='display: inline-block;width: 20%'>Beznr:</label><span>"+ agenturdata.bznragentur+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Name:</label><span>"+ agenturdata.vnameagentur+"</span>&nbsp<span>"+ agenturdata.fnameagentur+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Zusatz1:</label><span>"+ agenturdata.zusatz1+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Zusatz2:</label><span>"+ agenturdata.zusatz2+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Firma:</label><span>"+ agenturdata.fnamefirma+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Firmazusatz1:</label><span>"+ agenturdata.zusatz1firma+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Firmazusatz2:</label><span>"+ agenturdata.zusatz2firma+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Strasse:</label><span>"+ agenturdata.strasseagentur+"</span><br>"+
    //                       "<label style='display: inline-block;width: 20%'>Ort:</label><span>"+ agenturdata.agenturort+"</span><br>"+
    //                       "<span class='fa fa-user-circle' style='width: 15px;margin-right:3px;display: inline-block;width: 20%'></span>"+
    //                       "<a href='phone:"+agenturdata.telge+"'>"+agenturdata.telge+"</a><br>"+
    //                       "<span class='fa fa-building-o' style='width: 15px;margin-right:3px;display: inline-block;width: 20%'></span>"+
    //                       "<a href='phone:"+agenturdata.telgedi+"'>"+agenturdata.telgedi+"</a><br>"+
    //                       "<span class='fa fa-mobile' style='width: 15px;margin-right:3px;display: inline-block;width: 20%'></span>"+
    //                       "<a href='phone:"+agenturdata.telnatel+"'>"+agenturdata.telnatel+"</a><br>"+
    //                       "<span class='fa fa-home' style='width: 15px;margin-right:3px;display: inline-block;width: 20%'></span>"+
    //                       "<a href='phone:"+agenturdata.telpriv+"'>"+agenturdata.telpriv+"</a><br>"+
    //                       "<span class='fa fa-envelope-square' style='width: 15px;margin-right:3px;display: inline-block;width: 20%'></span>"+
    //                       "<a href='mailto:"+agenturdata.email+"'>"+agenturdata.email+"</a>";
  }
  
  // changetelge(val){
  //   console.log("agenturdata.telge",val);
  // }
  deleteAgentur(){
    this.agenturanzeigen = false;
    this.bznragentur = "0";
    this.agenturgeloescht = false;
     this.addagenturbool= true;
    this.agenturneu = {};
  }
  changeAgenturTel(){
    this.telupdate = true;
    console.log("agenturdata",this.agenturneu);
    this.telgeupdate = this.agenturneu.telgeforupdate;
    this.telgediupdate = this.agenturneu.telgediforupdate;
    this.telnatelupdate = this.agenturneu.telnatelforupdate;
    this.telprivupdate = this.agenturneu.telprivforupdate;
  }
  
  changetelnumerAgentur(natel,telge,telgedi,telpriv,email,beznr){
    var telnummer;
    if (this.telupdate === true){
        // console.log("telnummerpriv", natel,telge,telgedi,telpriv,beznr);
        var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
        neu_natel = natel;
        neu_telge = telge;
        neu_telgedi = telgedi;
        neu_telpriv = telpriv;
        neu_email = email;
        neu_beznr = beznr;
        this.teleupdateService.updateTelnummer(neu_natel,neu_telge,neu_telgedi,neu_telpriv,neu_email,neu_beznr)
            .subscribe(telnummern => { telnummer = telnummern;
            // console.log("telnummer",telnummer);
               this.telupdate = false;
               this.agenturneu.telge = neu_telge;
               this.agenturneu.telgedi = neu_telgedi;
               this.agenturneu.telnatel = neu_natel;
               this.agenturneu.telpriv = neu_telpriv;
               this.agenturneu.email = neu_email
              // console.log("this.agenturneu",this.agenturneu);
               this.agenturneugenerieren(this.agenturneu);
            }, err => {
        console.error(err);
      });
     }
  }
  changetelnumerAgenturAbbrechen(){
    this.telupdate = false;
  }
  
  deleteBestehendeAgentur(){
    this.bznragentur = "0";
    this.agenturanwesend = false;
    this.agenturgeloescht = false;
    this.addagenturbool= true;
  }

  postpone15(termine) {
    // console.log("postpone15",termine);
     var verschrueck:any = null;
     var endzeit:any = null;
     this.post15 = true;
    // var datenow = new Date();
    // console.log("datenow",datenow);
    endzeit = this.postponetime(900000,termine);
  // console.log("endzeit", endzeit);
  
    this.terminverschieb.terminVersch(termine.rapnr,termine.termdatum,endzeit)
    .subscribe(verschieb => { 
      verschrueck = verschieb; 
      this.terminpost15.next(this.post15); }, err => {
        
        console.error(err);
      });

  }
  postpone60(termine) {
    var verschrueck:any = null;
    var endzeit:any = null;
    this.post15 = true;

    endzeit = this.postponetime(3600000,termine);
    this.terminverschieb.terminVersch(termine.rapnr,termine.termdatum,endzeit)
    .subscribe(verschieb => { verschrueck = verschieb;
      this.terminpost15.next(this.post15); }, err => {
        console.error(err);
      });
    
  }
  postpone24(termine) {
    var verschrueck:any = null;
    var endzeit:any = null;
    this.post15 = true;

    endzeit = this.postponetime(86400000,termine);
    console.log("postpone24",termine.rapnr,endzeit,termine.termzeit);

     this.terminverschieb.terminVersch(termine.rapnr,endzeit,termine.termzeit.replace(':',''))
    .subscribe(verschieb => { verschrueck = verschieb;
      this.terminpost15.next(this.post15);
     }, err => {
        console.error(err);
      });
   
  }
  opencalendar(termine) {

    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

     this.dialogRef1 = this.dialog.open(SearchpanelcalendarComponent, config);
    // this.dialogRef1 = this.dialog.open(SearchpanelcalendarComponent, {
    //     width: '400px',
    // });
    this.dialogRef1.componentInstance.param1 = termine;
    this.dialogRef1.afterClosed().subscribe(result => {
    //   this.terminService.showall()
    //       .subscribe(termine => { this.termines = termine;
    //         // console.log("this.termines", this.termines);
    //        this.commonService.notifyOther6({ option: 'postpone', value: 'calendar' }); 
    //       }, err => {
    //         console.error(err);
    this.terminpost15.next(this.post15);
          });
      this.dialogRef1 = null;
    //};
   
   
  }

public getpostponedtime(milisek){
  let start, tempend1;
  start = new Date();
  let gesamt = start.getTime();
  let tempend = gesamt + milisek;
  //console.log("getpostponedtime", tempend);
  this.anzeigeplus15 = new Date(tempend);
}
public getpostponedtime60(milisek){
  let start, tempend1;
  start = new Date();
  let gesamt = start.getTime();
  let tempend = gesamt + milisek;
  //console.log("getpostponedtime", tempend);
  this.anzeigeplus60 = new Date(tempend);
}
public getpostponedtime24(milisek){
  let start, tempend1;
  start = new Date();
  let gesamt = start.getTime();
  let tempend = gesamt + milisek;
  //console.log("getpostponedtime", tempend);
  this.anzeigeplus24 = new Date(tempend);
}
 public deletevorschaue(){
  this.anzeigeplus15 = "";
  this.anzeigeplus60 = "";
  this.anzeigeplus24 = "";
 }
   
  postponetime(milisek, parameter){
     let start, aktuell,datetemp, timetemp;
    start = new Date();
    // datetemp = parameter.termdatum.split('.');
    // timetemp = parameter.termzeit.split(':');
    // console.log("start", start);
    // aktuell = new Date(datetemp[2]+','+datetemp[1]+','+datetemp[0]+','+timetemp[0]+':'+timetemp[1]+':'+'00');//+','+timetemp[0]+','+timetemp[1]+','+'0'+','+'0'
    var gesamt = start.getTime();
    var tempend = gesamt + milisek;
    var tempend1 = new Date(tempend);
    if (milisek === 86400000){ // = 24h
      var end = tempend1.toLocaleDateString().toString();//.replace('.','')
       // console.log(end);
    return end;
    } else {
    var end = tempend1.toLocaleTimeString().toString().substring(0,5).replace(':','');
   // console.log(end);
    return end;
    }
  }
  
  @ViewChild('innendiensttxt', { static: false }) innendiensttxt: ElementRef;
  public getMailid(event){
    this.innendiensttxt.nativeElement.focus();
    
    event.stopPropagation();
    this.crmEmailidService.getmailid()
      .subscribe(id => {
        this.mailinnendienst = id[0].emailid
        console.log("getmailid",id);
      });
  }

  public sendEmailtoinnendienst(val) {
    console.log("sendEmailtoinnendienst", val);
    console.log("this.mailinnendienst",this.mailinnendienst);
    this.crmMailversandService.sendemail(this.mailinnendienst, val.trim())
      .subscribe(email => {
        console.log("crmMailversandService", email);
      });
  }

  public showLocation() {
      if (this.showloc === false) {
          this.showloc = true;
      } else {
          this.showloc = false;
      }
  }
  public selectFile(event) {
      this.saveimage = true;
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
              let filename = file.name;
              let filetype = file.type;
              let value = (reader.result as string).split(',')[1];
              console.log(this.beznr, this.rapnr);
              this.uploadDateiService.uploadDatei(this.beznr, filename, value, this.rapnr, 'rapport')
                  .subscribe(file => {
                      console.log("fileupload");
                      this.saveimage = false;
                      event.srcElement.value = null;
                      if (this.beznr !== undefined){
                          this.refreshDateien();
                      }
                  });

          };


          }
  }
    



    // showZustandiger() {
    //
    //     const dialogRef = this.dialog.open(ZustandigerDialog, {
    //         width: '900px',
    //         data: {zustanigerdnr: this.beznrkunde}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //
    //     });
    // }
}

@Component({
    selector: 'app-mainpanelhead-dialog',
    templateUrl: 'app-mainpanelhead-dialog.html',
})
export class MainpanelheadDialog {

    constructor(
        public dialogRef: MatDialogRef<MainpanelheadDialog>) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}


// @Component({
//     selector: 'zustandiger-dialog',
//     templateUrl: 'zustandiger-dialog.html',
// })
// export class ZustandigerDialog {
//     zustandignummer: any;
//
//     constructor(
//         public dialogRef: MatDialogRef<ZustandigerDialog>,
//         @Inject(MAT_DIALOG_DATA) public data: any) {
//         console.log("data", data);
//
//         this.zustandignummer = data.zustanigerdnr;
//     }
//
//     onNoClick(): void {
//         this.dialogRef.close();
//     }
//
// }
