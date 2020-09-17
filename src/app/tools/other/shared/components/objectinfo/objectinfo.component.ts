/*
  Informationen eines Objektes
*/
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { RestProduktService } from '../../rest-services/rest-produkt.service';
import { RestAutorService } from '../../rest-services/rest-autor.service';

import { Product } from '../../entities/Product';
import { Autor } from '../../entities/Autor';

@Component({
  selector: 'app-objectinfo',
  templateUrl: './objectinfo.component.html',
  styleUrls: ['./objectinfo.component.css']
})
export class ObjectinfoComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerTitle:          string  = "Produkt Info";
  headerLinkBack:       string  = "workflow/workflow-show";
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  objekt:               any;
  aschlussel:           any;
  produkt:              Product;
  
  autoren:              Autor[] = [];
  
  innerheight:          number;


  
  constructor(private route: ActivatedRoute,
              private cookieService: CookieService,
              private restAutorService: RestAutorService,
              private restObjService: RestObjektService,
              private restProduktService: RestProduktService) { }

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
    let tempobjekt = this.route.snapshot.paramMap.get('objekt');
    let tempaschlussel = this.route.snapshot.paramMap.get('aschlussel');



    
    //objekt laden
    this.httpRequestsLoading++;
    this.restObjService.objAbfrageMitObjekt('', tempobjekt)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.objekt = ret[0];
      }, err => {
        console.log(err);
    });
    
    //aschlussel laden
    this.httpRequestsLoading++;
    this.restObjService.aschlusselAbfrage(tempobjekt, tempaschlussel)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.aschlussel = ret[0];
      }, err => {
        console.log(err);
    });
    
    //produkt laden
    this.httpRequestsLoading++;
    this.restProduktService.getProdukt(tempobjekt, tempaschlussel)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.produkt = ret[0];
        
      }, err => {
        console.log(err);
    });
    
    //autoren laden
    this.httpRequestsLoading++;
    this.restAutorService.getAutoren(tempobjekt, tempaschlussel, '', 0)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.autoren = JSON.parse(JSON.stringify(ret));
        this.autoren.sort((a, b) => (a.objektartikel > b.objektartikel) ? 1 : -1);
      }, err => {
        console.log(err);
    });
  }
  
  //gibt an, ob in der liste der autoren der autor[i] zum selben artikel gehoert wie autor[i-1]
  newObjektArtikel(i: number){
    if(i === 0){
      return true;
    }
    
    if(this.autoren[i].objektartikel !== this.autoren[i-1].objektartikel){
      return true;
    }
    
    return false;
  } //ende newObjektArtikel()
  
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }
}
