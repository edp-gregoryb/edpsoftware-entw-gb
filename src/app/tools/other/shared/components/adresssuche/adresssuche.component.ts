import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';

@Component({
  selector: 'app-adresssuche',
  templateUrl: './adresssuche.component.html',
  styleUrls: ['./adresssuche.component.css']
})
export class AdresssucheComponent implements OnInit {

  constructor(private adrkundenService: AdrkundenService) { }

  momentaneBeznr: number; //die beznr die bis jetzt im WABO ausgewaehlt war
  suchfeld: string; //die sucheingabe
  suchergebnisse: any = []; //suchergebnisse
  sortierart: any = {var: 'beznr', art: 'aufsteigend'}; //wie die suchergebnisse sortiert werden

  @Input() formData: any; //angaben nach was am anfang gesucht wird
  @Output() ausgewaehlt = new EventEmitter(); //adress auswahl

  ngOnInit() {
    //liest benoetigte daten aus @Input
    if(this.formData){
      if(this.formData.zwischenspeicher && this.formData.variabelName){
        //beznr aus @Input lesen
        if(this.formData.variabelName.startsWith('tt_abozust')){
          let split = this.formData.variabelName.split(/\[|\]/);
          this.momentaneBeznr = JSON.parse(this.formData.zwischenspeicher).tt_abozust[split[1]][this.formData.variabelName.slice(this.formData.variabelName.indexOf(']') + 2)];
        } else {
          this.momentaneBeznr = JSON.parse(this.formData.zwischenspeicher)[this.formData.variabelName];
        }

        if(this.momentaneBeznr){
          //suchfeld updaten
          this.suchfeld = this.momentaneBeznr.toString();
        }
      }
      
      //mit neuer suchfeldangabe nach ergebnisen suchen
      this.suchen();
    }
  } //ende ngOnInit()

  //sucht kunden im ADRW
  suchen() {
    this.adrkundenService.getKunde(this.suchfeld, 'yes', 'yes') //getKunde(suche, privat, alle)
      .subscribe( ret => {
        //updated suchergebnise und sortiert diese nach beznr aufsteigend
        ret.sort((a, b) => (a.beznr > b.beznr) ? 1 : -1);
        this.suchergebnisse = ret;
    });
  } //ende suchen()

  //sortiert die suchergebnise
  sort(_varName: string) {
    //logik:
    // neue spalte wird ausgewaehlt -> diese spalte aufsteigend sortieren
    // gleiche spalte wird ausgewaehlt -> toggle zwischen auf und absteigend sortieren
    if(_varName !== this.sortierart.var || this.sortierart.art === 'absteigend'){
      //aufsteigend sortieren
      this.suchergebnisse.sort((a, b) => (a[_varName] >= b[_varName]) ? 1 : -1);
      this.sortierart.art = 'aufsteigend';
    } else {
      //absteigend sortieren
      this.suchergebnisse.sort((a, b) => (a[_varName] < b[_varName]) ? 1 : -1);
      this.sortierart.art = 'absteigend';
    }
    this.sortierart.var = _varName;
  } //ende sort()

  //bricht ADRW eingabe ab
  abbruch() {
    this.ausgewaehlt.next(null);
  } //ende abbruch()

  //waehlt eine adresse aus
  auswahl(index: number){
    this.ausgewaehlt.next(JSON.parse(JSON.stringify(this.suchergebnisse[index])));
  } //ende auswahl()

  //leere auswahl
  empty() {
    this.ausgewaehlt.next({});
  } //ende empty
}
