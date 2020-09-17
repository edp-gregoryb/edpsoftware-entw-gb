import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd,RoutesRecognized } from '@angular/router';
import { appModules } from '../../const/appModules';
import { filter, pairwise } from 'rxjs/operators';
// import { WindowrefService } from '../../comm/windowref.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @Input() sidenavExpanded: boolean;
  @Input() currentAppModule: string;
  @Input() lastAppModule: string;
  //@Input() licensedModules: string[];
  @Input() licensedModules:any;
  @Input() sidenavedModules:any;
  // @Output() changeSicht = new EventEmitter();
  currentAppModuleDetails: any;
  lastAppModuleDetails: Object;
  
  // funktionen:any = ['Offerten','Kunden','CRM','Ausgaben', 'Agenda','Produktion','PR-Workflow'];
  // funktionctrl = new FormControl();
  // aktivesmodule:string = "";
  // iconname:string="";
  // iconfromSession:any;
  // modulefromSession:any;
  // sidenavsmall:boolean = true;
  
  // favoriten:any;
  // // window:Window;
  // @Output() smalllarge:any = new EventEmitter();
  
  // tiles = [ ];

  constructor(private router:Router) {
  // constructor(private router:Router, private windows:WindowrefService) { 
    
    // var tempSessionstorage = sessionStorage.getItem('SidenavData');
    // if (tempSessionstorage){
    //   //console.log("tempSessionstorage",tempSessionstorage);
    //   let parseSessionstorage = JSON.parse(tempSessionstorage);
    //   this.iconfromSession = parseSessionstorage.icon;
    //   this.modulefromSession = parseSessionstorage.module;
    // }
    
    // var tempLocalstoragevonKacheln = localStorage.getItem('HomeScreen');
    // if (tempLocalstoragevonKacheln){
    //   let parseLocalstorage = JSON.parse(tempLocalstoragevonKacheln);
    //   //this.favoriten = parseLocalstorage;
    //   this.tiles = parseLocalstorage;
    //   for (let i = 0; i <= this.tiles.length -1; i++){
    //     this.tiles[i].cols = 1;
    //   }
    //   console.log("this.tiles",this.tiles);
    // }
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
                pairwise()
            ).subscribe((e: any) => {
              //nur updated, wenn nicht innerhalb des workflow-moduls gewechselt wird (da dieses modul mehrere ansichten hat)
              if(e[0].urlAfterRedirects.indexOf('/workflow/workflow-show') === -1 || e[1].urlAfterRedirects.indexOf('/workflow/workflow-show') === -1){
                sessionStorage.setItem('previousUrl', e[0].urlAfterRedirects);
              }
            });
    
    
  } // ENDE Constructor
  
  
  ngOnInit() {
    // console.log("this.iconfromSession,this.modulefromSession",this.iconfromSession,this.modulefromSession);
    // this.aktivesmodule = this.modulefromSession;
    // this.iconname = this.iconfromSession;
    for (let row of this.licensedModules){
      console.log("row.shorthand", row.shorthand, ", ", this.currentAppModule);
      if (row.shorthand == this.currentAppModule){
        this.currentAppModuleDetails = row; 
        console.log("this.currentAppModuleDetails",this.currentAppModuleDetails);
      }
    }

    for (let row of this.licensedModules){
      if (row.shorthand == this.lastAppModule){
        this.lastAppModuleDetails = row; 
        console.log("this.lastAppModuleDetails",this.lastAppModuleDetails);
      }
    }
    
    //this.currentAppModuleDetails = this.licensedModules.find(x => x.shorthand == this.currentAppModule);
    //this.lastAppModuleDetails = this.licensedModules.find(x => x.shorthand == this.lastAppModule);
    console.log("Sidenav: currentAppModule",this.currentAppModule);
    console.log("lastAppModule",this.lastAppModule);
    console.log("appModules",this.licensedModules);
    console.log("erhaltene currentModuldaten:", this.currentAppModuleDetails);
    console.log("erhaltene lastModuldaten:", this.lastAppModuleDetails);

  }
  
  // appModuleDetails(module: string) {
    
  //   // Detailinfos aus appModules.ts auslesen
  //   let moduleDetails: Object = this.licensedModules.find(x => x.shorthand == module);
    
  //   // Gefundene Detailangaben oder leeres Objekt zurückgeben
  //   if (moduleDetails) return moduleDetails;
  //   else return this.licensedModules.find(x => x.shorthand == "");
  
  // }
  appModuleDetails(module: string) {
    
    // Detailinfos aus appModules.ts auslesen
    let moduleDetails: Object = module//;this.licensedModules.find(x => x.shorthand == module);
    
    // Gefundene Detailangaben oder leeres Objekt zurückgeben
    if (moduleDetails) return moduleDetails;
    else return this.licensedModules.find(x => x.shorthand == "");
  
  }
  
  public switchtohome(){
    this.router.navigate(['./demo/demo-show']);
  }
  public switchtomodule(val){
    console.log("switchtomodule",val);
    this.router.navigate([val]);
  }
  
  public switchtolastmodule(val){
     console.log("switchtolastmodule",val);
    this.router.navigate([val]);
    
  }

  public switchtolastmoduleNeu(){
    let urlstring = sessionStorage.getItem("previousUrl");
    if (urlstring){
      console.log("urlstring",urlstring);
      
      //wenn ins workflow-modul gewechselt werden muss, so wird in dessen Home gewechselt
      if(urlstring.indexOf('/workflow/workflow-show') !== -1){
        this.router.navigate(['/workflow/workflow-show']);
        return;
      }
      
      //check ob urlstring parameter enthaelt
      let index = urlstring.indexOf(";");
      if(index === -1){ //keine parameter
        this.router.navigate([urlstring]);
      } else { //parameter
        //params ist der url-teil nach dem Semikolon also die Parameter
        let params:string = urlstring.slice(index + 1);
        //params wird in json format umgewandelt
        params = params.replace(/=/g, '":"');
        params = params.replace(/;/g, '","')
        params = '{"'.concat(params).concat('"}');
        
        //router navigiert zur url mit den geparsden parametern
        this.router.navigate([urlstring.slice(0, index), JSON.parse(params)]);
      }
    } else {
      console.log("keine route ausgewählt");
    }
  }
  
  // Funktionen
  // ====================================
  
  // Routing
 /*
  funktionselected(val){
    console.log("funktionselected",val);
    if (val === 'Offerten'){
      var data:any = {
          firma:2,
          beznr:19866,
          termKontaktBeznr:19948,
          termmitbeznr:2488
      }
      //this.iconname = "description";
      this.aktivesmodule = val;
      sessionStorage.setItem('SidenavData', JSON.stringify({icon:"description", module:"Offerten"}));
      this.router.navigate(['./offertview/offerte-show',data]);
    } 
    else if (val ==='Agenda'){
      console.log("Agenda", val);
      this.aktivesmodule = val;
      sessionStorage.setItem('SidenavData', JSON.stringify({icon:"event", module:"Agenda"}));
      this.router.navigate(['./agendaview/agendaitems-show']);
      
    }
    else if (val === 'Kunden'){
      console.log("kunden", val);
      this.aktivesmodule = val;
      sessionStorage.setItem('SidenavData', JSON.stringify({icon:"people", module:"Kunden"}));
      this.router.navigate(['./kundenview/kunden-show']);
    }
    else if (val === 'Ausgaben'){
      console.log("Ausgaben", val);
      this.aktivesmodule = val;
      sessionStorage.setItem('SidenavData', JSON.stringify({icon:"date_range", module:"Ausgaben"}));
      this.router.navigate(['./projektview/projekte-show']);
    }

  } // ENDE Routing
  

 
  // Launcher
  linktosite(val){
    if (val === 'Offerten'){
      var data:any = {
          firma:2,
          beznr:19866,
          termKontaktBeznr:19948,
          termmitbeznr:2488
      }
      //localStorage.setItem('SidenavData', JSON.stringify({icon:"description", module:"WSOA"}));
      this.router.navigate(['./offertview/offerte-show',data]);
      
    } 
    else if (val ==='Agenda'){
      //localStorage.setItem('SidenavData', JSON.stringify({icon:"event", module:"WAGE"}));
      this.router.navigate(['./agendaview/agendaitems-show']);
      
    }
    else if (val ==='Kunden'){
      this.router.navigate(['./kundenview/kunden-show']);
      
    }
    else if (val === 'Ausgaben'){
       this.router.navigate(['./projektview/projekte-show']);
    }

  }
  */
  
  // public valuesicht(val){
  //   console.log("sichtvalue", val);
  //   this.changeSicht.next(val);
  // }
} // ENDE SidenavComponent
