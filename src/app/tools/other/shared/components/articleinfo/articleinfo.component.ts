/*
  Informationen eines Artikels
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { RestArtikelService } from '../../rest-services/rest-artikel.service';
import { RestMitarbeiterService } from '../../rest-services/rest-mitarbeiter.service';

import { Article } from '../../entities/Article';

@Component({
  selector: 'app-articleinfo',
  templateUrl: './articleinfo.component.html',
  styleUrls: ['./articleinfo.component.css']
})
export class ArticleinfoComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerTitle:          string  = "Artikel Info";
  headerLinkBack:       string  = "workflow/workflow-show"; //wird in ngOnInit geupdated
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  article:              Article;
  objektbez:            string; //titel des objektes
  aschlusselbez:        string; //titel der ausgabe
  startdatum:           Date;
  enddatum:             Date;
  verantwortlicher:     any;
  
  innerheight:          number;
    queryparam: string;
  
  constructor(private route: ActivatedRoute,
              private cookieService: CookieService, 
              private restObjService: RestObjektService,
              private restArtikelService: RestArtikelService,
              private restMitarbeiterService: RestMitarbeiterService) { }
  
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
    //ids aus url holen
    let objekt:     string = this.route.snapshot.paramMap.get('objekt');
    let artikel:    string = this.route.snapshot.paramMap.get('articleId');
    let aschlussel: string = this.route.snapshot.paramMap.get('aschlussel');


      this.route
          .queryParamMap
          .subscribe(params => {
              this.queryparam = JSON.parse(JSON.stringify(params)).params['elm'];
              console.log('element', this.queryparam)
          });


    //zuruck-button-link updaten
    this.headerLinkBack = 'workflow/workflow-show/object/' + objekt + '/' + aschlussel;
    
    //artikel laden
    this.httpRequestsLoading++;
    this.restArtikelService.getArtikel(objekt, aschlussel, artikel)
      .subscribe( tempArtikel => {
        this.httpRequestsLoading--;
        this.article = tempArtikel[0];
        
        //alle mitarbeiter laden
        this.httpRequestsLoading++;
        this.restMitarbeiterService.getMitarbeiter(this.article.artikelVerantwortlicher, 'A')
          .subscribe( tempVerantwortlicher => {
            this.httpRequestsLoading--;
            if(tempVerantwortlicher && tempVerantwortlicher[0]){
              this.verantwortlicher = tempVerantwortlicher[0];
            }
          }, err => {
            console.log(err);
        });
        
        //start- und end-datum extrahieren
        if(tempArtikel[0].startdatum !== '9999-12-31'){
          this.startdatum = new Date(tempArtikel[0].startdatum);
        }
        if(tempArtikel[0].enddatum !== '9999-12-31'){
          this.enddatum = new Date(tempArtikel[0].enddatum);
        }
        
        //objekt laden
        this.httpRequestsLoading++;
        this.restObjService.objAbfrageMitObjekt('', this.article.objekt)
          .subscribe( tempObjekt => {
            this.httpRequestsLoading--;
            this.objektbez = tempObjekt[0].obj_bezeichnung;
          }, err => {
            console.log(err);
        });
        
        //aschlussel laden
        this.httpRequestsLoading++;
        this.restObjService.aschlusselAbfrage(this.article.objekt, this.article.aschlussel)
          .subscribe( tempAusgabe => {
            this.httpRequestsLoading--;
            this.aschlusselbez = tempAusgabe[0].ausgbez
          }, err => {
            console.log(err);
        });
      }, err => {
        console.log(err);
    });
  } //ende ngOnInit()
  
  //laedt hoehe neu bei fenstergroesse-veraenderung
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }//ende windowResize()
}
