import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {RestupdateadrhauptService} from '../../services/restupdateadrhaupt.service';
import {RestgetplzortService} from '../../services/restgetplzort.service';
import {CookieService} from 'ng2-cookies';
import {RestsygetdefaultService} from '../../../crmplus/shared/services/restsygetdefault.service';
import {WindowsizeService} from '../../../../shared/services/windowsize.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-update-neuer-kunde',
  templateUrl: './update-neuer-kunde.component.html',
  styleUrls: ['./update-neuer-kunde.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UpdateNeuerKundeComponent implements OnInit {

  currentAppModule: string    = "ADCO";
  modulename:string;
  lastAppModule: string       = "ADCO";
  currentUser: string = "";
  licensedModules: any = [];
  sidenavmodules:any = [];
  sidenavExpanded:boolean = false;

  adressForm: FormGroup;

  adressJson: any;
  urlparams: any;
  innerheightwindow: number;
  innerheight: number;
  expanded: number[] = [0]; //welche akkordeon sind offen

  speicherValue: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog,
              private updateadrhauptService: RestupdateadrhauptService, private router: Router,
              private cookieService: CookieService, private restsygetdefaultService: RestsygetdefaultService,
              private windowsizeService: WindowsizeService) {

    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
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
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
    }

  }

  windowResize(event){
    this.innerheightwindow = self.innerHeight - 60 - 4;

  }

  ngOnInit() {

     this.innerheight = self.innerHeight - 160;

    this.adressForm = this.fb.group({
      adrnkey: [''],
      Anrkey: [''],
      fname: [''],
      vname: [''],
      gname: [''],
      gname2: [''],
      strasse: [''],
      plz: [''],
      plzzu: [''],
      ort: [''],
      beznr: [''],
      adrtyp: [''],
      bundesland: [''],
      land: [''],
      nr: [''],
      postf: [''],
      pdruck: [''],
      pplz: [''],
      pplzzu: [''],
      port: [''],
      pbundesland: [''],
      pland: [''],
      telge: [''],
      telgedi: [''],
      telpriv: [''],
      natel: [''],
      teleueber: [''],
      haupttelnr: [''],
      faxge: [''],
      faxgedi: [''],
      faxpriv: [''],
      kfrei: [''],
      abkname: [''],
      bbeznr: [''],
      anzbesch: [''],
      sprache: [''],
      alte_nr: [''],
      Email: [''],
      Email2: [''],
      Email3: [''],
      web: [''],
      adrtitel: [''],
      anrtitel: [''],
      anrtitel2: [''],
      standort: [''],
      ftitel: [''],
      bereich: [''],
      anlass: [''],
      xdatum: [''],
      gueltigab: [''],
      aabt: [''],
      adatum: [''],
      adrtyp_txt: [''],
      afirma: [''],
      anrkey_txt: [''],
      antwortcode: [''],
      arechner: [''],
      auser: [''],
      azeit: [''],
      botennr: [''],
      extaabt: [''],
      extadatum: [''],
      extafirma: [''],
      extauser: [''],
      extazeit: [''],
      extnabt: [''],
      extndatum: [''],
    extnfirma: [''],
    extnuser: [''],
    extnzeit: [''],
    fehlerart: [''],
    fehlercode: [''],
    fehlertext: [''],
    gbeznr: [''],
    gueltigbis: [''],
    hauskey: [''],
    kname: [''],
    kstr: [''],
    kstrart: [''],
    kstrhnr: [''],
    kstrhnral: [''],
    kstrpraep: [''],
    land_txt: [''],
    modkey: [''],
    mutationscode: [''],
    nabt: [''],
    ndatum: [''],
    nfirma: [''],
    nomutmld: [false],
    nrechner: [''],
    nuser: [''],
    nzeit: [''],
    orderptt: [''],
    phon_kname: [''],
    pland_txt: [''],
    porderptt: [''],
    s_tel: [''],
    sperr: [''],
    sperr_txt: [''],
    sprache_txt: [''],
    stat: [''],
    stat_txt: [''],
    statdat: [''],
    strid: [''],
    strnr: [''],
    telueber: [''],
    timestamp: [''],

    })
    this.preloadData();




  }
  //localhost:4200/#/edp/kundensucheview/neuerkunde-show;template=%7B%22beznr%22:0,%22bbeznr%22:0,%22sprache%22:%22%22,%22standort%22:%22%22,
      // %22ftitel%22:%22%22,%22kfrei%22:%22%22,%22bereich%22:%22%22,%22modkey%22:0,%22adrtyp%22:%22%22,%22nr%22:%22%22,%22alte-nr%22:%22%22,
      // %22abkname%22:%22%22,%22sperr%22:%22%22,%22gbeznr%22:0,%22gueltigab%22:null,%22gueltigbis%22:null,%22adrtitel%22:%22%22,
      // %22anrtitel%22:%22%22,%22anrtitel2%22:%22%22,%22fname%22:%22%22,%22vname%22:%22%22,%22gname%22:%22%22,%22gname2%22:%22%22,
      // %22anlass%22:%22%22,%22xdatum%22:%220001-01-01%22,%22telpriv%22:%22%22,%22telge%22:%22%22,%22telgedi%22:%22%22,%22faxpriv%22:%22%22,
      // %22faxge%22:%22%22,%22faxgedi%22:%22%22,%22natel%22:%22%22,%22telueber%22:%22%22,%22Email%22:%22%22,%22web%22:%22%22,
      // %22Anrkey%22:%22%22,%22stat%22:%220%22,%22statdat%22:%220001-01-01%22,%22aabt%22:%22%22,%22adatum%22:null,
      // %22afirma%22:0,%22arechner%22:%22%22,%22auser%22:%22%22,%22azeit%22:%22%22,%22nabt%22:%22%22,%22ndatum%22:null,
      // %22nfirma%22:0,%22nrechner%22:%22%22,%22nuser%22:%22%22,%22nzeit%22:%22%22,%22haupttelnr%22:%22%22,%22s-tel%22:%22%22,
      // %22kname%22:%22%22,%22phon-kname%22:%22%22,%22strasse%22:%22%22,%22land%22:%22CH%22,%22plz%22:%22%22,%22plzzu%22:%22%22,
      // %22ort%22:%22%22,%22bundesland%22:%22%22,%22strnr%22:0,%22postf%22:%22%22,%22pland%22:%22%22,%22pplz%22:%22%22,
      // %22pplzzu%22:%22%22,%22port%22:%22%22,%22pbundesland%22:%22%22,%22kstr%22:%22%22,%22kstrart%22:%22%22,%22pdruck%22:%22%22,
      // %22kstrpraep%22:%22%22,%22kstrhnr%22:%22%22,%22anzbesch%22:0,%22botennr%22:%22%22,%22kstrhnral%22:%22%22,%22adrnkey%22:%22%22,
      // %22hauskey%22:%22%22,%22nomutmld%22:false,%22Email2%22:%22%22,%22Email3%22:%22%22,%22extaabt%22:%22%22,%22extadatum%22:null,
      // %22extafirma%22:0,%22extauser%22:%22%22,%22extazeit%22:%22%22,%22extnabt%22:%22%22,%22extndatum%22:null,%22extnfirma%22:0,
      // %22extnuser%22:%22%22,%22extnzeit%22:%22%22,%22strid%22:%22%22,%22orderptt%22:0,%22porderptt%22:0,
      // %22timestamp%22:%220001-01-01T00:00:00.000%22,%22UID%22:%22%22,%22fehlercode%22:%22%22,%22fehlertext%22:%22%22,
      // %22mutationscode%22:%22%22,%22fehlerart%22:%22%22,%22antwortcode%22:%22%22,%22sprache_txt%22:%22%22,%22anrkey_txt%22:%22%22,%22adrtyp_txt%22:%22%22,
      // %22land_txt%22:%22Schweiz%22,%22pland_txt%22:%22%22,%22sperr_txt%22:%22%22,%22stat_txt%22:%22aktiv%22%7D

  //gueltigab%22:null,%22gueltigbis
  //xdatum%22:%220001-01-01%22
  //statdat%22:%220001-01-01%22
  //adatum%22:null
  //ndatum%22:null

  // let tempArr: string[] = ausgabe.erschdat.split(".");
  // let tempDate: string = tempArr[1] + "." + tempArr[0] + "." + tempArr[2];
  //
  // //datum updaten
  // let newDate = new Date(tempDate);
  // this.abodetails[_abodetailsVar] = this.datePipe.transform(newDate, 'yyyy-MM-dd');

  preloadData() {
    const dpipe = new DatePipe('de-CH');
    // if (this.adressForm.value.beznr !== 0 || this.adressForm.value.beznr !== '' || !this.adressForm.value.beznr) {
      this.urlparams = this.route.params.subscribe(params => {
        if (params.kunde) {
          let tempjson = JSON.parse(params.kunde)
          console.log("params", tempjson[0]);
          let newDate = new Date(tempjson[0].gueltigab);
          let gueltigab = dpipe.transform(newDate, 'yyyy-MM-dd');
          console.log('gueltigab', gueltigab)
          tempjson[0]['gueltigab'] = gueltigab;
          this.speicherValue = 'A';

          this.adressForm.patchValue(tempjson[0]);
        } else if (params.template) {
          console.log('neue erfassung', JSON.parse(params.template));
          let tempjson = JSON.parse(params.template)
          let newdate: Date = new Date ();
          let gueltigabstring = dpipe.transform(newdate, 'yyyy-MM-dd');
          let gueltigab: Date = new Date(gueltigabstring);
         // let gueltigab: String = gueltigabdate.toLocaleDateString("de-CH", {
         //    year: "numeric",
         //    month: "2-digit",
         //    day: "2-digit"
         //  });
          console.log('gueltigab', gueltigab)
          tempjson['gueltigab'] = gueltigab;
          this.speicherValue = 'N';
          this.adressForm.patchValue(tempjson);
        }
      });
    // } else {
    //   console.log('neue erfassung');
    //   this.urlparams = this.route.params.subscribe(params => {
    //     console.log('neue erfassung', JSON.parse(params.template));
    //     let tempjson = JSON.parse(params.template)
    //     this.speicherValue = 'N';
    //     this.adressForm.patchValue(tempjson);
    //   });
    // }
  }

  onSubmit() {

  }

  showSpeicherdialog(val) {
    const dialogRef = this.dialog.open(SpeichernDialog, {
      width: '700px',
      data: val
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === '0') {
        console.log('val', val[0].fehlerart, val[0].fehlercode);
        let tempadressform = this.adressForm;
        tempadressform.value['antwortcode'] = 0;
        tempadressform.value['fehlerart'] = val[0].fehlerart;
        tempadressform.value['fehlercode'] = val[0].fehlercode;
        this.adressForm.patchValue(tempadressform.value);
        if (val[0].fehlerart === '') {
          this.postAdresse(tempadressform.value);
        } else {
          console.log('Fehlermeldung besteht noch' + val[0].fehlerart);
        }



      } else if (result === '1') {
        let tempadressform = this.adressForm;
        tempadressform.value['antwortcode'] = 1;
        this.adressForm.patchValue(tempadressform.value);
        if (val[0].fehlerart === '') {
          this.updateadrhauptService.postHauptadresse(tempadressform.value, this.speicherValue)
              .subscribe(save => {
                console.log('postHauptadresse', save);
                this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
              });
        } else {
          console.log('Fehlermeldung besteht noch' + val[0].fehlerart);
        }

      } else {

      }
    });
  }

  postAdresse(adressvalue) {
    this.updateadrhauptService.postHauptadresse(adressvalue, this.speicherValue)
        .subscribe(save => {
          console.log('postHauptadresse', save);
          if (save.tt_adrn[0]['fehlercode'] !== '') {
            this.showSpeicherdialog(save.tt_adrn);
          } else {
            this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
          }
          // this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
        });

  }

  showPlzOrt() {

    const dialogRef = this.dialog.open(PlzortDialog, {
      width: '700px',
      height: this.innerheight + 'px',
      data: this.adressForm.value
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        let tempadressform = this.adressForm;
        tempadressform.value['ort'] = result.ort;
        tempadressform.value['plz'] = result.plz;
        tempadressform.value['plzzu'] = result.plzzu;
        this.adressForm.patchValue(tempadressform.value);
      }
    });
  }

  showCoden(val, param) {
    const dialogRef = this.dialog.open(CodenDialog, {
      width: '700px',
      height: this.innerheight + 'px',
      data: {val}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        let tempadressform = this.adressForm;
        if (result.code_art === 'ANREDE' && param === 'Anrkey') {
          tempadressform.value['Anrkey'] = result.code_wert;
          tempadressform.value['anrkey_txt'] = result.code_text;
        } else if (result.code_art === 'ADRTYP'  && param === 'adrtyp') {
          tempadressform.value['adrtyp'] = result.code_wert;
          tempadressform.value['adrtyp_txt'] = result.code_text;
        } else if (result.code_art === 'BLAND' && param === 'bundesland') {
          console.log('kanton', result.code_wert.toString().substring(4));
          tempadressform.value['bundesland'] = result.code_wert.toString().substring(4);
        } else if (result.code_art === 'BLAND' && param === 'land') {
          tempadressform.value['land'] = result.code_wert;
        } else if (result.code_art === 'BLAND' && param === 'pbundesland') {
          console.log('kanton', result.code_wert);
          tempadressform.value['pbundesland'] = result.code_wert.toString().substring(4);
        } else if (result.code_art === 'BLAND' && param === 'pland') {
          tempadressform.value['pland'] = result.code_wert;
        } else if (result.code_art === 'SPRACHE' && param === 'sprache') {
          tempadressform.value['sprache'] = result.code_wert;
        } else if (result.code_art === 'TITEL' && param === 'adrtitel') {
          tempadressform.value['adrtitel'] = result.code_wert;
        } else if (result.code_art === 'TITEL' && param === 'anrtitel') {
          tempadressform.value['anrtitel'] = result.code_wert;
        } else if (result.code_art === 'ANRTITEL' && param === 'anrtitel2') {
          tempadressform.value['anrtitel2'] = result.code_wert;
        } else if (result.code_art === 'FUNKTION' && param === 'funktion') {
          tempadressform.value['funktion'] = result.code_text;
        } else if (result.code_art === 'ABTEILUN' && param === 'abteilun') {
          tempadressform.value['abteilun'] = result.code_text;
        } else if (result.code_art === 'ANLASS' && param === 'anlass') {
          tempadressform.value['anlass'] = result.code_text;
        } else {
          console.log('Keine Auswahl getroffen');
        }
        console.log('The dialog was closed', tempadressform);
        this.adressForm.patchValue(tempadressform.value);
      }
        else {
        console.log('Keine Auswahl getroffen');
      }
    });
  }

  saveAdresse(val) {
    val.stopPropagation();
    this.onSubmit();
    console.log('this.adressForm.value', this.adressForm.value.mutationscode);
    this.updateadrhauptService.postHauptadresse(this.adressForm.value, this.speicherValue)
        .subscribe(save => {
          console.log('postHauptadresse', save);
          if (save) {
            if (save.tt_adrn[0]['fehlerart'] !== '') {
              this.showSpeicherdialog(save.tt_adrn);
            } else {
              this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': save.tt_adrn[0]['beznr']}]);
              // this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
            }

          }
          //this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
        })
  }

  abbrechenAdresse() {
    this.router.navigate(['./kundensucheview/kundensuche-show', {'beznr': this.adressForm.value.beznr}]);
  }
}



@Component({
  selector: 'coden-dialog',
  templateUrl: 'coden-dialog.html',
})
export class CodenDialog implements OnInit {

  condenArt: any;
  constructor(public dialogRef: MatDialogRef<CodenDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.condenArt = this.data.val;
  }
  ngOnInit(): void {
    console.log("coden dialog");
  }

  moduleAuswahl(val) {
    console.log('coden-dialog', val);
    this.data = val;
  }

  codeAuswahl(val) {
    console.log('coden-dialog', val);
    this.dialogRef.close(val)
  }
}

@Component({
  selector: 'plzort-dialog',
  templateUrl: 'plzort-dialog.html',
  styleUrls: ['./plzort-dialog-design.css']
})
export class PlzortDialog implements OnInit {

  plzortdata: any;
  suchresultplzort: any;
  constructor(public dialogRef: MatDialogRef<CodenDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private getplzortService: RestgetplzortService) {
    this.plzortdata = data;

  }
  ngOnInit(): void {
    console.log("plzort dialog", this.plzortdata);
    this.getplzortService.getPlzort(this.plzortdata.plz, this.plzortdata.ort, this.plzortdata.land)
        .subscribe(plzorttemp => {
          console.log('plzorttemp', plzorttemp);
          this.suchresultplzort = plzorttemp;
        })
  }

  openPlzort(val) {
    console.log('openPlzort', val);
    this.dialogRef.close(val)
  }
}

@Component({
  selector: 'speichern-dialog',
  templateUrl: 'speichern-dialog.html',
  styleUrls: ['./speichern-dialog-design.css']
})
export class SpeichernDialog implements OnInit {

  speicherdata: any;
  constructor(public dialogRef: MatDialogRef<SpeichernDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private getplzortService: RestgetplzortService) {
    this.speicherdata = data;

  }
  ngOnInit(): void {
    console.log("SpeichernDialog", this.speicherdata);

  }


  jaSpeichern() {
    this.dialogRef.close('0');
  }

  neinSpeichern() {
    this.dialogRef.close('1');
  }
}


export class HauptAdresse {
  Anrkey: string;
  Email: string;
  Email2: string;
  Email3: string;
  aabt: string;
  abkname: string;
  adatum: string;
  adrnkey: string;
  adrtitel: string;
  adrtyp: string;
  adrtyp_txt: string;
  afirma: number;
  alte_nr: string;
  anlass: string;
  anrkey_txt: string;
  anrtitel: string;
  anrtitel2: string;
  antwortcode: string;
  anzbesch: number;
  arechner: string;
  auser: string;
  azeit: string;
  bbeznr: number;
  bereich: string;
  beznr: number;
  botennr: string;
  bundesland: string;
  extaabt: string;
  extadatum: string;
  extafirma: number;
  extauser: string;
  extazeit: string;
  extnabt: string;
  extndatum: string;
  extnfirma: number;
  extnuser: string;
  extnzeit: string;
  faxge: string;
  faxgedi: string;
  faxpriv: string;
  fehlerart: string;
  fehlercode: string;
  fehlertext: string;
  fname: string;
  ftitel: string;
  gbeznr: string;
  gname: string;
  gname2: string;
  gueltigab: string;
  gueltigbis: string;
  haupttelnr: string;
  hauskey: string;
  kfrei: string;
  kname: string;
  kstr: string;
  kstrart: string;
  kstrhnr: string;
  kstrhnral: string;
  kstrpraep: string;
  land: string;
  land_txt: string;
  modkey: string;
  mutationscode: string;
  nabt: string;
  natel: string;
  ndatum: string;
  nfirma: string;
  nomutmld: boolean;
  nr: string;
  nrechner: string;
  nuser: string;
  nzeit: string;
  orderptt: number;
  ort: string;
  pbundesland: string;
  pdruck: string;
  phon_kname: string;
  pland_txt: string;
  plz: string;
  plzzu: string;
  porderptt: number;
  port: string;
  postf: string;
  pplz: string;
  pplzzu: string;
  s_tel: string;
  sperr: string;
  sperr_txt: string;
  sprache: string;
  sprache_txt: string;
  standort: string;
  stat: string;
  stat_txt: string;
  statdat: string;
  strasse: string;
  strid: string;
  strnr: number;
  telge: string;
  telgedi: string;
  telpriv: string;
  telueber: string;
  timestamp: string;
  vname: string;
  web: string;
  xdatum: string;
}

