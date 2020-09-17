import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
//import { UmsatzkompComponent } from '../../shared/components/umsatzkomp/umsatzkomp.component';
// import { UmsatzkundeComponent } from '../../shared/components/umsatzkunde/umsatzkunde.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { UmsatzDaten } from '../../../../../shared/entities/umsatzdaten';
import { OsgruppennamenService } from '../../../shared/services/osgruppennamen.service';
import { RestsygetdefaultService } from '../../../shared/services/restsygetdefault.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../../../../shared/const/appModules';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-umsatzdetail',
  templateUrl: './umsatzdetail.component.html',
  styleUrls: ['./umsatzdetail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-CH'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class UmsatzdetailComponent implements OnInit, UmsatzDaten {
dialogRef: MatDialogRef<any>;
  diagramdaten:any;
  color = 'warn';
  checked = false;
  disabled = false;
  umsatzforchart: UmsatzDaten;
  kunde = "*";
  vermittler = "*";
  objekt:any = "*";
  vertreter = "*";
  key1 = "*";
  key2 = "*";
  key3 = "*";
  key4 = "";
  key5 = "*";
  r_kunde:any = "1";
  r_vermittler:any = "1";
  r_vertreter:any = "1";
  r_objekt:any = "1";
  r_key1:any = "1";
  r_key2:any = "1";
  r_key3:any = "1";
  r_key4:any = "1";
  r_key5:any = "1";
  _datumvon = "";//"1.1.2017";
  _datumbis = "";//"1.12.2017";
  //_datumvon":"8.1.2017","_datumbis":"1.12.2017","_sprache":"d","_sicht":"A","listNr":""}
 
  osgruppen:any;
  osgruppenOne:any = {};
  osgruppenTwo:any = {};
  osgruppenTree:any = {};
  osgruppenTreeTemp:any = {};
  osgruppenFor:any = {};
  osgruppenFive:any = {};
  
  checkedVermittler:boolean = true;
  checkedKunde:boolean = true;
  checkedObjekt:boolean = true;
  checkedVertreter:boolean = true;
  checkeddyn1:boolean = true;
  checkeddyn2:boolean = true;
  checkeddyn3:boolean = true;
  checkeddyn4:boolean = true;
  checkeddyn5:boolean = true;
  
  objekt_r_value:boolean;
  
  querykunde: Array<string> = [];
  queryobjekt: Array<string> = [];
  queryvermittler: Array<string> = [];
  queryvertreter: Array<string> = [];
  querydyn: Array<string> = [];
  query2dyn: Array<string> = [];
  query3dyn: Array<string> = [];
  query4dyn: Array<string> = [];
  query5dyn: Array<string> = [];
  
  dropdownselectvalue:string;
  
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  currentAppModule: string    = "UMSA";
  modulename:string;
  lastAppModule: string       = "";

  sidenavExpanded:boolean = false;
  sicht:string = "M";
  urlparams:any;
  vertreterlink:string;
  vermittlerlink:string;
  objvonsearch:string;
  kundeLink:string;
  
  objektdefault:any;
  kundedefault:any;
  vermittlerdefault:any;
  vertreterdefault:any;
  dyn1default:any;
  dyn2default:any;
  dyn3default:any;
  dyn4default:any;
  dyn5default:any;
  
  objektauswahlIn:boolean = false;
  kundeauswahlIn:boolean = false;
  vermittlerauswahlIn:boolean = false;
  vertreterauswahlIn:boolean = false;
  dyn1auswahlIn:boolean = false;
  dyn2auswahlIn:boolean = false;
  dyn3auswahlIn:boolean = false;
  dyn4auswahlIn:boolean = false;
  dyn5auswahlIn:boolean = false;
  
  paramtetervonlink:boolean = false;
  tableHeight: number;
  
  constructor(public viewContainerRef: ViewContainerRef, public dialog: MatDialog,
              private osgruppennamenService:OsgruppennamenService, private restsygetdefaultService:RestsygetdefaultService, private cookieService: CookieService,
              private route:ActivatedRoute) {
   
     var tempfilelocalstorage = this.cookieService.get('currentUser');
      if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
  
      // this.licensedModules  = userjson[0].berecht;
      // this.currentUser      = userjson[0].LoginVorname; 
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
      
       this.osgruppennamenService.getosgruppennamen().subscribe(data => {
      console.log("getosgruppennamen",data);
      this.osgruppen = data;
      let tempjson = JSON.stringify(data);
      sessionStorage.setItem('umsatzdyn',tempjson);
      this.osgruppenOne = this.osgruppen[0];
      this.osgruppenTwo = this.osgruppen[1];
      this.osgruppenTree = this.osgruppen[2];
      this.osgruppenFor = this.osgruppen[3];
      this.osgruppenFive = this.osgruppen[4];
    });
    
    let umsatzurl = sessionStorage.getItem('umsatzstarturl');
    console.log("umsatzurl",umsatzurl);
    
    let sicht = sessionStorage.getItem('crmsicht');
     
        if (sicht){
          let tempsicht = JSON.parse(sicht);
         this.sicht = tempsicht.value;
        }
  }

  ngOnInit() {
    this.tableHeight = self.innerHeight - 469;
    
  // let umsatzdyndata = sessionStorage.getItem('umsatzdyn');
   
    this.urlparams = this.route.params.subscribe(params => {
    //   this.kundeLink = params.kunde;
    console.log("params", params);
    // console.log("params.kunde", params.kunde);
    
    //kunde
    if (params.kunde){
        this.paramtetervonlink = true;
        this.kundeLink = params.kunde;
        this.kunde = params.kunde;
        this.kundedefault = {"kunde":params.kunde};

    }
    //objekt
    if (params.objekt){
        this.paramtetervonlink = true;
        this.objekt = params.objekt;
        this.objektdefault =  {"objekt":params.objekt};
    }

    //vertreter
    if (params.vertreter){
        this.paramtetervonlink = true;
        this.vertreterlink = params.vertreter;
        this.vertreterdefault  =  {"vertreter":params.vertreter};
  
    }
    //vermittler
    if (params.vermittler){
      this.paramtetervonlink = true;
      this.vermittlerlink = params.vermittler;
      this.vermittlerdefault = {"vermittler":params.vermittler};
    }
    
    
    // if (umsatzdyndata){
      // let umsatzdynjson = JSON.parse(umsatzdyndata);
      // console.log("umsatzdynjson",umsatzdynjson);
      
    //Kostenstelle
    if (params.key1){
      this.paramtetervonlink = true;
      this.key1 = params.kostenstelle;
     this.osgruppenOne ={liste : 1};//umsatzdynjson[0];//{liste : 1};
      this.dyn1default = {"dyn":params.kostenstelle};
    }
    
     //KonzernKunde
    if (params.key2){
      this.paramtetervonlink = true;
      this.key2 = params.konzernkunde;
       this.osgruppenTwo = {liste : 2};//umsatzdynjson[1];//{liste : 2};
      this.dyn2default = {"dyn":params.konzernkunde};
    }
    
     //Objekttyp
    if (params.key3){
      console.log("params.objekttyp",params.objekttyp);
      this.paramtetervonlink = true;
      this.key3 = params.objekttyp;
      this.osgruppenTree = {liste : 3};//umsatzdynjson[2];//{liste : 3};
      this.dyn3default = {"dyn":params.objekttyp};
      console.log("this.dyn3default",this.dyn3default);
    }
    
     //Kombivariante
    if (params.key4){
      this.paramtetervonlink = true;
      this.key4 = params.kombivariante;
      this.osgruppenFor = {liste : 4};//umsatzdynjson[3];//{liste : 4};
      this.dyn4default = {"dyn":params.kombivariante};
    }
    
     //Branche...
    if (params.key5){
      this.paramtetervonlink = true;
      this.key5 = params.branche;
      this.osgruppenFive = {liste : 5};//umsatzdynjson[4];//{liste : 5};
      this.dyn5default = {"dyn":params.branche};
    }
    
    if (params.r_kunde){
      this.r_kunde = params.r_kunde;
      if (this.r_kunde === "1"){
        this.checkedKunde = true;
      } else {
        this.checkedKunde = false;
      }
    }
    
    if (params.r_vermittler){
      this.r_vermittler = params.r_vermittler;
      if (this.r_vermittler === "1"){
        this.checkedVermittler = true;
      } else {
         this.checkedVermittler = false;
      }
    }
    
    if (params.r_vertreter){
       this.r_vertreter = params.r_vertreter;
       if (this.r_vertreter === "1"){
         this.checkedVertreter = true;
       } else {
          this.checkedVertreter = false;
       }
    }
    
    if (params.r_objekt){
      this.r_objekt = params.r_objekt;
      if (this.r_objekt === "1"){
        this.checkedObjekt = true;
      } else {
        this.checkedObjekt = false;
      }
    }
    
    if (params.r_key1){
      this.r_key1 = params.r_key1;
      if (this.r_key1 === "1"){
        this.checkeddyn1 = true;
      } else {
         this.checkeddyn1 = false;
      }
    }
    
    if (params.r_key2){
      this.r_key2 = params.r_key2;
      if (this.r_key2 === "1"){
        this.checkeddyn2 = true;
      } else {
         this.checkeddyn2 = false;
      }
    }
    
    if (params.r_key3){
      this.r_key3 = params.r_key3;
      if (this.r_key3 === "1"){
        this.checkeddyn3 = true;
      } else {
         this.checkeddyn3 = false;
      }
    }
    
    if (params.r_key4){
      this.r_key4 = params.r_key4;
      if (this.r_key4 === "1"){
        this.checkeddyn4 = true;
      } else {
         this.checkeddyn4 = false;
      }
    }
    
    if (params.r_key5){
      this.r_key5 = params.r_key5;
      if (this.r_key5 === "1"){
        this.checkeddyn5 = true;
      } else {
         this.checkeddyn5 = false;
      }
    }

    });
   
    

    
    this.restsygetdefaultService.getdefault('crm-umsatz','').subscribe(data => {
      console.log("getdefault",data);
      for(let value of data){
      if (this.paramtetervonlink === false){
        if (value.feld === "r_kunde"){
            this.r_kunde = value.wert;
          if (value.wert === "1"){
              this.checkedKunde = true;
          } else {
            this.checkedKunde = false;
          }
        }
        
          if (value.feld === "kunde"){
            if (value.wert !== ""){
            this.kunde = value.wert;
            this.kundedefault = {"kunde": value.wert};
            }
          }
        } else  {
          console.log("Kunde wird über die URL übergeben");
        }
        if (this.paramtetervonlink === false) {
        if (value.feld === "r_objekt") {
          this.r_objekt = value.wert;
          if (value.wert === "1"){
              this.checkedObjekt = true;
          } else {
            this.checkedObjekt = false;
          }
        }
        
          if (value.feld === "objekt") {
            this.objekt = value.wert;
            this.objektdefault = {"objekt": value.wert};
          }
        } else {
          console.log("Objekt wird über die URL übergeben");
        }
      if (this.paramtetervonlink === false) { 
        if (value.feld === "r_vermittler") {
          this.r_vermittler = value.wert;
          if (value.wert === "1"){
              this.checkedVermittler = true;
          } else {
            this.checkedVermittler = false;
          }
      }
      
        if (value.feld === "vermittler"){
          this.vermittler = value.wert;
          this.vermittlerdefault = {"vermittler":value.wert};
        }
      } else {
        console.log("Vermittler wird über die URL übergeben");
      }
      if (this.paramtetervonlink === false) {
      if (value.feld === "r_vertreter") {
        this.r_vertreter = value.wert;
          if (value.wert === "1"){
              this.checkedVertreter = true;
          } else {
            this.checkedVertreter = false;
          }
          
        }
        
          if (value.feld === "vertreter"){
            this.vertreter = value.wert;
            this.vertreterdefault = {"vertreter":value.wert};
          }
        } else {
          console.log("Vertreter wird über die URL übergeben");
        }
        if (this.paramtetervonlink === false) {
        if (value.feld === "r_key1") {
          this.r_key1 = value.wert;
           if (value.wert === "1"){
              this.checkeddyn1 = true;
          } else {
            this.checkeddyn1 = false;
          }
        }
        
          if (value.feld === "key1"){
            this.key1 = value.wert;
            this.dyn1default = {"dyn":value.wert};
          }
        } else {
          console.log("Kostenstelle wird über die URL übergeben");
        }
        if (this.paramtetervonlink === false) {
        if (value.feld === "r_key2") {
           this.r_key2 = value.wert;
           if (value.wert === "1"){
              this.checkeddyn2 = true;
          } else {
            this.checkeddyn2 = false;
          }
        }
        
          if (value.feld === "key2"){
            this.key2 = value.wert;
            this.dyn2default = {"dyn":value.wert};
          }
        } else {
          console.log("KonzernKunde wird über die URL übergeben");
        }
       if (this.paramtetervonlink === false){ 
        if (value.feld === "r_key3") {
           this.r_key3 = value.wert;
           if (value.wert === "1"){
              this.checkeddyn3 = true;
          } else {
            this.checkeddyn3 = false;
          }
        }
        
          if (value.feld === "key3"){
            this.key3 = value.wert;
            this.dyn3default = {"dyn":value.wert};
          }
        } else {
          console.log("Objekttyp wird über die URL übergeben");
        }
        if (this.paramtetervonlink === false) {
        if (value.feld === "r_key4") {
           this.r_key4 = value.wert;
           if (value.wert === "1"){
              this.checkeddyn4 = true;
          } else {
            this.checkeddyn4 = false;
          }
        }
        
          if (value.feld === "key4"){
            this.key4 = value.wert;
            this.dyn4default = {"dyn":value.wert};
          }
        } else {
           console.log("Kombivariante wird über die URL übergeben");
        }
        if (this.paramtetervonlink === false) {
        if (value.feld === "r_key5") {
           this.r_key5 = value.wert;
           if (value.wert === "1"){
              this.checkeddyn5 = true;
          } else {
            this.checkeddyn5 = false;
          }
        }
        
          if (value.feld === "key5"){
            this.key5 = value.wert;
            this.dyn5default = {"dyn":value.wert};
          }
        } else {
          console.log("Branche wird über die URL übergeben");
        }
        
        
        
        
     this.umsatzforchart = {
      "kunde":this.kunde,
      "vermittler": this.vermittler,
      "objekt": this.objekt,
      "vertreter": this.vertreter,
      "key1": this.key1,
      "key2": this.key2,
      "key3": this.key3,
      "key4": this.key4,
      "key5": this.key5,
      "r_kunde": this.r_kunde,
      "r_vermittler": this.r_vermittler,
      "r_vertreter": this.r_vertreter,
      "r_objekt": this.r_objekt,
      "r_key1": this.r_key1,
      "r_key2": this.r_key2,
      "r_key3": this.r_key3,
      "r_key4": this.r_key4,
      "r_key5": this.r_key5,
      "_datumvon": this._datumvon,
      "_datumbis": this._datumbis,
      "sicht":this.sicht
    };
    
   
      
    }
    
    
    
  });
  
   
  }
  
  windowResize(){
    this.tableHeight = self.innerHeight - 469;
  }
  
  getStartDate(event: MatDatepickerInputEvent<Date>) {
    let tempvalue = _moment(event.value).format("DD.MM.YYYY");
    console.log(tempvalue);
    this._datumvon = tempvalue;
  }
  getEndtDate(event: MatDatepickerInputEvent<Date>) {
    let tempvalue = _moment(event.value).format("DD.MM.YYYY");
    console.log(tempvalue);
    this._datumbis = tempvalue;
  }
  
  public kundeselect(val){
    console.log("kundeselect",val);
    if (val){
      this.querykunde.push(val.beznr);
      this.kunde = this.querykunde.toString();
      this.kundeauswahlIn = true;
    }
  }
  
  public kundedelete(val){
    this.querykunde.splice(val,1);
    this.kunde = this.querykunde.toString();
     if (this.querykunde.length === 0){
      this.kundeauswahlIn = false;
    }
  }
  
  public vertreterselected(val){
    console.log("vertreterselected",val);
    if (val){
      this.queryvertreter.push(val.vertreter);
      this.vertreter = this.queryvertreter.toString();
      this.vertreterauswahlIn = true;
    }
  }
  
  public vertreterdeleted(val){
    console.log("vertreterdeleted",val);
    this.queryvertreter.splice(val,1)
    this.vertreter = this.queryvertreter.toString();
    if (this.queryvertreter.length === 0){
      this.vertreterauswahlIn = false;
    }
  }
  
   public vermittlerselected(val){
    console.log("vermittlerselected",val);
    if (val){
      this.queryvermittler.push(val.beznr);
      this.vermittler = this.queryvermittler.toString();
      this.vermittlerauswahlIn = true;
    }
  }
  
  public vermittlerdeleted(val){
     console.log("vermittlerdeleted",val);
     this.queryvermittler.splice(val,1)
     this.vermittler = this.queryvermittler.toString();
     if (this.queryvermittler.length === 0){
      this.vermittlerauswahlIn = false;
    }
  }
  
  public dynselect(val){
     console.log("dynselect",val);
     if (val){
       this.querydyn.push(val.feld1);
       this.key1 = this.querydyn.toString();
       this.dyn1auswahlIn = true;
     }
  }
  
  public dyndeleted(val){
    this.querydyn.splice(val,1);
    this.key1 = this.querydyn.toString();
     if (this.querydyn.length === 0){
      this.dyn1auswahlIn = false;
    }
  }
  
  public dyn5select(val){
     console.log("dyn5select",val);
     if (val){
       this.query5dyn.push(val.feld1);
       this.key5 = this.query5dyn.toString();
       this.dyn5auswahlIn = true;
     }
  }
  
  public dyn5deleted(val){
    this.query5dyn.splice(val,1);
    this.key5 = this.query5dyn.toString();
     if (this.query5dyn.length === 0){
      this.dyn5auswahlIn = false;
    }
  }
  
  public dyn4select(val){
     console.log("dyn4select",val);
     if (val){
       this.query4dyn.push(val.feld1);
       this.key4 = this.query4dyn.toString();
        this.dyn4auswahlIn = true;
     }
  }
  
  public dyn4deleted(val){
    this.query4dyn.splice(val,1);
    this.key4 = this.query4dyn.toString();
    if (this.query4dyn.length === 0){
      this.dyn4auswahlIn = false;
    }
  }
  
  public dyn3select(val){
     console.log("dyn3select",val);
     if (val){
       this.query3dyn.push(val.feld1);
       this.key3 = this.query3dyn.toString();
       this.dyn3auswahlIn = true;
     }
  }
  
  public dyn3deleted(val){
    this.query3dyn.splice(val,1);
    this.key3 = this.query3dyn.toString();
    if (this.query3dyn.length === 0){
      this.dyn3auswahlIn = false;
    }
  }
  
  public dyn2select(val){
     console.log("dyn2select",val);
     if (val){
       this.query2dyn.push(val.feld1);
       this.key2 = this.query2dyn.toString();
       this.dyn2auswahlIn = true;
     }
  }
  
  public dyn2deleted(val){
    this.query2dyn.splice(val,1);
    this.key2 = this.query2dyn.toString();
    if (this.query2dyn.length === 0){
      this.dyn2auswahlIn = false;
    }
  }
  
  public objektselected(val){
     console.log("objektselected",val);
     if (val){
       this.queryobjekt.push(val.objekt);
       this.objekt = this.queryobjekt.toString();
       this.objektauswahlIn = true;
     }
     
  }
  
  public objektdelete(val){
    // console.log("objektdelete",val, this.queryobjekt);
    this.queryobjekt.splice(val,1);
    // console.log("queryobjekt", this.queryobjekt);
    this.objekt = this.queryobjekt.toString();
    if (this.queryobjekt.length === 0){
      this.objektauswahlIn = false;
    }
  }
  
  public diagramdatachanges(val){
    console.log("diagramdatachanges", val);
    if (val){
    this.diagramdaten = val;
    } else {
      console.log("kein daten erhalten");
    }
  }
  
  public dropdownvalue(val){
     console.log("dropdownvalue", val);
     if (val){
     this.dropdownselectvalue = val;
     }
  }
  
  public changeslider(val){
     val.stopPropagation();
     //console.log("changeslider", val);
  }
  
  public changesliderKunde(val){
     console.log("changesliderKunde", val);
     this.checkedKunde = val.checked;
     
     if (this.checkedKunde === true){
              this.r_kunde = "1";
      } else {
            this.r_kunde = "0";
      }
  }
  
  public changesliderVermittler(val){
    console.log("changesliderVermittler", val);
     this.checkedVermittler = val.checked;
     
     if (this.checkedVermittler === true){
              this.r_vermittler = "1";
      } else {
            this.r_vermittler = "0";
      }
  }
  
  public changesliderObjekt(val){
    console.log("changesliderObjekt", val);
     this.checkedObjekt = val.checked;
     
     if (this.checkedObjekt === true){
              this.r_objekt = "1";
      } else {
            this.r_objekt = "0";
      }
  }
  
  public changesliderVertreter(val){
    console.log("changesliderVertreter", val);
     this.checkedVertreter = val.checked;
     
     if (this.checkedVertreter === true){
              this.r_vertreter = "1";
      } else {
            this.r_vertreter = "0";
      }
  }
  
  public changesliderdyn1(val){
    console.log("changesliderdyn1", val);
     this.checkeddyn1 = val.checked;
     
     if (this.checkeddyn1 === true){
              this.r_key1 = "1";
      } else {
            this.r_key1 = "0";
      }
  }
  
  public changesliderdyn2(val){
    console.log("changesliderdyn2", val);
     this.checkeddyn2 = val.checked;
     
      if (this.checkeddyn2 === true){
              this.r_key2 = "1";
      } else {
            this.r_key2 = "0";
      }
  }
  
  public changesliderdyn3(val){
    console.log("changesliderdyn3", val);
     this.checkeddyn3 = val.checked;
     
     if (this.checkeddyn3 === true){
              this.r_key3 = "1";
      } else {
            this.r_key3 = "0";
      }
  }
  
  public changesliderdyn4(val){
    console.log("changesliderdyn4", val);
     this.checkeddyn4 = val.checked;
     
     if (this.checkeddyn4 === true){
              this.r_key4 = "1";
      } else {
            this.r_key4 = "0";
      }
  }
  
  public changesliderdyn5(val){
    console.log("changesliderdyn5", val);
     this.checkeddyn5 = val.checked;
     
     if (this.checkeddyn5 === true){
              this.r_key5 = "1";
      } else {
            this.r_key5 = "0";
      }
  }
  
  
  
  public searchdaten(val){
    val.stopPropagation();
     console.log("searchdaten", val);
     
      if (this.checkedKunde === true){
              this.r_kunde = "1";
      } else {
            this.r_kunde = "0";
      }
      
      if (this.checkedVermittler === true){
              this.r_vermittler = "1";
      } else {
            this.r_vermittler = "0";
      }
      
      if (this.checkedObjekt === true){
              this.r_objekt = "1";
      } else {
            this.r_objekt = "0";
      }
      
      if (this.checkedVertreter === true){
              this.r_vertreter = "1";
      } else {
            this.r_vertreter = "0";
      }
      
      if (this.checkeddyn1 === true){
              this.r_key1 = "1";
      } else {
            this.r_key1 = "0";
      }
      
      if (this.checkeddyn2 === true){
              this.r_key2 = "1";
      } else {
            this.r_key2 = "0";
      }
      
      if (this.checkeddyn3 === true){
              this.r_key3 = "1";
      } else {
            this.r_key3 = "0";
      }
      
      if (this.checkeddyn4 === true){
              this.r_key4 = "1";
      } else {
            this.r_key4 = "0";
      }
      
      if (this.checkeddyn5 === true){
              this.r_key5 = "1";
      } else {
            this.r_key5 = "0";
      }
      
      
     
    // if (this.objekt_r_value === false) {
    //   this.r_objekt = 0;
    // } else {
    //   this.r_objekt = 1;
    // }
     
     
     
     this.umsatzforchart = {
      "kunde":this.kunde,
      "vermittler": this.vermittler,
      "objekt": this.objekt,
      "vertreter": this.vertreter,
      "key1": this.key1,
      "key2": this.key2,
      "key3": this.key3,
      "key4": this.key4,
      "key5": this.key5,
      "r_kunde": this.r_kunde,
      "r_vermittler": this.r_vermittler,
      "r_vertreter": this.r_vertreter,
      "r_objekt": this.r_objekt,
      "r_key1": this.r_key1,
      "r_key2": this.r_key2,
      "r_key3": this.r_key3,
      "r_key4": this.r_key4,
      "r_key5": this.r_key5,
      "_datumvon": this._datumvon,
      "_datumbis": this._datumbis,
      "sicht":this.sicht
    };
  }
  
   public sichtchange(val){
      console.log("sichtchange", val);
      this.sicht = val;
  }

}
