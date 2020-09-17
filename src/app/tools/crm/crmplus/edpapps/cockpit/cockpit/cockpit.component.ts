import { Component, OnInit, ViewContainerRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { appModules } from '../../../../../shared/const/appModules';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
import { ReloginService } from '../../../../../../shared/relogin.service';
import { UmsatzDaten } from '../../../../../shared/entities/umsatzdaten';
import { WindowsizeService} from '../../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
  providers: [ WindowsizeService ]
})
export class CockpitComponent implements OnInit {
  // currentAppModule: string = "VECO";
  // lastAppModule: string;
  currentAppModule: string    = "VECO";
  lastAppModule: string       = "";
  modulename:string;
  umsatzdata : UmsatzDaten;
  currentUser: string;
  licensedModules: any =[];
  sidenavmodules:any = [];
  useremail:string;
  termid:string;
  instanz:string;
  mandant:string;
  rvalue:boolean;
  tempfilelocalstorage:any;
  sidenavExpanded:boolean = false;
  sicht:any = "";
  kundenbez:string = '';
  kundenobjekt:string = '';
  searchparameter:any;
   kunde:any;
   vertreter:any;
   vermittler:any;
   aufnr:any;
   objekt:any;
   rubrik:any;
   vondatum:any;
   bisdatum:any;
   aufart:any;
   
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
  _datumvon = "";
  _datumbis = "";
   
  innerheight:number;
  private resizeSubscription:Subscription;
  
  constructor(public viewContainerRef: ViewContainerRef,private route:ActivatedRoute, private cookieService: CookieService,
              private reloginService:ReloginService, private router: Router, private windowsizeService:WindowsizeService) {
      var tempfilelocalstorageurl = localStorage.getItem('instanz');
    
      this.tempfilelocalstorage = this.cookieService.get('currentUser');
      if (this.tempfilelocalstorage){
      let currentUserstring = atob(this.tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
      console.log(userjson);
  
      //this.licensedModules  = userjson[0].berecht;
      //this.currentUser      = userjson[0].LoginVorname; 
      this.useremail = userjson[0].email;
      this.termid = userjson[0].termid;
      
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
      
      if (tempfilelocalstorageurl){
      var instanzfile = JSON.parse(tempfilelocalstorageurl);
      this.instanz = instanzfile.instvalue;
      this.mandant = instanzfile.mandvalue;
    }
    
    let sicht = sessionStorage.getItem('crmsicht');
     
        if (sicht){
          let tempsicht = JSON.parse(sicht);
         this.sicht = tempsicht.value;
         this.searchparameter = {kunde: this.kunde, vertreter:this.vertreter, vermittler: this.vermittler, aufnr: this.aufnr, objekt: this.objekt, rubrik:this.rubrik, vondatum: this.vondatum, bisdatum: this.bisdatum, aufart: this.aufart, sicht:this.sicht};
        
         this.umsatzdata = { 
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
     
    
  }
  
  

  ngOnInit() {
    this.innerheight = self.innerHeight;
    //this.searchparameter = {kunde: this.kunde, vertreter:this.vertreter, vermittler: this.vermittler, aufnr: this.aufnr, objekt: this.objekt, rubrik:this.rubrik, vondatum: this.vondatum, bisdatum: this.bisdatum, aufart: this.aufart, sicht:this.sicht};
  }
  
  ngOnChanges(){
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
        this.innerheight = size.innerHeight;
      });
  }
  
  public sichtchange(val){
      console.log("sichtchange", val);
      this.sicht = val;
      console.log("this.sicht",this.sicht);
      if (val){
      this.searchparameter = {kunde: this.kunde, vertreter:this.vertreter, vermittler: this.vermittler, aufnr: this.aufnr, objekt: this.objekt, rubrik:this.rubrik, vondatum: this.vondatum, bisdatum: this.bisdatum, aufart: this.aufart, sicht: this.sicht};
      console.log("searchparameter", this.searchparameter);
       
       this.umsatzdata = { 
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
  }

}
