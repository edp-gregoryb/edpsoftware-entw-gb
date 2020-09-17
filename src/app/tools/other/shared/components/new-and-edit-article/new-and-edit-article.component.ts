/*
  Artikel werden hier bearbeitet oder neu erstellt
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import { RestArtikelService } from '../../rest-services/rest-artikel.service';
import { RestProzessService } from '../../rest-services/rest-prozess.service';
import { RestAutorService } from '../../rest-services/rest-autor.service';
import { WorkflowService } from '../../services/workflow.service';

import { DeletearticledialogComponent } from '../../dialogs/deletearticledialog/deletearticledialog.component';
import { HelpdialogComponent } from '../../dialogs/helpdialog/helpdialog.component';

import { Workflow } from '../../entities/Workflow';
import { Article } from '../../entities/Article';
import { Step } from '../../entities/Step';
import { Autor } from '../../entities/Autor';
import {NodeServiceService} from '../../rest-services/node-service.service';
import {WfloadService} from '../../rest-services/wfload.service';
import {WfindexdbService} from '../../services/wfindexdb.service';
import {SavefrageDialog} from '../home/home.component';

@Component({
  selector: 'app-new-and-edit-article',
  templateUrl: './new-and-edit-article.component.html',
  styleUrls: ['./new-and-edit-article.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: environment.language},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class NewAndEditArticleComponent implements OnInit {
  
  //Header-Variablen
  sidenavExpanded:      boolean = false;
  currentAppModule:     string  = "WKFL";
  modulename:           string  = "Workflow";
  
  licensedModules:      any     = [];
  sidenavmodules:       any     = [];
  
  headerTitle:          string  = "Artikel Einstellungen";
  headerLinkBack:       string  = "workflow/workflow-show"; //wird in ngOnInit geupdated
  
  httpRequestsLoading:  number  = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  newArticle:           boolean = false; //true falls neuer artikel erstellt wird, false falls einer bearbeitet wird
  article:              Article;
  
  startDateBuffer:      Date;
  endDateBuffer:        Date;
  
  allWorkflows:         Workflow[];
  
  innerheight:          number;
  
  backUpAutoren:        Autor[] = [];
  tempAutoren:          Autor[] = [];
  autorenAuswahl:       Autor[] = [];
  filteredAutoren:      Observable<Autor[]>
  autorCtrl:            any     = new FormControl();
  permalinkvorschlag: string;
    hohe: string;
    queryparam: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService, 
              private dialog: MatDialog,
              private restProzessService: RestProzessService,
              private restAutorService: RestAutorService, 
              private workflowService: WorkflowService,
              private restArtikelService: RestArtikelService,
              private nodeService: NodeServiceService,
              // private wfloadService: WfloadService,
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
    this.httpRequestsLoading++;
    this.restProzessService.getAllProzess()
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.allWorkflows = ret;
      }, err => {
        console.log(err);
    });
    
    //query-parameter einlesen
    this.route
      .queryParamMap
      .subscribe(params => {
        let objId = JSON.parse(JSON.stringify(params)).params['objId'];
        let aschlusselId = JSON.parse(JSON.stringify(params)).params['aschlusselId'];
          this.hohe = JSON.parse(JSON.stringify(params)).params['elm'];
          this.queryparam = JSON.parse(JSON.stringify(params)).params['elm'];
        
        this.headerLinkBack = 'workflow/workflow-show/object/' + objId + '/' + aschlusselId;
        
        if(JSON.parse(JSON.stringify(params)).params['newArticle'] === 'false') { //artikel bearbeiten
          this.newArticle = false;
          
          //artikel laden
          let objektartikelId = JSON.parse(JSON.stringify(params)).params['objektartikel'];
          
          //alle moeglichen autoren laden
          this.httpRequestsLoading++;
          this.restAutorService.getAuswahlAutoren(objId, aschlusselId, '', 0)
            .subscribe( ret => {
              this.httpRequestsLoading--;
              console.log('autoren',ret)
              this.autorenAuswahl = ret;
            }, err => {
              console.log(err);
          });
          
          //schon hinzugefuegte autoren laden
          this.httpRequestsLoading++;
          this.restAutorService.getAutoren(objId, aschlusselId, objektartikelId, 0)
            .subscribe( ret => {
              this.httpRequestsLoading--;
                console.log('getAutoren',ret)
              this.tempAutoren = JSON.parse(JSON.stringify(ret));

              this.backUpAutoren = JSON.parse(JSON.stringify(this.tempAutoren));
            }, err => {
              console.log(err);
          });
          
          this.httpRequestsLoading++;
          this.restArtikelService.getArtikel(objId, aschlusselId, objektartikelId)
            .subscribe( ret => {
              this.httpRequestsLoading--;
              this.article = ret[0];
              console.log('this.article', this.article)
              //PermalinkId Vorschau
              const regex = /\b[a-zA-Z]|\d+\D\d+/gm;
              const str = this.article.objekt;
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
                        this.permalinkvorschlag = tempRegex[0].toLocaleLowerCase() + tempRegex[1].substr(0, 4) + '-' + tempRegex[1].substr(5, 2) + '-';

                        console.log('this.permalinkvorschlag', this.permalinkvorschlag)
                    }
                }
              if(this.article.startdatum !== '9999-12-31'){
                this.startDateBuffer = new Date(this.article.startdatum);
              }
              
              if(this.article.enddatum !== '9999-12-31'){
                this.endDateBuffer = new Date(this.article.enddatum);
              }
            }, err => {
              console.log(err);
          });
          
        } else { //neuer artikel
          this.newArticle = true;
          //default-artikel erstellen
          this.article = { objekt: objId, aschlussel: aschlusselId, objektartikel: undefined, startdatum: undefined, enddatum: undefined,
            artikelVerantwortlicher: undefined, prozessid: undefined, titel: undefined, untertitel: undefined, autoren: undefined,
            seitenzahl: undefined, permalinkid: undefined, doi_nummer: undefined }
    }});
    
    //autoren-filter aktivieren
    this.filteredAutoren = this.autorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(autor => autor ? this._filterAutoren(autor) : this.autorenAuswahl.slice())
    );
  } //ende ngOnInit()
  
  deleteArticle() {
    //sicherheits-pop-up
    const dialogRef = this.dialog.open(DeletearticledialogComponent, {
      width: '250px',
      data: this.article
    });
    
    //pop-up wird geschlossen
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result === true){
          //artikel wird wirklich geloescht
          this.httpRequestsLoading++;
          this.restArtikelService.deleteArtikel(this.article.objekt, this.article.aschlussel, this.article.objektartikel)
            .subscribe( ret => {
              this.httpRequestsLoading--;
                this.wfindexdbService.getProdArtikel(this.article.objekt, this.article.aschlussel);
              this.router.navigate([this.headerLinkBack]);
            }, err => {
              console.log(err);
          });
        }
      }
    );
  }
  
  saveArticle() {
    //daten einsetzen
    if(this.startDateBuffer){
      let tempDate = new Date(JSON.parse(JSON.stringify(this.startDateBuffer)));
      this.article.startdatum = tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.' + tempDate.getFullYear();
    } else {
      this.article.startdatum = '31.12.9999';
    }
    
    if(this.endDateBuffer) {
      let tempDate = new Date(JSON.parse(JSON.stringify(this.endDateBuffer)));
      this.article.enddatum = tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.' + tempDate.getFullYear();
    } else {
      this.article.enddatum = '31.12.9999';
    }
    
    if(this.newArticle){
      this.httpRequestsLoading++;
      console.log("this.article", this.article);
      this.restArtikelService.addArtikel(this.article)
        .subscribe( ret => {
          this.httpRequestsLoading--;
          if (ret[0].fehlercode === '00' || ret[0].fehlercode === '200' || ret[0].fehlercode === '') {
               // this.wfloadService.refreshPage();

              this.wfindexdbService.getProdArtikel(this.article.objekt, this.article.aschlussel);
              // this.nodeService.refreshPage()
              //     .subscribe(page => {
              //        console.log("Refresh page", page);
              //     });
            this.router.navigate([this.headerLinkBack], {queryParams: {elm: this.hohe}});
          } else {
            alert("Ein Fehler ist aufgetreten. Dies kann daran liegen, dass es schon einen Artikel mit diesem Namen gibt");
          }
        }, err => {
          console.log(err);
      });
    } else {
      this.httpRequestsLoading++;
      // console.log("vor save", this.article);
      this.restArtikelService.updateArtikel(this.article)
        .subscribe( ret => {
            console.log('updateArtikel', ret);
          this.httpRequestsLoading--;
            if (ret[0].fehlercode === "02") {
                const dialogRef = this.dialog.open(SavefrageDialog, {});
            }


          //alle autoren loeschen und zum schlusss die neues hinzufuegen
          let tempArt = ret[0];
            console.log('tempArt', tempArt);
          if(this.backUpAutoren.length > 0){
            this.deleteAutorenRekursiv(tempArt, this.backUpAutoren, 0);
          } else {
            this.addAutorenToBE(tempArt);
          }
            console.log('ret[0].fehlercode', ret[0].fehlercode);
          //zurueck zur uebersicht
          if(ret[0].fehlercode === '00' || ret[0].fehlercode === '200' || ret[0].fehlercode === ''){
               // this.wfloadService.refreshPage();
              console.log('ret[0].fehlercode', ret[0].fehlercode);
              this.wfindexdbService.getProdArtikel(this.article.objekt, this.article.aschlussel);
              // this.nodeService.refreshPage()
              //     .subscribe(page => {
              //         console.log("Refresh page", page);
              //     });
            this.router.navigate([this.headerLinkBack], {queryParams: {elm: this.hohe}});
          } else {
              console.log('Ein Fehler ist aufgetreten');
            //alert("Ein Fehler ist aufgetreten.");
          }
        }, err => {
          console.log(err);
      });
    }
  }
  
  articleTypeChanged() {
    
  }
  
  //filtert die autoren
  private _filterAutoren(value: any): Autor[] {
    value = value.toString();
    const filterValue = value.toLowerCase();
    return this.autorenAuswahl
      .filter(autor => autor['fname'].toLowerCase().includes(filterValue)
        //wenn user-input der anfang des vor- oder nachnamens ist, wird autor noch angezeigt
        // (JSON.parse(JSON.stringify(autor)).fname.toLowerCase().indexOf(filterValue) === 0 || JSON.parse(JSON.stringify(autor)).vname.toLowerCase().indexOf(filterValue) === 0)
    );
  } //ende _filterAutoren
  
  deleteAutorenRekursiv(art: Article, arr: any[], i: number) {
    this.httpRequestsLoading++;
    this.restAutorService.deleteAutor(art.objekt, art.aschlussel, art.objektartikel, arr[i].beznr)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        if(i < arr.length - 1){
          //naechster loeschen
          this.deleteAutorenRekursiv(art, arr, i + 1);
        } else {
          //autoren hinzufuegen
          this.addAutorenToBE(art);
        }
      }, err => {
        console.log(err);
    });
  }
  
  addAutorenToBE(art: Article){
    //autoren wieder hinzufuegen
    for(let i = 0; i < this.tempAutoren.length; i++) {
      this.httpRequestsLoading++;
      this.restAutorService.addAutor(art.objekt, art.aschlussel, art.objektartikel, this.tempAutoren[i].beznr)
        .subscribe( ret => {

          this.httpRequestsLoading--;
        }, err => {
          console.log(err);
      });
    }
  }
  
  submitAutor(beznr: number) {
    this.autorCtrl.setValue('')
    for(let i = 0; i < this.tempAutoren.length; i++){
      if(this.tempAutoren[i].beznr === beznr){
        return;
      }
    }
    for(let i = 0; i < this.autorenAuswahl.length; i++){
      if(this.autorenAuswahl[i].beznr === beznr){
        this.tempAutoren.push(this.autorenAuswahl[i]);

      }
    }
  }
  
  deleteAutor(i) {
    this.tempAutoren.splice(i, 1);
  }
  
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }
  
  /*showHelp() {
    //sicherheits-pop-up
    const dialogRef = this.dialog.open(HelpdialogComponent, {
      data: { helpindex: 0 }
    });
  }*/
  pidVorschlag() {
      if (!this.article.permalinkid) {
          this.article.permalinkid = this.permalinkvorschlag;
      }

  }
}
