/*
  Home der Workflow-Applikation. Stellt alle Produkte dar
*/
import {Component, Inject, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { RestProduktService } from '../../rest-services/rest-produkt.service';
import { RestArtikelService } from '../../rest-services/rest-artikel.service';
import { RestFortschrittService } from '../../rest-services/rest-fortschritt.service';
import { Product } from '../../entities/Product';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {RestVlgetobjtxtService} from '../../rest-services/rest-vlgetobjtxt.service';
import {RestVlupdtobjektService} from '../../rest-services/rest-vlupdtobjekt.service';
import {FisVLObjektdetailsService} from '../../rest-services/fis-vlobjektdetails.service';
import {RestVlcreatobektService} from '../../rest-services/rest-vlcreatobekt.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {WindowrefService} from '../../../../shared/comm/windowref.service';
import {Observable} from 'rxjs';
import {NodeServiceService} from '../../rest-services/node-service.service';
import {WfindexdbService, WfWtihID} from '../../services/wfindexdb.service';


@Component({
  selector: 'app-workflowhome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded: boolean      = false;
  currentAppModule: string      = "WKFL";
  modulename: string            = "Workflow";
  
  licensedModules: any          = [];
  sidenavmodules: any           = [];
  
  headerTitle: string           = "Home";
  headerLinkBack: string        = "workflow/workflow-show";
  
  httpRequestsLoading: number   = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  // products: Observable<Array<Product>> ;
    //products: Product[] = [];
products: Array<any> = [];

  productAdditionalInfo: any[]  = [];
  
  innerheight: number;
  
  vlpdBerecht: boolean = false; //true wenn benutzer berechtigung fuer den worflow-editor hat
    order = "aschlussel";
    reverse = false;
   productsSort: Product[] = [];
    anzeigeProduktTemp: any;
    anzeigeFront: any;
    private db: any;
    lastUrl: string;

    @Input() productinput: any;
    timeout:any = 0;
  constructor(private router: Router, private restFortService: RestFortschrittService,
              private route: ActivatedRoute, private restObjService: RestObjektService, private cookieService: CookieService, 
              private restProduktService: RestProduktService, private restArtikelService: RestArtikelService, public dialog: MatDialog,
              private winRef: WindowrefService, private nodeService: NodeServiceService,
              private wfindexdbService: WfindexdbService) {


      this.route
          .queryParamMap
          .subscribe(params => {
              let element = JSON.parse(JSON.stringify(params)).params['elm'];
              if (element) {
                  console.log('element', element)
              //this.lastUrl = element.toString();
              }

          });

      this.products = [];

  }






    // private async getTable() {
    //    // this.products = await this.wfloadService.cb1Call();
    //     console.log("this.products", this.products);
    // }


  ngOnInit() {
        console.log('this.products.length', this.products.length)
     // this.getTable();
      //this.httpRequestsLoading++;
      // setTimeout(() => {
      //     this.wfloadService.readTable().then((data: Array<any>) => {
      //         console.log('readTable', data);
      //         for (let row of data) {
      //             this.products.push(row);
      //         }
      //     });
      //     this.httpRequestsLoading--;
      // }, 1000);
      this.httpRequestsLoading++;
      setTimeout(() => {
      this.wfindexdbService.getAll().then((wfs: Array<WfWtihID>) => {
          wfs.sort((a, b) => (a.aschlussel > b.aschlussel) ? 1 : -1);
          this.products = wfs;
          console.log("this.products", this.products)
      });
          this.httpRequestsLoading--;
      }, 1000);

     // if (!this.lastUrl) {
     //     this.httpRequestsLoading++;
     //          this.wfloadService.postObj().then((value => {
     //              setTimeout(() => {
     //                  this.getTable();
     //                  this.httpRequestsLoading--;
     //              }, 1000);
     //          }));
     //  } else {
     //      this.getTable();
     //  }




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
      
      //checkt ob workflow-editor-berechtigung vorhanden ist
      for(let i = 0; i < userjson[0].berecht.length; i++){
        if(userjson[0].berecht[i] === 'VLPD'){
          this.vlpdBerecht = true;
        }
      }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    }
    
    //anderes laden
    // Alle Objekte laden

     // this.getAllObjekte();
     //  console.log("productinput", this.productinput)
     //  this.products = [];
    // this.route.paramMap.subscribe(param => {
    //     let tempprodukt = param.get('prod');
    //     console.log('tempprodukt', tempprodukt);
    //
    //      if (tempprodukt) {
    //         let tempproduktJson = JSON.parse(tempprodukt);
    //         let anzeigeProduktArray = JSON.parse(this.anzeigeProduktTemp);
    //         this.products = anzeigeProduktArray.sort((a, b) => (a.aschlussel > b.aschlussel) ? 1 : -1);
    //         this.products.push(tempproduktJson[0]);
    //             // this.products = tempproduktJson.sort((a, b) => (a.aschlussel > b.aschlussel) ? 1 : -1);
    //         console.log('tempproduktJson', this.products);
    //         var counter = 0;
    //         for (let j = 0; j < this.products.length; j++) {
    //             //this.getObject(counter, this.products[j]);
    //             counter++;
    //         }
    //     } else {
    //
    //     }
    // })
    // if (this.timeout <= 1) {
    //     this.timeout = setTimeout(function () {
    //          // window.location.reload();
    //     }, 1000);
    //     console.log('timeout', this.timeout)
    // }
  } //ende ngOnInit()

  //checkt ob zwischen diesem produkt und dem letzten ein neues jahr anfaengt (abhaengig von der ausgabe)
  newYear(i: number): boolean {

    if(i === 0){

      //beim ersten produkt immer true
      return true;
    } else if(this.products[i].aschlussel.substring(0,4) !== this.products[i-1].aschlussel.substring(0,4)){

      //wenn die ersten 4 zahlen der ausgabe (also das jahr) nicht gleich sind true...
      return true;
    }
    //...ansonsten false
    return false;
  } //ende newYear()
  
  //laedt objekt- und aschlusselname eines produkts
 async getObject(j: number, product: Product) {
      console.log("j anfang",j)
    //detailinfo des objektes laden
    this.httpRequestsLoading++;
    this.restObjService.objAbfrageMitObjekt('', product.objekt)
      .subscribe( tempObject => {
        this.httpRequestsLoading--;
        //array-groessen anpassen
          console.log("tempObject",tempObject);
          console.log("this.products",this.products[j]);

        while(this.products.length < j + 1){
          this.products.length++;
        }
        while(this.productAdditionalInfo.length < j + 1){
          this.productAdditionalInfo.push([]);
        }
        
        //alle artikel laden (um produkt-fortschritt zu berechnen)
        this.httpRequestsLoading++;
        this.restArtikelService.getAllArtikel(product.objekt, product.aschlussel)
          .subscribe( allArtikel => {
            this.httpRequestsLoading--;
            console.log('allArtikel', allArtikel)

            //rekursiv produkt-fortschritt bestimmen
            if(allArtikel.length > 0){
              this.getProgress(j, allArtikel, 0, 0, 0);
            }
          }, err => {
            console.log(err);
        });
        
        //detailinfo des aschlussels laden
        this.httpRequestsLoading++;
        this.restObjService.aschlusselAbfrage(product.objekt, product.aschlussel)
          .subscribe( ausgabe => {
            this.httpRequestsLoading--;
            //namen hinzufuegen

              console.log("j",j);

                  this.productAdditionalInfo[j].objektname = tempObject[0].obj_bezeichnung;
                  console.log(ausgabe[0])

                  this.productAdditionalInfo[j].aschlusselname = ausgabe[0].ausgbez;

              this.productAdditionalInfo[j].untertitelname = tempObject[0].untertitel;

              clearTimeout(this.timeout);

          }, err => {
            console.log(err);
        });
      }, err => {
        console.log(err);
    });
  } //ende getObject()
  
  //bestimmt fortschritt eines produktes
  getProgress(j: number, allArtikel: any[], p: number, counter: number, done: number) {
    this.httpRequestsLoading++;
    //alle aufgaben dieses produktes laden
    this.restFortService.getAllAufgabe(allArtikel[p].objekt, allArtikel[p].aschlussel, allArtikel[p].objektartikel)
      .subscribe( allAufgaben => {
        this.httpRequestsLoading--;
        //fortschritt zaelen
        for(let i = 0; i < allAufgaben.length; i++){
          counter++;
          if(allAufgaben[i].erledigt === true){
            done++;
          }
        }
        
        //produkt-fortschritt abspeichern
        if(counter !== 0){
          this.productAdditionalInfo[j].fortschritt = (done/counter) * 100;
        } else {
          this.productAdditionalInfo[j].fortschritt = 0;
        }
        
        //naechsten produkt-fortschritt laden
        if(p < allArtikel.length - 1) {
          this.getProgress(j, allArtikel, p + 1, counter, done);
        }
      }, err => {
        console.log(err);
    });
  } //ende getProgress()
  
  //laedt hoehe neu bei fenstergroesse-veraenderung
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  } //ende windowResize()
    openProduktdetail(objekt: any, aschlussel: any, val) {
        val.stopPropagation();
        console.log("openProduktdetail", objekt, aschlussel);

        const dialogRef = this.dialog.open(ProduktdetailDialog, {
            width: '1200px',
            height: this.innerheight + 'px',
            data: {objekt: objekt, aschlussel: aschlussel}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            // this.ngOnChanges();
            // this.mySelect.close();
            this.wfindexdbService.getAll().then((wfs: Array<WfWtihID>) => {
                wfs.sort((a, b) => (a.aschlussel > b.aschlussel) ? 1 : -1);
                this.products = wfs;
            });

        });
    }

    openFinishmodal(objekt: any, val) {
        val.stopPropagation();
        const dialogRef = this.dialog.open(FinishDialog, {
            width: '1200px',
            data: {objekt: objekt}

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }




}


@Component({
    selector: 'produktdetail-dialog',
    templateUrl: 'produktdetail-dialog.html',
    styleUrls: ['./home.component.css']
})
export class ProduktdetailDialog implements OnInit {

    checkoutForm: FormGroup;
    objekt: any;
    sprachdaten: Array<any> = [];
    tabindex: Number = 0;
    permalinkvorschlag: string;
    aschlussel: string;

    step = 0;

    setStep(index: number) {
        this.step = index;
    }
    constructor(
        public dialogRef: MatDialogRef<ProduktdetailDialog>, private getobjtxtService: RestVlgetobjtxtService,
        @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private vlupdtobjektService: RestVlupdtobjektService,
        public dialog: MatDialog) {
        console.log("data", data);
        this.objekt = data.objekt;
        const regex = /\b[a-zA-Z]|\d+\D\d+/gm;
        const str = data.objekt;
        this.aschlussel = data.aschlussel;
        let m;

        if (str) {
            let tempRegex: Array<string> = [];
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    console.log(`Found match, group ${groupIndex}: ${match}`);
                    tempRegex.push(match);
                });


            }
            if (tempRegex.length > 1) {
                this.permalinkvorschlag = tempRegex[0].toLocaleLowerCase() + tempRegex[1].substr(0, 4) + '-' + tempRegex[1].substr(5, 2);
                console.log('this.permalinkvorschlag', this.permalinkvorschlag)
            }
        }

    }

    ngOnInit() {
        this.checkoutForm = this.fb.group({})
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    formInitialized(name: string, form: FormGroup) {
        this.checkoutForm.setControl(name, form);
    }

    onSaveClick(val) {

        let tempMetadaten = val['metadaten'];
        let tempShop = val['shoptexte'];

        let tempjson = Object.assign({}, tempMetadaten, tempShop);
        console.log(tempjson)


        this.vlupdtobjektService.putVlOpjekt(tempjson)
            .subscribe(update => {
                console.log("RestVlupdtobjektService", update);
                if (update.tt_VLObjektDetails[0].fehlercode === "02") {
                    const dialogRef = this.dialog.open(SavefrageDialog, {

                    });
                }
            })

    }


    utitelupdate(val) {
        console.log('utitelupdate', val);
    }
}

@Component({
    selector: 'savefrage-dialog',
    templateUrl: 'Savefrage-dialog.html',
})
export class SavefrageDialog  {

    constructor(
        public dialogRef: MatDialogRef<SavefrageDialog>) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'finish-dialog',
    templateUrl: 'finish-dialog.html',
    styleUrls: ['./home.component.css']
})
export class FinishDialog {

    objekt: any;
    digital: boolean = false;
    publisharten: string;
    publish: string[] = ['nur physisch', 'nur digital', 'physisch und digital'];
    checkeddigital: boolean = false;
    tempobjekt: any;
    digitalobjekt: string;
    digitalobjektbezeich: String;
    digizusaerstellt: String;
    objektvorschlag: string;
    basisiproduktauswahl: boolean;
    creatzusatzprodukt: boolean;
    physischdigital: boolean = false;
    physischdigitalValue: string;
    isbn: String;
    issn: String;

    constructor(public dialogRef: MatDialogRef<FinishDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private fisVLObjektdetailsService: FisVLObjektdetailsService,
                private vlupdtobjektService: RestVlupdtobjektService, private restVlcreatobektService: RestVlcreatobektService) {
        console.log("data", data);
        this.objekt = data.objekt;
        this.objektvorschlag = data.objekt;
        this.digitalobjekt = '';
        this.basisiproduktauswahl = false;
        this.creatzusatzprodukt = false;
        this.fisVLObjektdetailsService.getObjektDetails(this.objekt, 'SRF')
            .subscribe(temp => {
                this.tempobjekt = temp;
                this.digitalobjektbezeich = temp[0].objbezeichnung;
                console.log("fisVLObjektdetailsService", temp);

                if (temp[0].fremdschluessel !== '') {
                  console.log("(temp[0].fremdschluessel", temp[0].fremdschluessel)
                    this.publisharten = 'physisch und digital';
                  this.physischdigital = true;
                  this.physischdigitalValue = temp[0].fremdschluessel;
                  this.digital = true;
                } else if (temp[0].artmerk5 !== '') {
                    this.publisharten = 'nur digital';
                }
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    changePublish(pub: string) {
        this.basisiproduktauswahl = true;
        console.log("changePublish pub", pub);
        /* old code from DL 
        
        if (pub === 'physisch und digital' || pub === 'nur physisch') {


            // this.tempobjekt[0]['artmerk5'] = 'DIGITAL';
            console.log("changePublish / Case: physisch & digital || nur physisch -> this.tempobjekt", this.tempobjekt);

        } else if (pub === 'nur digital') {
            this.digital = true;
            this.tempobjekt[0]['artmerk5'] = 'DIGITAL';
            console.log("changePublish / Case: nur digital -> this.tempobjekt", this.tempobjekt);

        }
        
        */
        
        
        /* new code from RPS */ 
        if (pub === 'nur physisch') {
            this.digital = false;
          /* allfällig vorhandenes Digital-Flag wieder löschen */
          this.tempobjekt[0]['artmerk5'] = '';
          console.log("changePublish / Case: physisch -> this.tempobjekt", this.tempobjekt);

        } else if (pub === 'physisch und digital') {
            this.digital = false;
          /* todo: muss this.digital dennoch gesetzt und andernorts anders gehandhabt werden? */
          /* this.digital = true; */
          this.tempobjekt[0]['artmerk5'] = 'DIGITAL';
          console.log("changePublish / Case: physisch und digital -> this.tempobjekt", this.tempobjekt);

        } else if (pub === 'nur digital') {
          this.digital = true;
          this.tempobjekt[0]['artmerk5'] = 'DIGITAL';
          console.log("changePublish / Case: nur digital -> this.tempobjekt", this.tempobjekt);

        } 
    }
    public digitalErstellen(tempobj) {

      console.log("digitalErstellen -> tempobj",tempobj);

      /* Code von DL 
      if (tempobj[0]['artmerk5'] === 'DIGITAL') {
        console.log("digitalErstellen -> DIGITAL-Flag aufgefunden");

        // this.vlupdtobjektService.putVlOpjekt(tempobj) // Originalcode DL
        this.vlupdtobjektService.putVlOpjekt(tempobj[0])
            .subscribe(update => {
                console.log("digitalErstellen -> RestVlupdtobjektService -> update", update);
            });
      } else {
          console.log("nicht nur Digital");
      }
      */

      /* ----------------------------------------------------
         20.02.2020 RPS: Update in jedem Fall durchführen, 
         damit auch ein Wechsel der Publikationseinstellungen 
         des Basisprodukts angepasst werden könnten 
      */

      /* ggü. Originalcode von DL muss berücksichtigt werden, dass tempobj in diesem Kontet als Array 
      mit integriertem Objekt daher kommt --> Objekt muss zuerst herausgelöst werden, daher tempobj[0] */
      this.vlupdtobjektService.putVlOpjekt(tempobj[0])
      .subscribe(update => {
          console.log("digitalErstellen -> RestVlupdtobjektService -> update", update);


          /* todo: Error-Handling */


          /* todo: Statusmeldung an Benutzer umsetzen (statt in console.log) */
          if (tempobj[0]['artmerk5'] === 'DIGITAL') {
            console.log("digitalErstellen -> DIGITAL-Flag aufgefunden");

            /* Ansatz Statusmeldung für Benutzer */
            console.log("Das Basisobjekt " + tempobj[0].objekt + " wurde auf digitale Publikation angepasst.");

          } else {
            console.log("digitalErstellen -> DIGITAL-Flag NICHT aufgefunden");

            /* Ansatz Statusmeldung für Benutzer */
            console.log("Das Basisobjekt " + tempobj[0].objekt + " wurde auf rein physische Publikation angepasst.");
          }

          this.dialogRef.close(); // 20.02.2020 RPS: experimentell, damit Modal immer geschlossen wird
      });

    }

    public objKopieren() {

    }

    digiZus(obj, ojektbezeichnung) {

    }

    finishWf() {

      console.log("finishWf");
      this.digitalErstellen(this.tempobjekt);
    }

    creatZusatzrprod() {
      console.log("creatZusatzrprod() -> this.checkeddigital:", this.checkeddigital);
        if (this.checkeddigital === true) {
            console.log("creatZusatzrprod() -> this.checkeddigital === true", this.objekt, this.digitalobjekt, this.digitalobjektbezeich, this.isbn, this.issn);
            this.restVlcreatobektService.greateObjekt(this.objekt, this.digitalobjekt, this.digitalobjektbezeich, "yes", this.isbn, this.issn)
                .subscribe(ret => {
                    console.log("creatZusatzrprod() -> restVlcreatobektService.greateObjekt -> ret", ret);

                    if (ret[0].fehlertext === "") {

                        /* experimentell RPS 20.02.2020, damit update-Routine aufgerufen wird */
                        this.finishWf();

                        // this.dialogRef.close(); // wird bei finishWf() integriert

                        console.log("Das Digitalobjekt " + this.digitalobjekt + " wurde erfolgreich angelegt und mit dem zugehörgen Basisobjekt verknüpft.");

                    } else {

                        /* todo: Error-Handling für Benutzer, falls nicht schon sichtbar */

                        this.digizusaerstellt = ret[0].fehlertext;
                    }
                });
        }
        else {

          console.log("creatZusatzrprod() -> this.checkeddigital === false");

          /* experimentell RPS 20.02.2020. damit in jedem Fall ein Update des Basisobjekts erfolgt */
          this.finishWf();
        }
    }
}
