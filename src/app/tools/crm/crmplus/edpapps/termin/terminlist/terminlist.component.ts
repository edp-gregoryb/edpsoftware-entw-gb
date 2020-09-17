import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../../../../shared/const/appModules';

import { WindowsizeService} from '../../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-terminlist',
  templateUrl: './terminlist.component.html',
  styleUrls: ['./terminlist.component.css'],
   providers: [
    {provide: MAT_DATE_LOCALE, useValue: environment.language},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class TerminlistComponent implements OnInit {

   kundeLink:string;
  vermittlerlink:string;
  //auftragsnummer:string;
  //rubriklink:string;
  //aufartlink:string;
  //vertreterlink:string;
  urlparams:any;
  color = 'warn';
  checked = false;
  disabled = false;
  checkedmitohne:boolean = false;
  searchdetail:boolean = true;
  kundevonLink:string;
  objektvonLink:string;
  //aufnrvonLink:string;
  sujetnrvonLink:string;
  datumvonLink:string;
  sichtlink:string;
  _vermittler:string = "";
  _vertreter:string = "";
  //_rubrik:string = "";
//   _art:string = "";
  //_aufnummer:string = "";
  _kundeLink:string = "";
  //_aufartlink:string = "";
  history:string = "no";
  eventsvon: string[] = [];
  eventsbis: string[] = [];
  
  objvonsearchtemp:string = "";
  objvonsearch:string;

  aktionvonsearchtemp:string;
  aktionvonsearch:string;

  aktivitaetvonsearchtemp:string;
  aktivitaetvonsearch:string;

  mitarbeitervonsearchtemp:string;
  mitarbeitervonsearch:string;
  
  searchauswahl:any = [];
  _vondatum:string;
  _bisdatum:string;
  vondatum:string;
  bisdatum:string;
  
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  showrubrikwennObj:boolean = false;
  sidenavExpanded:boolean = false;
  
  pickervalue:any;
  picker1value:any;
  
  currentAppModule: string    = "TELI";
  modulename:string;
  lastAppModule: string       = "";
  
  innerheight:number;

  actionvar: any;//damit die suchabfrage immer ausgeführt wird (kundenterminlist)

  private resizeSubscription:Subscription;

  constructor(private route:ActivatedRoute, private routerforlink:Router, private cookieService: CookieService, private windowsizeService:WindowsizeService) { 
    var tempfilelocalstorage = this.cookieService.get('currentUser');
      if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
  
      //this.licensedModules  = userjson[0].berecht;
      //this.currentUser      = userjson[0].LoginVorname; 
      let licensedModulestemp  = userjson[0].module;
      this.currentUser      = userjson[0].LoginVorname; 
      
      for (let row of  licensedModulestemp){
       
          this.licensedModules.push(row);
          if (row.shorthand == this.currentAppModule){
            this.modulename = row.name;
          }
      }

      //sidenav
      for (let row of  licensedModulestemp){
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      // for (var i = 0; i < this.licensedModules.length; i++) {
      //   if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
      //     this.licensedModules.splice(i,1);         
      //     i--;
      //   }
      // }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
      
      }

      //this.lastAppModule = sessionStorage.getItem('lastmodule');
  }

  ngOnInit() {
    this.innerheight = self.innerHeight - 782;
    
    this.urlparams = this.route.params.subscribe(params => {
    //   this.kundeLink = params.kunde;
    console.log("params", params);
    // console.log("params.kunde", params.kunde);
    
    //kunde
    if (params.kunde){
        this.kundeLink = params.kunde;
       let tempjson = JSON.stringify({'beznr': params.kunde, "anzeigename": params.kunde});
      sessionStorage.setItem('timelinekunde',tempjson);
    } else {
        this.kundeLink = '';
        let tempjson = JSON.stringify({'beznr': this.kundeLink, "anzeigename": this.kundeLink});
        sessionStorage.setItem('timelinekunde',tempjson);
    }
    
    //aufnr
    // if (params.aufnr){
    // this.auftragsnummer = params.aufnr; 
    // let tempjsonaufnr = JSON.stringify({'value': params.aufnr});
    //   sessionStorage.setItem('timelineaufnr',tempjsonaufnr);
    // } 
    //objekt
    if (params.objekt){
        this.objvonsearch = params.objekt;
    let tempjsonobjekt = JSON.stringify({'objekt': params.objekt});
      sessionStorage.setItem('timelineobjekt',tempjsonobjekt);
    }
    //art
    // if (params.art){
    // this.aufartlink = params.art;
    // let tempjsonart = JSON.stringify({'aufart': params.art, 'aufart_bezeichnung':params.art});
    // // console.log("tempjsonart", tempjsonart);
    //   sessionStorage.setItem('timelineart',tempjsonart);
    // }
    //auftrag
    // if (params.auftrag){
    // let tempjsonauftrag = JSON.stringify({'value': params.auftrag});
    //   sessionStorage.setItem('timelineauftrag',tempjsonauftrag);
    // }
    
    //vertreter
    // if (params.vertreter){
    //     this.vertreterlink = params.vertreter;
    // let tempjsonvertreter = JSON.stringify({'vertreter': params.vertreter});
    //   sessionStorage.setItem('timelinevertreter',tempjsonvertreter);
    // }
    //vermittler
    if (params.vermittler){
    this.vermittlerlink = params.vermittler;
    let tempjsonvermittler = JSON.stringify({'vermittler': params.vermittler});
      sessionStorage.setItem('timelinevermittler',tempjsonvermittler);
    }

    });
    
    let tempdate =  Date.now();
    this.vondatum = _moment(tempdate).format("DD.MM.YYYY");
    //  let vondat:any = sessionStorage.getItem('terminvondatum');
    //  console.log("vondat",vondat);
    //  if (vondat){
    //      this.vondatum = vondat.value;
    //      this.pickervalue = vondat.value;
    //  } else {
    //    console.log("vondat else");
    //     let tempdate =  Date.now()
    //     this.vondatum = _moment(tempdate).format("DD.MM.YYYY");
    //     console.log(this._vondatum);
    //     let tempjsonvondat = JSON.stringify({'value': this.vondatum});
    //     sessionStorage.setItem('terminvondatum',tempjsonvondat);
    //     this.pickervalue = new Date(2017, 0, 1);
    //  }
     
     
    //  let bisdat:any = sessionStorage.getItem('terminbisdatum');
    //  console.log("bisdat",bisdat);
    //  if (bisdat){
    //      this.bisdatum = bisdat.value;
    //      this.picker1value = bisdat.value; 
    //  } 
    //  else {
    //   console.log("bisdate");
    //    let tempdate = new Date(2018, 12, 1);
    //    this.bisdatum = _moment(tempdate).format("DD.MM.YYYY");
    //    console.log(this.bisdatum);
    //    let tempjsonbisdat = JSON.stringify({'value': this.bisdatum});
    //    sessionStorage.setItem('terminbisdatum',tempjsonbisdat);
    //    this.picker1value = new Date(2018, 11, 31);
    // }
     
     let sicht:any = sessionStorage.getItem('crmsicht');
     
     if (sicht){
         this.sichtlink = sicht.value;
     }
     
  
  }
  
    ngOnChanges(){
        this.resizeSubscription =  this.windowsizeService.onResize$
            .subscribe(size => {
                console.log("windowsize", size.innerHeight);
                this.innerheight = size.innerHeight - 782;
        });
    }
  
   
   getStartDate(event: MatDatepickerInputEvent<Date>) {
    let tempvalue = _moment(event.value).format("DD.MM.YYYY");
    console.log(tempvalue);
    this._vondatum = tempvalue;
    let tempjson = JSON.stringify({'value': this._vondatum});
    sessionStorage.setItem('terminvondatum', tempjson);
    
    if (tempvalue === "Invalid date"){
        sessionStorage.removeItem('terminvondatum');
        this._vondatum = "";
    }
  }
  getEndtDate(event: MatDatepickerInputEvent<Date>) {
    let tempvalue = _moment(event.value).format("DD.MM.YYYY");
    console.log(tempvalue);
    this._bisdatum = tempvalue;
    let tempjson = JSON.stringify({'value': this._bisdatum});
    sessionStorage.setItem('terminbisdatum', tempjson);
    
    if (tempvalue  === "Invalid date"){
        sessionStorage.removeItem('terminbisdatum');
        this._bisdatum = "";
    }
  }
  public changecheckedmitohne(){
    if (this.checkedmitohne === false){
      this.checkedmitohne = true;
      this.history = "yes";
      console.log("checkedmitohne true", this.checkedmitohne);
    } else {
      this.checkedmitohne = false;
      this.history = "no";
      console.log("checkedmitohne false", this.checkedmitohne);
    }
  }
  
  public searchdaten(val){
    console.log("searchdaten termine",val);

    let tempdate = new Date();
    this.actionvar = tempdate;
    console.log("this.actionvar", this.actionvar);
    // this.kundeLink;
    // this.vermittlerlink;
    // this.vertreterlink
    // this.rubriklink;
    // this.auftragsnummer;
    // this.aufartlink;
    // this.objvonsearch;
    // this.vondatum;
    // this.bisdatum;
    // this.sichtlink;

    this.vondatum = this._vondatum;
     this.bisdatum = this._bisdatum;

    // this.searchauswahl.push(this.objvonsearch,this.vondatum,this.bisdatum);
     console.log("this.searchauswahl",this._kundeLink," : ",  this._vermittler," : ", this._vertreter," : ", this.objvonsearchtemp," : ",this.vondatum," : ",this.aktionvonsearchtemp);
     console.log("this.kundeLink",this.kundeLink);
     

     if (val === "backfromdetail"){
         console.log("keine auswahl");
     } else {
     
     if (this._kundeLink){
       this.kundeLink = this._kundeLink;
       //this.controlAuswahl.push(this._kundeLink);
     } else {
        let kd = sessionStorage.getItem('timelinekunde');
        if (kd){
        let tempkd = JSON.parse(kd);
        console.log("tempkd",tempkd.beznr);
        this.kundeLink = tempkd.beznr;
        }  else {
            
             this.kundeLink = '';
     }
     }
     
     if (this._vermittler){
       this.vermittlerlink = this._vermittler;
     } else {
           let vermnr = sessionStorage.getItem('timelinevermittler');
        if (vermnr){
        let tempvermnr = JSON.parse(vermnr);
        console.log("tempvermnr",tempvermnr.vermittler);
        this.vermittlerlink = tempvermnr.vermittler;
        } else {
             this.vermittlerlink = '';
        } 
     }
     
    //  if (this._aufnummer){
    //    this.auftragsnummer = this._aufnummer;
    //  } else {
    //      let anr = sessionStorage.getItem('timelineaufnr');
    //     if (anr){
    //     let tempanr = JSON.parse(anr);
    //     console.log("tempanr",tempanr.value);
    //     this.auftragsnummer = tempanr.value;
    //     } else {
    //          this.auftragsnummer = '';
    //  }
      
    //  }
     
     if (this.objvonsearchtemp){
       this.objvonsearch = this.objvonsearchtemp;
     } else {
         let objnr = sessionStorage.getItem('timelineobjekt');
        if (objnr){
            let tempobjnr = JSON.parse(objnr);
            this.objvonsearch = tempobjnr.objekt;
        } else {
            this.objvonsearch = '';
        }
      
     }

     if (this.aktionvonsearchtemp){
      this.aktionvonsearch = this.aktionvonsearchtemp;
    } else {
        let objnr = sessionStorage.getItem('terminaktion');
       if (objnr){
           let tempobjnr = JSON.parse(objnr);
           this.aktionvonsearch = tempobjnr.aktion;
       } else {
           this.aktionvonsearch = '';
       }
     
    }

    if (this.aktivitaetvonsearchtemp){
      this.aktivitaetvonsearch = this.aktivitaetvonsearchtemp;
    } else {
        let objnr = sessionStorage.getItem('terminaktivitaet');
       if (objnr){
           let tempobjnr = JSON.parse(objnr);
           this.aktivitaetvonsearch = tempobjnr.aktivitaet;
       } else {
           this.aktivitaetvonsearch = '';
       }
     
    }

    if (this.mitarbeitervonsearchtemp){
      this.mitarbeitervonsearch = this.mitarbeitervonsearchtemp;
      console.log("this.mitarbeitervonsearch",this.mitarbeitervonsearch);
    } else {
        let objnr = sessionStorage.getItem('terminmitarbeiter');
        console.log("objnr",objnr);
       if (objnr){
           let tempobjnr = JSON.parse(objnr);
           this.mitarbeitervonsearch = tempobjnr.mitarbeiter.mitbeznr;
       } else {
           this.mitarbeitervonsearch = '';
       }
     
    }
     
    //  if (this._rubrik){
    //    this.rubriklink = this._rubrik;
    //  } else {
    //    this.rubriklink = '';
    //  }
     
    //  if (this._aufartlink){
    //    this.aufartlink = this._aufartlink;
    //  } else {
    //    this.aufartlink = '';
    //  }
     
     
  //    if (this._vertreter){
         
  //      this.vertreterlink = this._vertreter;
  //    } else {
  //       let vernr = sessionStorage.getItem('timelinevertreter');
  //       if (vernr){
  //           let tempvernr = JSON.parse(vernr);
  //           this.vertreterlink = tempvernr.vertreter;
  //       } else {
  //           this.vertreterlink = '';
  //    }
      
  //    }
   }
   }
  
    public kundeselect(val){
    console.log("kunde", val);
    if (val){
    this._kundeLink = val.beznr;
    } else {
      console.log("kein kunde ausgewählt");
      this._kundeLink = '';
    }
  }
  
  public vermittlerselect(val){
    console.log("Vermittler", val);
     if (val){
    this._vermittler = val.beznr;
    } else {
      console.log("kein vermittler ausgewählt");
      this._vermittler = '';
    }
  }
  
  public vertreterselect(val){
     console.log("Vertreter", val);
     if (val){
    this._vertreter = val.vertreter;
    } else {
      console.log("kein verterter ausgewählt");
      this._vertreter = '';
    }
  }
  
  // public newAufnr(val){
  //    console.log("newAufnr", val);
  //    if (val){
  //      this._aufnummer = val;
  //    } else {
  //      this._aufnummer = '';
  //    }
  // }
  
  public objektselected(val){
     console.log("objektselected", val);
      if (val){
     this.objvonsearchtemp = val.objekt;
    // this.showrubrikwennObj = true;
      } else {
     console.log("kein objekt ausgewählt");
      this.objvonsearchtemp = '';
      // this.showrubrikwennObj = false;
     }
  }

  public aktionselected(val){
    if (val){
      this.aktionvonsearchtemp = val.objekt;
     
       } else {
      console.log("keine aktion ausgewählt");
       this.aktionvonsearchtemp = '';
      
      }
  }

  public aktivitaetselected(val){
    if (val){
      this.aktivitaetvonsearchtemp = val.objekt;
     
       } else {
      console.log("keine aktion ausgewählt");
       this.aktivitaetvonsearchtemp = '';
      
      }
  }

  public mitarbeiterselected(val){
    if (val){
      this.mitarbeitervonsearchtemp = val.mitbeznr;
        console.log("mitarbeiterselected", val.mitbeznr);
       } else {
      console.log("keine aktion ausgewählt");
       this.mitarbeitervonsearchtemp = '';
      
      }
  }
  
  //  public rubrikselected(val){
  //    console.log("rubrikselected", val);
  //    if (val){
  //      this._rubrik = val.rubrik;
  //    } else {
  //      console.log("keine rubrik ausgewählt");
  //      this._rubrik = "";
  //    }
  //  }
   
  //  public artselected(val){
  //    console.log("artselected", val);
  //    if (val){
  //      this._aufartlink = val.aufart;
  //    } else {
  //      console.log("keine art ausgewählt");
  //      this._aufartlink = "";
  //    }
  //  }

  public sichtchange(val){
      console.log("sichtchange", val);
      this.sichtlink = val;
     
      if (val){
          this.kundeLink;
        this.vermittlerlink;
        //this.vertreterlink
        //this.rubriklink;
        //this.auftragsnummer;
        //this.aufartlink;
        this.aktionvonsearch;
        this.aktivitaetvonsearch;
        this.mitarbeitervonsearch;
        this.objvonsearch;
        this.vondatum;
        this.bisdatum;
        this.sichtlink;

      }
  }

}


