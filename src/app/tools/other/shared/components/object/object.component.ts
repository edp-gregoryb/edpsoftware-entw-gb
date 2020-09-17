/*
  Stellt ein Objekt dar
*/

import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList,
    HostListener,
    AfterViewInit,
    OnChanges, SimpleChanges, Input
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ng2-cookies';

import { RestObjektService } from '../../rest-services/rest-objekt.service';
import { RestProduktService } from '../../rest-services/rest-produkt.service';
import { RestArtikelService } from '../../rest-services/rest-artikel.service';
import { RestFortschrittService } from '../../rest-services/rest-fortschritt.service';
import { WorkflowService } from '../../services/workflow.service';

import { Article } from '../../entities/Article';
import { Step } from '../../entities/Step';
import { Task } from '../../entities/Task';
import { Product } from '../../entities/Product';
import {ItemObjectDirective} from '../objekctcontainer/objekctcontainer.component';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit
{



    @ViewChild('content', {static: true}) content: ElementRef;

    @ViewChildren(ItemObjectDirective) itemObject: QueryList<ItemObjectDirective>;

    focusedIndex = 0;

  //Header-Variablen
  sidenavExpanded:      boolean   = false;
  currentAppModule:     string    = "WKFL";
  modulename:           string    = "Workflow";
  
  licensedModules:      any       = [];
  sidenavmodules:       any       = [];
  
  headerTitel:          string    = "";
  headerLinkBack:       string    = "workflow/workflow-show"; //wird in ngOnInit geupdated
  
  httpRequestsLoading:  number    = 0; //die anzahl aller http-requests die momentan am laufen sind
  
  //andere Variablen
  product:              Product;
  
  todos:                any[][][] = [];
  stepsunlocked:        any[][]   = [];
  taskprogress:         any[][][] = [];
  
  minwidth: number; //minimum breite des workflows
    height: number;
  
  innerheight: number;
  hohe: string;
    queryparam: string;


  
  constructor(private activeRoute: ActivatedRoute,
              private restFortService: RestFortschrittService,
              private router: Router,
              public dialog: MatDialog,
              private cookieService: CookieService,
              private workflowService: WorkflowService,
              /*private progressService: ProgressService,*/
              private restObjService: RestObjektService,
              private restProduktService: RestProduktService,
              private restArtikelService: RestArtikelService,
              private elementRef: ElementRef<HTMLElement>) {


  }



    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    goToArticle(id: string): void {
        const el: HTMLElement|null = document.getElementById(id);
        console.log("el", el)
        if (el) {
            console.log("el nach if", el)
            setTimeout(() =>
                el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
        }
    }




  ngOnInit() {
      // setTimeout(() =>
      //     this.goToArticle('7'), 1000);
      //

      //
      // if (this.hohe) {
      //     let hohevalue = parseInt(this.hohe, 10) ;
      //     console.log('innerheigt', this.hohe)
      //     this.innerheight = self.innerHeight - 160;
      //     console.log('this.height', this.height)
      // } else {
      //     this.innerheight = self.innerHeight - 160;
      // }
     // this.innerheight = self.innerHeight - 160;
    
    //header sachen laden
      this.activeRoute
          .queryParamMap
          .subscribe(params => {
              let element = JSON.parse(JSON.stringify(params)).params['elm'];
              if (element) {
                  console.log('element', element)
                  this.queryparam = element.toString();
                  setTimeout(() =>
                      this.goToArticle(element.toString()), 1000);
              }
          });

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
    //ids herauslesen
    var aschlussel = this.activeRoute.snapshot.paramMap.get('aschlussel');
    var objectid = this.activeRoute.snapshot.paramMap.get('objekt');

    //produkt laden
    this.httpRequestsLoading++;
    this.restProduktService.getProdukt(objectid, aschlussel)
      .subscribe( ret => {
        this.httpRequestsLoading--;
        this.product = ret[0];
        
        //objekt-details laden
        this.httpRequestsLoading++;
        this.restObjService.objAbfrageMitObjekt('', this.product.objekt)
          .subscribe( ret => {
            this.httpRequestsLoading--;
            //artikel-details laden
            this.httpRequestsLoading++;
            this.restObjService.aschlusselAbfrage(this.product.objekt, this.product.aschlussel)
              .subscribe( ret2 => {
                this.httpRequestsLoading--;
                //mit objekt- und artikel-details headertitel neu definieren
                this.headerLinkBack = "workflow/workflow-show";
                this.headerTitel = ret[0].obj_bezeichnung;// + ' - ' + ret2[0].ausgbez;
              }, err => {
                console.log(err);
            });
          }, err => {
            console.log(err);
        });
        
        //alle artikel laden
        this.httpRequestsLoading++;
        this.restArtikelService.getAllArtikel(this.product.objekt, this.product.aschlussel)
          .subscribe( ret2 => {
               // console.log('ret2', ret2);
            this.httpRequestsLoading--;
            //artikel nach enddatum sortieren
            ret2.sort((a, b) => (a.permalinkid > b.permalinkid) ? 1 : -1);
              console.log('ret2', ret2);
            // ret2.sort((a, b) => (a.enddatum > b.enddatum) ? 1 : -1);
            //fuer jeden artikel
            for(let i = 0; i < ret2.length; i++){
              //fortschritt laden
              this.getFortschritt(i, ret2[i]);
            }
          }, err => {
            console.log(err);
        });
      }, err => {
        console.log(err);
    });
  } //ende ngOnInit()

    // @HostListener('window:keydown.ArrowDown', ['$event'])
    // scrollDown(event: KeyboardEvent) {
    //     // prevent default scrolling
    //     event.preventDefault();
    //
    //     if (this.focusedIndex === this.itemObject.length + 1) {
    //         return;
    //     }
    //
    //     this.focusedIndex++;
    //
    //     const targetCard = this.itemObject.toArray()[this.focusedIndex];
    //     console.log(targetCard)
    //     targetCard.scrollIntoView();
    // }
    //
    // @HostListener('click', ['$event'])
    // click(event: MouseEvent) {
    //     // prevent default scrolling
    //     event.preventDefault();
    //
    //     if (this.focusedIndex === this.itemObject.length + 1) {
    //         return;
    //     }
    //
    //     this.focusedIndex++;
    //
    //     const targetCard = this.itemObject.toArray()[this.focusedIndex];
    //     console.log('targetCard', targetCard)
    //     targetCard.scrollIntoView();
    // }
    //
    // @HostListener('window:keydown.ArrowUp', ['$event'])
    // scrollUp(event: KeyboardEvent) {
    //     // prevent default scrolling
    //     event.preventDefault();
    //
    //     if (this.focusedIndex === 0) {
    //         return;
    //     }
    //
    //     this.focusedIndex--;
    //
    //     const targetCard = this.itemObject.toArray()[this.focusedIndex];
    //     targetCard.scrollIntoView();
    // }
  
  //laedt den fortschritt eines artikels und dessen aufgaben
  getFortschritt(i, article) {
    //arrays erweitern
    this.todos.push([]);
    this.stepsunlocked.push([]);
    this.taskprogress.push([]);
    
    //fortschritt laden
    this.httpRequestsLoading++;
    this.restFortService.getAllAufgabe(this.product.objekt, this.product.aschlussel, article.objektartikel)
      .subscribe( ret => {
          console.log('ret', ret);
        this.httpRequestsLoading--;
        //aufgaben sortieren
        ret.sort(
          function(a, b) {
            if(a.sreihenfolge === b.sreihenfolge){
              return a.agreihenfolge - b.agreihenfolge;
            }
            return a.sreihenfolge - b.sreihenfolge;
        });
        
        //aufgaben in mehrdimensionalen array umwandeln
        //erstes element einfuegen
        let pseudoTodos = [[[ret[0]]]];
        let stepNr = 0;
        let taskNr = 0;
        for(let j = 1; j < ret.length; j++){
          if(ret[j].sreihenfolge !== ret[j-1].sreihenfolge){
            //neuer step faengt an
            stepNr++;
            taskNr = 0;
            pseudoTodos.push([]);
            pseudoTodos[stepNr].push([ret[j]]);
          } else if(ret[j].agreihenfolge !== ret[j-1].agreihenfolge){
            //neuer task faengt an
            taskNr++;
            pseudoTodos[stepNr].push([ret[j]]);
          } else {
            //gleicher task und step wie vorheriges todo
            pseudoTodos[stepNr][taskNr].push(ret[j]);
          }
        }
        //mehrdimensionaler array den todos hinzufuegen
         // console.log('pseudoTodos', pseudoTodos);
        this.todos[i] = pseudoTodos;
        
        //berechnen wie viel platz die schritte brauchen
        if(!this.minwidth || (175 * (pseudoTodos[pseudoTodos.length - 1][0][0].sreihenfolge + 2)) > this.minwidth){
          this.minwidth = 175 * (pseudoTodos[pseudoTodos.length - 1][0][0].sreihenfolge + 2);
        }
        
        //check, welcher task wie weit gemacht ist
        this.getTaskProgress(pseudoTodos, i);
        //check welche schritte schon freigeschaltet sind
        this.getStepsUnlocked(pseudoTodos, i);
      }, err => {
        console.log(err);
    });
  } //ende getFortschritt()
  
  //checkt wie weit die einzelnen tasks eines schrittes sind
  getTaskProgress(steps, i) {
    //fuer jeden schritt
    for(let j = 0; j < steps.length; j++){
      //array erweitern
      this.taskprogress[i].push([]);
      //fuer jeden seiner tasks
      for(let p = 0; p < steps[j].length; p++){
        let counter = steps[j][p].length;
        let done = 0;
        //zahlen wie viele todos schon erledigt sind
        for(let q = 0; q < steps[j][p].length; q++){
          if(steps[j][p][q].erledigt === true){
            done++;
          }
        }
        //berechnung wie viel schon erledigt ist 0 <= x <= 1
        let prg = 0;
        if(counter !== 0){
          prg = done/counter;
        }
        //progress hinzufuegen
        this.taskprogress[i][j].push(prg);
      }
    }
  } //ende getTaskProgress()
  
  //checkt welche schritte eines artikels freigeschaltet sind
  getStepsUnlocked(steps, i) {
    //fuer alle schritte
    for(let j = 0; j < steps.length; j++){
      if(j === 0){
        //erster schritt immer freigeschaltet
        this.stepsunlocked[i].push(true);
      } else {
        //wenn alle tasks des vorherigen schrittes erledigt sind, muss dieser schritt freigeschaltet werden
        let done = true;
        for(let p = 0; p < this.taskprogress[i][j-1].length; p++){
          if(this.taskprogress[i][j-1][p] !== 1){
            //ein task wurde noch nicht erledigt
            // done = false; ohne done keine Sperrung dli 14.03.2019
          }
        }
        //hinzufuegen ob schritt freigeschaltet
        this.stepsunlocked[i].push(done);
      }
    }
  } //ende getStepsUnlocked()
  
  //gibt hintergrundfarbe eines tasks zurueck
  getBackgroundColor(i, j, p) {
    let prg = this.taskprogress[i][j][p];
    if(prg === 1){
      //task abgeschlossen -> Gruen
      return 'rgba(44, 209, 41, 0.6)';
    } else if(prg < 1 && prg > 0){
      //task unvollstaendig -> Orange
      return 'rgba(239, 147, 47, 0.6)';
    }
    //task noch nicht begonnen -> Fast weiss
    return 'rgb(241, 241, 241)';
  } //ende getBackgroundColor()
  
  //kontrolliert border um alle artikel -> auf der seite auf die noch gescrollt werden kann wird border angezeigt
  //am anfang nur border-right anzeigen
  borderright = 'none';
  borderleft = 'none';
  @ViewChild('smallWrapper', { static: false }) smallWrapper: ElementRef;
  smallWrapperScroll() {
    //nativeElement extrahieren
    let native = this.smallWrapper.nativeElement;

    if(native.scrollLeft === 0 && native.scrollWidth - native.scrollLeft < native.offsetWidth + 2) {
      //es kann gar nicht gescrollt werden
      this.borderleft = 'none';
      this.borderright = 'none';
    } else if(native.scrollLeft === 0) {
      //ganz nach links gescrollt -> nur rechts border
      this.borderleft = 'none';
    } else if(native.scrollWidth - native.scrollLeft < native.offsetWidth + 2) {
      //ganz nach rechts gescrollt -> nur links border
      this.borderright = 'none';
    } else {
      //irgendwo in der mitte gescrollt -> beide seiten border
      this.borderleft = 'solid grey 1px';
      this.borderright = 'solid grey 1px';
    }
  } //ende smallWrapperScroll()
  
  windowResize(){
    this.innerheight = self.innerHeight - 160;
  }




}
