/*
  Objekte werden hier bearbeitet oder neu erstellt
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { RestProduktService } from '../../rest-services/rest-produkt.service';
import { RestAutorService } from '../../rest-services/rest-autor.service';
import { WorkflowService } from '../../services/workflow.service';

import { Product } from '../../entities/Product';
import { Autor } from '../../entities/Autor';

import { DeleteobjectdialogComponent } from '../../dialogs/deleteobjectdialog/deleteobjectdialog.component';
import {RestVlobjmusterService} from '../../rest-services/rest-vlobjmuster.service';
import {RestVlcreatobektService} from '../../rest-services/rest-vlcreatobekt.service';
import {WfloadService} from '../../rest-services/wfload.service';
import {WfindexdbService} from '../../services/wfindexdb.service';

@Component({
  selector: 'app-new-and-edit-object',
  templateUrl: './new-and-edit-object.component.html',
  styleUrls: ['./new-and-edit-object.component.css']
})
export class NewAndEditObjectComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerTitle:          string  = "Produkt Einstellungen";
  headerLinkBack:       string  = "workflow/workflow-show"; //wird in ngOnInit geupdated
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  newObject:            boolean = true; //true falls neues objekt erstellt wird, false falls eines bearbeitet wird
  
  allObjects:           any;
  allNeuObjects:        any;
  allAschlussel:        any;
  //tempAutor: string;
  product:              Product = { objekt: undefined, aschlussel: undefined, autoren: []};
  
  innerheight:          number;
  
  tempAutoren:          Autor[] = [];
  neuesobjauswahl:      string;
  neuesobjbezeichnung: string;
  objektvorlag: string;
  objektErstellenButton: boolean;
  fehlertextAnzeige: boolean = false;
  fehlertext: string;
  titelFehlertext: string;
  bestehendesObjekt: boolean;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private cookieService: CookieService,
              private workflowService: WorkflowService,
              private restObjService: RestObjektService,
              private restProduktService: RestProduktService,
              private restAutorService: RestAutorService,
              private restVlobjmusterService: RestVlobjmusterService,
              private restVlcreatobektService: RestVlcreatobektService,
              private wfindexdbService: WfindexdbService) {}
  
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

    this.httpRequestsLoading++;
    this.restVlobjmusterService.getMusterObjekt('', '')
        .subscribe(objMusert => {
          this.httpRequestsLoading--;
          console.log("objMusert", objMusert);
          this.allNeuObjects = objMusert;
        })
    
    //anderes laden
    this.httpRequestsLoading++;
    this.restObjService.objAbfrage('')
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.allObjects = ret;
      }, err => {
        console.log(err);
    });
    
    //query-parameter einlesen
    this.route
      .queryParamMap
      .subscribe(params => {
        //wird objekt bearbeitet oder net erstellt

        if(JSON.parse(JSON.stringify(params)).params['newObject'] === 'false'){
          this.newObject = false;
          let obj = JSON.parse(JSON.stringify(params)).params['objekt'];
          let aschlussel = JSON.parse(JSON.stringify(params)).params['aschlussel'];
          this.bestehendesObjekt = JSON.parse(JSON.stringify(params)).params['bestehendesObjekt'];
          console.log('bestehendesObjekt', this.bestehendesObjekt)
          
          //schon hinzugefuegte autoren laden
          this.httpRequestsLoading++;
          this.restAutorService.getAutoren(obj, aschlussel, '', 0)
            .subscribe( ret => {
              this.httpRequestsLoading--;
              this.tempAutoren = JSON.parse(JSON.stringify(ret));
              this.tempAutoren.sort((a, b) => (a.objektartikel > b.objektartikel) ? 1 : -1);
            }, err => {
              console.log(err);
          });
          
          //produkt laden
          this.httpRequestsLoading++;
          this.restProduktService.getProdukt(obj, aschlussel)
            .subscribe( ret => {
              this.httpRequestsLoading--;
              this.product.objekt = ret[0].objekt;
              this.product.aschlussel = ret[0].aschlussel;
              
              this.httpRequestsLoading++;
              this.restObjService.aschlusselAbfrage(obj, aschlussel)
                .subscribe( ret => {
                  this.httpRequestsLoading--;
                  this.allAschlussel = ret;
                }, err => {
                  console.log(err);
              });
            }, err => {
              console.log(err);
          });
        } else{
          this.newObject = true;
        }
      }
    );
    //zurueck-Link updaten
    this.headerLinkBack = "workflow/workflow-show";
  } //ende ngOnInit()
  
  //laedt neue ausgaben bei objekt-auswahl-wechsel
  objectChange() {

    this.httpRequestsLoading++;
    this.restObjService.allAschlusselAbfrage(this.product.objekt)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.allAschlussel = ret;
      }, err => {
        console.log(err);
    });
  } //ende objectChange()
  
  //wird aufgerufen bei ausgabe-wechsel
  aschlusselChange() {
  } //ende aschlusselChange
  
  //speichert neues produkt
  saveProduct() {
      if (this.neuesobjauswahl) {
          this.product.objekt = this.neuesobjauswahl;
      }
      console.log("this.product",  this.product);
    if(this.newObject){
      //neues objekt
      this.httpRequestsLoading++;
      this.restProduktService.addProdukt(this.product)
        .subscribe( ret => {
          this.httpRequestsLoading--;
          //zurueck zur uebersicht
            console.log("this.product", this.product);
            console.log("this.product ret", ret);
            this.wfindexdbService.postObjOne(this.product.objekt, 3);
            this.router.navigate([this.headerLinkBack, {'prod': JSON.stringify(ret)} ]);
          // this.router.navigate([this.headerLinkBack]);
        }, err => {
          console.log(err);
      });
    } else {


      this.httpRequestsLoading++;
        this.restProduktService.addProdukt(this.product)
            .subscribe( ret => {
                this.httpRequestsLoading--;
                //zurueck zur uebersicht
                console.log("this.product", this.product);
                console.log("this.product ret", ret);
                this.wfindexdbService.postObjOne(this.product.objekt, 3);
                this.router.navigate([this.headerLinkBack, {'prod': JSON.stringify(ret)} ]);
                // this.router.navigate([this.headerLinkBack]);
            }, err => {
                console.log(err);
            });


        //schon bestehendes objekt braucht es anscheinend nicht mehr 25.06.20
      // this.restProduktService.updateProdukt(this.product)
      //   .subscribe( ret => {
      //     this.httpRequestsLoading--;
      //
      //     //zurueck zur uebersicht
      //     this.router.navigate([this.headerLinkBack]);
      //   }, err => {
      //     console.log(err);
      // });

    }
  } //ende saveProduct()
  
  //loescht produkt
  deleteProduct() {
    const dialogRef = this.dialog.open(DeleteobjectdialogComponent, {
      width: '250px',
      data: this.product
    });
    
    //pop-up wird geschlossen
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === true){
          //objekt wird wirklich geloescht
          this.httpRequestsLoading++;
            this.wfindexdbService.removeProduct(this.product.objekt, this.product.aschlussel)
          this.restProduktService.deleteProdukt(this.product.objekt, this.product.aschlussel)
            .subscribe(ret => {
              this.httpRequestsLoading--;
              this.router.navigate([this.headerLinkBack]);
            }, err => {
              console.log(err);
          });
        }
      }
    );
  } //ende deleteProduct()
  
  newObjektArtikel(i: number){
    if(i === 0){
      return true;
    }
    
    if(this.tempAutoren[i].objektartikel !== this.tempAutoren[i].objektartikel){
      return true;
    }
    
    return false;
  }
  
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }

  objectNeuChange(val) {
    console.log("neuobj",val);
    this.objektvorlag = val.value;
    this.neuesobjauswahl = val.value;


  }

  objektErstellen() {
    console.log("objekt erstellen start", this.objektvorlag, this.neuesobjauswahl);
    this.httpRequestsLoading++;
    this.restVlcreatobektService.greateObjekt(this.objektvorlag, this.neuesobjauswahl, this.neuesobjbezeichnung, "", "", "")
        .subscribe(ret => {
          this.httpRequestsLoading--;
          if (ret) {
              if (ret[0].fehlercode === '00' || ret[0].fehlercode === '') {
                  console.log("objekt erstellen greateObjekt -> ret", ret);
                  this.titelFehlertext = "";

                  this.fehlertextAnzeige = true;
                  this.httpRequestsLoading++;
                  this.restObjService.aschlusselAbfrage(this.neuesobjauswahl, '')
                      .subscribe( ret => {
                          this.httpRequestsLoading--;
                          this.allAschlussel = ret;
                          console.log(ret)
                          this.titelFehlertext = "Objekt: " + ret[0].objekt + " erstellt!"
                          this.fehlertext = '';

                      }, err => {
                          console.log(err);
                      });
              } else {

                  this.fehlertextAnzeige = true;
                  console.log("fehlertext", ret[0].fehlertext)
                  this.titelFehlertext = "Fehlermeldung:"
                  this.fehlertext = ret[0].fehlertext;
                  if (this.fehlertextAnzeige === true) {
                      this.objektErstellenButton = false;
                  }
              }
          }

        }, err => {
          console.log(err);
        });
  }

    public  getAllObjekte() {
        let products: Product[] = [];
        let anzeigeProducts: Array<any> = [];
        this.httpRequestsLoading++;
        this.restObjService.objAbfrage('')
            .subscribe( allObjects => {
                this.httpRequestsLoading--;
                console.log('allObjects', allObjects);
                //fuer jedes objekt
                var counter = 0;
                for (let i = 0; i < allObjects.length; i++){
                    //alle produkte dieses objektes abfragen
                    this.httpRequestsLoading++;
                    this.restProduktService.getAllProdukt(allObjects[i].objekt)
                        .subscribe( tempProducts => {
                            this.httpRequestsLoading--;
                            //fuer alle produkte
                            console.log("tempProducts.length",tempProducts.length)

                            if (tempProducts.length >= 1){
                                anzeigeProducts.push(tempProducts[0]);
                                sessionStorage.setItem('anzeigeProducts', JSON.stringify(anzeigeProducts))
                            }

                            for (let j = 0; j < tempProducts.length; j++){
                                products.push(tempProducts[j]);
                                sessionStorage.setItem('tempProducts', JSON.stringify(products))

                                counter ++;
                            }

                        }, err => {
                            console.log(err);
                        });
                }
            }, err => {
                console.log(err);

            });


    }
} //ende class NewAndEditObjectComponent
