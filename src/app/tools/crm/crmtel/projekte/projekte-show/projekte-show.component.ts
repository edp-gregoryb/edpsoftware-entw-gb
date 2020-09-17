import { Component, OnInit, Input } from '@angular/core';
import { MainpanelheadComponent } from '../../../shared/components/mainpanelhead/mainpanelhead.component';
import { MainpaneleditComponent } from '../../../shared/components/mainpaneledit/mainpaneledit.component';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../../../shared/const/appModules';
import { ActivatedRoute } from '@angular/router';
import { RestsygetdefaultService } from '../../../crmplus/shared/services/restsygetdefault.service';

@Component({
  selector: 'app-projekte-show',
  templateUrl: './projekte-show.component.html',
  styleUrls: ['./projekte-show.component.css']
})
export class ProjekteShowComponent implements OnInit {
  newbez:any;
  newrap:any;
  newTerm:any;
  newSearchVal:any;
  schalterAgenda:boolean = false;
  _objausgabesuche:any;
  ausgabequerysave:any;
  schalterNichtAgenda:number = 1;
  schalterFazit:number;
  termzeitvonfazit:any;
  rapnrvonfazit:any;

  currentAppModule: string    = "VEAU";
  modulename:string;
  lastAppModule: string       = "";
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  sidenavExpanded:boolean = false;
  datumJaNein: string = '';
  selectedInfoTab: number;
  showMainPanel:boolean = false;
  
  innerheight: number;

  constructor(private cookieService: CookieService, private router:ActivatedRoute, private restsygetdefaultService: RestsygetdefaultService) {
    this.ausgabequerysave = sessionStorage.getItem('AusgabeSuche');

    var tempfilelocalstorage = this.cookieService.get('currentUser');
     if (tempfilelocalstorage){
     let currentUserstring = atob(tempfilelocalstorage);
     let userjson = JSON.parse(currentUserstring)
 
    //  this.licensedModules  = userjson[0].berecht;
    //  this.currentUser      = userjson[0].LoginVorname; 
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
      this.restsygetdefaultService.getdefault('crm-mainpanel-Ausgabe','').subscribe(data => {

          this.datumJaNein = data[0].wert;
           console.log('restsygetdefaultService', data);
          // console.log('restsygetdefaultService', this.datumJaNein);


      });

      this.restsygetdefaultService.getdefault('crm-defaultpanel', 'VEAU').subscribe(data => {
          console.log('crm-defaultpanel', data);
          if (data[0].wert === '!') {
             // console.log('data[0].wert', data);
              this.selectedInfoTab = 1;
          }

      });
  }

  ngOnInit() {

    if (this.ausgabequerysave){
        // console.log("ausgabequerysave",this.ausgabequerysave);
        var queryresultat = JSON.parse(this.ausgabequerysave);
        
        this.newSearchVal = {sicht:queryresultat.value3,obj:queryresultat.value1,aschluessel:queryresultat.value2};
    }
    
    this.innerheight = self.innerHeight - 60 - 4;
        console.log('windowsize', this.innerheight);
  }
  
  windowResize(){
        this.innerheight = self.innerHeight - 60 - 4;
    }
  
  newBeznr(val){
    this.showMainPanel = true;
    // console.log("newBeznr",val);
    this.newbez = val;
  }
  newRapnr(val){
    this.showMainPanel = true;
    // console.log("newRapnr",val);
    this.newrap = val;
  }
  newTermin(val){
    this.showMainPanel = true;
    // console.log("newTermin",val);
    this.newTerm = val;
  }
   sucheagendaitemschanged(val){
    // console.log("sucheagendaitemschanged",val);
    this._objausgabesuche = val;
  }
  getSearchvaluesProjekte(val){
       this.showMainPanel = false;
       console.log("getSearchvaluesProjekte",val);
       this.newSearchVal = val;
     }
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
  
  rapnrvonfazitchanged(val){
    console.log("rapnrvonfazitchanged", val);
    this.rapnrvonfazit = val;
  }
  
  termincountchanged(val){
    console.log("termincountchanged", val);
    if(val === 0){
      this.showMainPanel = false;
    } else {
      this.showMainPanel = true;
    }
  }
}
