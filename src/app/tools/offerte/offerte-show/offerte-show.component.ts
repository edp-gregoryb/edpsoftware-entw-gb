import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl, NgModel } from '@angular/forms';
// import { Verkaufsdokument } from './verkaufsdokument';
// import { Titeldata } from './titeldata';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VorerfassungService } from '../shared/services/vorerfassung.service';
import { AuftragService } from '../shared/services/auftrag.service';
import { OfferteshowService } from '../shared/services/offerteshow.service';
// import { GetofferteService } from '../../shared/services/getofferte.service';
import { ActivatedRoute} from '@angular/router';
import { AbschlussService } from '../shared/services/abschluss.service';
import { ObjektauswahlService } from '../../shared/services/objektauswahl.service';
import { RubrikauswahlService } from '../../shared/services/rubrikauswahl.service';
import { UnterrubrikauswahlService } from '../../shared/services/unterrubrikauswahl.service';
import { WerbeformateService } from '../shared/services/werbeformate.service';
import { PlatzierungsauswahlService } from '../shared/services/platzierungsauswahl.service';
import { PreispositionenService } from '../shared/services/preispositionen.service';
import { AschluesselauswahlService } from '../../shared/services/aschluesselauswahl.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatMenu } from '@angular/material/menu';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { Instanztemplatedata } from './instanztemplatedata';
import { WindowrefService } from '../../shared/comm/windowref.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../shared/const/appModules';

import { CrmEmailidService } from '../../shared/services/restcrmemailid.service';
import { CrmMailversandService } from '../../shared/services/restcrmmailversand.service';

import { words } from '../../../../locale/words';
import {AdrvermittlerService} from '../../crm/shared/services/adrvermittler.service';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
    selector: 'app-offerte-show',
    templateUrl: './offerte-show.component.html',
    styleUrls: ['./offerte-show.component.css'],
    host: { '(window:keydown)': 'keyDown($event)' }
    //encapsulation: ViewEncapsulation.None               // TODO: evtl. später wieder rausnehmen, falls nicht mehr gebraucht (eingefügt für Autocompleter bei Objektauswahl)
})

export class OfferteShowComponent implements OnInit {
  public meinVerkaufsdokumentFormular: FormGroup;   // Form Model
  public editorContent: string;
  
  // kundenname:string;
  // firmenname:string;
  // strasse:string;
  // ort:string;
  // kundendata:any;
  // mitarbeiterdata:any;
  // mitarbeitername:string;
  // mitarbeiterabteilung:string;
  // gefiltereteAdressen:any;
  // filteredOptions: Observable<any>;
  // stateCtrl: FormControl;
  options: any;
  printTemplateOrientation:   string;
  activePrintTemplate:        string;
  // activeITOAprintTemplate:   string;
  urlparams:                  any;
  objektdata:                 any;
  
  //filteredObjektdata:         any;
  
  ausgabevariantendataarray:  any[];
  abschlussdataarray:         any[];
  kvariantedataarray:         any[];
  rubrikdataarray:            any[];
  urubrikdataarray:           any[];
  werbeformatdataarray:       any[];
  platzierungsdataarray:      any[];
  internetzuschlagsdataarray: any[];
  preispositionendataarray:   any[][];
  preisposdropdown:           string;
  erscheinungsdataarray:      any[];
  wofa_action:                string;
  progressbar_visible:        boolean;
  verkaufsdokumentStatus:     string;
  // objektAutocompleter:       boolean;  // steuert, ob Objektauswahl via DropDown oder Autocompleter erfolgt
  snackBarRef:                any;
  previewpaneWidth:           number;
  hidePreview:                boolean;
  window:                     Window;
  printDokumentAufServer:     boolean;
  pdfBlobURL:                 string;
  intdebug:                   boolean;
  scroll2topVisible:          boolean;
  
  //html strings linked with locale/words
  lockedEditing:              string;
  openEditing:                string;
  documentIs:                 string;

  // Templatevariablen 
  testmode:                   boolean;
  url_logo:                   string;
  str_company:                string;
  str_footer:                 string;
  instanz:                    string;
  instanzdata:                Instanztemplatedata;
  
  // Material für Objekt-Autocompleter
    
    selectedObjekt:           any;
    objektCtrl:               FormControl;
    formObjekte:              any;
    vermittlerCtrl: FormControl;

    filteredVermittler: Observable<any>;

  // @ViewChild(TemplateRef) template: TemplateRef<any>;
  @ViewChild('mainpane', { static: true }) mainPaneElement;

  // Ende Material für Objekt-Autocompleter
  backtoagendadata:           any;
  
  modulename:string;
  currentAppModule: string    = "WEOA";
  lastAppModule: string       = "";
  currentUser: string = "";
  licensedModules: any = [];
  sidenavExpanded:boolean = false;
  
  tempfilelocalstorage:any;
  sidenavmodules:any = [];
  sicht:string = "";
  mailinnendienst:string;
  showVorerfassungButton: boolean = false;
  showAuftragButton: boolean = false;
  
  constructor(
    private _fb: FormBuilder,
    // private adrkundenService: AdrkundenService,
    // private mitarbeiterService: MitarbeiterService,
    private offerteshowService:OfferteshowService,
    // private getofferteService:GetofferteService,
    private route:ActivatedRoute,
    private abschlussService:AbschlussService, 
    private objektauswahlService:ObjektauswahlService, 
    private rubrikauswahlService:RubrikauswahlService,
    private unterrubrikauswahlService:UnterrubrikauswahlService, 
    private werbeformateService:WerbeformateService, 
    private platzierungsauswahlService:PlatzierungsauswahlService,
    private preispositionenService:PreispositionenService,
    private aschluesselauswahlService: AschluesselauswahlService,
    private windowrefService: WindowrefService,
    public objektDialog: MatDialog,
    public snackBar: MatSnackBar,
    private sanitizer:DomSanitizer,
    private cookieService: CookieService,
    private vorerfassungService: VorerfassungService,
    private auftragService: AuftragService,
    private crmEmailidService: CrmEmailidService,
    private crmMailversandService: CrmMailversandService,
    private adrvermittlerService: AdrvermittlerService) {
      
      let sich = sessionStorage.getItem('crmsicht');
      if (sich){
        let tempsicht = JSON.parse(sich);
        this.sicht = tempsicht.value;
      }

      //David 13.03.20
      this.vermittlerCtrl = new FormControl();


      this.tempfilelocalstorage = this.cookieService.get('currentUser');
      if (this.tempfilelocalstorage){
        let currentUserstring = atob(this.tempfilelocalstorage);
        let userjson = JSON.parse(currentUserstring)
        let licensedModulestemp  = userjson[0].module;
        
        for (let row of  licensedModulestemp){
            this.licensedModules.push(row);
            if (row.shorthand == this.currentAppModule){
              this.modulename = row.name;
            }
        }
        
        for (let row of  licensedModulestemp){
          if (row.show){
            this.sidenavmodules.push(row);
          }
        }
        
        //Kontrolle ob Vorerfassung- und/oder Auftrag-Button angezeigt werden sollen
        for(let i = 0; i < userjson[0].berecht.length; i++) {
          if(userjson[0].berecht[i] === "WEAV"){
            this.showVorerfassungButton = true;
          } else if(userjson[0].berecht[i] === "WEAF"){
            this.showAuftragButton = true;
          }
        }
      }
    
    // Start Labor Objekt-Autocompleter
          
      this.objektCtrl = new FormControl();
      this.formObjekte = this.objektCtrl.valueChanges
          .pipe(startWith(this.objektCtrl.value))
          .pipe(map(val => this.objektDisplayFn(val)))
          .pipe(map(obj_bezeichnung => this.filterObjekte(obj_bezeichnung)));
      
    // Ende Labor Objekt-Autocompleter  

    // var tempfilelocalstorage = this.cookieService.get('currentUser');
    //  if (tempfilelocalstorage){
    //  let currentUserstring = atob(tempfilelocalstorage);
    //  let userjson = JSON.parse(currentUserstring)
 
    //  this.licensedModules  = userjson[0].berecht;
    //  this.currentUser      = userjson[0].LoginVorname; 
     
    //  for (var i = 0; i < this.licensedModules.length; i++) {
    //    if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
    //      this.licensedModules.splice(i,1);         
    //      i--;
    //    }
    //  }
     
    //  console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
    //  if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + appModules.find(x => x.shorthand == this.licensedModules[0]).route);
    //  if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
    //  if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    //  //["PRWF","PRAU","WECR","WIKU","WIVM","WIAU","WIVE","WIAP","WMEM","WIOB","WIOS","WEAU","WIOF"
    //  }
    //  this.lastAppModule = sessionStorage.getItem('lastmodule');
      
  }
  
  // Funktionen Objekt-Autocompleter
    
    objektDisplayFn(value: any): string {
      
      console.log("objektDisplayFn, val:" + value);
      
      return value && typeof value === 'object' ? value.obj_bezeichnung : value;
      
    }
    
  
    filterObjekte(val: string) {
      
      if (val) {
        
        const filterValue = val.toLowerCase();
        
        console.log("filterValue: " + filterValue);
        console.log("filtered: " + JSON.stringify(this.objektdata.filter(pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue))));
        
        return this.objektdata.filter(pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue));
        //return this.objektdata.filter((pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue)) || (pTitel => pTitel.objekt.toLowerCase().startsWith(filterValue)));
        //return this.objektdata.filter((pTitel => pTitel.objekt.toLowerCase().startsWith(filterValue)) || (pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue)));
      }
      
      return this.objektdata;
    }
  
  // Ende Funktionen Objekt-Autocompleter
  
 
  // Scroll detector
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){

    const div_druckvorschauHeight   = document.getElementById('druckvorschau').offsetHeight;
    // console.log("div_druckvorschauHeight: " + div_druckvorschauHeight);
    
    // const div_formHeight            = $event.srcElement.scrollingElement.clientHeight;
    const div_formHeight            = $event.target.scrollingElement.scrollHeight;
    // console.log("div_formHeight: " + div_formHeight);
    
    // const browser_window_scrollTop  = $event.srcElement.scrollingElement.scrollTop;
    const browser_window_scrollTop  = $event.target.scrollingElement.scrollTop;
    // console.log("browser_window_scrollTop: " + browser_window_scrollTop);

    var div_alignment_spacerHeight  = '';
    let div_alignment_spacer        = document.getElementById('druckvorschau_alignment_spacer');

    div_alignment_spacerHeight      = (browser_window_scrollTop - (div_druckvorschauHeight / div_formHeight * browser_window_scrollTop))  + 'px';
    // console.log("div_alignment_spacerHeight: " + div_alignment_spacerHeight);
    div_alignment_spacer.style.height     = div_alignment_spacerHeight;
    div_alignment_spacer.style.transition = "max-height 1s";
  
    // Anzeigesteuerung Hoverbutton scroll2top  
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 300) {
      this.scroll2topVisible = true;
    } 
    else if (this.scroll2topVisible && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.scroll2topVisible = false; 
    }
    
  }
  
  ngOnInit() {
      
    // Formularinitialisierung
    
    //objekt dropdown initialisieren
    this.objektauswahldropdown();
    
    // Helper-Arrays initialisieren
    this.ausgabevariantendataarray=   [[{}]];
    this.abschlussdataarray       =   [[{}]];
    this.kvariantedataarray       =   [[{}]];
    this.rubrikdataarray          =   [[{}]];                    
    this.urubrikdataarray         =   [[{}]];
    this.werbeformatdataarray     =   [[{}]];
    this.platzierungsdataarray    =   [[{}]];
    this.internetzuschlagsdataarray = [[{}]];
    this.preispositionendataarray =   [[{}]];
    this.erscheinungsdataarray    =   [[{}]];
    
    this.progressbar_visible      =   true;
    //this.testmode                 = false;
    this.intdebug                 =   false;
    this.printTemplateOrientation =   "hoch";
    this.activePrintTemplate      =   "willkommen"; // 'a4-hoch-1'
    // this.activeITOAprintTemplate  = "willkommen";
    // this.objektAutocompleter      = false;
    this.printDokumentAufServer   =   false;
    this.pdfBlobURL               =   "#";
    
    this.verkaufsdokumentStatus   =   "lock_open";
    
    this.openEditing              =   words.openEdit;
    this.lockedEditing            =   words.lockedEdit;
    this.documentIs               =   words.documentIs;
    
    this.previewpaneWidth = Math.floor(this.mainPaneElement.nativeElement.offsetWidth*0.6);
    //this.previewpaneWidth = Math.floor(document.getElementById('mainpane').offsetWidth*0.6);
    // this.previewpaneWidth = Math.floor(document.getElementById('mainpane').offsetWidth/2);
    console.log("previewpaneWidth: " + this.previewpaneWidth);
    
    // Initialisierung Preview-Sichtbarkeitssteuerung
    this.hidePreview = false;
    
    // Start: Routing-Abfrage [URL-Parameter] queryParams
    this.urlparams = this.route.params.subscribe(params => {
    // this.urlparams = this.route.queryParams.subscribe(params => {
      
      // Start Erkennung Laufzeitumgebung    
      
      this.instanz    = this.cleanupParams(params['instanz']);
      if (this.instanz==="") this.instanz = window.location.href;
      // if (this.instanz==="") this.instanz = window.location.hostname;
      console.log("Instanz = " + this.instanz);
      console.log("Verwendete App-URL: " + window.location.href);

      // RegEx für Instanz-Erkennung
      var regularExpression_testHosts = /(c9users.io)|(185.5)|(edp-entw)/gi; 
      // var regularExpression_instanz = /RESTService-*([^]*)\-LP/gi;
      
      // console.log("RegEx-Test testHosts: " + this.instanz.search(regularExpression_testHosts));
      
      // var myString = "https://10.151.200.100:8980/RESTService-edp-entw-LP/Server";
      // var myRegexp = /RESTService-*([^]*)\-LP/gi;
      // var match = myRegexp.exec(myString);
      // console.log("Capture Group 1: ", match[1]);
      
      
      // Instanzdata aufbauen -------------
      
      // Defaults für edp oder unbekannte Laufzeitumgebungen
      this.instanzdata  = {
        instanz: "edp-entw",
        firmenbezeichnung: "Firma",
        fusszeile: "<b>Firma</b> | Strasse | 0000 Ort | Fon 000 000 00 00 | info@domain.ch | www.domain.ch",
        linkTarget: "_blank",
        vorlagen: [
          {value: 'a4-hoch-1', bezeichnung: 'A4 hoch 1'},
          {value: 'a4-quer-1', bezeichnung: 'A4 quer 1'}
          // ,
          // {value: 'a4-hoch-freeform', bezeichnung: 'A4 hoch freeform'}
        ],
        startVorlage: "a4-hoch-1",
        defaultBuchungsartErscheinung: "A",
        defaultWerbeformatFarbanz: "4",
        defaultEMailText: ""
      };
      console.log("this.instanzdata.defaultBuchungsartErscheinung (per Code-Default ***): ",this.instanzdata.defaultBuchungsartErscheinung);

      // aktuelle Daten aus Backoffice holen und Defaults aktualisieren
      this.offerteshowService.restGetInstanzdata().subscribe(farosinstanzdata => {
        console.log("this.instanzdata (nach Zuweisung ***): ",this.instanzdata);
          this.instanzdata = eval(farosinstanzdata.tt_getinstanzdata[0].textfeld)[0];
          console.log("this.instanzdata (nach Zuweisung ***): ",this.instanzdata);
          
          // Defaults in meinVerkaufsdokumentFormular einpatchen, falls neue Offerte erstellt wird (nicht jedoch wenn bestehende Offerte geladen wird)
          if ((this.cleanupParams(params['aufnr'])==='') && (this.cleanupParams(params['OpportunityId'])==='')) {
            
            // Herausschälen der benötigten FormControls/-Arrays
            const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
            const einzeltitel = <FormGroup> helper_titel.at(0);
            const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
            const einzelwerbemittel = <FormGroup> helper_werbemittel.at(0);

            console.log("helper_titel", helper_titel);



            einzelwerbemittel.controls.buchungsartErscheinung.patchValue(this.instanzdata.defaultBuchungsartErscheinung);
            einzelwerbemittel.controls.werbeformatFarbanz.patchValue(this.instanzdata.defaultWerbeformatFarbanz);
            console.log("this.instanzdata.defaultBuchungsartErscheinung (per Backoffice-Default ***): ",this.instanzdata.defaultBuchungsartErscheinung);
            console.log("this.instanzdata.defaultWerbeformatFarbanz (per Backoffice-Default ***): ",this.instanzdata.defaultWerbeformatFarbanz);
            console.log("this.instanzdata.defaultEMailText (per Backoffice-Default ***): ",this.instanzdata.defaultEMailText);
          }
      }, err => {
        console.log("ACHTUNG: Fehler beim Hohlen der Backoffice-Defaults (instanzdata)");
        console.error(err);
      });
      // ENDE Instanzdata aufbauen --------

      // if (this.instanz.search(regularExpression_testHosts) >= 0 ) { 
      //   this.instanz = "edp-entw";
      // }
      console.log("Instanz = " + this.instanz);

      // Ende Erkennung Laufzeitumgebung
      
     //  console.log("Aufruf Offertmodul, Übergabe-Parameter: " + this.route.queryParams);
      //console.log("Aufruf Offertmodul, Übergabe-Parameter: " + JSON.stringify(params));
      // console.log("Aufruf Offertmodul, amasys_offerte_neu_laden: " + amasys_offerte_neu_laden);
      
      // string um zurück zu agendaitems gehen zu können
      let agendadaten = {rapnr:params.rapnr, kunde:params.beznr, beznr:params.beznr};
       this.backtoagendadata = JSON.stringify(agendadaten);
       
      // Inititalisierung der Formularstruktur zum Start
      this.meinVerkaufsdokumentFormular = this._fb.group({
        systemfeedback: [''],
        dokumentsprache: ['d'],
        guisprache: ['d'],
        // termid: [''],
        termid: [this.cleanupParams(params['termid'])],
        // firma: [''],
        firma: [this.cleanupParams(params['firma'])],
        // aufnr: ['0'],                                   
        aufnr: [this.cleanupParams(params['aufnr'])],                                   
        abgeschlossen: [false],
        fremdID: [this.cleanupParams(params['OpportunityId'])],
        kundBeznr: [this.cleanupParams(params['beznr'])],
        // bestBeznr: [''],
        bestBeznr: [this.cleanupParams(params['termKontaktBeznr'])],
        bestName: [''],
        bestOrt: [''],
        bestZustaendiger: [''],
        vermzustBeznr: [this.cleanupParams(params['agenturbeznr'])],
        sujet: [this.cleanupParams(params['sujet']), [Validators.required, Validators.minLength(5)]],
        currency: ['CHF'],
        preisUser: [0],
        preisAmasys: [0],
        bestadr1: [''],
        bestadr2: [''],
        bestadr3: [''],
        bestadr4: [''],
        bestadr5: [''],
        bestadr6: [''],
        bestadr7: [''],
        bestadr8: [''],
        bestadr9: [''],
        bestemail: [''],
        vermzustemail: [''],
        indivAnrede: [''],
        indivEinleitungstext: [''],
        indivSchlusssatz: [''],
        vermname: [''],
        // ausstelldatum: [''],
         ausstelldatum: [new Date().toISOString().split('T')[0]],
        tarifabdatum: [new Date().toISOString().split('T')[0]],
        // gebvertr: [''],
        gebvertr: [this.cleanupParams(params['termmitbeznr'])],
        verfasser1: [''],
        verfasser1funktion: [''],
        verfasser1tel: [''],
        verfasser1mail: [''],
        chiffre: [false],
        titel: this._fb.array([
            this.initTitel(this.cleanupParams(params['objekt']), this.cleanupParams(params['rubrik']), this.cleanupParams(params['urubrik'])),
        ])
      });
      
      // Wurde Parameter zur Sichtbarkeitssteuerung des Preview-Bereichs übergeben?
      if (this.cleanupParams(params['hidePreview']) === 'true') {
        this.hidePreview = true;
        
        // Standard-Template (startVorlage) zuweisen 27.09.2017/RPS
        this.activePrintTemplate = this.instanzdata.startVorlage;
        this.onTemplateChange();
        
      }
      
      // Wurde Debug-Parameter übergeben oder laufen wir in der edp-Testinstanz?
      if ((this.cleanupParams(params['intdebug']) === 'true') || (this.instanz.search(regularExpression_testHosts) >= 0 )) {
        this.intdebug = true;
      }
      
      if ((this.cleanupParams(params['aufnr'])!='') || (this.cleanupParams(params['OpportunityId'])!='')) {
        // aufnr vorhanden und/oder OpportunityId/fremdID -> versuche bestehende Offerte zu laden
        //      oder (wenn nur unbekannte OpportunityId vorhanden) erzeuge neue Offerte
        
        console.log('@@@@@@ Neu laden @@@@@');
        this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, true);
      }
      else {
        // neue Offerte wird erstellt
        
        if ((this.cleanupParams(params['objekt'])==='') && (this.cleanupParams(params['hidePreview']) != 'true')) {
          // Objekt noch nicht festgelegt -> Auswahl zwingend, ausser mit hidePreview
          this.openObjektAuswahlDialog(0);  
        }
        else {
          
          // aktuelle Daten aus Backoffice holen und Defaults aktualisieren
          this.offerteshowService.restGetInstanzdata().subscribe(farosinstanzdata => {
              
              this.instanzdata = eval(farosinstanzdata.tt_getinstanzdata[0].textfeld)[0];
              console.log("this.instanzdata (nach Zuweisung ***): ",this.instanzdata);
              
              // Herausschälen der benötigten FormControls/-Arrays
              const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
              const einzeltitel = <FormGroup> helper_titel.at(0);
              const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
              const einzelwerbemittel = <FormGroup> helper_werbemittel.at(0);
              
              einzelwerbemittel.controls.buchungsartErscheinung.patchValue(this.instanzdata.defaultBuchungsartErscheinung);
              console.log("this.instanzdata.defaultBuchungsartErscheinung (per Backoffice-Default ***): ",this.instanzdata.defaultBuchungsartErscheinung);
            
              // Objekt ist festgelegt, Abgleich kann erfolgen im Sinne eines "Syncs"
              this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
              // this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, amasys_offerte_neu_laden);
                
              
          }, err => {
            console.log("ACHTUNG: Fehler beim Hohlen der Backoffice-Defaults (instanzdata)");
            console.error(err);
          });
          
        }
        
        
      }
      
      /*
      // Wenn neue Offerte und kein Titel gewählt -> auswählen lassen
      if ((this.cleanupParams(params['aufnr'])=='') && (this.cleanupParams(params['objekt'])=='')) {
        this.openObjektAuswahlDialog(0);
      }
      else {
        // Neue Erst-Initialisierung oder Laden einer bestehenden Offerte
        console.log('amasys_offerte_neu_laden: ' + amasys_offerte_neu_laden);
        this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, amasys_offerte_neu_laden);
      }
      */
      
      // Willkommenscreen bei Bedarf ausblenden
      setTimeout(() => {
        if ((this.instanzdata.startVorlage != 'willkommen') && (this.activePrintTemplate == 'willkommen')) {
          this.activePrintTemplate = this.instanzdata.startVorlage;
          this.onTemplateChange();
        }
      },15000);
      
      
    }); // Ende: Routing-Abfrage [URL-Parameter]
    

    // this.filteredVermittler = this.meinVerkaufsdokumentFormular.get('vermname').valueChanges
    //     .pipe(
    //         debounceTime(300),
    //         switchMap(value => this.adrvermittlerService.showvermittler(value))
    //
    //     );

  } // Ende OnInit

  displayFn(vermittler: any) {
    console.log("displayverm", vermittler)
    if (vermittler) {
      // let tempcontroll = this.meinVerkaufsdokumentFormular.get('vermname') as FormGroup;
      //  console.log('tempcontroll', this.meinVerkaufsdokumentFormular.controls.vermname.value);
      // this.meinVerkaufsdokumentFormular.controls['vermname'].patchValue(vermittler.anzeigename);
      //   this.meinVerkaufsdokumentFormular.get['vermzustBeznr'].patchValue(vermittler.bbeznr, {onlySelf: true});
     //this.meinVerkaufsdokumentFormular.controls.vermzustBeznr.patchValue(vermittler.bbeznr);

      return vermittler;
    }

    return vermittler;
  }

  public getVermittler(event) {
    if (event.length >= 2) {
      this.adrvermittlerService.showvermittler(event)
          .subscribe(temp => {
            //console.log('filteredVermittler', temp);
            this.filteredVermittler = temp;
          });
    }
  }

  public vermitterAuswahl(val) {
    console.log('vermitterAuswahl', val);
    this.meinVerkaufsdokumentFormular.controls.vermzustBeznr.patchValue(val.bbeznr.toString());
  }

  public  agenturnameChange(event){
    console.log("event",event);
    if(event.length >= 2){
      this.adrvermittlerService.showvermittler(event)
          .subscribe(kunde => {
            this.options = kunde;
             console.log("kunde",this.options);
           // this.meinVerkaufsdokumentFormular.patchValue({vermname: })
          }, err => {
            console.error(err);
          });
    }

  }
  public agenturselected(val) {
    console.log("kuvermnamende",val);
    this.meinVerkaufsdokumentFormular.controls.vermname.patchValue(val.anzeigename);
    this.meinVerkaufsdokumentFormular.controls.vermzustBeznr.patchValue(val.bbeznr);

    //this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
  }

 public sichtchange(val){
      console.log("sichtchange", val);
      this.sicht = val;
      console.log("this.sicht",this.sicht);
  }
 // -----------------------------------------------------
 
 
 scroll2top() { 
   (function smoothscroll() { 
     var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
    
  } 
 
 // -----------------------------------------------------
 
 public changeChiffre(event){
    //console.log('changeChiffre', event);
    if (event.checked === false) {

      const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
      const einzeltitel = <FormGroup> helper_titel.at(0);
      const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
      const einzelwerbemittel = <FormGroup> helper_werbemittel.at(0);
      const helper_preispositionen = <FormArray> einzelwerbemittel.controls['zusatzpreispositionen'];
      for (let item of helper_preispositionen.value) {
        if (item.bezeichnung === 'Chiffre-Zuschlag') {
          console.log('ChiffreItem', helper_preispositionen);
           helper_preispositionen.removeAt(0);
        }
      }

      //console.log('changeChiffre', helper_preispositionen);
    }
 }
 
  
  
  
  // Helperfunktionen
  // ================
  
  createPdfFilename(sujet: string) {
    return sujet.replace(/\s+/g, '-') + '.pdf';
    // return sujet.replace(/\s+/g, '-').toLowerCase() + '.pdf';
  }
  
  
  logJSON2console() {
    console.log('Aktuelle JSON-Struktur WebApp:',this.meinVerkaufsdokumentFormular.value);
  }
  
  
  extractFreeformHTMLcode() {
    
    let freeFormHTMLcode: string ="";

    freeFormHTMLcode += document.getElementById('header').outerHTML;
    freeFormHTMLcode += '<div id="userHTML" class="print-element a4-hoch-freeform" _ngcontent-c1="">';
    // freeFormHTMLcode += '<div class="print-element a4-hoch-freeform" _ngcontent-c1="">';
    freeFormHTMLcode += document.getElementsByClassName('fr-element fr-view')[0].innerHTML;
    freeFormHTMLcode += '</div>';
    freeFormHTMLcode += document.getElementById('footer').outerHTML;

    return freeFormHTMLcode;
  }
  
  
  initializeFreeFormHTMLcode(amasysdata, amasysHTMLdata = "") {
  // Initialisierung des Contents der Freeform-Vorlage a4-hoch-freeform mit Werten aus amasys
    
    let initialFreeFormHTMLcode: string ='';
    
    // Adresse
    initialFreeFormHTMLcode = '<p>' + amasysdata.bestadr1 + '<br>'
    + amasysdata.bestadr2 + '<br>'
    + amasysdata.bestadr3 + '<br>'
    + amasysdata.bestadr4 + '<br>'
    + amasysdata.bestadr5 + '<br>'
    + amasysdata.bestadr6 + '<br>'
    + amasysdata.bestadr7 + '<br>'
    + amasysdata.bestadr8 + '<br>'
    + amasysdata.bestadr9 + '<br></p>';
    
    // aktuelles Datum generieren
    var displayDate = new Date().toLocaleDateString();
    initialFreeFormHTMLcode += '<p>' + displayDate  + '<br></p><div id="tbheader"></div>';

    // Anrede aus Amasys
    initialFreeFormHTMLcode += '<p>' + amasysdata.indivAnrede + '<br><br><br>';
    
    // Einleitungstext aus Amasys
    initialFreeFormHTMLcode += amasysdata.indivEinleitungstext + '<br></p>';
   
    // ****** Angebotstabelle *******
    if (amasysdata.titel) { // Titel gefunden, mit diesem arbeiten
      // Titelkopf
      initialFreeFormHTMLcode += '<table style="width: 70%;"><tbody>'
      + '<tr><td style="width: 50.0000%;">' + words.title + ':</td><td style="width: 50.0000%;">' + amasysdata.titel[0].objBezeichnung + '</td></tr>'
      // + '<tr><td style="width: 50.0000%;">Auflage:</td><td style="width: 50.0000%;">' + amasysdata.titel[0].auflage + ' Exemplare</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.edition + ':</td><td style="width: 50.0000%;">' + amasysdata.titel[0].werbemittel[0].auflage + ' ' + words.exemplar + '</td></tr>'
      
      // Werbemittel
      + '<tr><td style="width: 50.0000%;">' + words.yourAd + ':</td><td style="width: 50.0000%;">&nbsp</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.basicCharge + '</td><td style="width: 50.0000%;">CHF </td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.sumPrice + ':</td><td style="width: 50.0000%;">CHF ' + words.woMwSt + '</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.special + ':</td><td style="width: 50.0000%;"></td></tr>'
      + '</tbody></table>';
    }
    else { // kein Titel aufgefunden, Dummy-Titel erstellen
      // Titelkopf
      initialFreeFormHTMLcode += '<table style="width: 70%;"><tbody>'
      + '<tr><td style="width: 50.0000%;">' + words.title + '</td><td style="width: 50.0000%;">&nbsp;</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.auflage + '</td><td style="width: 50.0000%;"> ' + words.exemplar + '</td></tr>'
      
      // Werbemittel
      + '<tr><td style="width: 50.0000%;">' + words.yourAd + '</td><td style="width: 50.0000%;">&nbsp</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.basicCharge + '</td><td style="width: 50.0000%;">CHF </td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.sumPrice + '</td><td style="width: 50.0000%;">CHF ' + words.woMwSt + '</td></tr>'
      + '<tr><td style="width: 50.0000%;">' + words.special + '</td><td style="width: 50.0000%;"></td></tr>'
      + '</tbody></table>';
    }
    
    // Schlusstext aus Amasys
    initialFreeFormHTMLcode += '<p><br><br>' + amasysdata.indivSchlusssatz + '<br><br>';
    
    // Unterschriften
    initialFreeFormHTMLcode += '<br>' + words.salutation + '<br>'
    + '<b>' + this.instanzdata.firmenbezeichnung + '</b>'
    + '<br><br><br>'
    + amasysdata.verfasser1 + '<br>'
    + amasysdata.verfasser1funktion + '</p>';
    
    // console.log(initialFreeFormHTMLcode);
    return initialFreeFormHTMLcode;
  }
  
  
  // public options: Object = {
  //   charCounterCount: false,
  //   toolbarInline: true,
  //   toolbarButtons: ['bold', 'italic', 'underline', '|', 'fontSize', 'color', 'paragraphStyle', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertTable', 'specialCharacters', 'insertHR', '|', 'clearFormatting', 'undo', 'redo'],
  //   language: 'de',
  //   key: 'xC6B4G5D3iB3B9A6C7C2C4A4H3G3C2C-22NGNb1IODMGYNSFKV==',
  //   tableResizerOffset: 10,
  //   tableResizingLimit: 50
  // }
  
  
  public openObjektAuswahlDialog(titelindex:number) {
    
    // Alle Aktivitäten in setTimeout einbinden, damit kein ExpressionChangedAfterItHasBeenCheckedError auftritt
    // https://github.com/angular/material2/issues/5268
    // auftretend ab angular 4.2.x und material beta 7
    setTimeout(() => {

      // Dialog öffnen
      let dialogRef = this.objektDialog.open(DialogObjektAuswahlDialog);

      // Herausschälen der benötigten FormControls/-Arrays
      const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
      const einzeltitel = <FormGroup> helper_titel.at(titelindex);
      // console.log("einzeltitel [" + titelindex + "]: " + einzeltitel);
      
      dialogRef.afterClosed()
        .subscribe(selection => {
          if (selection) {
            
            // console.log("Selection: " + selection);
            
            this.selectedObjekt = JSON.parse(selection);
            
            //this.selectedObjekt = selection;
            console.log("selectedObjekt: " + this.selectedObjekt[0]);
            console.log("selectedObjekt (stringified): " + JSON.stringify(this.selectedObjekt));
            // console.log("selectedObjekt (objekt): " + this.selectedObjekt['objekt']);
            console.log("selectedObjekt (objekt): " + this.selectedObjekt[0].objekt);
            // console.log("titel [" + titelindex + "] wird upgedatet");
            
            
            // objekt-Angaben in den Datenstrukturen setzen
            einzeltitel.controls.objekt.patchValue(this.selectedObjekt[0].objekt);
            einzeltitel.controls.objBezeichnung.patchValue(this.selectedObjekt[0].obj_bezeichnung);
            // einzeltitel.controls.objBezeichnung.disable();
            
            // Ur-Abgleich mit amasys, wenn es der erste Titel einer Offerte ist
            // if (titelindex==0) this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
            
            // Abgleich mit amasys - wenn Stammdaten entsprechend hinterlegt, werden Defaults gelesen, ansonsten erscheint Fehlermeldung 
            this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
            
            // DropDowns (Rubrik und Urubrik) updaten lassen
            this.rubrikAuswahlDropdown2(einzeltitel.controls.objBezeichnung.value,titelindex);
            this.urubrikAuswahlDropdown2(einzeltitel.controls.objBezeichnung.value,einzeltitel.controls.rubrik.value,titelindex);
            this.ausgabevariantenAuswahlDropdown(einzeltitel.controls.objBezeichnung.value,titelindex);
            
          } else {
            console.log("Objektauswahl-Dialog: nichts gewählt.");
            // User clicked 'Cancel' or clicked outside the dialog
          }
        });
    }); // Ende setTimeout
  }


  onTemplateChange() {
    
    // pdfBlobURL zerstören, da es zuerst neu generiert werden muss
    this.pdfBlobURL = "#";
    
    // Ausrichtung des Templates anhand des TabLabels auslesen
    this.printTemplateOrientation = (this.activePrintTemplate.indexOf("quer")>-1) ? "quer" : "hoch";
    
    // console.log("Aktives Template (raw): " + this.activePrintTemplate);
    // console.log("printTemplateOrientation: " + this.printTemplateOrientation);
    
    
    // Beginn Auto-Scaling
    let previewScaleFactor:number = 1;
    
    // Scalen nur wenn nicht freeform Template; bei freeform Template darf nicht gescalet werden, da sonst das Tabellen Resizing nicht mehr funktioniert
    if ((this.activePrintTemplate.indexOf('freeform')<0) && (!this.hidePreview)) {
      if (this.printTemplateOrientation ==="quer") {
        previewScaleFactor = this.previewpaneWidth / 1200;  // 1200px Breite (inkl. Rand) des Templatesmit Ausrichtung "quer" in Pixeln (war 1120)
      }
      else {
        previewScaleFactor = this.previewpaneWidth / 810;  // 792 = Breite des Templates mit Ausrichtung "hoch" in Pixeln
        if (previewScaleFactor>1) previewScaleFactor = 1;
      }
    
    
      console.log("previewScaleFactor: = " + previewScaleFactor);
      
      setTimeout(() => {
        console.log('############### Scaling #############');
        
        if(document.getElementById('druckvorschau')){
          document.getElementById('druckvorschau').style.transform = "scale("+previewScaleFactor+")";
        }
        
        console.log('##########################******************* Super Selector: ' + 'app-' + this.activePrintTemplate + '>#druckvorschau');
        // Allenfalls neue Methode, Template-bezogen
        // document.querySelector('app-' + this.activePrintTemplate + '>#druckvorschau').style.transform = "scale("+previewScaleFactor+")";
        // console.log(document.querySelector('app-' + this.activePrintTemplate + '>#druckvorschau'));
        
      },1000); // mit einer Sekunde Verzögerung ist Preview aufgebaut und div id="druckvorschau" ansteuerbar 
    }
  }
  
  
  removeRow(array, indexI) {
  
    console.log("Array to be truncated: " + JSON.stringify(array));
    console.log("length of array before removing row: " + array.length);
    array = array.slice(0); // make copy
    array.splice(indexI, 1);
    console.log("length of array after removing row: " + array.length);
    return array;
  
  }
  
  cleanupParams(param: string) {
    
    var ret_param: string;
    
    // Test, ob Parameter vorhanden, falls ja diesen Wert zurückgeben, ansonsten leeren String
    if (param) ret_param=param;
    else ret_param = "";
    
    return ret_param;
    
  }

  // Hotkeys
  keyDown($event) {
    
    if ($event.altKey && $event.keyCode == 80) {
        console.log('WOFA-Druckfunktion gestartet');
        // this.print();
    }

    // Bei 'Ctrl + P'
    if ($event.ctrlKey && $event.keyCode == 80) {
        console.log('Browsereigene Print-Funktion aufgerufen -> Hinweis an Benutzer');
        alert(words.printWarning);
    }

    // Bei 'Alt + A'
    if ($event.altKey && $event.keyCode == 65) {
        this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
    }
  }

  
  async multiprint(clientside:boolean, aufnr:string, abschliessen: boolean, server_pdf_action?: string) {
  
    // server_pdf_action: none            keine Aktion
    //                    save            Layout-Daten auf Server speichern -> PDF generieren
    //                    saveandfinalize Layout-Daten auf Server speichern -> PDF generieren -> Auftrag abschliessen
    //                    saveandshow     Layout-Daten auf Server speichern -> PDF generieren -> PDF herunterladen und anzeigen
     
    
    console.log('MultiPrint-Funktion gestartet, Ausgabe clientseitig? ' + clientside);
    console.log('MultiPrint-Funktion gestartet, aufnr: ' + aufnr);
    console.log('MultiPrint-Funktion gestartet, abschliessen?: ' + abschliessen);
    console.log('MultiPrint-Funktion gestartet, server_pdf_action: ' + server_pdf_action);
    
    // Initialisierung
    let printWindow;
    let printContent;
    let printStyles = "";
    let page_def;
    let printPageStyles = "";
    let printPageSource = "";

    let offerteFinalisieren = "no";
    if (abschliessen) offerteFinalisieren = "yes";
    
    // Seitendefinitionen
    //var printPageHeight = 1120; 03.10.2017 DL anpassung höhe
    const page_def_hoch = `
      var printPageWidth = 792;
      var printPageHeight = 1040;
      var pageMarginTop = 29;
      var pageMarginRight = 100;
      var pageMarginBottom = 29;
      var pageMarginLeft = 100;
      var pageOrientation = 'portrait';
      `;
    
    const page_def_quer = `
      var printPageWidth = 1116;
      var printPageHeight = 792; // 755 
      var pageMarginTop = 29;
      var pageMarginRight = 29;
      var pageMarginBottom = 0;//-50
      var pageMarginLeft = 29;
      var pageOrientation = 'landscape';
      `;
      
    const pageStylesClientside = `
          '@page {'
          + 'margin-top: ' + pageMarginTop + 'px;'
          + 'margin-right: ' + pageMarginRight + 'px;'
          + 'margin-bottom: ' + pageMarginBottom + 'px;'
          + 'margin-left: ' + pageMarginLeft + 'px;'
          + 'size: ' + pageOrientation + ';'
          + '}'
          // Alle margins werden entfernt
          + '*{margin: 0px !important;}';
    `
    
    const pageStylesServerside = `
          '@page {'
          + 'margin-top: ' + pageMarginTop + 'px;'
          + 'margin-right: ' + pageMarginRight + 'px;'
          + 'margin-bottom: ' + pageMarginBottom + 'px;'
          + 'margin-left: ' + pageMarginLeft + 'px;'
          + 'size:' + pageOrientation + ';'
          + '}'
          // Alle margins werden entfernt 02.10.2017 A4 entfernt DL
          + '*{margin: 0px !important;}'
          + '.footer {bottom: 0!important;}';
    `
    const pageStylesServersidehoch = `
          '@page {'
          + 'margin-top: ' + pageMarginTop + 'px;'
          + 'margin-right: ' + pageMarginRight + 'px;'
          + 'margin-bottom: ' + pageMarginBottom + 'px;'
          + 'margin-left: ' + pageMarginLeft + 'px;'
          + 'size: A4' + pageOrientation + ';'
          + '}'
          // Alle margins werden entfernt 02.10.2017 A4 entfernt DL
          + '*{margin: 0px !important;}'
          + '.footer {bottom: 0!important;}';
    `
    
    // Besondere Page Styles für Rendering bestimmen und zuweisen
    if (clientside) {
      printPageStyles = pageStylesClientside;
    }
    else {
      printPageStyles = pageStylesServerside;
    }
    // console.log('printPageStyles: ' + printPageStyles);
    
    // Stylesheet aus Template-Komponente muss neuem Printfenster angehängt werden,
    // daher wird dieses aus dem Dokumenten-Header extrahiert und später im neuen
    // Print-Dokument wiederum angehängt
    let head = document.getElementsByTagName('head')[0];
    let allStyleSheets = head.getElementsByTagName('style');
    let styleSheet;
    
    console.log("Aktives Print-Template im Druckaufbereitungsprozess: " + this.activePrintTemplate);
    
    // Loop über alle gefundenen StyleSheets; Test, ob StyleSheet zum aktuell ausgewählten (Print-) Template passt
    // [im zugehörigen StyleSheet muss zu diesem Zweck am Anfang eine passende Regel hinterlegt werden]
    for (var j in allStyleSheets){
      
    	styleSheet = allStyleSheets[j].outerHTML;   // nimm komplettes Stylesheet
    	
    	if (styleSheet && (styleSheet.indexOf(this.activePrintTemplate)>-1)) {  // ist Kennung auffindbar (könnte bei Bedarf verschnellert werden, wenn nur die ersten 30 Zeichen [Substring von StyleSheet] geprüft würden)
    	  printStyles = styleSheet;                 // gefundenes StyleSheet zur Weiterverwendung der Variable printStyles zuweisen
    	  break;                                    // Stylesheet gefunden, Loop kann abgebrochen werden
    	}
    }
  
    // Sanitizing Stylesheet
    // console.log('PrintStyles before sanitizing:', printStyles);
    printStyles = printStyles.replace(/(_ngcontent-c\d+="")|(\[_ngcontent-c\d+\])/g, '');
     //console.log('PrintStyles after sanitizing:', printStyles);

    
    // Seitendefinitionen gemäss Seitenausrichtung hoch | quer
    if (this.printTemplateOrientation === 'hoch') {
      // Hochformat
      page_def = page_def_hoch;
      printPageStyles = pageStylesServersidehoch;
    }
    else {
      // Querformat
      page_def = page_def_quer;
      printPageStyles = pageStylesServerside;
      console.log("printPageStyles",printPageStyles);
    }
    
    // eigentlichen Dokumenteninhalt aus Template-Vorschau von WebApp extrahieren
    if (this.activePrintTemplate.indexOf('freeform')>-1) {
      console.log("FreeForm-Source-Aufbereitung");
      printContent = this.extractFreeformHTMLcode();
      // console.log('freeformsource',printContent);
    }
    else {
      console.log("ProcessOrientated-Source-Aufbereitung");
      printContent = document.getElementById('druckvorschau').innerHTML;
      // console.log('structuredformsource',printContent);
    }

    // Sanitizing printContent
    // console.log('printContent before sanitizing:', printContent);
    printContent = printContent.replace(/(_ngcontent-c\d+="")|(\[_ngcontent-c\d+\])/g, '');
    // console.log('printContent after sanitizing:', printContent);

    
    // printContent = document.getElementById('druckvorschau').innerHTML;
    
    // Source des neuen Dokuments aufbauen
    printPageSource = `
          <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Offerte-${aufnr}</title>
          
          ${printStyles}
        </head>
        <body>
          ${printContent}

          <script>
            console.log('print window generator gestartet');

            // page_defs einfügen gemäss Definition entsprechend Seitenausrichtung
            ${page_def}
      
            
            // Bedruckbarer Bereich wird berechnet:
                  var pageWidth = printPageWidth - pageMarginLeft - pageMarginRight;
                  console.log('pageWidth: ' + pageWidth);
                  
                  var pageHeight = printPageHeight - pageMarginTop - pageMarginBottom;
                  console.log('pageHeight: ' + pageHeight);
            
            // Abstände der Print-Page werden in Style-Anweisung integriert und dem Header hinzugefügt
                  var pageStyle = document.createElement('style');
                  document.head.appendChild(pageStyle);
            
            // pageStyle-Aufbereitung ******
            pageStyle.innerHTML =
            
          '@page {'
          + 'margin: 0;'
          // 10.04.2018 A4 enfernt FP
          + 'size: ' + pageOrientation + ';'
          + '}'
          
          // neue Margin-Methode ab Chrome 66
          'body {'
          + 'margin-top: ' + pageMarginTop + 'px;'
          + 'margin-right: ' + pageMarginRight + 'px;'
          + 'margin-bottom: ' + pageMarginBottom + 'px;'
          + 'margin-left: ' + pageMarginLeft + 'px;'
          + '}'
          
          // Alle margins werden entfernt 02.10.2017 A4 entfernt DL
          // + '*{margin: 0px !important;}'
          + '.footer {bottom: 0!important;}';

            // Absolute bedruckbare Breite wird gesetzt:
            document.body.style.width = pageWidth + 'px';
            
            // Padding wird gesetzt (ab Chrome 66)
            if (pageOrientation === 'portrait') {
		        document.body.style.paddingLeft = '100px';
		        document.body.style.paddingRight = '100px';
            }
            if (pageOrientation === 'landscape') {
		        document.body.style.paddingLeft = '29px';
		        document.body.style.paddingRight = '29px';
            }

            // etwas Warten bis alles gerendert
            var t = setTimeout(function(){console.log("verzoegerung 2s");},2000);

            // Wiederkehrende Seitenelemente werden ausgelesen und zugewiesen
                  var headerTemplate = document.getElementById('header');
                  // var t = setTimeout(function(){console.log("verzoegerung 1s");},2000);
                  var footerTemplate = document.getElementById('footer');
                  var offerttabelleheaderTemplate = document.getElementById('tbheader');
                  var headerHeight;
                  var tbheaderhoehe;
                  var footerHeight;
                  

            // START: Höhe der wiederkehrenden Seitenelemente (Repeater) werden ausgelesen/definiert
            // Hinweise:
            // - Margin wird nicht berücksichtigt!
            // - wenn entsprechender Repeater nicht gefunden wird, dann wird seine Höhe auf 0 gesetzt (Definition)
            
                  if (headerTemplate) {
                    headerTemplate.removeAttribute('id');
                    headerTemplate.className = 'header';
                    headerHeight = headerTemplate.offsetHeight;
                  } else {
                    headerHeight = 0;
                  }
                  console.log('headerHeight: ' + headerHeight);
                  
                  // Handling eines TableHeaders
                  if (offerttabelleheaderTemplate) {
                    tbheaderhoehe = offerttabelleheaderTemplate.offsetHeight;
                  }
                  else {
                    tbheaderhoehe = 0;
                  }
                  console.log('tbheaderhoehe: ' + tbheaderhoehe);
      
                  // Handling des Footers
                  if (footerTemplate) {
                    footerTemplate.removeAttribute('id');
                    footerTemplate.className = 'footer';
                    footerHeight = footerTemplate.offsetHeight;
                  } else {
                    footerHeight = 0;
                  }
                  console.log('footerHeight: ' + footerHeight);
            
            // ENDE: Höhe der wiederkehrenden Seitenelemente werden ausgelesen/definiert
            
            
            // Absolute bedruckbare Höhe pro Seite (ohne Header & Footer) wird berechnet
            // Tableheader wird NICHT abgezogen, da nicht zwingend auf jeder Seite vorhanden
            var pagedContentHeight = pageHeight - headerHeight - footerHeight;
            console.log('pagedContentHeight: ' + pagedContentHeight);


            // Holt alle Elemente der Klasse 'print-element'
            var printElements = document.getElementsByClassName('print-element');


            // Variablendefinition und -initialisierung vor der grossen Schleife
                  
                  var height = 0;
                  console.log('height: ' + height);
                  
                  var page = 1;
                  console.log('page: ' + page);
      
                  var pagedPrintElements = [];
                  var pagedContent = [];


            // Wir starten mit dem Befüllen des pagedContent-Arrays ====================================
            // =========================================================================================
            
            
            // Fügt Header (falls vorhanden)mit allfälliger Seitennummer hinzu
            if (headerHeight > 0) {
              var header = headerTemplate.cloneNode(true);
              
              // Fügt aktuelle Seitenzahl jedem Element mit der Klasse 'page-number' hinzu
              var pageNumber = header.getElementsByClassName('page-number');
              for (var pn = 0; pn < pageNumber.length; pn++) {
                pageNumber[pn].innerHTML = page;
              }
              pagedContent.push(header);
            }


            // Hauptschleife über alle aufgefundenen Elemente, die zu drucken sind bzw. ins PDF gehören
            // ========================================================================================
            for (var i = 0; i <= printElements.length; i++) {
              
              console.log('printElements[' + i + ']');
              console.log(printElements[i]);

              // Debug-Farbe
              // var color;
              
              if (printElements[i]) { // printElement vorhanden
                    console.log('printElement vorhanden');
              
                    if ((height + printElements[i].offsetHeight >= pagedContentHeight) || (printElements[i].className.indexOf('seitenumbruch') !== -1)) {
                    // Seitenumbruch nötig, entweder aufgrund des Platzbedarfs des aktuellen printElements oder
                    // weil forciert
                    
                      console.log('Handling Seitenumbruch');
                    
                      var spacerHeight = pagedContentHeight - height;
                      console.log('spacerHeight: ' + spacerHeight);
                      console.log('height: ' + height);
                    
                      if (printElements[i].className.indexOf('seitenumbruch') !== -1) {
                        // color = 'green';
                        console.log('@@@@@@@@@@@@@ FORCED PAGEBREAK !!!!!!!!!!!!');
                        
                      }
                      else {
                        // color = 'orange';
                        console.log('@@@@@@@@@@@@@ PAGEBREAK bc of height !!!!!!!!!!!!');
                      }
                      
                      var spacer = document.createElement('div');
                      spacer.className = 'seitenumbruch';
                      spacer.style.width = pageWidth + 'px';
                      spacer.style.height = spacerHeight + 'px';
                      spacer.style.border = '0px';
                      // spacer.style.backgroundColor = color;
                      pagedContent.push(spacer);
                      
                      // Fügt Footer mit allfälliger Seitennummer hinzu
                      if (footerTemplate) {
                        var footer = footerTemplate.cloneNode(true);
    
                        // Fügt aktuelle Seitenzahl jedem Element mit der Klasse 'page-number' hinzu
                        var pageNumber = footer.getElementsByClassName('page-number');
                        
                        for (var pn = 0; pn < pageNumber.length; pn++) {
                            
                          pageNumber[pn].innerHTML = page;
                        }
                        pagedContent.push(footer);
                      }
                      
                      // Nächste Seite vorbereiten (allenfalls noch TODO: wenn printElement nicht letztes Element des Arrays und gleichzeitig Seitenumbruch-Marker ist)
                      if (i < printElements.length-1) {
                        
                          // Seitennummer erhöhen
                          page += 1;
                          console.log('page (erhöht) = ' + page);
                          
                          // height zurücksetzen
                          height = 0;
                        
                          // Fügt Header (falls vorhanden) mit allfälliger Seitennummer hinzu
                          if (headerHeight > 0) {
                          
                            console.log('Header is being added...');
                            var header = headerTemplate.cloneNode(true);
                            
                            // Fügt aktuelle Seitenzahl jedem Element mit der Klasse 'page-number' hinzu
                            var pageNumber = header.getElementsByClassName('page-number');
                            for (var pn = 0; pn < pageNumber.length; pn++) {
                              pageNumber[pn].innerHTML = page;
                            }
                            pagedContent.push(header);
                          }
                          
                          // Fügt Tabellenheader (falls vorhanden bzw. solange innerhalb der Offerttabelle geloopt wird) hinzu
                          if ((printElements[i].className.indexOf('offerttabelle') > -1) || (printElements[i].className.indexOf('seitenumbruch') > -1)) {
                            if (page > 1) {
                              var tabellenheader = offerttabelleheaderTemplate.cloneNode(true);
                              pagedContent.push(tabellenheader);
                            }
                            height += tbheaderhoehe;
                            console.log("repeating OfferttabelleHeader, height (neu) = " + height);
                          }
                      }
                      
                      // aktuelles printElement hinzufügen, wenn es sich nicht
                      // um einen Seitenumbruchmarker handelt
                      if (printElements[i].className.indexOf('seitenumbruch') == -1) {
                        pagedContent.push(printElements[i]);
                        
                        // da neue Seite, beginnt die Zählung der Variable height wieder von neuem
                        height += printElements[i].offsetHeight;
                      }
                      
                      
                    } // Ende Sonderbehandlung Seitenumbruch
                    
                    else { // Handling normales Seitenelement
                      console.log('Handling normales Element');
                      console.log('height (vorher): ' + height);
                      
                      // aktuelles printElement hinzufügen und Variable height erhöhen (letzteres nicht im Falle eines tbheaders)
                      pagedContent.push(printElements[i]);
                      height += printElements[i].offsetHeight;
                      console.log('written: printElements['+i+']');
                      console.log('height (nachher): ' + height);
                    
                      // Specialcase: wir sind auf dem letzten Element -> Seite muss sauber abgeschlossen werden
                      if (i == printElements.length-1) {
                        console.log('Letztes Element der Seite');
                        
                        // Seitenspacer um aufzufüllen
                        var spacerHeight = pagedContentHeight - height;
                        var spacer = document.createElement('div');
                        spacer.className = 'spacer';
                        spacer.style.width = pageWidth + 'px';
                        spacer.style.height = spacerHeight + 'px';
                        // spacer.style.backgroundColor = 'blue';
                        pagedContent.push(spacer);
                        
                        // Fügt Footer mit allfälliger Seitennummer hinzu
                        if (footerTemplate) {
                          var footer = footerTemplate.cloneNode(true);
      
                          // Fügt aktuelle Seitenzahl jedem Element mit der Klasse 'page-number' hinzu
                          var pageNumber = footer.getElementsByClassName('page-number');
                          for (var pn = 0; pn < pageNumber.length; pn++) {
                            pageNumber[pn].innerHTML = page;
                          }
                          pagedContent.push(footer);
                        }
                      } // ENDE Specialcase: wir sind auf dem letzten Element
                    
                      
                    } // Handling normales Seitenelement
                    
              }       // ENDE Main-IF => printElement[i] existiert
            }         // ENDE Hauptschleife über alle aufgefundenen Elemente, die zu drucken sind bzw. ins PDF gehören
            // =======================================================================================================


            // pagedDom wird erstellt
            var pagedDom = document.createElement('div');
            pagedDom.id = "pagedDom";

            // Fügt jedes Element dem pagedDom hinzu
            for (i = 0; i < pagedContent.length; i++) {
              pagedDom.appendChild(pagedContent[i]);
            }

            // Leert den Body
            document.body.innerHTML = '';

            // Fügt den neuen Inhalt ein
            document.body.appendChild(pagedDom);
            
            // Wenn Logo geladen ist
            var mainTemplateLogo = document.getElementById('mainTemplateLogo');
            mainTemplateLogo.onload = function () {
              // window.print();
              // window.close();
            };

            // Testarea
            // Füge Element 10x10mm hinzu, vermesse es und gib Wert im Dokument aus
            
            // var dpi_element = document.createElement('div');
            // dpi_element.id = 'dpi_measurement';
            // dpi_element.style.width = '10mm';
            // dpi_element.style.height = '10mm';
            
            // document.body.appendChild(dpi_element);
            // var measured_dpi_element = document.getElementById('dpi_measurement');
            // measured_dpi_element.innerHTML = "Breite von 10mm = " + measured_dpi_element.offsetWidth + "px, Höhe von 10mm = " + measured_dpi_element.offsetHeight + "px.";

          </script>
        </body>

      </html>
`;
    
    if (clientside) {
      console.log('lokales Rendering');
      console.log('Neues Fenster fürs Drucken vorbereiten...');
      
      // neuen Browser-Tab für den Druck/die PDF-Generierung öffnen
      printWindow = window.open('_blank', 'top=0,left=0,bottom=0,right=0');
      
      console.log('Neues Fenster fürs Drucken befüllen...');    
      printWindow.document.write(printPageSource);
    }
    else {
      console.log('serverseites Rendering');
      console.log('------------ START: HTML-Source for printing with chrome.exe --headless ------------');
      console.log(printPageSource);
      console.log('------------- END: HTML-Source for printing with chrome.exe --headless -------------');
      
      this.progressbar_visible = true;

      // HTML-Code aus Editor-DIV extrahieren, falls freeform Vorlage/Template
      console.log('this.activePrintTemplate: ' + this.activePrintTemplate);
      let indivHTMLcode: string = "";
      if (this.activePrintTemplate.indexOf('freeform')>-1) indivHTMLcode = document.getElementsByClassName('fr-element fr-view')[0].innerHTML;
      // console.log('indivHTMLCode: ', indivHTMLcode);
      // console.log('offerteFinalisieren: ' + offerteFinalisieren);
      
      this.offerteshowService.restinsofferteSpeichern(aufnr, printPageSource, offerteFinalisieren, this.activePrintTemplate, indivHTMLcode)  // 'no'
        .subscribe(offerte_speichern => {
          
          // console.log('Offertdaten aus amasys (Abgleich):',offerte_speichern);  
          this.progressbar_visible = false;
          this.printDokumentAufServer = true; // Dokument auf Server befördert
          
          console.log('restinsofferteSpeichern, abschliessen:' + abschliessen);
          
          if (abschliessen) {
            // this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, true);

            // if (this.meinVerkaufsdokumentFormular.controls.abgeschlossen.value == true) this.verkaufsdokumentStatus = "lock_outline";
            
            // Control auf abgeschlossen = true setzen:
            this.meinVerkaufsdokumentFormular.controls.abgeschlossen.patchValue(true);
            this.verkaufsdokumentStatus = "lock_outline";
            
            // console.log('Abgleich: Multiprint -> verkaufsdokumentStatus: ' + this.verkaufsdokumentStatus);
          }
          console.log('restinsofferteSpeichern, this.verkaufsdokumentStatus -> nach Speichern: ' + this.verkaufsdokumentStatus);
          
          // Handling von PDF-Erzeugung auf Server
          switch(server_pdf_action) { 
             case 'save':
             case 'saveandfinalize': { 
                console.log('Multiprint weiterführende PDF-Aktion auf Server: save or saveandfinalize'); 
                this.showPDF(aufnr,server_pdf_action);
                break; 
             }
             case 'saveandshow': { 
                console.log('Multiprint weiterführende PDF-Aktion auf Server: saveandshow'); 
                this.showPDF(aufnr,server_pdf_action);
                break; 
             } 
             default: { 
                console.log('Keine weiterführende PDF-Aktion auf Server nach Multiprint'); 
                break; 
             } 
          }
        
        }, // Ende Success-Block 
        
        
        // Start Error-Case-Block
        err => {
          this.progressbar_visible = false;
          this.snackBarRef = this.snackBar.open(words.serverError2 + ": " + err, '', { duration: 10000 });
          console.error(err);
        });
      
    }
  }
  
  
  showPDF (aufnr: string, server_pdf_action = 'save'){
    
    // server_pdf_action: none            keine Aktion
    //                    save            Layout-Daten auf Server speichern -> PDF generieren
    //                    saveandfinalize Layout-Daten auf Server speichern -> PDF generieren
    //                    saveandshow     Layout-Daten auf Server speichern -> PDF generieren -> PDF herunterladen und anzeigen

    console.log("showPDF",aufnr);
    console.log('showPDF weiterführende PDF-Aktion auf Server: ' + server_pdf_action); 
    
    
    var blobUrl = "";
    var blob = null;
    
    
    // this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
    
    // this.multiprint(false, aufnr, false);
   
    this.offerteshowService.restinsofferteZeigen(aufnr)
    .subscribe(pdf => {
      
    //this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
    //this.multiprint(false, aufnr, false);
      
      
      let pdf_data = pdf.tt_insofferteZeigen;
      // console.log('pdf_data aus restinsofferteZeigen',pdf_data);
   
      var mimetype = 'application/pdf;base64';
      if (pdf_data[0].datei != null) {
      // if (pdf_data[0].datei.length >= 1) {
      
        // PDF-Datei extrahieren und in ObjektURL umwandeln  
        blob = this.base64dataToBlob(pdf_data[0].datei, mimetype);
        blobUrl = URL.createObjectURL(blob);
        
        this.pdfBlobURL = blobUrl;
        
        // Window öffnen wenn server_pdf_action = 'saveandshow' ist
        if (server_pdf_action === 'saveandshow') {
          this.window = this.windowrefService.getNativeWindow();
          this.window.open(blobUrl, '_blank');
        }
  
        // console.log("Blob", blobUrl);
      }
      else {
        console.log("Kein PDF des Verkaufsdokuments vorhanden");
      }
    })
  }
  
  
  sanitizeURL(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
  
  base64dataToBlob(base64data, mimeType) {
    // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
    var byteCharactersString =  window.atob(base64data);
    
    // Erstelle einen Array-Buffer im Umfang des Strings aus Byte-Zeichen
    var arrayBuffer = new ArrayBuffer(byteCharactersString.length);
    
    // Erstelle einen Byte-Array in der Grösse vom Array-Buffer
    var byteArray = new Uint8Array(arrayBuffer);
    
    // Schleife über alle Zeichen des Strings aus Byte-Zeichen
    for (var i = 0; i < byteCharactersString.length; i++) {
    
        // an aktueller Position den Unicode-Wert des Byte-Zeichens auslesen und an derselben Position in den Byte-Array eintragen
        byteArray[i] = byteCharactersString.charCodeAt(i);
    
    }
    
    var blob = new Blob([arrayBuffer], { type: mimeType });
    return blob;
  
  }
  
  
  verkaufsdokumentStatus_manual_unlock(aufnr: string) {
    
    // this.verkaufsdokumentStatus = this.verkaufsdokumentStatus === 'lock_open' ? 'lock_closed' : 'lock_open';
    
    
    this.progressbar_visible = true;
      
    this.offerteshowService.restinsofferteOeffnen(aufnr)  // 'no'
      .subscribe(offerte_oeffnen => {
        
        // console.log('Offertdaten aus amasys (Abgleich):',offerte_oeffnen);  
        this.progressbar_visible = false;
        
        this.verkaufsdokumentStatus = 'lock_open';
        console.log('Lock opened');
      
      
      }, // Ende Success-Block 
      
      
      // Start Error-Case-Block
      err => {
        this.progressbar_visible = false;
        this.snackBarRef = this.snackBar.open(words.docError + ": " + err, '', { duration: 10000 });
        console.error(err);
      });
    
    
    console.log('manuelles Unlocking / zur Bearbeitung öffnen eines gelockten Dokuments');   
    console.log('VerkaufsdokumentStatus = ' + this.verkaufsdokumentStatus);
  }
  
  
  buildEMailURL(offertFormData) {
    
    let emailURL: string = "";
    // let demoMail: string = "rstegemann@edp.ch";
    
    //emailURL = "mailto:" + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.bestemail.value);
    
    emailURL = "mailto:";
    if (this.meinVerkaufsdokumentFormular.controls.bestemail.value != '') {
      emailURL = emailURL + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.bestemail.value);
      if (this.meinVerkaufsdokumentFormular.controls.vermzustemail.value != '') emailURL = emailURL + ',' + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.vermzustemail.value);
    }
    else if (this.meinVerkaufsdokumentFormular.controls.vermzustemail.value != '') emailURL = emailURL + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.vermzustemail.value);
      
      emailURL = emailURL + '?subject=' + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.sujet.value);
      emailURL = emailURL + '&body=' + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.indivAnrede.value) + '%0D%0A%0D%0A';
      
      if (this.instanzdata.defaultEMailText === "") {
        emailURL = emailURL + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.indivEinleitungstext.value) + '%0D%0A%0D%0A%0D%0A';
        emailURL = emailURL + 'Freundliche Grüsse%0D%0A%0D%0A';
        emailURL = emailURL + encodeURIComponent(this.meinVerkaufsdokumentFormular.controls.verfasser1.value) + '%0D%0A';
      }
      else {
        // var bodytext = emailURL + '&body=' + encodeURIComponent(this.instanzdata.defaultEMailText);
        var mailstring_splitted = this.instanzdata.defaultEMailText.split("\\n");
        console.log("Mailtext, splitted:",mailstring_splitted);
        
        // var regexpression = /\\n\W/gi;
        // emailURL = emailURL + '&body=';
        
        for (var l = 0; l < mailstring_splitted.length; l++) {
          emailURL = emailURL +  encodeURIComponent(mailstring_splitted[l]) + "%0D%0A";
        }
        
        // var bodytext = mailstring.replace(regexpression, "%0D%0A");
        // emailURL = emailURL + '&body=' +  encodeURIComponent(bodytext);
        console.log("URIencoded and newline replaced bodytext in case of set mail preference",emailURL);
      }
    return emailURL;
    
  }

  
  
  // Mainfunktionen
  // ==============


  // Abfüllen der Abschlussdaten
  abschlussAuswahlDropdown(objektvalue: string, kundbeznr: string, index: number){
    console.log("abschlussAuswahlDropDown, objektvalue: ",objektvalue);
    console.log("abschlussAuswahlDropDown, kundbeznr: ",kundbeznr);
    console.log("abschlussAuswahlDropDown, index: ",index);

    if (objektvalue){
        this.abschlussService.restinsgetabschluesse(objektvalue, kundbeznr).subscribe(abschluesseval => {
          
          // console.log("Start innerhalb subscribe(rubrik...");
          // console.log("rubrik: ",rubrikval);
          
          this.abschlussdataarray[index] = abschluesseval;
          
          console.log("this.abschlussdataarray[" + index + "] (nach Zuweisung): ",this.abschlussdataarray[index]);
          
    }, err => {
         console.error(err);
       });
    }
    
  }

  kvarianteAuswahlDropdown(objektvalue: string, index: number) {
    console.log("ausgabevariantenAuswahlDropDown, objektvalue: ",objektvalue);
    console.log("ausgabevariantenAuswahlDropDown, index: ",index);


  }

  
  // abfüllen Objektauswahl
  objektauswahldropdown(){
    this.objektauswahlService.showObjekt('','no').subscribe(objval => {
      this.objektdata = objval;
      console.log('Objekt initialisiert');
    }, err => {
      console.error(err);
    });
  }
  
  
    // Abfüllen der Abschlussdaten
  ausgabevariantenAuswahlDropdown(objektvalue: string, index: number){
    console.log("ausgabevariantenAuswahlDropDown, objektvalue: ",objektvalue);
    console.log("ausgabevariantenAuswahlDropDown, index: ",index);

    if (objektvalue){
        this.objektauswahlService.restitgetausgvar(objektvalue).subscribe(ausgabevariantenval => {
          
          // console.log("Start innerhalb subscribe(rubrik...");
          // console.log("rubrik: ",rubrikval);
          
          this.ausgabevariantendataarray[index] = ausgabevariantenval;
          
          console.log("this.ausgabevariantendataarray[" + index + "] (nach Zuweisung): ",this.ausgabevariantendataarray[index]);
          
    }, err => {
         console.error(err);
       });
    }
    
  }

  
  //Oeffne rubrik wenn objekt belegt
  rubrikAuswahlDropdown2(objektvalue: string, index: number){
    // console.log("rubrikAuswahlDropDown, objektvalue: ",objektvalue);
    // console.log("rubrikAuswahlDropDown, index: ",index);

    if (objektvalue){
        this.rubrikauswahlService.showRubrik(objektvalue, '').subscribe(rubrikval => {
          
          // console.log("Start innerhalb subscribe(rubrik...");
          // console.log("rubrik: ",rubrikval);
          
          this.rubrikdataarray[index] = rubrikval;


          
          // console.log("this.rubrikdataarray[" + index + "] (nach Zuweisung): ",this.rubrikdataarray[index]);
    }, err => {
         console.error(err);
       });
    }
    
  }

  public clearUrubrick(index) {
    console.log('clearUrubrick', index);
    const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
    const einzeltitel = <FormGroup> helper_titel.at(index);

    // Unterrubrik-Angaben in den Datenstrukturen zurücksetzen
    einzeltitel.controls.unterrubrik.patchValue('');
    einzeltitel.controls.urubBezeichnung.patchValue('');
  }
  

  //Oeffne urubrik wenn objekt und rubrik belegt
  urubrikAuswahlDropdown2(objektvalue: string, rubrikvalue: string, index: number){
    console.log("urubrikAuswahlDropDown, objektvalue: ",objektvalue);
    console.log("urubrikAuswahlDropDown, rubrikvalue: ",rubrikvalue);
    console.log("rubrikAuswahlDropDown, index: ",index);

    if (objektvalue && rubrikvalue){ // this.rubrik
       this.unterrubrikauswahlService.showUrubrik(objektvalue, '', rubrikvalue)
        .subscribe(urubrikval => {
          
          this.urubrikdataarray[index] = urubrikval;
          
          console.log("this.urubrikdataarray[" + index + "] (nach Zuweisung): ",this.urubrikdataarray[index]);

        }, err => {
            console.error(err);
        });
    }
  }
  //kvarianten dropdown
  kvariantenAuswahlDropdown(objektvalue: string, index: number) {
      this.offerteshowService.restitgetkvariante(objektvalue)
          .subscribe(kvariantevar => {
            this.kvariantedataarray[index] = kvariantevar;
            console.log('kvar', this.kvariantedataarray);
          }, err => {
            console.error(err);
          });
  }
  
  
  // Oeffne werbeformate, wenn objekt, rubrik und urubrik belegt
  werbeformatAuswahlDropdown2(objektvalue: string, rubrikvalue: string, urubrikvalue: string, index: number){
    // console.log("werbeformatAuswahlDropdown objektvalue, rubrikvalue, urubrikvalue, index: ",objektvalue,rubrikvalue,urubrikvalue, index);
    if (objektvalue && rubrikvalue && urubrikvalue){ // this.rubrik
      this.werbeformateService.showWerbeformate(objektvalue, rubrikvalue, urubrikvalue)
        .subscribe(werbemittel => {
          
          this.werbeformatdataarray[index] = werbemittel;
          
          console.log("this.werbeformatdataarray[" + index + "] (nach Zuweisung): ",this.werbeformatdataarray[index]);
        }, err => {
          console.error(err);
        });
    }
    else { // Default-Eintrag, falls Daten nicht geholt werden können (Objekt, Rubrik, Urubrik nicht komplett vorhanden)
       this.werbeformatdataarray[index] = [{fehlercode: "00", fehlertext: "", bez: "", werbeformatID: ""}];
    }
  }
  
  
  // Oeffne erscheinungen wenn objekt, rubrik, urubrik belegt
  erscheinungsAuswahlDropdown2(objektvalue: string, rubrikvalue: string, urubrikvalue: string, index: number){
    // console.log("erscheinungsAuswahlDropdown objektvalue, rubrikvalue, urubrikvalue, index: ",objektvalue,rubrikvalue,urubrikvalue, index);
    // console.log("objektvalue, rubrikvalue, urubrikvalue: ",objektvalue,rubrikvalue,urubrikvalue);
    
  if (objektvalue && rubrikvalue && urubrikvalue){
      
    this.aschluesselauswahlService.showAschluessel(objektvalue, rubrikvalue, urubrikvalue).subscribe(erscheinungsval => {
      // console.log("Start innerhalb subscribe(erscheinungen/aschluessel...");
      // console.log("erscheinungen: ",erscheinungsval);
      
      this.erscheinungsdataarray[index] = erscheinungsval;
      
     // console.log("this.erscheinungsdataarray[" + index + "] (nach Zuweisung): ",this.erscheinungsdataarray[index]);
    }, err => {
         console.error(err);
       });
    }
    
  }

  
  // Oeffne Platzierungen, wenn objekt, rubrik und urubrik belegt
  platzierungsAuswahlDropdown2(objektvalue: string, rubrikvalue: string, urubrikvalue: string, index: number){
    
    //console.log("platzierungsAuswahlDropdown objektvalue, rubrikvalue, urubrikvalue, index: ",objektvalue,rubrikvalue,urubrikvalue, index);
    
    if (objektvalue && rubrikvalue && urubrikvalue) {
      this.platzierungsauswahlService.showPlatzierungen(objektvalue, rubrikvalue, urubrikvalue)
        .subscribe(platzierung => {
          // this.platzierungsdata = platzierung;
          this.platzierungsdataarray[index] = platzierung;
          // console.log("Platzierungen: " + this.platzierungsdata);
          // console.log("this.platzierungsdataarray[" + index + "] (nach Zuweisung): ",this.platzierungsdataarray[index]);
        }, err => {
          console.error(err);
        });
    }
  }
  
  
  // Oeffne Internet-Zuschlagsdaten
  internetZuschlagsAuswahlDropdown2(objektvalue: string, index: number){
    
    //console.log("platzierungsAuswahlDropdown objektvalue, rubrikvalue, urubrikvalue, index: ",objektvalue,rubrikvalue,urubrikvalue, index);
    
    if (objektvalue) {
      this.offerteshowService.restItGetInternetZuschlag(objektvalue)
        .subscribe(internetzuschlaege => {
          this.internetzuschlagsdataarray[index] = internetzuschlaege.tt_itgetInternetZuschlag;
        }, err => {
          console.error(err);
        });
    }
  }

  
  // Kreiere Preispositionen
  preispositionenAuswahlDropDown2(aufdetnrvalue: string, indexI: number, indexJ: number){
    // console.log("preispositionenAuswahlDropdown2: aufdetnr = " + aufdetnrvalue);
    // console.log("preispositionenAuswahlDropdown2: indexI = " + indexI);
    // console.log("preispositionenAuswahlDropdown2: indexJ = " + indexJ);
    if (aufdetnrvalue) {
      if (this.preispositionendataarray[indexI][indexJ]) {
        console.log("preispositionseintrag existiert");
      }
      else {
        console.log("preispositionseintrag existiert nicht");
      }
      
      this.preispositionenService.showPreispositionen(aufdetnrvalue)
        .subscribe(preisposition => {
          this.preispositionendataarray[indexI] [indexJ] = preisposition;
          // console.log("this.preispositionendataarray[" + indexI + "] ["+ indexJ + "] (nach Zuweisung): ",this.preispositionendataarray[indexI] [indexJ]);
          // console.log("this.preispositionendataarray[" + indexI + "] ["+ indexJ + "] (nach Zuweisung): ",JSON.stringify(this.preispositionendataarray[indexI] [indexJ]));
          // console.log("Umfang: " + this.preispositionendataarray[indexI][indexJ].length);
          
        }, err => {
          console.error(err);
        });
    }
  }
  

  initTitel(obj: string, rub: string, urub: string) {
    // Titel initialisierung
    
    return this._fb.group({
      
      // objekt: [''],
      objekt: [obj],
      objBezeichnung: [''],
      // rubrik: [''],
      rubrik: [rub],
      rubBezeichnung: [''],
      // unterrubrik: [''],
      unterrubrik: [urub],
      urubBezeichnung: [''],
      auflage: [''],
      zusatzinfo: [''],
      abschlussnr: [0],
      kvariante: [''],
      werbemittel: this._fb.array([
            this.initWerbemittel(),
      ])
    });
  }

  addTitel(indexI: number) {
    // Titel hinzufügen
    
    // Alte Initialisierung
    // Vorberereitung Preispositionen für erstes Werbemittel dieses Titels
    // this.preispositionendataarray.push([[{}]]);
    // this.rubrikdataarray.push([[{}]]);
    // this.urubrikdataarray.push([[{}]]);
    // this.werbeformatdataarray.push([[{}]]);
    // this.platzierungsdataarray.push([[{}]]);
    // this.erscheinungsdataarray.push([[{}]]);
    
    // neue Initialisierung
    // ====================
    //
    // console.log("addTitel, indexI = " + indexI);
    this.preispositionendataarray.splice(indexI,0,[[{}]]);
    
    // console.log('addTitel, indexI, Preispositionendataarray [' + indexI + '] [0] = ' + this.preispositionendataarray[indexI] [0]); // TODO: entfernen
    
    this.ausgabevariantendataarray.splice(indexI,0,[[{}]]);
    this.abschlussdataarray.splice(indexI,0,[[{}]]);
    this.kvariantedataarray.splice(indexI,0,[[{}]]);
    this.rubrikdataarray.splice(indexI,0,[[{}]]);
    this.urubrikdataarray.splice(indexI,0,[[{}]]);
    this.werbeformatdataarray.splice(indexI,0,[[{}]]);
    this.platzierungsdataarray.splice(indexI,0,[[{}]]);
    this.internetzuschlagsdataarray.splice(indexI,0,[[{}]]);
    this.erscheinungsdataarray.splice(indexI,0,[[{}]]);  
          
    const control = <FormArray>this.meinVerkaufsdokumentFormular.controls['titel'];
    //const control = <FormArray>this.meinVerkaufsdokumentFormular.get('titel');
    // control.push(this.initTitel());
    //console.log("control", control);
    control.insert(indexI, this.initTitel('','',''));
    
    // Zur Titelauswahl auffordern
    this.openObjektAuswahlDialog(indexI);
    
  }

  removeTitel(i: number) {
      
      // Titel entfernen
      const control = <FormArray>this.meinVerkaufsdokumentFormular.controls['titel'];
      control.removeAt(i);
      
      // console.log("RemoveTitel: Aufräumaktion gestartet");
      
      // in helper arrays Einträge des gelöschten Titels entfernen
      this.preispositionendataarray = this.removeRow(this.preispositionendataarray, i);
      this.rubrikdataarray = this.removeRow(this.rubrikdataarray, i);
      this.urubrikdataarray = this.removeRow(this.urubrikdataarray, i);
      this.werbeformatdataarray = this.removeRow(this.werbeformatdataarray, i);
      this.platzierungsdataarray = this.removeRow(this.platzierungsdataarray, i);
      this.internetzuschlagsdataarray = this.removeRow(this.internetzuschlagsdataarray, i);
      this.erscheinungsdataarray = this.removeRow(this.erscheinungsdataarray, i);
      this.abschlussdataarray = this.removeRow(this.abschlussdataarray, i);
      this.kvariantedataarray = this.removeRow(this.kvariantedataarray, i);
      this.ausgabevariantendataarray = this.removeRow(this.ausgabevariantendataarray, i);
      
      // console.log("RemoveTitel: Aufräumaktion beendet");
  }

  initWerbemittel() {
    // Werbemittel initialisieren

    return this._fb.group({
      sujetnr: [''],
      sujetnrarray: [],
      werbeformatID: [''],
      werbeformat: [''],
      werbeformatTyp: [''],
      werbeformatDismenge1Label: [''],
      werbeformatDismenge2Label: [''],
      werbeformatDismenge1: [0],
      werbeformatDismenge2: [0],
      werbeformatDisanz: [0],
      // werbeformatFarbanz: ['4'],
      werbeformatFarbanz: [this.instanzdata.defaultWerbeformatFarbanz],
      werbeformatProdgroesse: [''],
      werbeformatGewicht: [0],
      werbeformatDismenge1Values: [],   // [["1","2"]]
      werbeformatDismenge2Values: [],
      
      //buchungsartErscheinung: ['A'],
      buchungsartErscheinung: [this.instanzdata.defaultBuchungsartErscheinung],
      erscheinungsausgbez: [[]],
      // erscheinungsausgbez: [''],
      erscheinungsaufdetnr: [''],
      erscheinungsaschlussel: [[]], // [''],
      erscheinungsanzahl: [1],
      ausgabevariante: [''],
      ausgabevarianteBez: [''],
      insertionsschlussAnzeige: [false],
      sujetverteilt: [false],
      insertionsschlussDatum: [''],
      insertionsschlussUhrzeit: [''],
      hinweis: [''],
      platzierung: [''],
      intcode: [''],
      intbez: [''],
      seitenumbruch: [false],
      preisErscheinungAmasys: [0],
      preisBruttoAmasys: [0],
      // preisUser: [{value:0, disabled: true}],                 // preisUser: [{value:0, disabled: true}],
      // preisAmasys: [{value:0, disabled: true}],               // => netto netto      war: preisAmasys: [{value:0, disabled: true}],
      preisUser: [0],
      preisAmasys: [0],
      bk: [0],
      bkBetrag: [0],
      auflage: [''],
      preisposdropdown: [''],
      zusatzpreispositionen: this._fb.array([
          //this.initZusatzpreisposition(),
      ])

    });
  }

  addWerbemittel(wm_control: FormArray, indexI: number, indexJ: number) {
    // Zusatzpreisposition hinzufügen
    
    console.log("AddWerbemittel Start");
    // console.log("wm_control:" + wm_control);
    // console.log("indexI: " + indexI);
    // console.log("indexJ: " + indexJ);
    
    if (this.preispositionendataarray[indexI][indexJ]) {
      console.log("preispositionendataarray["+ indexI + "][" + indexJ + "] existiert.");
    }
    else {
      console.log("preispositionendataarray["+ indexI + "][" + indexJ + "] existiert NICHT und wird hinzugefügt.");
      if (this.preispositionendataarray[indexI]) {
        console.log("preispositionendataarray["+ indexI + "] existiert NICHT; ganze Zeile wird erstellt und hinzugefügt.");
      }
      else {
        console.log("preispositionendataarray["+ indexI + "] existiert; nur Element wird hinzugefügt.");
      }
    }
    this.preispositionendataarray[indexI].splice(indexJ,0,[{}]);
    this.preispositionendataarray[indexI] [indexJ] = [              // Dummy ;-)
          [{
            // "typ": "",
            // "bezeichnung": "",
            // "posKey": "",
            // "preisUser": 0,
            // "preisAmasys": 0
            
            //"preisUser": "0",
            //"preisAmasys": "0"
          }]
      ];
    console.log("this.preispositionendataarray[" + indexI + "] [" + indexJ + "] = " + this.preispositionendataarray[indexI] [indexJ]);
    wm_control.insert(indexJ, this.initWerbemittel());


  }
  
  removeWerbemittel(wm_control: FormArray, indexI: number, indexJ: number) {
      
      // Werbemittel entfernen
      wm_control.removeAt(indexJ);
      
      // in preispositionendataarray entsprechendes Element löschen
      this.preispositionendataarray[indexI].splice(indexJ,1);
      
  }
  
  
  resetUrubrik(titelIndex:number) {
    
    // Herausschälen der benötigten FormControls/-Arrays
    const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
    const einzeltitel = <FormGroup> helper_titel.at(titelIndex);

    // Unterrubrik-Angaben in den Datenstrukturen zurücksetzen
    einzeltitel.controls.unterrubrik.patchValue('');
    einzeltitel.controls.urubBezeichnung.patchValue('');
    
    // Offerte neu rechnen
    this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false)
    
  }
  
  
  removeAlleWerbemittelEinesTitels(titelIndex:number) {

    // Herausschälen der benötigten FormControls/-Arrays
    const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
    // console.log("titel [0]: " + helper_titel);
    
    const einzeltitel = <FormGroup> helper_titel.at(titelIndex);
    // console.log("einzeltitel [" + i + "]: " + einzeltitel);
    
    const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
    // console.log("werbemittel von titel [" + i + "]: " + helper_werbemittel);
    
    console.log("Umfang an Werbemittel bei Titel [" + titelIndex + "]: " + helper_werbemittel.length);

    // Hinzufügen der entsprechenden Anzahl leerer Preispositionen und Initialisierung der entsprechenden Hilfsarrays
    var l: number;
    for(l = helper_werbemittel.length-1;l>=0;l--) {
      
      // Werbemittel entfernen
      console.log("Werbvemittel [" + l + "] wird gelöscht");
      helper_werbemittel.removeAt(l);
      this.preispositionendataarray[titelIndex].splice(l,1);
    }
   
    // Update Offerte
    // console.log("Offerte wird neu gerechnet - ohne Preispositionen von Titel [" + titelIndex + "] und dessen Werbemittel [" + werbemittelIndex + "]");
    
    // Ein einzelnes (leeres) Werbemittel hinzufügen
    this.addWerbemittel(helper_werbemittel, titelIndex, 0);
    this.snackBarRef = this.snackBar.open(words.rubricErrorOne + (titelIndex+1) + ' (' + einzeltitel.controls['objBezeichnung'].value + ") " + words.rubricErrorTwo, '', { duration: 10000 });
    
  }
  

  initZusatzpreisposition() {
    // Zusatzpreisposition initialisieren

    return this._fb.group({
      typ: [''],
      bezeichnung: [''],
      posKey: [''],
      preisUser: [0],
      preisAmasys: [0],
      // preisUser: [{value: 0, disabled: true}],
      // preisAmasys: [{value: 0, disabled: true}],
      preisUserTotal: [0],
      preisAmasysTotal: [0],
      betragme: ['']
    });
  }
  
  initZusatzpreisposition2(bezeichnung: string, posKey: string, typ: string, preisAmasys: number) {
    // Zusatzpreisposition initialisieren
    
    console.log(bezeichnung, posKey, typ, preisAmasys);
    
    return this._fb.group({
      typ: [typ],
      bezeichnung: [bezeichnung],
      posKey: [posKey],
      preisUser: [+preisAmasys],
      preisAmasys: [+preisAmasys],
      // preisUser: [{value: +preisAmasys, disabled: true}],
      // preisAmasys: [{value: +preisAmasys, disabled: true}],
      preisUserTotal: [0],
      preisAmasysTotal: [0],
      betragme: ['']
    });
  }

  addZusatzpreisposition(wm_control: FormArray, index: number) {
    // Zusatzpreisposition hinzufügen
    wm_control.insert(index, this.initZusatzpreisposition());
  }
  
  addZusatzpreisposition2(wm_control: FormArray, index: number, selectedPosKey: string, preisposObject: any) { // Todo Object from preispositionendataarray[j]
    // Zusatzpreisposition hinzufügen mit Inhalten
    
    if (selectedPosKey != "") {
      console.log("preisposObject: " + JSON.stringify(preisposObject));
      
    	var ind = 0;
    	do {
    		console.log(ind);
    	  if(preisposObject[ind].posKey === selectedPosKey)
    		break;
    		ind++;
    	}
    	while (ind < preisposObject.length)
      console.log("Abbruch:" + ind);
      
      wm_control.insert(index, this.initZusatzpreisposition2(preisposObject[ind].bezeichnung,selectedPosKey,preisposObject[ind].typ,preisposObject[ind].preisAmasys));
    }
  }
   
  removeZusatzpreisposition(wm_control: FormArray, index: number) {
      // Zusatzpreisposition entfernen

      wm_control.removeAt(index);
      // for (let i; i < wm_control.length; i++) {
      //   wm_control.insert(i, wm_control[i])
      // }

  }
  
  removeAlleZusatzpreispositionen(titelIndex:number, werbemittelIndex: number) {
    
    // Herausschälen der benötigten FormControls/-Arrays
    let helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
    // console.log("titel [0]: " + helper_titel);
    
    let einzeltitel = <FormGroup> helper_titel.at(titelIndex);
    // console.log("einzeltitel [" + i + "]: " + einzeltitel);
    
    let helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
    // console.log("werbemittel von titel [" + i + "]: " + helper_werbemittel);
      
    let einzelwerbemittel;
    let helper_preispositionen;
    let werbemittel_multidimensional_komplett: string = "monodimensional";
    
    // Unterscheidung, wie werbemittelIndex zu interpretieren ist
    if (werbemittelIndex < 0) { // wenn werbemittelIndex < 0, dann wurde die Lämnge des WerbemittelArray als negierte Zahl übergeben
      console.log('###### Sämtliche Preispositionen ALLER Werbemittel dieses Titels müssen entfernt werden!!! ######');
    
      for(var jj = 0;jj<-(werbemittelIndex);jj++) {

        console.log('werbeittelindexschleife: Index=' + jj + ', Interation ' + (jj+1) +  ' von ' + (-werbemittelIndex));

        einzelwerbemittel = <FormGroup> helper_werbemittel.at(jj);
        // console.log("einzelwerbemittel [" + j + "] von titel [" + i + "]: " + einzelwerbemittel);
        
        helper_preispositionen = <FormArray> einzelwerbemittel.controls['zusatzpreispositionen'];
        
        console.log("Umfang an Zusatzpreispositionen: " + helper_preispositionen.length);
    
        // Hinzufügen der entsprechenden Anzahl leerer Preispositionen und Initialisierung der entsprechenden Hilfsarrays
        var l: number;
        for(l = helper_preispositionen.length-1;l>=0;l--) {
          
          // Zusatzpreispositionen entfernen
          // console.log("Preisposition [" + l + "] wird gelöscht");
          helper_preispositionen.removeAt(l);
        }

      }
      
    }
    else {    // wenn werbemittelIndex > 0, dann wurde effektiv mit dem Index j aus der HTML-Sicht der Index des zu beachtenden Werbemittels übergeben
              // -> nur in einem bestimmten Werbemittel alle Preispositionen löschen

      console.log('**** Es werden nur die Preispositionen des Werbemittels [' + werbemittelIndex + '] gelöscht *****');
    
      einzelwerbemittel = <FormGroup> helper_werbemittel.at(werbemittelIndex);
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ einzelwerbemittel [" + werbemittelIndex + "] von titel [" + titelIndex + "]: ",einzelwerbemittel);
      
      // Kontrollieren, ob bei Werbemittelformaten mit Verwendung von werbeformatDismenge1 & werbeformatDismenge2 bereits beide Werte gesetzt sind
      if ((einzelwerbemittel.controls.werbeformatID.value).toUpperCase().indexOf("MM")>-1) { 
        werbemittel_multidimensional_komplett = (((einzelwerbemittel.controls.werbeformatDismenge1.value != 0) && (einzelwerbemittel.controls.werbeformatDismenge2.value != 0)) ? "komplett" : "nicht komplett");
      }
      console.log ("werbemittel_multidimensional_komplett: " + werbemittel_multidimensional_komplett);
      
      helper_preispositionen = <FormArray> einzelwerbemittel.controls['zusatzpreispositionen'];
      
      console.log("Umfang an Zusatzpreispositionen: " + helper_preispositionen.length);
  
      // Hinzufügen der entsprechenden Anzahl leerer Preispositionen und Initialisierung der entsprechenden Hilfsarrays
      var l: number;
      for(l = helper_preispositionen.length-1;l>=0;l--) {
        
        // Zusatzpreispositionen entfernen
        // console.log("Preisposition [" + l + "] wird gelöscht");
        helper_preispositionen.removeAt(l);
      }

    }
    
    // Update Offerte wenn monodimensionales Werbemittel oder bei multidimensionalen Werbemitteln beide Werte gegeben 
    // console.log("Offerte wird neu gerechnet - ohne Preispositionen von Titel [" + titelIndex + "] und dessen Werbemittel [" + werbemittelIndex + "]");
    if ((werbemittel_multidimensional_komplett == "monodimensional") || (werbemittel_multidimensional_komplett == "komplett")) {
      this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false)
    }
    /* ALT
    
    // Herausschälen der benötigten FormControls/-Arrays
    let helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
    // console.log("titel [0]: " + helper_titel);
    
    let einzeltitel = <FormGroup> helper_titel.at(titelIndex);
    // console.log("einzeltitel [" + i + "]: " + einzeltitel);
    
    let helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
    // console.log("werbemittel von titel [" + i + "]: " + helper_werbemittel);
    
    
    // Loop, wenn werbemittelIndex <0
    // 
    
    let einzelwerbemittel = <FormGroup> helper_werbemittel.at(werbemittelIndex);
    // console.log("einzelwerbemittel [" + j + "] von titel [" + i + "]: " + einzelwerbemittel);
    
    let helper_preispositionen = <FormArray> einzelwerbemittel.controls['zusatzpreispositionen'];
    
    console.log("Umfang an Zusatzpreispositionen: " + helper_preispositionen.length);

    // Hinzufügen der entsprechenden Anzahl leerer Preispositionen und Initialisierung der entsprechenden Hilfsarrays
    var l: number;
    for(l = helper_preispositionen.length-1;l>=0;l--) {
      
      // Zusatzpreispositionen entfernen
      // console.log("Preisposition [" + l + "] wird gelöscht");
      helper_preispositionen.removeAt(l);
    }
   
    // Update Offerte
    // console.log("Offerte wird neu gerechnet - ohne Preispositionen von Titel [" + titelIndex + "] und dessen Werbemittel [" + werbemittelIndex + "]");
    this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false)
    
    */
    
  }
  
  
  // save(model: Verkaufsdokument) {
    // API um Verkaufsdokument abzuspeichern
    // console.log(model);
  // }
  
  // adressAutocomplete(){
  //   // this.stateCtrl = new FormControl();
  //   console.log("test offert");
  //   this.gefiltereteAdressen = this.stateCtrl.valueChanges
  //       .startWith(null)
  //       .map(name => this.filteredAdressen(name));
  // }
  
  
  // searchAdresse(val){
  //   console.log("val adrkunde: ",val);
  //   if (val.length >= 3){
  //   this.adrkundenService.getKunde(val, 'yes', 'yes')
  //     .subscribe(kunden => { this.kundendata = kunden;
  //                           this.firmenname = this.kundendata[0].fname;
  //                           this.strasse = this.kundendata[0].strasse;
  //                           this.ort = this.kundendata[0].ort;
        
  //     }, err => {
  //       console.error(err);
  //     });
  //   }
      
  // }
  
  
  // holeMitarbeiter(){
  //   console.log("hole mitarbeiterdata");
  //   this.mitarbeiterService.getMitarbeiter()
  //   .subscribe(mitarbeiter => { this.mitarbeiterdata = mitarbeiter;
  //                           this.mitarbeitername = this.mitarbeiterdata[0].gesname;
  //                           this.mitarbeiterabteilung = this.mitarbeiterdata[0].abteil;
        
  //     }, err => {
  //       console.error(err);
  //     });
      
  // }
  
  @ViewChild('innendiensttxt', { static: false }) innendiensttxt: ElementRef;//verbindung zur e-mail-textarea
  @ViewChild('menuTrigger', { static: false }) menuTrigger: any; //verbindung zum popup
  //dokument wird in vorerfassung geschickt (mit email)
  vorerfassung() {
    //mail des innendienstes einlsesen
    // this.crmEmailidService.getmailid()
    //   .subscribe(id => {
    //     this.mailinnendienst = id[0].emailid
    //     console.log("getmailid",id);
    // });
    this.crmEmailidService.getWEOAmailid()
        .subscribe(id => {
          this.mailinnendienst = id[0].emailid
          console.log("getmailid",id);
        });
    
    //vorerfassung setzen
    this.vorerfassungService.setVorerfassung(this.meinVerkaufsdokumentFormular.value.aufnr)
      .subscribe(ret => {
        //rueckgabewert parsen
        let resp = JSON.parse(JSON.stringify(ret)).REST[0].messageResponse;
        let resp2 = JSON.parse(resp).tt_insofferteOeffnen;
        //rueckgabewert auf fehlercode pruefen
        if(resp2[0].fehlercode !== '00'){
          //bei fehler: Alert und E-Mail-Input-Feld klappt wieder zu
          alert('Fehlercode: ' + resp2[0].fehlercode + '\nFehlertext: ' + resp2[0].fehlertext);
          this.menuTrigger.closeMenu()
          return;
        }
        
        // Start-Text (Beznr, Adresse & Aufnr) einlesen und gebrauchte Text-Reihen zaehlen 
        this.innendiensttxt.nativeElement.value = this.meinVerkaufsdokumentFormular.value.kundBeznr + "\n";
        
        let rows = 3;
        for(let i = 1; i <= 9; i++){
          if(this.meinVerkaufsdokumentFormular.value['bestadr' + i] && this.meinVerkaufsdokumentFormular.value['bestadr' + i] !== ""){
            this.innendiensttxt.nativeElement.value += this.meinVerkaufsdokumentFormular.value['bestadr' + i] + "\n";
            rows++;
          }
        }
        this.innendiensttxt.nativeElement.value += "Auftrag: " + this.meinVerkaufsdokumentFormular.value.aufnr + "\n";
        
        //Anzahl Text-Reihen setzen
        this.innendiensttxt.nativeElement.rows = rows.toString();
        //Textarea fokusieren
        this.innendiensttxt.nativeElement.focus();
        
      }, err => {
        console.log(err);
        alert('Some Error occured');
        this.menuTrigger.closeMenu()
        return;
    });
  } // ende vorerfassung()
  
  //dokument wird in auftrag umgewandelt
  auftrag() {
    //auftrag setzen
    this.auftragService.setAuftrag(this.meinVerkaufsdokumentFormular.value.aufnr)
      .subscribe(ret => {
        //result parsen
        let resp = JSON.parse(JSON.stringify(ret)).REST[0].messageResponse;
        let resp2 = JSON.parse(resp).tt_insofferteOeffnen;
        //bei fehler: alert
        if(resp2[0].fehlercode !== '00'){
          alert('Fehlercode: ' + resp2[0].fehlercode + '\nFehlertext: ' + resp2[0].fehlertext);
        } else {
          this.sidenav.switchtolastmoduleNeu();
        }
      }, err => {
        console.log(err);
        alert('Some Error occured');
    });
  } // ende auftrag()
  
  @ViewChild('sidenav', { static: false }) sidenav: any;
  sendEmailtoinnendienst(val){
    console.log("sendEmailtoinnendienst", val);
    console.log("this.mailinnendienst",this.mailinnendienst);
    this.crmMailversandService.sendWEOAemail(this.mailinnendienst, val.trim())
      .subscribe(email => {
        console.log("crmMailversandService", email);
        this.sidenav.switchtolastmoduleNeu();
      }, err => {
        alert('Some Error occured');
    });
  }

  syncOffertJSON(offertFormData, offertdaten) {

    // Start Success-Block
    console.log("offertdaten von amasys:",offertdaten);
    
    if (offertdaten.auftrag[0].systemfeedback==="") {
      
      // Formgroup-Shaper
      console.log("AbgleichOfferte, Umfang Titel: " + offertdaten.auftrag[0].titel.length);
      //console.log("AbgleichOfferte, Umfang Titel meinVerkaufsdokumentFormular: " + this.meinVerkaufsdokumentFormular.titel.length);
      
      var i:number;
      var j:number;
      var k:number;
      
      // Aufzeigen Unterschied amasys- vs. Web-Modell: Titel
      const differenzTitel = (offertdaten.auftrag[0].titel.length - offertFormData.titel.length);
      console.log("Differenz (Titel) zu bestehendem Web-Modell: " + differenzTitel);
      
      // START fehlende Titel in Datenstruktur einfügen
      if(differenzTitel>0) {
        
        // Herausschälen der benötigten FormControls/-Arrays
        const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
        
        // fehlende Titel-Records ergänzen
        var l: number;
        for(l = 0;l<differenzTitel;l++) {
          helper_titel.push(this.initTitel('','',''));
           
          // Initialisierung Hilfsstrukturen
          var indexI = l+1; // l+1 daher, weil Element mit Index 0 bereits existiert (jedes Verkaufsdokument muss mindestens einen Titel haben)
          console.log("addTitel, indexI = " + indexI);
          this.preispositionendataarray.splice(indexI,0,[[{}]]);
          
          console.log('Titel hinzufügen beim Laden, indexI, Preispositionendataarray [' + indexI + '] [0] = ' + this.preispositionendataarray[indexI] [0]); // TODO: entfernen
          
          this.rubrikdataarray.splice(indexI,0,[[{}]]);
          this.urubrikdataarray.splice(indexI,0,[[{}]]);
          this.werbeformatdataarray.splice(indexI,0,[[{}]]);
          this.platzierungsdataarray.splice(indexI,0,[[{}]]);
          this.internetzuschlagsdataarray.splice(indexI,0,[[{}]]);
          this.erscheinungsdataarray.splice(indexI,0,[[{}]]);  
           
        }
        offertFormData = this.meinVerkaufsdokumentFormular.value; // Datenstruktur dieser Funktion durch soeben erweiterte Datenstruktur aus Web-App ersetzen
        
      } // ENDE fehlende Titel in Datenstruktur einfügen
      

      for(i = 0;i<offertdaten.auftrag[0].titel.length;i++) {  // Start: Loop über alle Titel in den von amasys retournierten Daten

        console.log('***Zugriff auf Werbemittel in amasys-Daten***'); // TODO: entfernen
        
        if (offertdaten.auftrag[0].titel[i].werbemittel) { // nur weiterfahren, wenn in amasys-Offerte Werbemittel vorhanden sind

          // Aufzeigen Unterschied amasys- vs. Web-Modell: Werbemittel
          const differenzWerbemittel = (offertdaten.auftrag[0].titel[i].werbemittel.length - offertFormData.titel[i].werbemittel.length);
          console.log("Differenz (Werbemittel, Titel [" + i + "]) zu bestehendem Web-Modell: " + differenzWerbemittel);
  
          // Fehlende Werbemittel hinzufügen
          // START fehlende Titel in Datenstruktur einfügen
          if(differenzWerbemittel>0) {
            
            // Herausschälen der benötigten FormControls/-Arrays
            const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
            
            const einzeltitel = <FormGroup> helper_titel.at(i);
            // console.log("einzeltitel [" + i + "]: " + einzeltitel);
            
            const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
            // console.log("werbemittel von titel [" + i + "]: " + helper_werbemittel);
  
            
            // fehlende Werbemittel-Records ergänzen
            var l: number;
            for(l = 0;l<differenzWerbemittel;l++) {
              
              this.addWerbemittel(helper_werbemittel, i, l+1);   // l+1 daher, weil Element mit Index 0 bereits existiert (jeder Titel muss mindestens ein Werbemittel haben)
              
              // helper_werbemittel.push(this.initWerbemittel());
               
            }
            offertFormData = this.meinVerkaufsdokumentFormular.value; // Datenstruktur dieser Funktion durch soeben erweiterte Datenstruktur aus Web-App ersetzen
            
          } // ENDE fehlende Werbemittel in Datenstruktur einfügen
        

          for(j = 0;j<offertdaten.auftrag[0].titel[i].werbemittel.length;j++) {   // Start: Loop über alle Werbemittel eines Titels in den von amasys retournierten Daten
  
            console.log("AbgleichOfferte, Umfang Preispositionen, Werbemittel[" + j + "])");
  
            // Aufzeigen Unterschied amasys- vs. Web-Modell: Preispositionen
            // console.log('***Zugriff auf Umfang der Preispositionen in amasys- und Web-Daten***'); // TODO: entfernen
            // console.log('***Umfang der Preispositionen in Web-Daten***: ' + offertFormData.titel[i].werbemittel[j].zusatzpreispositionen.length); // TODO: entfernen
            
            // Preispositionenhandling nur dann, wenn amasys überhaupt Preispositionen zurück gibt
            if (offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen) {
              
              console.log('***Umfang der Preispositionen in amasys-Daten***: ' + offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen.length); // TODO: entfernen
              console.log("Differenz (Preispositionen, Titel [" + i + "], Werbemittel [" + j + "]) zu bestehendem Web-Modell: " + (offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen.length - offertFormData.titel[i].werbemittel[j].zusatzpreispositionen.length));
            
              // Behandeln von Ausnahmesituation, wenn von amasys gelieferte Daten-Struktur anders ist, als Struktur in Web-App
              const differenzPreispositionen = offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen.length - offertFormData.titel[i].werbemittel[j].zusatzpreispositionen.length;
              if (differenzPreispositionen>0) {
              
                console.log("amasys liefert mehr Preispositionen zurück, als von der Web-App an amasys geschickt wurden.\nDaher wird die fehlende Anzahl Preispositionen eingefügt.");
  
  
                // Herausschälen der benötigten FormControls/-Arrays
                const helper_titel = <FormArray> this.meinVerkaufsdokumentFormular.controls['titel'];
                // console.log("titel [0]: " + helper_titel);
                
                const einzeltitel = <FormGroup> helper_titel.at(i);
                // console.log("einzeltitel [" + i + "]: " + einzeltitel);
                
                const helper_werbemittel = <FormArray> einzeltitel.controls['werbemittel'];
                // console.log("werbemittel von titel [" + i + "]: " + helper_werbemittel);
                
                const einzelwerbemittel = <FormGroup> helper_werbemittel.at(j);
                // console.log("einzelwerbemittel [" + j + "] von titel [" + i + "]: " + einzelwerbemittel);
                
                const helper_preispositionen = <FormArray> einzelwerbemittel.controls['zusatzpreispositionen'];
                // console.log("zusatzpreispositionen von werbemittel [" + j + "] von titel [" + i + "]: " + helper_preispositionen);
  
                
                // Hinzufügen der entsprechenden Anzahl leerer Preispositionen und Initialisierung der entsprechenden Hilfsarrays
                var l: number;
                for(l = 0;l<differenzPreispositionen;l++) {
                   helper_preispositionen.push(this.initZusatzpreisposition());
                }
                
                offertFormData = this.meinVerkaufsdokumentFormular.value; // Datenstruktur dieser Funktion durch soeben erweiterte Datenstruktur aus Web-App ersetzen
                
              } // Ende: Handling von abweichenden Daten-Strukturen zwischen amasys und Web 
  
            } // Ende wenn amasys überhaupt Preispositionen retourniert
            // if (!offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen) {
            //   console.log("AbgleichOfferte, Umfang Preispositionen: Keine Preispositionen gefunden.");
            // }
            // else console.log("AbgleichOfferte, Umfang Preispositionen: " + offertdaten.auftrag[0].titel[i].werbemittel[j].zusatzpreispositionen.length + " (Titel[" + i + "], Werbemittel[" + j + "])");
            
            // Wenn erscheinungsaufdetnr vorhanden, kann das zugehörige preispositionenAuswahlDropDown erzeugt werden
            console.log("erscheinungsaufdetnr[" + j + "] = " + offertdaten.auftrag[0].titel[i].werbemittel[j].erscheinungsaufdetnr);
            if (offertdaten.auftrag[0].titel[i].werbemittel[j].erscheinungsaufdetnr) {
              this.preispositionenAuswahlDropDown2(offertdaten.auftrag[0].titel[i].werbemittel[j].erscheinungsaufdetnr,i,j);
            }
            
          } // Ende: Loop über alle Werbemittel eines Titels in den von amasys retournierten Daten
      
        } // ENDE nur weiterfahren, wenn in amasys-Offerte Werbemittel vorhanden sind
        else console.log("AbgleichOfferte, kein Element Werbemittel in Daten aus amasys vorhanden, keine weitere Verarbeitung");
      
        // DropDowns der titelbezogenen Hilfs-Arrays initialisieren
        // Rubrik
        this.rubrikAuswahlDropdown2(offertdaten.auftrag[0].titel[i].objekt,i);
        
        // Urubrik
        this.urubrikAuswahlDropdown2(offertdaten.auftrag[0].titel[i].objekt,offertdaten.auftrag[0].titel[i].rubrik,i);
        
        // Werbeformat
        this.werbeformatAuswahlDropdown2(offertdaten.auftrag[0].titel[i].objekt,offertdaten.auftrag[0].titel[i].rubrik,offertdaten.auftrag[0].titel[i].unterrubrik,i);

      } // Ende: Loop über alle Titel in den von amasys retournierten Daten
    
      // alle Checks erfolgreich durchgearbeitet, Daten-Struktur Web für Empfang Daten amasys vorbereitet
      // => Daten von amasys zuweisen (patchen)
      this.meinVerkaufsdokumentFormular.patchValue(offertdaten.auftrag[0]);
    }
    //else alert('Das Dokument kann leider nicht aktualisiert werden. Fehler: ' + offertdaten.auftrag[0].systemfeedback);
    // else this.snackBarRef = this.snackBar.open('Das Dokument kann leider derzeit nicht aktualisiert werden. Fehler: ' + offertdaten.auftrag[0].systemfeedback, '', {duration: 2000});
    else this.snackBarRef = this.snackBar.open(words.refreshError + ": " + offertdaten.auftrag[0].systemfeedback, '', { duration: 10000 });

  }


  AbgleichOfferte(offertFormData, flag_loading: boolean = false, server_pdf_action = "none") {
    // flag_loading:      true, wenn Offerte von amasys geladen werden soll
    //                    false, wenn Datenstruktur von Web-App mit amasys abgeglichen werden soll
    
    // server_pdf_action: none        keine Aktion
    //                    save        Layout-Daten auf Server speichern -> PDF generieren
    //                    saveandshow Layout-Daten auf Server speichern -> PDF generieren -> PDF herunterladen und anzeigen
    
    console.log("Funktion AbgleichOfferte, offertFormdata: ",offertFormData);
    console.log("flag_loading: ",flag_loading);
    
    this.progressbar_visible = true;
    if (this.snackBarRef) this.snackBarRef.dismiss();         // falls eine snackBar offen ist, diese verschwinden lassen
    
    
    if (flag_loading == false) {
      
      this.wofa_action = words.newDocument;
      
      console.log('Amasys-Interaktion: sync'); 
      console.log('OffertFormData aus webapp:',JSON.stringify(offertFormData)); 
    
      // Angebotsdaten von WebApp mittels Service offerteshoService an amasys senden
      this.offerteshowService.readwriteOfferte(offertFormData)
        .subscribe(offertdaten_abgleich => {
          
          console.log('Offertdaten aus amasys (Abgleich):',offertdaten_abgleich);  
          this.syncOffertJSON(offertFormData, offertdaten_abgleich);
          this.progressbar_visible = false;
          
          console.log('AbgleichOfferte, offertdaten_abgleich --> abgeschlossen: ' + offertdaten_abgleich.auftrag[0].abgeschlossen);
          if (offertdaten_abgleich.auftrag[0].abgeschlossen == true) this.verkaufsdokumentStatus = "lock_outline";
          
          // Handling von PDF-Erzeugung auf Server
          if (offertdaten_abgleich.auftrag[0].aufnr != '') {
            
            console.log('AbgleichOfferte, server_pdf_action-Handling, aufnr = ' + offertdaten_abgleich.auftrag[0].aufnr);
            console.log('AbgleichOfferte, server_pdf_action-Handling, server_pdf_action = ' + server_pdf_action);
            
            switch(server_pdf_action) { 
               case 'save': { 
                  console.log('AbgleichOffertem weiterführende PDF-Aktion auf Server: save'); 
                  this.multiprint(false, offertdaten_abgleich.auftrag[0].aufnr, false, server_pdf_action);
                  break; 
               }
               case 'saveandfinalize': { 
                  console.log('AbgleichOffertem weiterführende PDF-Aktion auf Server: saveandfinalize'); 
                  this.multiprint(false, offertdaten_abgleich.auftrag[0].aufnr, true, server_pdf_action);
                  break; 
               }
               case 'saveandshow': { 
                  console.log('AbgleichOffertem weiterführende PDF-Aktion auf Server: saveandshow'); 
                  this.multiprint(false, offertdaten_abgleich.auftrag[0].aufnr, false, server_pdf_action);
                  break; 
               } 
               default: { 
                  console.log('Keine weiterführende PDF-Aktion auf Server nach AbgleichOfferte');
                  this.editorContent = this.initializeFreeFormHTMLcode(offertdaten_abgleich.auftrag[0]);
                  //this.editorContent = 'Rolfs Super Formular';
                  break; 
               } 
            }
          }
          
        }, // Ende Success-Block von Angebotsdaten von WebApp mittels Service offerteshoService an amasys senden 
        
        
        // Start Error-Case-Block von Angebotsdaten von WebApp mittels Service offerteshoService an amasys senden
        err => {
          this.progressbar_visible = false;
          this.snackBarRef = this.snackBar.open(words.amasysError + ": " + err, '', { duration: 10000 });
          console.error(err);
        }); // Ende subscribe amasys-Sync
    }  // Ende If flag_loading == false
    
    else {
      // flag_loading == true --> neue Offerte muss geladen werden
      
      this.wofa_action = words.salesDoc + offertFormData.aufnr;
      
      console.log('Bestehende Offerte wird geladen');
      console.log("aufnr = " + offertFormData.aufnr);
      console.log("fremdID = " + offertFormData.fremdID);

      // Angebotsdaten von WebApp mittels Service getofferteService an amasys senden
      this.offerteshowService.restinsgetOfferte(offertFormData.aufnr, offertFormData.fremdID)
      // this.getofferteService.getOfferte(offertFormData.aufnr)
      
        .subscribe(offertdaten_freshload => {
          
          console.log('Offertdaten aus amasys (Full-Load):',offertdaten_freshload);  
          console.log('AbgleichOfferte, offertdaten_freshload --> abgeschlossen: ' + offertdaten_freshload.auftrag[0].abgeschlossen);
          console.log('AbgleichOfferte, offertdaten_freshload --> vorlage: ' + offertdaten_freshload.auftrag[0].vorlage);
          
          if (offertdaten_freshload.auftrag[0].systemfeedback=="") {
          
            // abgeschlossen? wenn ja, locken
            if (offertdaten_freshload.auftrag[0].abgeschlossen == true) this.verkaufsdokumentStatus = "lock_outline";
            
            // Template-Tracking
            if (offertdaten_freshload.auftrag[0].vorlage == '') {
              this.snackBarRef = this.snackBar.open(words.offerError, '', { duration: 10000 });
              
              // Templateänderung vornehmen und verarbeiten
              this.activePrintTemplate = this.instanzdata.startVorlage;
              
              // Daten für Freeform-Template vorbereiten
              this.editorContent = this.initializeFreeFormHTMLcode(offertdaten_freshload.auftrag[0]);
              
              this.onTemplateChange();
              
              // Werte aktualisieren
              this.syncOffertJSON(offertFormData, offertdaten_freshload);
            }
            else if (offertdaten_freshload.auftrag[0].vorlage.indexOf('freeform')<0) {
              console.log('Hinterlegte Vorlage ' + offertdaten_freshload.auftrag[0].vorlage + ' wird appliziert.');
              
              // Templateänderung vornehmen und verarbeiten
              this.activePrintTemplate = offertdaten_freshload.auftrag[0].vorlage;
              this.onTemplateChange();
              
              // Werte aktualisieren
              this.syncOffertJSON(offertFormData, offertdaten_freshload);
            }
            else {
              console.log('Hinterlegte Freeform-Vorlage ' + offertdaten_freshload.auftrag[0].vorlage + ' wird appliziert.');
              
              // HTML für Editor-DIV holen, falls vorhanden
              this.offerteshowService.restinsoffertegetHTML(offertFormData.aufnr)
                .subscribe(editorHTML => {
                  
                  if (editorHTML.tt_insoffertegetHTML[0].datei != null) {
  
                    // Editor-DIV abfüllen
                    this.editorContent = decodeURIComponent(Array.prototype.map.call(atob(editorHTML.tt_insoffertegetHTML[0].datei), (c) => {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                      }).join(""));
                    
                    // Template zuweisen und Werte aktualisieren  
                    this.activePrintTemplate = offertdaten_freshload.auftrag[0].vorlage;
                    this.onTemplateChange();
              
                    // Werte aktualisieren
                    this.syncOffertJSON(offertFormData, offertdaten_freshload);
  
                  }
                  else {
                    this.snackBarRef = this.snackBar.open(words.freeFormError, '', { duration: 10000 });
                  }
                  
                })
              
              
            }
            
          } // ENDE Test auf systemfeedback == ""
          else // Error-Handling, obwohl amasys etwas zurück schickt
          {
            console.log('offertFormData.fremdID = ' + offertFormData.fremdID);
            // console.log('this.meinVerkaufsdokumentFormular.value.fremdID = ' + this.meinVerkaufsdokumentFormular.value.fremdID);
            console.log('offertFormData.aufnr = ' + offertFormData.aufnr);
            
            if ((offertFormData.fremdID != "") && (offertdaten_freshload.auftrag[0].systemfeedback === 'Auftrag nicht vorhanden.')) {
              console.log('@@@@@@ Neu laden anhand von fremdID/OpportunityId hat nicht funktioniert --> neue Offerte erstellen mit fremdID "' + offertFormData.fremdID + '"als weiterer Schlüssel @@@@@');
              this.AbgleichOfferte(this.meinVerkaufsdokumentFormular.value, false);
            }
          }
          
          
          this.progressbar_visible = false;
          
          
          // Damit PDF heruntergeladen werden kann
          if (this.verkaufsdokumentStatus === "lock_outline") {
            console.log('Multiprint beim Laden einer bestehenden abgeschlossenen Offerte; weiterführende PDF-Aktion auf Server: save'); 
            this.multiprint(false, offertdaten_freshload.auftrag[0].aufnr, false, 'save');
          }
          
          
        }, // Ende Success-Block von Offerte aus amasys laden 
        
        
        // Starte Error-Block von Offerte aus amasys laden
        err => {
          
          this.snackBarRef = this.snackBar.open(words.loadingError + ": " + err, '', { duration: 10000 });
          this.progressbar_visible = false;
          console.error(err);
          
        }); // Ende subscribe Full-Load
    } // Ende If flag_loading == true
    
  } // Ende Funktion AbgleichOfferte() 

} // Ende class OfferteShowComponent

// ----------- Dialoge --------------

// Objektauswahl-Dialog
@Component({
  selector: 'dialog-objekt-auswahl-dialog',
  templateUrl: 'dialog-objekt-auswahl-dialog.html'
})
export class DialogObjektAuswahlDialog { 
  
  // public objektAuswahlFormFormular: FormGroup;
  dialogObjektCtrl:       FormControl;
  choosenObjekt:          string;
  dialogObjektArray:      any;
  
  // Material für Objekt-Autocompleter
    // dialogSelectedObjek:  string;
    // objektCtrl: FormControl;
    dialogFormObjekte:    any;
  // Ende Material für Objekt-Autocompleter
  
  constructor(
    public dialogRef: MatDialogRef<DialogObjektAuswahlDialog>,
    private objektauswahlService:ObjektauswahlService,) {
    
    this.createDialogObjektArray();
    
    this.dialogObjektCtrl = new FormControl();
    
    // Start Labor Objekt-Autocompleter
    // this.objektCtrl = new FormControl();
    this.dialogFormObjekte = this.dialogObjektCtrl.valueChanges
        .pipe(startWith(this.dialogObjektCtrl.value))
        .pipe(map(val => this.dialogObjektDisplayFn(val)))
        .pipe(map(obj_bezeichnung => this.dialogFilterObjekte(obj_bezeichnung)));
        
    // Ende Labor Objekt-Autocompleter  
    
  }
  
  // Funktionen Objekt-Autocompleter
    
    dialogObjektDisplayFn(value: any): string {
      
      console.log("objektDisplayFn, val:" + value);
      return value && typeof value === 'object' ? value.obj_bezeichnung : value;
      
    }
    
  
    dialogFilterObjekte(val: string) {
      
      if (val) {
        
        const filterValue = val.toLowerCase();
        
        console.log("filterValue: " + filterValue);
        console.log("filtered: " + JSON.stringify(this.dialogObjektArray.filter(pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue))));
        
        return this.dialogObjektArray.filter(pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue));
        //return this.objektdata.filter((pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue)) || (pTitel => pTitel.objekt.toLowerCase().startsWith(filterValue)));
        //return this.objektdata.filter((pTitel => pTitel.objekt.toLowerCase().startsWith(filterValue)) || (pTitel => pTitel.obj_bezeichnung.toLowerCase().startsWith(filterValue)));
      }
      
      return this.dialogObjektArray;
    }
    
    // abfüllen Objektauswahl
    createDialogObjektArray(){
      this.objektauswahlService.showObjekt('','no').subscribe(objval => {
        this.dialogObjektArray = objval;
        console.log('ObjektArray für Dialog initialisiert' + JSON.stringify(this.dialogObjektArray));
      }, err => {
        console.error(err);
      });
    }
    
    
    sendBackObjekt(text: string) {
      // console.log("**************** MessageUser:" + text);
      // console.log("**************** FormControl-Value:" + this.dialogObjektCtrl.value);
      // console.log("Closing dialog");
      
      let retValue:any = JSON.stringify(this.dialogFilterObjekte(this.dialogObjektDisplayFn(text)));
      // let retValue:any = JSON.stringify(this.dialogFilterObjekte(text));
      // let retValue:any = JSON.parse(this.dialogFilterObjekte(text));
      // console.log("messageUser: " + retValue);
      // console.log("messageUser: " + JSON.stringify(this.dialogFilterObjekte(this.dialogObjektDisplayFn(text))));
      
      
      // this.dialogRef.close(this.dialogObjektCtrl.value);
      this.dialogRef.close(retValue);
      
      // console.log("Dialog closed");
    }
  
  // Ende Funktionen Objekt-Autocompleter
} // Ende class DialogObjektAuswahlDialog

