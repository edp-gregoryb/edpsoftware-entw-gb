import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import {WfindexdbService} from '../../other/shared/services/wfindexdb.service';

@Component({
  selector: 'app-demo-show',
  templateUrl: './demo-show.component.html',
  styleUrls: ['./demo-show.component.css']
})
export class DemoShowComponent implements OnInit {
  
  currentAppModule: string    = "HOME";
  modulename:string = "";
  lastAppModule: string       = "";
  sidenavExpanded:  boolean   = false;
  currentUser:      string    = "";
  //licensedModules: string[];
  licensedModules: any = [];
  sidenavmodules: any = [];

  constructor(private cookieService: CookieService, private loginparameterService: LoginparameterService,
               private wfindexdbService: WfindexdbService) {

    // this.currentUser    = this.loginparameterService.getparameter().mitarbeiter; 
    
    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
  
      let licensedModulestemp  = userjson[0].module;
      this.currentUser      = userjson[0].LoginVorname; 
      
      for (let row of  licensedModulestemp){
        //if (row.show){
          this.licensedModules.push(row);
          if (row.shorthand == this.currentAppModule){
            this.modulename = row.name;
          }
        //}
      }
      //sidenav
      for (let row of  licensedModulestemp){
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      
      //let temp = JSON.stringify(this.licensedModules);
      //sessionStorage.setItem('allModules',temp);
      // for (var i = 0; i < this.licensedModules.length; i++) {
      //   if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
      //     this.licensedModules.splice(i,1);         
      //     i--;
      //   }
      // }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules .find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
      
    }
    
  }

  ngOnInit() {
    if (this.licensedModules.length >= 1) {
      for (let module of this.licensedModules) {
        if (module.name === 'Workflow') {
          this.wfindexdbService.deletedb()
          this.wfindexdbService.postObj(3)
        }
      }
    }


  }
}
