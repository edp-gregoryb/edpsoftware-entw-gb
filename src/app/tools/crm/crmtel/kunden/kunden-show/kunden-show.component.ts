import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MainpanelheadComponent } from '../../../shared/components/mainpanelhead/mainpanelhead.component';
import { MainpaneleditComponent } from '../../../shared/components/mainpaneledit/mainpaneledit.component';
import { InfopanelComponent } from '../../../shared/components/infopanel/infopanel.component';
import { CommonService } from '../../../shared/comm/common.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ng2-cookies';
import { RestsygetdefaultService } from '../../../crmplus/shared/services/restsygetdefault.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kunden-show',
  templateUrl: './kunden-show.component.html',
  styleUrls: ['./kunden-show.component.css']
})
export class KundenShowComponent implements OnInit {
  newbez:any;
  newrap:any;
  newTerm:any;
  newSearchVal:any;
  kudenbezvonneu:any;
  kudenbezvoneditneu:any;
  schalterAgenda:boolean = false;
  kundenquerysave:any;
  schalterNichtAgenda:number = 2;
  schalterFazit:number;
  termzeitvonfazit:any;
  neuerTerminkeineAnzeige:boolean = true;
  keineMittelAnzeige:boolean = true;
  zeiteventfurneuentermin:any;
  private subscription: Subscription;
  // modulename:string;
  // currentAppModule: string    = "";
  // lastAppModule: string       = "";
  // currentUser: string = "";
  // licensedModules: any = [];
  // sidenavmodules:any = [];
  // sidenavExpanded:boolean = false;
  currentAppModule: string    = "VETN";
  modulename:string;
    lastAppModule: string       = "";
    currentUser: string = "";
    licensedModules: any = [];
    sidenavmodules:any = [];
    sidenavExpanded:boolean = false;
    selectedInfoTab: number;
    innerheight: number;
    showMainPanel:boolean = false;

  constructor(private commonService: CommonService, private cookieService: CookieService, private router:ActivatedRoute,
              private restsygetdefaultService: RestsygetdefaultService) {

     this.kundenquerysave = sessionStorage.getItem('KundenSuche');

     var tempfilelocalstorage = this.cookieService.get('currentUser');
     if (tempfilelocalstorage){
     let currentUserstring = atob(tempfilelocalstorage);
     let userjson = JSON.parse(currentUserstring)
 
    //  this.licensedModules  = userjson[0].berecht;
    //  this.currentUser      = userjson[0].LoginVorname; 
    let licensedModulestemp  = userjson[0].module;
    this.currentUser      = userjson[0].LoginVorname; 
    
    for (let row of  licensedModulestemp){
      //console.log("kunden-show row",row);
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
    //  for (var i = 0; i < this.licensedModules.length; i++) {
    //    if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
    //      this.licensedModules.splice(i,1);         
    //      i--;
    //    }
    //  }
     
     console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
     if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
     if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
     if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
     //["PRWF","PRAU","WECR","WIKU","WIVM","WIAU","WIVE","WIAP","WMEM","WIOB","WIOS","WEAU","WIOF"
     }
     //this.lastAppModule = sessionStorage.getItem('lastmodule');

      this.restsygetdefaultService.getdefault('crm-defaultpanel', 'ADCO').subscribe(data => {
          console.log('crm-defaultpanel', data);
          if (data[0].wert === '!') {
              this.selectedInfoTab = 1;
          }

      });


  }

  ngOnInit() {
    this.innerheight = self.innerHeight - 60 - 4;
    
    if (this.kundenquerysave){
            // console.log("ausgabequerysave",this.ausgabequerysave);
            var kundenqueryresult = JSON.parse(this.kundenquerysave); 
            this.newSearchVal = {beznr:kundenqueryresult.kundennummer,sicht:kundenqueryresult.sicht};
            //sicht:queryresultat.value3,obj:queryresultat.value1,aschluessel:queryresultat.value2
         }
      this.subscription = this.commonService.notify9Observable$.subscribe((res) => {
      if (res === 1) {
         console.log("this.keineMittelAnzeige = false;");
        console.log("keineMittelAnzeige", res);
        this.keineMittelAnzeige = false;
        } 
      if (res === 2) {
        console.log("this.keineMittelAnzeige = true;");
          this.keineMittelAnzeige = true;
        }
      });
     
      //this.commObserver.notifyOther14({ option: 'neuerTermin1', value: true, kunde: this.rowselectkunde });
  }
  
  windowResize(){
    this.innerheight = self.innerHeight - 60 - 4;
  }
  
  newBeznr(val){
    // console.log("newBeznr",val);
    this.newbez = val;
  }
  newRapnr(val){
    // console.log("newRapnr",val);
    this.newrap = val;
  }
  newTermin(val){
     console.log("newTermin",val);
    this.newTerm = val;
  }
  getSearchvaluesKunde(val){
       console.log("getSearchvaluesKunde",val);
       this.newSearchVal = val;
  }
  
  kundenbezvonneuchanged(val){
    console.log("kundenbezvonneuchanged",val);
    this.kudenbezvonneu = val;
  }
  // kundenbezvoneditchanged(val){
  //   console.log("kundenbezvoneditchanged",val);
  //   // this.kudenbezvoneditneu = val;
  // // this.schalterAgenda = true;
  // }
   kundenbezvonfazitchanged(val){

    console.log("kundenbezvonfazitchanged",val);
    if (val !== 0){
    this.schalterFazit = val;
    }
  }
  termzeitvonfazitchanged(val){
    console.log("termzeitvonfazitchanged",val);
    this.termzeitvonfazit = val;
  }
  
  termincountchanged(val){
    console.log("termincountchanged", val);
    if(val === 0){
        this.showMainPanel = false;
    } else {
        this.showMainPanel = true;
    }
  }
  
  keineInfoanzeige(val){
    console.log("keineInfoanzeige",val);
    //this.neuerTerminkeineAnzeige = val;
    // if (val === false){
    // this.neuerTerminkeineAnzeige = true
    // this.keineMittelAnzeige = false;
    // } else {
     
    // this.keineMittelAnzeige = true;
    // }
  }

  gleicherterminevent(val){
    console.log("gleicherterminevent",val);
    this.zeiteventfurneuentermin = val;
  }


}
