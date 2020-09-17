import { Component, OnInit, OnChanges, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AboComponent } from '../../../../abo/abo/abo.component';
import { AbodetailComponent } from '../../abodetail/abodetail.component';
import { RestAbotermineService } from '../../../rest-services/rest-abotermine.service';
import { RestGetcodeService } from '../../../rest-services/rest-getcode.service';
import { RestAboobjektService } from '../../../rest-services/rest-aboobjekt.service';
import { RestAboobjausgabenService } from '../../../rest-services/rest-aboobjausgaben.service';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';

@Component({
  selector: 'app-abotermine',
  templateUrl: './abotermine.component.html',
  styleUrls: ['./abotermine.component.css']
})
export class AbotermineComponent implements OnInit {
  termine: any = [];

  @Input() abodetailsInput: any;
  @Input() zwischenspeicher: any;
  @Input() isOpen: boolean;

  @Output() activateAutoScroll = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  aboterminesource = new MatTableDataSource();
  columnsToDisplay = ['termart', 'termindat', 'stat', 'anzahl'];

  selectedRowIndex: number = -1;
  terminDetails: any;
  objektAuswahl: any;
  abodetails: any;
  artikelAuswahl: any = [];
  
  editingNew: boolean = false;

  constructor(private aboComponent: AboComponent,
              private abodetailComponent: AbodetailComponent,
              private terminService: RestAbotermineService,
              private getcodeService: RestGetcodeService,
              private aboobjService: RestAboobjektService,
              private adrkundenService: AdrkundenService,
              private aboAusgabenService: RestAboobjausgabenService) { }

  ngOnInit() {
    this.abodetails = this.abodetailsInput.abo;

    this.aboobjService.getAboObjekte('', '')
      .subscribe( ret => {
        if(ret){
          this.objektAuswahl = ret;
        }
    });

    this.resetVariables(false);
  } // ende ngOnInit()

  ngOnChanges(change: any) {
    this.abodetails = this.abodetailsInput.abo;
    if(change && (change.abodetails || change.zwischenspeicher)){
      this.resetVariables(true);
    }
  } // ende ngOnChanges()

  //fuehrt eine funktion aus mit dem namen _funcName
  execFunction(_funcName: string, _param?: any): void {
    if(this.isOpen){
      if(_param !== undefined) {this[_funcName](_param);}
      else {this[_funcName]();}
    }
  } // ende execFunction()

  //reseted alle variablen
  private resetVariables(mitZwischenspeicher: boolean): void {
    this.terminDetails = null;
    this.artikelAuswahl = [];
    this.selectedRowIndex = -1;
    this.editingNew = false;

    //termine laden
    if(this.abodetails) {
      this.terminService.getAboTermine(this.abodetails.vorgnr, this.abodetails.posnr)
        .subscribe( ret => {
          if(ret && ret.toString() !== '{}'){
            this.termine = ret;
          }
          this.aboterminesource.paginator = this.paginator;
          this.aboterminesource.data = this.termine;
          this.aboterminesource.sort = this.sort;

          if(mitZwischenspeicher === true) {
            this.loadTermine();
          }
      });
    }

    this.aboterminesource.paginator = this.paginator;
    this.aboterminesource.data = this.termine;
    this.aboterminesource.sort = this.sort;
  } // ende resetVariables()

  objektHasChanged() {
    //timeout, da sonst artnr vom ngModel noch nicht geupdated wurde
    setTimeout(() => {
      //objekt_txt updaten
      let foundObj = this.objektAuswahl.find(x => x.objekt === this.terminDetails.artnr);
      if(foundObj){
        this.terminDetails.objekt_txt = foundObj['obj-bezeichnung'];
      }
      this.loadArtikel();
    }, 1);
  }

  artikelHasChanged() {
    let tempArtikel = this.artikelAuswahl.find((art) => art.artnr === this.terminDetails.artnr2);
    this.terminDetails.objekt2_txt = tempArtikel.bez;
  }

  //laedt ausgaben eines objektes und updated objekt_txt
  loadArtikel(): void {
    //objekt_txt updaten
    if(!this.terminDetails) {
      return;
    }
    this.aboAusgabenService.getAboObjAusgaben(this.terminDetails.artnr)
      .subscribe( ret => {
        this.artikelAuswahl = ret.filter((ausg) => ausg.teilausg !== "");
    });
  }

  //sucht einen ADRW-Eintrag per beznr
  searchADRW(_varName: string, _idName: string): void {
    let elem = <HTMLInputElement>document.getElementById(_idName);
    
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
  } // ende searchADRW()

  //updated codn-feld ohne ins codn-modul zu springen
  private searchCODN(_codeart: string, _varName: string, _idName: string): void {
    let elem = <HTMLInputElement>document.getElementById(_idName);
    
    //leerer input
    if(elem.value === ''){
      this.setAboVar(_varName, '', '');
      return;
    }

    //codn-codes laden
    this.getcodeService.getCode(_codeart, '*', '*', 'D', '*', '*', '', 1, 200)
      .subscribe( ret => {
        this.loadIntoVariables(ret, elem, _varName, 'code_wert', 'code_text');
    });
  } //ende searchCODN()

  //setzt abodetails-variablen auf einen bestimmten wert
  private setAboVar(_varName: string, _value: any, _text: string): void {
    this.abodetails[_varName] = _value;
    this.abodetails[_varName + '_txt'] = _text;
  } // ende setAboVar()

  //laedt daten in eine variabel
  private loadIntoVariables(ret: any, elem: HTMLInputElement, _varName: string, wert: string, text: string): void {
    let found = false;
    //codes abgleichen
    if(ret && ret.length > 0){
      for(let row of ret){
        if(elem.value.toString() === row[wert].toString()){
          found = true;
          this.setAboVar(_varName, row[wert], row[text]);
        }
      }
    }

    //kein code gefunden -> input zuruecksetzen
    if(!found){
      elem.value = this.abodetails[_varName];
    }
  } // ende loadIntoVariables

  //laedt die termine vom zwischenspeicher
  private loadTermine(): void {
    if(this.zwischenspeicher){
      let found: boolean = false;
      for(let i = 0; i < this.termine.length; i++){
        if(this.termine[i].r_rowid === this.zwischenspeicher.r_rowid){
          found = true;
          this.terminDetails = JSON.parse(JSON.stringify(this.zwischenspeicher));
          this.selectedRowIndex = i;
        }
      }
      if(!found){
        this.termine.push(JSON.parse(JSON.stringify(this.zwischenspeicher)));
        this.terminDetails = JSON.parse(JSON.stringify(this.zwischenspeicher));
        this.selectedRowIndex = this.termine.length - 1;
      }
    }

    for(let i = 0; i < this.termine.length; i++){
      this.termine[i].termindat = new Date(this.termine[i].termindat);
    }
    this.aboterminesource.paginator = this.paginator;
    this.aboterminesource.data = this.termine;
    this.aboterminesource.sort = this.sort;

    setTimeout( () => {
      this.activateAutoScroll.emit();
    }, 1);
    
    this.loadArtikel();
  } // ende loadTermine()

  //highlighted ein termin
  private highlight(row): void {
    let sorted = this.getSortedData();
    for(let i = 0; i < sorted.length; i++){
      if(JSON.parse(JSON.stringify(sorted[i])).r_rowid === row.r_rowid){
        this.selectedRowIndex = i;
      }
    }
    this.terminDetails = JSON.parse(JSON.stringify(row));
    this.loadArtikel();
  } // ende highlight()

  // gibt boolean an html ob termin gehighlighted sein soll oder nicht
  private shouldBeHighlighted(row: any): boolean {
    if(this.selectedRowIndex === -1){ return false; }
    let sorted = this.getSortedData();
    if(!sorted || !sorted[this.selectedRowIndex]){ return false; }

    if(JSON.parse(JSON.stringify(sorted[this.selectedRowIndex])).r_rowid === row.r_rowid){
      return true;
    }
    return false;
  } // ende shouldBeHighlighted()

  //wechselt zum ersten (num == -1) oder letzten (num == 1) Termin
  skipTermin(num: number): void {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.aboterminesource.data.length - 1 || this.selectedRowIndex === -1))){
      return;
    }

    let sorted = this.getSortedData();
    if(num < 0){
      //erste seite
      this.aboterminesource.paginator.firstPage();
      this.highlight(sorted[0]);
    } else if(num > 0){
      //letzte seite (.lastPage() gibt zum teil falsch an, da es mit Math.ceil ist)
      this.aboterminesource.paginator.pageIndex = Math.floor((this.aboterminesource.data.length-1) / this.aboterminesource.paginator.pageSize);
      this.highlight(sorted[sorted.length - 1]);
    }

    //paginator und tabellen-daten updaten
    this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
  } // ende skipTermin()

  // wechselt 'num' Termine nach vor bzw zurueck
  changeTermin(num: number): void {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.aboterminesource.data.length - 1 || this.selectedRowIndex === -1))){
      return;
    }

    let sorted = this.getSortedData();
    let indexAfter = this.selectedRowIndex + num;
    
    if(indexAfter < 0){
      this.highlight(sorted[0]);
    } else if(indexAfter > sorted.length - 1){
      this.highlight(sorted[sorted.length - 1]);
    } else {
      this.highlight(sorted[indexAfter]);
    }

    //paginator auf die richtige seite wechseln
    this.aboterminesource.paginator.pageIndex = Math.floor(indexAfter / this.aboterminesource.paginator.pageSize);
    //paginator und tabellen-daten updaten
    this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
  } // ende changeTermin()

  //gibt die sotrierten termine zurueck
  private getSortedData(): any {
    let sortedData:any;
    return this.aboterminesource.sortData(this.aboterminesource.filteredData, this.aboterminesource.sort);
  } // ende getSortedData()

  //loescht nicht gespeicherten Fortschritt
  resetProgress(): void {
    if(this.selectedRowIndex === -1){ return; }

    let sorted = this.getSortedData();
    this.terminDetails = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));
    this.loadArtikel();
  } // ende resetProgress()

  //zeigt detailinfor wie zB auser, nuser,...
  showErstellInfo(): void {
    if(this.selectedRowIndex === -1 || this.terminDetails.r_rowid === ""){ return; }

    this.abodetailComponent.openDetailinfoDialog({aboterm: this.terminDetails});
  } // ende showErstellInfo()

  // erstellt neuen Termin
  newTermin(): void {
    if(this.editingNew){ return; }

    this.editingNew = true;

    this.terminService.createEmptyAboTermin(this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( ret => {
        let tmpData = JSON.parse(JSON.stringify(this.aboterminesource.data));
        tmpData.push(ret);
        this.aboterminesource.data = JSON.parse(JSON.stringify(tmpData));
        //paginator und tabellen-daten updaten
        this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
        this.skipTermin(1);
    });
  } // ende newTermin()

  //kopiert einen bestehenden Termin
  copyTermin(): void {
    if(this.editingNew || this.selectedRowIndex === -1){ return; }

    this.editingNew = true;

    let sorted = this.getSortedData();
    let row = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));

    row.r_rowid = "";

    //duplizierte reihe hinzufuegen
    let tempData = JSON.parse(JSON.stringify(this.aboterminesource.data));
    tempData.push(row);
    this.aboterminesource.data = JSON.parse(JSON.stringify(tempData));
    //paginator und tabellen-daten updaten
    this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
    //diese anwaehlen
    this.skipTermin(1);
  } // ende copyTermin()

  //speichert einen Termin
  saveTermin(): void {
    if(this.selectedRowIndex === -1){ return; }

    if(this.terminDetails.r_rowid == '') {
      this.terminDetails.mutationscode = 'N';
    } else {
      this.terminDetails.mutationscode = 'M';
    }

    this.terminService.updateAboTermin(this.terminDetails, this.terminDetails.mutationscode)
      .subscribe( ret => {
        if(ret[0].fehlercode !== "") {
          window.alert("Speicherung nicht erfolgreich.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
          return;
        } else {
          
          if(this.terminDetails.r_rowid === ''){
            this.editingNew = false;
            
            this.aboterminesource.data.push(JSON.parse(JSON.stringify(this.terminDetails)));
            this.cancleTermin();
            this.skipTermin(1);
      
          } else {
            for(let i = 0; i < this.aboterminesource.data.length; i++){
              if(JSON.parse(JSON.stringify(this.aboterminesource.data[i])).r_rowid === this.terminDetails.r_rowid){
                this.aboterminesource.data[i] = JSON.parse(JSON.stringify(this.terminDetails));
              }
            }
            this.aboterminesource.data = JSON.parse(JSON.stringify(this.aboterminesource.data));
          }
        }
    });
  } // ende saveTermin()

  //loescht einen Termin
  deleteTermin(): void {
    if(this.selectedRowIndex === -1 || this.terminDetails.r_rowid === ""){ return; }

    //kontrolle per dialog-fenster ob wirklich geloescht werden will
    this.abodetailComponent.openLoeschenDialog('Termin')
    .then(ret => {
      //user will wirklich loeschen
      if(ret && ret === '1'){

        //im backend loeschen
        this.terminService.deleteAboTermin(this.terminDetails)
          .subscribe(ret => {
            if(ret && ret[0] && ret[0].fehlercode === "") {
              //termin suchen
              for(let i = 0; i < this.aboterminesource.data.length; i++){
                if(JSON.parse(JSON.stringify(this.aboterminesource.data[i])).r_rowid === this.terminDetails.r_rowid){

                  let tempData = JSON.parse(JSON.stringify(this.aboterminesource.data));
                  tempData.splice(i, 1)
                  this.aboterminesource.data = tempData;
                  //paginator und tabellen-daten updaten
                  if(this.aboterminesource.data.length % 5 === 0 && this.aboterminesource.paginator.getNumberOfPages() === this.aboterminesource.paginator.pageIndex){
                    this.aboterminesource.paginator.pageIndex--;
                  }
                  this.selectedRowIndex = -1;
                  this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
                }
              }
            } else {
              window.alert("Löschen fehlgeschlagen.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
              return;
            }
        });
      }
    });
  } // ende deleteTermin()

  //bricht das bearbeiten eines neuen Termines ab
  cancleTermin(): void {
    if(this.selectedRowIndex === -1 || this.terminDetails.r_rowid !== ""){ return; }

    this.editingNew = false;

    for(let i = 0; i < this.aboterminesource.data.length; i++){
      if(JSON.parse(JSON.stringify(this.aboterminesource.data[i])).r_rowid === ""){

        //HIER BACKEND INFORMIEREN

        let tempData = JSON.parse(JSON.stringify(this.aboterminesource.data));
        tempData.splice(i, 1)
        this.aboterminesource.data = tempData;
        //paginator und tabellen-daten updaten
        this.aboterminesource.paginator.pageIndex = Math.floor((this.aboterminesource.data.length-1) / this.aboterminesource.paginator.pageSize);
        this.selectedRowIndex = -1;
        this.terminDetails = null;
        this.artikelAuswahl = [];
        //paginator und tabellen-daten updaten
        this.aboterminesource.paginator._changePageSize(this.aboterminesource.paginator.pageSize);
      }
    }
  } // ende cancleTermin()

  //oeffnet CODN
  private openInModule(_module: string, _variabelName: string, _codeart?: string): void {
    sessionStorage.setItem('toOtherModuleFrom', 'termin');
    this.abodetailComponent.saveScroll();

    var obj: any = { 'zwischenspeicher': JSON.stringify(this.terminDetails), 'variabelName': _variabelName };
    if(_module === 'CODN') {
      obj.cart = _codeart;
    }
    this.aboComponent.loadModule(obj, _module);
  } // ende openCODNinModule
}
