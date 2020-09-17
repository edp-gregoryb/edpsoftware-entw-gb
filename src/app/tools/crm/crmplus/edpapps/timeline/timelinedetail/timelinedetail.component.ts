import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appModules } from '../../../../../shared/const/appModules';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-timelinedetail',
  templateUrl: './timelinedetail.component.html',
  styleUrls: ['./timelinedetail.component.css']
})
export class TimelinedetailComponent implements OnInit {

  urlparams:any;
  @Input() returnlink:any;
  kundevonLink:number;
  objektvonLink:string;
  aufnrvonLink:number;
  sujetnrvonLink:string;
  datumvonLink:string;
  
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  currentAppModule: string    = "WEAD";
  modulename:string;
  lastAppModule: string;
  sidenavExpanded:boolean;
  //sichtchange:any;
  sichtlink: any;
  
  constructor(private route:ActivatedRoute, private cookieService: CookieService) {
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
  }

  
  ngOnInit() {
    //kunde=17171;objekt=SoWo;aufnr=4012085;sujetnr=A;datum=29.01.2018
    this.urlparams = this.route.params.subscribe(params => {
     console.log("params", params);
     this.kundevonLink = params.kunde;
     this.objektvonLink = params.objekt;
     this.aufnrvonLink = params.aufnr;
     this.sujetnrvonLink = params.sujetnr;
     this.datumvonLink = params.datum;
     this.returnlink = params.returnlink;
      
    });
  }
  
  public sichtchange(val){
      console.log("sichtchange", val);
      this.sichtlink = val;
  }

}
