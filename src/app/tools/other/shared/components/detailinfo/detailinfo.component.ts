/*
  Detailinfo eines Tasks
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { RestFortschrittService } from '../../rest-services/rest-fortschritt.service';
import {NodeServiceService} from '../../rest-services/node-service.service';
import {WfindexdbService} from '../../services/wfindexdb.service';

@Component({
  selector: 'app-detailinfo',
  templateUrl: './detailinfo.component.html',
  styleUrls: ['./detailinfo.component.css']
})
export class DetailinfoComponent implements OnInit {
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerLinkBack:       string  = "workflow/workflow-show"; //wird in ngOnInit geupdated
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  todos:                any     = [];
  
  innerheight:          number;
  hohe: string;
  
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService,
              private restFortService: RestFortschrittService,  private nodeService: NodeServiceService,
              private wfindexdbService: WfindexdbService) { }

  ngOnInit() {
    this.innerheight = self.innerHeight - 160;
    
    //header sachen laden
    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if(tempfilelocalstorage) {
      let userjson = JSON.parse(atob(tempfilelocalstorage));
      let licensedModulestemp  = userjson[0].module;
      
      for (let row of  licensedModulestemp){
        this.licensedModules.push(row);
        if (row.shorthand == this.currentAppModule){
          this.modulename = row.name;
        }
        
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    }
    
    //anderes laden
    //laedt ids aus url
    let objId:            string = (this.activeRoute.snapshot.paramMap.get('objectId')).toString();
    let artikelId:        string = (this.activeRoute.snapshot.paramMap.get('articleId')).toString();
    let aufgabengruppeId: number = Number(this.activeRoute.snapshot.paramMap.get('taskId'));
    let aschlussel:       string;

    
    this.activeRoute
      .queryParamMap
      .subscribe(params => {
        aschlussel = JSON.parse(JSON.stringify(params)).params['aschlussel'];
        this.hohe = JSON.parse(JSON.stringify(params)).params['elm'];
        console.log('element', this.hohe)
    });
    
    //updated headerlinkback
    this.headerLinkBack = 'workflow/workflow-show/object/' + objId + '/' + aschlussel;
    
    //alle aufgaben des artikels mit fortschritt laden
    this.httpRequestsLoading++;
    this.restFortService.getAllAufgabe(objId, aschlussel, artikelId)
      .subscribe( tempAllAufgaben => {
        this.httpRequestsLoading--;
        for(let i = 0; i < tempAllAufgaben.length; i++){
          //alle aufgaben die zur aufgabengruppe gehoeren herauspicken
          if(tempAllAufgaben[i].aufgabengruppeid === aufgabengruppeId){
            this.todos.push(tempAllAufgaben[i]);
          }
        }
        //nach reihenfolge sortieren
        this.todos.sort((a, b) => (a.areihenfolge > b.areihenfolge) ? 1 : -1);
      }, err => {
        console.log(err);
    });
  } //ende ngOnInit()
  
  //speichert den fortschritt dieses tasks
  save() {
    if(this.todos.length > 0){
      this.saveRekursiv(0);

    }
  } //ende save()
  
  //speichert aufgabenfortschritt rekursiv
  saveRekursiv(i) {
    console.log("saveRekursiv", i);
    //todo abspeichern
    this.httpRequestsLoading++;
    this.restFortService.updateAufgabe(this.todos[i].objekt, this.todos[i].aschlussel, this.todos[i].objektartikel, this.todos[i].aufgabeid, this.todos[i].erledigt)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.wfindexdbService.refreshProgress(this.todos[i].objekt, this.todos[i].aschlussel);
        // this.nodeService.refreshProgress(this.todos[i].objekt, this.todos[i].aschlussel)
        //     .subscribe(temp => {
        //       console.log("refreshProgress");
        //     });


        if(i < this.todos.length - 1){
          //rekursiver aufruf mit naechster aufgabe
          this.saveRekursiv(i+1);
          this.wfindexdbService.refreshProgress(this.todos[i].objekt, this.todos[i].aschlussel);
          // this.nodeService.refreshProgress(this.todos[i].objekt, this.todos[i].aschlussel)
          //     .subscribe(temp => {
          //       console.log("refreshProgress");
          //     });
        } else {
          //alle aufgaben abgespeichert -> zurueck zur objekt-uebersicht wechseln

          this.router.navigate([this.headerLinkBack], {queryParams: {elm: this.hohe}});
        }
      }, err => {
        console.log(err);
    });
  } //ende saveRekursiv()
  
  //browsergroesse veraendert sich
  windowResize(){
    //hoehe neu berechnen
    this.innerheight = self.innerHeight - 160;
  } //ende windowResize()
}
