import { Component, OnInit, OnChanges, Input, Inject, Output, EventEmitter, ElementRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { AboComponent } from '../../../../abo/abo/abo.component';
import { AbodetailComponent } from '../../abodetail/abodetail.component';
import { RestGetcodeService } from '../../../rest-services/rest-getcode.service';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';
import { RestAboobjausgabenService } from '../../../rest-services/rest-aboobjausgaben.service';
import { RestSetdeleteaboService } from '../../../rest-services/rest-setdeleteabo.service';
import { RestPalettierService } from '../../../rest-services/rest-palettier.service';
import { RestBankenService } from '../../../rest-services/rest-banken.service';
import { RestSaldoService } from '../../../rest-services/rest-saldo.service';
import { RestAbopreisService } from '../../../rest-services/rest-abopreis.service';
import { RestAboobjektService } from '../../../rest-services/rest-aboobjekt.service';
import { RestAbozustellungenService } from '../../../rest-services/rest-abozustellungen.service';
import { ErrormessageService } from '../../../services/errormessage.service';
import { RestAboanznrcalcService } from '../../../rest-services/rest-aboanznrcalc.service';
import { GetaboinfoService } from '../../../rest-services/getaboinfo.service';
import { RestLeitwegService } from '../../../rest-services/rest-leitweg.service';
import { AschluesselauswahlService } from '../../../../../shared/services/aschluesselauswahl.service';

@Component({
  selector: 'app-aboverwaltung',
  templateUrl: './aboverwaltung.component.html',
  styleUrls: ['./aboverwaltung.component.css'],
  providers: [ DatePipe ],
})
export class AboverwaltungComponent implements OnInit, AfterViewInit {

  @Input() abodetailsInput: any; //abodetails von abolist
  @Input() zwischenspeicher: any; //zwischenspeicher nach CODN/ADRW
  @Input() isOpen: boolean; //ob verwaltung-akkordeon momentan offen ist

  @Output() sendToolnutzungZuAbolist = new EventEmitter(); //tool wird benutzt -> meldung an abolist
  @Output() activateAutoScroll = new EventEmitter();
  
  @ViewChildren('zustlbeznr') zustlbeznr: QueryList<ElementRef>;
  @ViewChildren('zustvart') zustvart: QueryList<ElementRef>;

  abodetails: any;
  aboPos: string; //abo-position ("first", "last", "inBetween")

  aboIndex: number;
  anzahlAbos: number;
  istAboNeu: boolean;

  editingAbo: boolean = false; //wird momentan ein neues abo bearbeitet

  expanded: number[] = [0]; //welche akkordeon sind offen

  lieferungUnreg: boolean; //ob die lieferung unregelmaessig ist oder nicht

  palettierIdAuswahl: any;
  kontoAuswahl: any;
  objektAuswahl: any;
  ausgAuswahl: any;
  bankenAuswahl: any;
  geschenkAuswahl: any;

  ausgabeplan: any;
  ausgabeplanAusgewaehlt: {} = {};

  //pro abozust eine leitwegAuswahl: {1: [...], 2: [...], ...}
  //das ganze ist ein objekt, da es mit arrays probleme geben kann wenn der array zu klein ist für z.B. leitwegAuswahl[3]
  //mit dem objekt kann einfach nach z.B. leitwegAuswahl['3'] gesucht werden
  leitwegAuswahlen: any = {};
  leitwegeAusgewaehlt: any = {};

  anznr: number = 0;

  constructor(private getcodeService: RestGetcodeService,
              private aboDetailComponent: AbodetailComponent,
              private adrkundenService: AdrkundenService,
              private aboAusgabenService: RestAboobjausgabenService,
              private aboComponent: AboComponent,
              private datePipe: DatePipe,
              private setdeleteAboService: RestSetdeleteaboService,
              private palettierService: RestPalettierService,
              private bankenService: RestBankenService,
              private kontenService: RestSaldoService,
              private abopreisService: RestAbopreisService,
              private aboobjService: RestAboobjektService,
              private zustService: RestAbozustellungenService,
              private msgService: ErrormessageService,
              private terminbisService: RestAboanznrcalcService,
              private aboinfoService: GetaboinfoService,
              private leitwegService: RestLeitwegService,
              private cdRef:ChangeDetectorRef, 
              private aschlusauswService: AschluesselauswahlService,
              public dialog: MatDialog ) { }

  ngOnInit() {
    //palettierID's laden
    this.palettierService.getPalettierIDs()
      .subscribe( ret => {
        this.palettierIdAuswahl = ret;
    });

    //variablen aus sessionStorage laden
    if(sessionStorage.getItem('aboVerwaltungExpanded')){
      this.expanded = JSON.parse(sessionStorage.getItem('aboVerwaltungExpanded'));
    }

    //zwischenspeicher einsetzen (geupdated von CODN oder ADRW)
    if(this.zwischenspeicher !== null){
      this.abodetails = JSON.parse(JSON.stringify(this.zwischenspeicher.abodetail));
      if(this.abodetails.tt_abozust.length === 1) {
        this.lieferungUnreg = false;
      }

      this.loadBanken(this.abodetails.rbeznr);
      this.loadKonten(this.abodetails.rbeznr);
      this.loadObjekte(this.abodetails.artnr);
      this.loadAusgabeplan(this.abodetails.artnr);
      this.loadGeschenke();
      this.getAboPos();

      this.editingAbo = this.istAboNeu;

      let vonWelcherMethode = this.zwischenspeicher.vonWo.split(':')[1];
      if(vonWelcherMethode === 'beznr' || vonWelcherMethode.match(/tt_abozust\[\d\]\.lbeznr/) !== null) {
        this.updateLieferDaten();
      }
      
      if (vonWelcherMethode.match(/tt_abozust\[\d\]\.vart/) !== null || vonWelcherMethode.match(/tt_abozust\[\d\]\.vart/) !== null) {
        this.loadAlleLeitwege();
      }
    }
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.updateVartLbeznr();
      this.activateAutoScroll.emit();
      this.cdRef.detectChanges(); //damit 'ExpressionHasChangedAfterItHasBeenCheckedError' umgangen wird
    }, 0);
  }

  ngOnChanges(change: any) {
    //falls neue abodetails -> diese updaten
    if(change.abodetailsInput){
      if(JSON.stringify(change.abodetailsInput.currentValue) != JSON.stringify(change.abodetailsInput.previousValue)){
        
        if(!this.abodetailsInput.abo) {
          return;
        }
        this.abodetails = JSON.parse(JSON.stringify(this.abodetailsInput.abo));
        this.loadBanken(this.abodetails.rbeznr);
        this.loadKonten(this.abodetails.rbeznr);
        this.loadObjekte(this.abodetails.artnr);
        this.loadAusgabeplan(this.abodetails.artnr);
        this.loadGeschenke();

        if(this.abodetails.tt_abozust.length > 1) {
          this.loadBezeichnungen();
          this.lieferungUnreg = true;
        } else {
          this.lieferungUnreg = false;
        }
        this.updateVartLbeznr();

        this.editingAbo = !this.abodetailsInput.newAboPossible;
        this.anzahlAbos = this.abodetailsInput.anzahlAbos;
        this.aboIndex = this.abodetailsInput.aboIndex;
        this.istAboNeu = this.abodetailsInput.aboIstNeu;
        this.getAboPos();
      }
    }
  }

  loadAusgabeplan(artnr: string): void {
    this.aschlusauswService.showAschluessel(artnr, '', '')
      .subscribe( ret => {
        if(ret){
          this.ausgabeplan = ret;
          
          //updated ausgabenauswahl
          this.chooseDateZuAusgabe('faktAb', 'fakturabeginn1');
          this.chooseDateZuAusgabe('faktFix', 'fakturabeginn2');
          this.chooseDateZuAusgabe('zustBis', 'terminbis');
          this.chooseDateZuAusgabe('zustVon', 'terminvon');
        }
    });
  }

  //eine ausgabe wird angewaehlt -> der datepicker wechselt auf dieses datum
  chooseAusgabe(_varName: string, _abodetailsVar: string): void {
    if(this.ausgabeplanAusgewaehlt[_varName]){
      let ausgabe: any = this.ausgabeplan.find(ausg => ausg.aschlussel === this.ausgabeplanAusgewaehlt[_varName]);
      if(ausgabe !== undefined) {
        //new Date erwartet datum mit MM.dd.yyyy, vom backend kommt aber dd.MM.yyyy -> wird in den nächsten zeilen angepasst
        let tempArr: string[] = ausgabe.erschdat.split(".");
        let tempDate: string = tempArr[1] + "." + tempArr[0] + "." + tempArr[2];

        //datum updaten
        let newDate = new Date(tempDate);
        this.abodetails[_abodetailsVar] = this.datePipe.transform(newDate, 'yyyy-MM-dd');
      }
    }
    console.log(JSON.parse(JSON.stringify(this.abodetails)));
  }

  //neues datum wird eingegeben -> wenn es mit ausgabe-datum uebereinstimmt, wird diese ausgabe angewaehlt
  chooseDateZuAusgabe(_varName: string, _abodetailsVar: string): void {
    if(!this.ausgabeplan) {
      return;
    }
    let inputDate: Date = new Date(this.abodetails[_abodetailsVar]);
    let inputDateString: string = inputDate.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    //suche ausgabe mit ausg.erschdat === input-datum (datepicker)
    let ausgabe = this.ausgabeplan.find(ausg => ausg.erschdat === inputDateString);
    if(ausgabe !== undefined) {
      this.ausgabeplanAusgewaehlt[_varName] = ausgabe.aschlussel;
    }
    console.log(JSON.parse(JSON.stringify(this.abodetails)));
  }

  loadBezeichnungen() {
    var abozust = this.abodetails.tt_abozust;
    this.zustService.getZustellTage(this.abodetails.artnr, abozust[0].vart, abozust[0].leitweg, abozust[0].menge, abozust[0].lbeznr)
      .subscribe( ret => {
        if(!ret || ret === [] || ret[0].fehlercode !== '') {
          return;
        }

        this.loadAlleLeitwege();
        for(let i = 0; i < abozust.length; i++) {
          abozust[i].bezeichnung = ret[i].bezeichnung;
        }
    });
  }

  //updated vart- und lbeznr-texte, da diese nicht vom backend kommen
  updateVartLbeznr(): void {
    //updated lbeznr-text
    if(this.zustlbeznr === undefined) {
      return;
    }
    this.updateLbeznr();
    let lbeznrSubscribtion = this.zustlbeznr.changes.subscribe((comps: QueryList<ElementRef>) => {
      this.updateLbeznr(lbeznrSubscribtion);
    });

    //updated vart-text
    if(!this.zustvart) {
      return;
    }
    this.updateVart();
    let vartSubscribtion = this.zustvart.changes.subscribe((comps: QueryList<ElementRef>) => {
      this.updateVart(vartSubscribtion);
    });
  }

  updateVart(sub?: any): void {
    if(this.zustvart['_results'].length === this.abodetails.tt_abozust.length) {
      for(let i = 0; i < this.abodetails.tt_abozust.length; i++) {
        this.searchCODN('ABOVSART', 'tt_abozust[' + i +'].vart', 'zustvart:' + i);
      }
      if(sub){
        sub.unsubscribe();
      }
    } else if(this.zustvart['_results'].length === 1 && this.lieferungUnreg === false) {
      this.searchCODN('ABOVSART', 'tt_abozust[0].vart', 'zustvart:0');
      if(sub){
        sub.unsubscribe();
      }
    }
  }

  updateLbeznr(sub?: any): void {
    if(this.zustlbeznr['_results'].length === this.abodetails.tt_abozust.length) {
      for(let i = 0; i < this.abodetails.tt_abozust.length; i++) {
        this.searchADRW('tt_abozust[' + i +'].lbeznr', 'zustlbeznr:' + i);
      }
      if(sub){
        sub.unsubscribe();
      }
    } else if(this.zustlbeznr['_results'].length === 1 && this.lieferungUnreg === false) {
      this.searchADRW('tt_abozust[0].lbeznr', 'zustlbeznr:0');
      if(sub){
        sub.unsubscribe();
      }
    }
  }

  getAboPos() {
    if(this.aboIndex === 0) {
      this.aboPos = 'first';
    } else if((this.aboIndex + 1) === this.anzahlAbos) {
      this.aboPos = 'last';
    } else {
      this.aboPos = 'inBetween';
    }
  }

  loadBanken(_beznr: number): void {
    if(!_beznr)return;
    
    this.bankenService.getBanken(_beznr)
      .subscribe( ret => {
        for(let i = 0; i < ret.length; i++){
          this.adrkundenService.getKunde(ret[i].bankbeznr, 'no', 'yes')
            .subscribe( ret2 => {
              if(ret2){
                ret[i].bankname = ret2[0].fname;
              }
          });
        }
        this.bankenAuswahl = ret;
    });
  }

  loadKonten(_beznr: number): void {
    //Konten laden
    this.kontenService.getKonten(0, 9999)
      .subscribe( ret => {
        this.kontoAuswahl = ret;
        //this.kontoAuswahl = ret.filter(function(el) {return (el.beznr === _beznr || el.beznr === 0)});
    });
  }

  //objekt-wechsel
  objektHasChanged(): void {
    if(!this.abodetails || !this.abodetails.artnr) {
      return;
    }

    this.getZustellTageVoll(true);
    this.loadAusgabe();
    this.loadGeschenke();
    this.loadAusgabeplan(this.abodetails.artnr);

    if(this.istAboNeu === true) {
      this.getAboDatenVorlage();
    }
  }

  //laedt zustellTage
  getZustellTageVoll(reset: boolean) {
    var abozust = this.abodetails.tt_abozust;
    this.zustService.getZustellTage(this.abodetails.artnr, abozust[0].vart, abozust[0].leitweg, abozust[0].menge, abozust[0].lbeznr)
      .subscribe( ret => {
        if(!ret || ret === [] || !ret[0] || ret[0].fehlercode !== '') {
          return;
        }
        if(reset === true) {
          this.abodetails.tt_abozust = ret;
        } else {
          for(let i = 0; i < Math.min(this.abodetails.tt_abozust.length, ret.length); i++) {
            this.abodetails.tt_abozust[i].bezeichnung = ret[i].bezeichnung;
          }
        }

        this.loadAlleLeitwege();
        this.updateVartLbeznr();
    });
  }

  //laedt einen leitweg
  loadLeitweg(index: number) {
    let tempDate = new Date(this.abodetails.gueltigab);
    let gueltigab = this.datePipe.transform(tempDate, 'dd.MM.yyyy');
    let abozust = this.abodetails.tt_abozust[index];

    this.leitwegService.getLeitweg(this.abodetails.artnr, this.abodetails.teilausg, abozust.vart, abozust.leitweg, abozust.lbeznr, gueltigab) //('AR', '', 'VU', '', 50004, '02.09.2019') sollte daten liefern zum testen
      .subscribe( leitwege => {
        let possibleReponses = ["tt_leitweg", "tt_abolieg", "tt_abovsteu", "tt_abovvert"];
        let response: any;
        for(let i = 0; i < possibleReponses.length; i++) {
          if(leitwege[possibleReponses[i]] !== undefined) {
            response = leitwege[possibleReponses[i]];
          }
        }
        if(response && response[0] && JSON.stringify(response[0]) !== '{"fehlercode":"00","fehlertext":""}') {
          this.leitwegAuswahlen[index] = response;
          this.cdRef.detectChanges();
          this.getVTRNR(index, this.abodetails.tt_abozust[index].leitweg);
        }
    });
  }

  //updated vertreternummer (leitweg-auswahl)
  getVTRNR(i: number, rowid: any) {
    let obj = this.leitwegAuswahlen[i].find((elem) => elem.r_rowid === rowid);
    if(obj !== undefined) {
      this.leitwegeAusgewaehlt[i] = obj.vtrnr;
    } else {
      this.leitwegeAusgewaehlt[i] = '';
    }
  }

  updateLieferDaten() {
    this.zustService.getZustellDaten(this.abodetails)
      .subscribe( ret => {
        if(ret && ret.tt_abozust !== undefined) {
          let temp = JSON.parse(JSON.stringify(this.abodetails.tt_abozust));
          this.abodetails.tt_abozust = ret.tt_abozust;
          for(let i = 0; i < Math.min(this.abodetails.tt_abozust.length, temp.length); i++) {
            this.abodetails.tt_abozust[i].bezeichnung = temp[i].bezeichnung;
          }
          if(ret.tt_abozust.length <= 1) {
            this.lieferungUnreg = false;
          }
        }
    });
  }

  ausgabeHasChanged(): void {
    this.loadAlleLeitwege();
    this.updateLieferDaten();

    if(this.istAboNeu === true) {
      this.getAboDatenVorlage();
    }
  }

  //laedt abo-daten fuer bestimmte inputs
  getAboDatenVorlage(): void {
    let toReplace = ['fakturabeginn1', 'fakturabeginn2', 'terminvon', 'terminbis', 'termin-neu', 'urjahr', 'autoneu', 'autoneu_txt'];

    this.aboinfoService.getAboDaten(this.abodetails)
      .subscribe( ret => {
        if(ret) {
          for(let i = 0; i < toReplace.length; i++) {
            this.abodetails[toReplace[i]] = ret[toReplace[i]];
          }
        }
    });
  }

  loadGeschenke() {
    this.aboobjService.getAboObjekte('', "GESCHENK")
      .subscribe( ret => {
        this.geschenkAuswahl = ret;
    });
  }

  loadObjekte(_artnr: string): void {
    this.aboobjService.getAboObjekte('', '')
      .subscribe( ret => {
        if(ret){
          this.objektAuswahl = ret;
          this.loadAusgabe();
        }
    });
  }

  toggleUnregelmaessig(): void {
    //timeout damit ngModel updated
    setTimeout(() => {
      if(this.lieferungUnreg === true) {
        this.getZustellTageVoll(false);
      }
    }, 0);
  }

  //kopiert einen tag in alle tage der unregelmaessigen lieferdaten
  copyUnreg(i: number): void {
    let toReplace = ['lbeznr', 'lbeznr_txt', 'menge', 'vart', 'vart_txt', 'leitweg', 'anzplak'];
    for(let c = 0; c < this.abodetails.tt_abozust.length; c++) {
      if(i == c) {
        continue;
      }
      for(let p = 0; p < toReplace.length; p++) {
        this.abodetails.tt_abozust[c][toReplace[p]] = this.abodetails.tt_abozust[i][toReplace[p]];
      }
    }
  }

  //loescht einen tag in den unregelmaessigen lieferdaten
  deleteUnreg(i: number): void {
    let toDelete = ['lbeznr', 'lbeznr_txt', 'menge', 'vart', 'vart_txt', 'leitweg', 'anzplak'];
    for(let p = 0; p < toDelete.length; p++) {
      this.abodetails.tt_abozust[i][toDelete[p]] = "";
    }
  }

  calculateTerminBis() {
    let date = new Date(JSON.parse(JSON.stringify(this.abodetails.terminvon)));
    let parsedDate: string;
    if(!isNaN(date.getTime())) {
      parsedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    
    this.terminbisService.calcTerminbis(this.abodetails.artnr, parsedDate, this.anznr)
      .subscribe( ret => {
        if(ret){
          this.abodetails.terminbis = ret[0].terminbis;
        }
        this.anznr = 0;
    });
  }

  //fuehrt eine funktion aus mit dem namen _funcName
  execFunction(_funcName: string, _param?: any){
    if(this.isOpen){ //nur wenn akkoreon offen
      if(_param !== undefined) {this[_funcName](_param);}
      else {this[_funcName]();}
    }
  }

  //laedt ausgaben eines objektes und updated objekt_txt
  loadAusgabe(): void {
    //timeout, da sonst artnr vom ngModel noch nicht geupdated wurde
    setTimeout(() => {
      //objekt_txt updaten
      let foundObj = this.objektAuswahl.find(x => x.objekt === this.abodetails.artnr);
      if(foundObj){
        this.abodetails.objekt_txt = foundObj['obj-bezeichnung'];
      }
  
      this.aboAusgabenService.getAboObjAusgaben(this.abodetails.artnr)
        .subscribe( ret => {
          this.ausgAuswahl = ret.filter((ausg) => ausg.teilausg !== "");
      });
    }, 1);
  }

  //da das form-field nur abodetails.konto und nicht abodetails.konto_txt updated wird das hier gemacht
  updateKontoTxt() {
    //richtiges konto suchen und txt einsetzen
    this.abodetails.konto_txt = this.kontoAuswahl.find(x => x.konto === this.abodetails.konto).ktobez;
  }

  resetProgress() {
    this.abodetails = JSON.parse(JSON.stringify(this.abodetailsInput.abo));
    this.loadBanken(this.abodetails.rbeznr);

    this.getAboPos();

    if(this.abodetails.tt_abozust.length > 1) {
      this.loadBezeichnungen();
      this.lieferungUnreg = true;
    } else {
      this.lieferungUnreg = false;
    }
    this.updateVartLbeznr();
  }

  //speichert das oeffnen eines akkordeons
  setExpanded(index: number) {
    if(this.expanded.includes(index) === false){
      this.expanded.push(index);
    }
    sessionStorage.setItem('aboVerwaltungExpanded', JSON.stringify(this.expanded));
  }

  //speichert das schliessen eines akkordeons
  removeExpanded(i: number) {
    //alle vorkommen dieses akkordeons entfernen (sodass akkordeons als geschlossen angesehen wird)
    var index;
    while((index = this.expanded.indexOf(i)) > -1){
      this.expanded.splice(index, 1);
    }
    
    sessionStorage.setItem('aboVerwaltungExpanded', JSON.stringify(this.expanded));
  }

  //offnet codn / adrw modul
  openInModule(_module: string, _variabelName: string, _codeart?: string) {
    if(this.lieferungUnreg === false) {
      this.abodetails.tt_abozust.length = 1;
    }
    sessionStorage.setItem('toOtherModuleFrom', 'verwaltung:' + _variabelName);
    this.aboDetailComponent.saveScroll();

    var obj: any = { 'zwischenspeicher': JSON.stringify(this.abodetails), 'variabelName': _variabelName };
    if(_module === 'CODN') {
      obj.cart = _codeart;
    }

    this.aboComponent.loadModule(obj, _module);
  }
  
  //setzt abodetails-variablen auf einen bestimmten wert
  private setAboVar(_varName: string, _value: any, _text: string) {
    if(_varName.startsWith('merkmal')){
      this.lookup(this.abodetails, ([_varName.slice(0, -1), '[', (Number(_varName.slice(-1))-1).toString()].join('') + ']'), _value);
    } else {
      this.lookup(this.abodetails, _varName, _value);
    }
    this.lookup(this.abodetails, (_varName + '_txt'), _text);
  } // ende setAboVar()

  //laedt wert in _varName und text in _varName_txt
  private loadIntoVariables(ret: any, elem: HTMLInputElement, _varName: string, wert: string, text: string) {
    let found = false;
    //codes abgleichen
    if(ret && ret.length > 0){
      for(let row of ret){
        if(elem.value.toString().toLowerCase() === row[wert].toString().toLowerCase()){
          found = true;
          this.setAboVar(_varName, row[wert], row[text]);
        }
      }
    }

    //kein code gefunden -> input zuruecksetzen
    if(!found){
      if (_varName.startsWith('merkmal')) {
        elem.value = this.abodetails.merkmal[Number(_varName.slice(-1)) - 1];
      }
      else if (_varName.startsWith('tt_abozust')) {
        let split = _varName.split(/\[|\]/);
        elem.value = this.abodetails.tt_abozust[split[1]][_varName.slice(_varName.indexOf(']') + 2)];
      }
      else {
        elem.value = this.abodetails[_varName];
      }
    }
  }

  //updated variabel die im verschachtelten objekt "obj" under dem pfad "path" liegt
  lookup(obj: any, path: string, updatedVar: any){
    let parts = path.replace(/\]/g, "").split(/\.|\[/);
    if(parts.length === 1) {
      if(obj !== undefined) {
        obj[parts[0]] = updatedVar;
      }
      return obj[parts[0]];
    }
    return this.lookup(obj[parts[0]], parts.slice(1).join("."), updatedVar);
  } // ende recLookup()

  loadAlleLeitwege(): void {
    this.leitwegAuswahlen = {};
    this.cdRef.detectChanges();
    for(let i = 0; i < this.abodetails.tt_abozust.length; i++) {
      this.loadLeitweg(i);
    }
  }

  //sucht einen ADRW-Eintrag per beznr
  searchADRW(_varName: string, _idName: string): void {
    let elem;
    let split = _idName.split(':');
    let index: string;
    if(split[0] === 'zustlbeznr') {
      index = _idName.split(':')[1];
      elem = this.zustlbeznr['_results'][index].nativeElement;
    } else {
      elem = <HTMLInputElement>document.getElementById(_idName);
    }
    
    if(elem === null) {
      return;
    }

    //leerer input
    if(elem && elem.value === ''){
      this.setAboVar(_varName, '', '');
      return;
    }

    //kunden laden
    this.adrkundenService.getKunde(elem.value, 'yes', 'yes')
      .subscribe( ret => {
        this.loadIntoVariables(ret, elem, _varName, 'beznr', 'fname');
    });

    this.loadLeitweg(Number(index));
  } // ende searchADRW()

  //updated codn-feld ohne ins codn-modul zu springen
  searchCODN(_codeart: string, _varName: string, _idName: string): void {
    let elem;
    let split = _idName.split(':');
    let index: string;

    if(split[0] === 'zustvart') {
      index = _idName.split(':')[1];
      elem = this.zustvart['_results'][index].nativeElement;
    } else {
      elem = <HTMLInputElement>document.getElementById(_idName);
    }

    //leerer input
    if(elem && elem.value === ''){
      this.setAboVar(_varName, '', '');
      return;
    }

    //codn-codes laden
    this.getcodeService.getCode(_codeart, '*', '*', 'D', '*', '*', '', 1, 200)
      .subscribe( ret => {
        this.loadIntoVariables(ret, elem, _varName, 'code_wert', 'code_text');
    });
    
    this.loadLeitweg(Number(index));
  } //ende searchCODN()

  showErstellInfo() {
    if(this.istAboNeu === true){ return; }
    
    this.aboDetailComponent.openDetailinfoDialog({abo: this.abodetails, abozust: this.abodetails.tt_abozust[0], abokontr: this.abodetails.tt_abokontr[0]});
  } //ende showErstellInfo()

  saveAbo() {
    //abo ins backend speichern
    let mutCode: string;
    if(this.editingAbo === true) {
      mutCode = 'N';
    } else {
      mutCode = 'M';
    }

    var aboDetailsParameter = JSON.parse(JSON.stringify(this.abodetails));
    if(this.lieferungUnreg === false) {
      aboDetailsParameter.tt_abozust.length = 1;
    }

    this.setdeleteAboService.saveAbo(mutCode, aboDetailsParameter)
      .subscribe( ret => {
        let answer = this.msgService.untersuchFehlercode('Speichern', ret);
        if(answer === 'worked' || answer === 'sendConfirmation') {
          if(answer === 'sendConfirmation') {
            aboDetailsParameter.fehlerart = ret.fehlerart;
            aboDetailsParameter.fehlercode = ret.fehlercode;
            aboDetailsParameter.antwortcode = "0"; // 0 = speichern, 1 = nicht speichern

            this.setdeleteAboService.saveAbo(mutCode, aboDetailsParameter)
              .subscribe( finalret => {
                console.log(finalret);
            });
          }

          if(this.aboPos === 'last'){
            this.editingAbo = false;
          }
          //abolist muss abos neu laden
          this.sendToolnutzungZuAbolist.next({ tool: 'saveAbo', value: {'abo': aboDetailsParameter, 'index': this.aboIndex} });
          this.aboDetailComponent.loadADRW(aboDetailsParameter);
        } else if(answer === 'sendDenial') {
          aboDetailsParameter.fehlerart = ret.fehlerart;
          aboDetailsParameter.fehlercode = ret.fehlercode;
          aboDetailsParameter.antwortcode = "1"; // 0 = speichern, 1 = nicht speichern

          this.setdeleteAboService.saveAbo(mutCode, aboDetailsParameter)
            .subscribe( finalret => {
              console.log(finalret);
          });
        }
    });
  } //ende saveAbo()

  newAbo() {
    if(this.editingAbo) return;

    this.editingAbo = true;
    this.lieferungUnreg = false;
    this.sendToolnutzungZuAbolist.next({ tool: 'newAbo', value: ''});
  } //ende newAbo()

  deleteAbo() {
    if(this.editingAbo && this.aboPos === 'last') return;

    this.aboDetailComponent.openLoeschenDialog('Abo')
    .then(ret => {
      if(ret && ret === '1'){
        this.setdeleteAboService.deleteAbo(this.abodetails)
          .subscribe( ret => {
            if(this.msgService.untersuchFehlercode('Löschen', ret) !== 'worked') {
              return;
            }

            this.sendToolnutzungZuAbolist.next({ tool: 'deleteAbo', value: this.aboIndex});
        });
      }
    });
  } //ende deleteAbo()

  //bricht das bearbeiten eines neuen Abos ab
  cancleNewAbo() {
    if(!this.editingAbo || this.aboPos !== 'last'){ return; }

    this.editingAbo = false;
    this.sendToolnutzungZuAbolist.next({ tool: 'cancleNewAbo', value: ''});
  } //ende cancleNewAbo()

  //dupliziert ein bestehendes Abo
  copyAbo() {
    if(this.editingAbo) return;

    this.editingAbo = true;
    this.lieferungUnreg = false;
    this.sendToolnutzungZuAbolist.next({ tool: 'copyAbo', value: this.aboIndex});
  } //ende copyAbo()

  //wechselt zum ersten oder letzten abo
  skipAbo(num: number): void {
    if((num < 0 && this.aboPos === 'first') || (num > 0 && this.aboPos === 'last')){ return; }

    if(this.istAboNeu === true){
      this.sendToolnutzungZuAbolist.next({ tool: 'cancleNewAbo' });
    }
    this.sendToolnutzungZuAbolist.next({ tool: 'skipAbo', value: num});

    this.editingAbo = false;
    this.istAboNeu = false;
  } //ende skipAbo()

  //wechselt zum vorherigen oder naechsten abo
  changeAbo(num: number): void {
    if((num < 0 && this.aboPos === 'first') || (num > 0 && this.aboPos === 'last')){ return; }

    if(this.istAboNeu === true){
      this.sendToolnutzungZuAbolist.next({ tool: 'cancleNewAbo' });
      this.sendToolnutzungZuAbolist.next({ tool: 'skipAbo', value: 1 });
    } else {
      this.sendToolnutzungZuAbolist.next({ tool: 'changeAbo', value: num});
    }
    this.editingAbo = false;
    this.istAboNeu = false;
  } //ende changeAbo()

  showAbopreis(): void {
    if(!this.abodetails || !this.abodetails.gueltigab || !this.abodetails.vorgnr || !this.abodetails.posnr) {
      window.alert("Abopreis kann nur angezeigt werden, wenn die Felder \"Gültigab\", \"Vorgnr\" & \"Posnr\" ausgefüllt sind");
      return;
    }

    this.abopreisService.getAboPreis(this.abodetails.gueltigab, this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( abopreis => {
        console.log(abopreis);
        if(this.msgService.untersuchFehlercode('Abopreis-Anzeige', abopreis) !== 'worked') {
          return;
        }

        //dialogfenster oeffnen
        const dialogRef = this.dialog.open(AbopreisDialog, {
          minWidth: '400px',
          data: JSON.parse(JSON.stringify(abopreis))
        });

        //dialogfenster wird geschlossen
        dialogRef.afterClosed().subscribe(result => {});
    });
  }
} //ende class AboverwaltungClass

//Abopreis dialog
@Component({
  selector: 'abopreis-dialog',
  templateUrl: 'abopreis-dialog.html'
})
export class AbopreisDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<AbopreisDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit() {
    for(let prop in this.data){
      if(typeof this.data[prop] === "number") {
        this.data[prop] = +Math.round(this.data[prop] * 100) / 100;

        //hochkommas bei langen zahlen einfuegen: z.B. 1234 -> 1'234 || 1234567.89 -> 1'234'567.89
        this.data[prop] = this.data[prop].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

        if(this.data[prop] === '0') {
          this.data[prop] = '';
        }
      }
    }
  }
}
