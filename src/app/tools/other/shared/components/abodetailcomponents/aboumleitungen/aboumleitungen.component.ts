import { Component, OnInit, OnChanges, ViewChild, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { AdrkundenService } from '../../../../../shared/services/adrkunden.service';
import { RestUmlunterbruchService } from '../../../rest-services/rest-umlunterbruch.service';
import { AboComponent } from '../../../../abo/abo/abo.component';
import { AbodetailComponent } from '../../abodetail/abodetail.component';
import { RestGetcodeService } from '../../../rest-services/rest-getcode.service';
import { RestPalettierService } from '../../../rest-services/rest-palettier.service';
import { RestAboobjausgabenService } from '../../../rest-services/rest-aboobjausgaben.service';
import { RestAboobjektService } from '../../../rest-services/rest-aboobjekt.service';
import { RestLeitwegService } from '../../../rest-services/rest-leitweg.service';

@Component({
  selector: 'app-aboumleitungen',
  templateUrl: './aboumleitungen.component.html',
  styleUrls: ['./aboumleitungen.component.css'],
  providers: [ DatePipe ]
})
export class AboumleitungenComponent implements OnInit {

  @Input() abodetailsInput: any;
  @Input() zwischenspeicher: any;
  @Input() isOpen: boolean;

  @Output() activateAutoScroll = new EventEmitter();
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  aboumleitungensource = new MatTableDataSource();
  columnsToDisplay = ['grund', 'objekt_txt', 'gueltigab', 'gueltigbis']; //strings muessen noch an richtigen datensatz angepasst werden
  selectedRowIndex: number = -1;

  umldetails: any;
  editingNew: boolean = false;
  abodetails: any;

  palettierIdAuswahl: any;
  objektAuswahl: any;
  ausgAuswahl: any;
  leitwegAuswahl: any;
  ausgewaehlterLeitweg: string;

  constructor(private umlService: RestUmlunterbruchService,
              private aboComponent: AboComponent,
              private abodetailComponent: AbodetailComponent,
              private datePipe: DatePipe,
              private leitwegService: RestLeitwegService,
              private getcodeService: RestGetcodeService,
              private adrkundenService: AdrkundenService,
              private palettierService: RestPalettierService,
              private aboobjService: RestAboobjektService,
              private aboAusgabenService: RestAboobjausgabenService) { }

  ngOnInit() {
    this.abodetails = this.abodetailsInput.abo;

    //palettierID's laden
    this.palettierService.getPalettierIDs()
      .subscribe( ret => {
        this.palettierIdAuswahl = ret;
    });

    this.aboobjService.getAboObjekte('', '')
      .subscribe( ret => {
        if(ret){
          this.objektAuswahl = ret;
        }
    });

    this.aboumleitungensource.paginator = this.paginator;
    this.aboumleitungensource.sort = this.sort;
  }

  ngOnChanges(change){
    this.abodetails = this.abodetailsInput.abo;

    if(change && (change.abodetailsInput || change.zwischenspeicher)){
      this.loadUmleitungen();
    }
  }

  //fuehrt eine funktion aus mit dem namen _funcName
  execFunction(_funcName: string, _param?: any){
    if(this.isOpen){
      if(_param !== undefined) {this[_funcName](_param);}
      else {this[_funcName]();}
    }
  }

  //laedt umleitungen
  loadUmleitungen(){
    this.umlService.getUmlUnterbruch(this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( tt_abozust => {
        this.resetVariables();
        let umleitungen: any[] = [];

        for(let i = 0; i < tt_abozust.length; i++){
          umleitungen.push(tt_abozust[i]);
        }
        
        if(this.zwischenspeicher){
          let found: boolean = false;
          for(let i = 0; i < umleitungen.length; i++){
            if(this.zwischenspeicher.r_rowid === umleitungen[i].r_rowid){
              found = true;
              //vorher bearbeitetes objekt updaten
              //umleitungen[i] = JSON.parse(JSON.stringify(this.zwischenspeicher));

              //vorher bearbeitetes objekt anwaehlen
              this.umldetails = JSON.parse(JSON.stringify(this.zwischenspeicher));
              this.selectedRowIndex = i;
              this.loadAusgabe();
            }
          }
          //es war ein noch nicht abgespeichertes objekt:
          if(!found){
            umleitungen.push(JSON.parse(JSON.stringify(this.zwischenspeicher)));
            this.umldetails = JSON.parse(JSON.stringify(this.zwischenspeicher));
            this.selectedRowIndex = umleitungen.length - 1;
            this.loadAusgabe();
          }

          this.loadLeitwegAuswahl();
        }
        this.aboumleitungensource.data = JSON.parse(JSON.stringify(umleitungen));

        setTimeout( () => {
          this.activateAutoScroll.emit();
        }, 1);
    });
  } //loadUmleitungen() ende

  //laedt ausgaben eines objektes und updated objekt_txt
  loadAusgabe(): void {
    if(!this.umldetails){return;}

    //timeout, da sonst artnr vom ngModel noch nicht geupdated wurde
    setTimeout(() => {
      //objekt_txt updaten
      let foundObj = this.objektAuswahl.find(x => x.objekt === this.umldetails.artnr);
      if(foundObj){
        this.umldetails.objekt_txt = foundObj['obj-bezeichnung'];
      }
  
      this.aboAusgabenService.getAboObjAusgaben(this.umldetails.artnr)
        .subscribe( ret => {
          this.ausgAuswahl = ret.filter((ausg) => ausg.teilausg !== "");
      });
    }, 1);
  }

  //reseted alle variablen
  resetVariables(){
    this.umldetails = null;
    this.ausgAuswahl = [];
    this.aboumleitungensource.data = [];
    this.selectedRowIndex = -1;

    this.editingNew = false;
  }

  //markiert eine tabellen-reihe und laedt deren daten
  highlight(row){
    let sorted = this.getSortedData();
    for(let i = 0; i < sorted.length; i++){
      if(JSON.parse(JSON.stringify(sorted[i])).r_rowid === row.r_rowid){
        this.selectedRowIndex = i;
      }
    }
    this.umldetails = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex])); //parse und stringify damit eine kopie und nicht eine referenz erstellt wird

    this.ausgewaehlterLeitweg = '';
    this.loadLeitwegAuswahl();
    this.loadAusgabe();
  }

  shouldBeHighlighted(row: any): boolean{
    if(this.selectedRowIndex === -1){
      return false;
    }
    let sorted = this.getSortedData();
    if(JSON.parse(JSON.stringify(sorted[this.selectedRowIndex])).r_rowid === row.r_rowid){
      return true;
    }
    return false;
  }

  //wechselt in der tabelle zur ersten oder letzten umleitung
  skipUmleitung(num: number) {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.aboumleitungensource.data.length - 1 || this.selectedRowIndex === -1))){
      return;
    }

    let sorted = this.getSortedData();
    if(num < 0){
      //erste seite
      this.aboumleitungensource.paginator.firstPage();
      this.highlight(sorted[0]);
    } else if(num > 0){
      //letzte seite (.lastPage() gibt zum teil falsch an, da es mit Math.ceil ist)
      this.aboumleitungensource.paginator.pageIndex = Math.floor((this.aboumleitungensource.data.length-1) / this.aboumleitungensource.paginator.pageSize);
      this.highlight(sorted[sorted.length - 1]);
    }
    
    this.updatePaginator();
  }
  
  //wechselt in der tabelle um 'num' umleitungen
  changeUmleitung(num: number) {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.aboumleitungensource.data.length - 1 || this.selectedRowIndex === -1))){
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
    this.aboumleitungensource.paginator.pageIndex = Math.floor(indexAfter / this.aboumleitungensource.paginator.pageSize);
    this.updatePaginator();
  }

  //liefert sortierten daten-array der tabelle
  getSortedData(){
    return this.aboumleitungensource.sortData(this.aboumleitungensource.filteredData, this.aboumleitungensource.sort);
  }

  //loescht nicht gespeicherten Fortschritt
  resetProgress() {
    if(this.selectedRowIndex === -1) return;

    let sorted = this.getSortedData();
    this.umldetails = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));
    this.loadLeitwegAuswahl();
    this.loadAusgabe();
  }

  dateTransform(_variabelName: string) {
    this.umldetails[_variabelName] = this.datePipe.transform(this.umldetails[_variabelName], 'yyyy-MM-dd')
  }

  //loescht eine Umleitung
  deleteUmleitung() {
    if(this.selectedRowIndex === -1 || this.umldetails.r_rowid === ""){ return; }

    this.abodetailComponent.openLoeschenDialog('Umleitung')
      .then(ret => {
        if(ret && ret === '1'){
          this.deleteEntgueltig();
        }
    });
  }

  deleteEntgueltig() {
    this.umlService.deleteUmlUnterbruch(this.umldetails.r_rowid)
      .subscribe(ret => {
        if(ret[0].fehlercode !== '' && ret[0].fehlercode !== '200') {
          window.alert("Speicherung nicht erfolgreich.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
          return;
        }

        for(let i = 0; i < this.aboumleitungensource.data.length; i++){
          if(JSON.parse(JSON.stringify(this.aboumleitungensource.data[i])).r_rowid === this.umldetails.r_rowid){
            
            let tempData = JSON.parse(JSON.stringify(this.aboumleitungensource.data));
            tempData.splice(i, 1)
            this.aboumleitungensource.data = tempData;
            //paginator und tabellen-daten updaten
            if(this.aboumleitungensource.data.length % 5 === 0 && this.aboumleitungensource.paginator.getNumberOfPages() === this.aboumleitungensource.paginator.pageIndex){
              this.aboumleitungensource.paginator.pageIndex--;
            }
            this.selectedRowIndex = -1;
            this.updatePaginator();
          }
        }
    });
  }

  //erstellt eine neue Umleitung
  newUmleitung() {
    if(this.editingNew){ return; }

    this.editingNew = true;
    
    let tempData = JSON.parse(JSON.stringify(this.aboumleitungensource.data));
    this.umlService.createEmptyUmlUnt(this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( ret => {
        //umleitung hinzufuegen
        tempData.push(ret);
        this.aboumleitungensource.data = JSON.parse(JSON.stringify(tempData));
    
        this.updatePaginator();
        //umleitung anwaehlen
        this.skipUmleitung(1);
    });
  }

  //Kopiert eine Umleitung
  copyUmleitung() {
    if(this.editingNew || this.selectedRowIndex === -1){ return; }

    this.editingNew = true;

    let sorted = this.getSortedData();
    let row = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));

    //daten loeschen, da diese nicht dupliziert werden duerfen
    row.r_rowid = "";
    row.gueltigab = "";
    row.gueltigbis = "";

    //duplizierte reihe hinzufuegen
    let tempData = JSON.parse(JSON.stringify(this.aboumleitungensource.data));
    tempData.push(row);
    this.aboumleitungensource.data = JSON.parse(JSON.stringify(tempData));
    this.updatePaginator();
    //diese anwaehlen
    this.skipUmleitung(1);
  }

  //speichert eine umleitung
  saveUmleitung() {
    if(this.selectedRowIndex === -1)return;

    this.dateTransform('gueltigab');
    this.dateTransform('gueltigbis');
    
    if(this.umldetails.r_rowid === ""){
      this.editingNew = false;

      this.aboumleitungensource.data.push(JSON.parse(JSON.stringify(this.umldetails)));

      this.cancleUmleitung();
      this.skipUmleitung(1);
    } else {
      for(let i = 0; i < this.aboumleitungensource.data.length; i++){
        if(JSON.parse(JSON.stringify(this.aboumleitungensource.data[i])).r_rowid === this.umldetails.r_rowid){
          this.aboumleitungensource.data[i] = JSON.parse(JSON.stringify(this.umldetails));
        }
      }
      this.aboumleitungensource.data = JSON.parse(JSON.stringify(this.aboumleitungensource.data));
    }

    //HIER INS BACKEND SPEICHERN UND DATEN NEU LADENEN
    this.umlService.setUmlUnterbruch(this.umldetails)
      .subscribe( ret => {
        if(ret[0].fehlercode !== '' && ret[0].fehlercode !== '200') {
          window.alert("Speicherung nicht erfolgreich.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
          return;
        }
    });
  }

  //bricht bearbeitung einer neu dazugekommenen umleitung ab
  cancleUmleitung() {
    if(this.selectedRowIndex === -1 || this.umldetails.r_rowid !== ""){ return; }

    this.editingNew = false;
    
    for(let i = 0; i < this.aboumleitungensource.data.length; i++){
      if(JSON.parse(JSON.stringify(this.aboumleitungensource.data[i])).r_rowid === ""){

        //HIER BACKEND INFORMIEREN

        let tempData = JSON.parse(JSON.stringify(this.aboumleitungensource.data));
        tempData.splice(i, 1)
        this.aboumleitungensource.data = tempData;
        //paginator und tabellen-daten updaten
        this.aboumleitungensource.paginator.pageIndex = Math.floor((this.aboumleitungensource.data.length-1) / this.aboumleitungensource.paginator.pageSize);
        this.selectedRowIndex = -1;
        this.umldetails = null;
        this.ausgAuswahl = [];
        this.updatePaginator();
      }
    }
  }

  loadLeitwegAuswahl() {
    console.log(this.umldetails);

    let uml = this.umldetails;
    this.leitwegService.getLeitweg(uml.artnr, uml.teilausg, uml.vart, uml.leitweg, uml.lbeznr, uml.gueltigab)
      .subscribe( leitwege => {
        let possibleReponses = ["tt_leitweg", "tt_abolieg", "tt_abovsteu", "tt_abovvert"];
        let response: any;
        for(let i = 0; i < possibleReponses.length; i++) {
          if(leitwege[possibleReponses[i]] !== undefined) {
            response = leitwege[possibleReponses[i]];
          }
        }

        if(response && response[0] && JSON.stringify(response[0]) !== '{"fehlercode":"00","fehlertext":""}') {
          this.leitwegAuswahl = response;
          this.getVTRNR(this.umldetails.leitweg);
        }
        console.log(this.leitwegAuswahl);
    });
  }

  getVTRNR(rowid: any) {
    let obj = this.leitwegAuswahl.find((elem) => elem.r_rowid === rowid);
    if(obj !== undefined) {
      this.ausgewaehlterLeitweg = obj.vtrnr.toString();
    } else {
      this.ausgewaehlterLeitweg = '';
    }
  }

  //zeigt detailinfor wie zB auser, nuser,...
  showErstellInfo(){
    if(this.selectedRowIndex === -1 || this.umldetails.r_rowid === "")return;

    this.abodetailComponent.openDetailinfoDialog({abozust: this.umldetails});
  }

  openInModule(_module: string, _variabelName: string, _codeart?: string) {
    sessionStorage.setItem('toOtherModuleFrom', 'umleitung');
    this.abodetailComponent.saveScroll();

    let obj: any = { zwischenspeicher: JSON.stringify(this.umldetails), variabelName: _variabelName };
    if(_module === 'CODN') {
      obj.cart = _codeart;
    }
    this.aboComponent.loadModule(obj, _module);
  }

  searchADRW(_varName: string, _idName: string): void {
    let elem = <HTMLInputElement>document.getElementById(_idName);

    if(elem.value === '') {
      this.umldetails[_varName] = '';
      this.umldetails[_varName + '_txt'] = '';
      return;
    }

    this.adrkundenService.getKunde(elem.value, 'yes', 'yes')
      .subscribe( ret => {
        let found = false;
        if(ret && ret.length > 0){
          for(let row of ret){
            if(row.beznr.toString() === elem.value){
              found = true;
              this.umldetails[_varName] = row.beznr;
              this.umldetails[_varName + '_txt'] = row.fname;
            }
          }
        }
        if(!found){
          elem.value = this.umldetails[_varName];
        }
    });
  }

  //updated codn-feld ohne ins codn-modul zu springen
  searchCODN(_codeart: string, _variabelName: string, _idName: string): void {
    let val = (<HTMLInputElement>document.getElementById(_idName)).value;
    
    if(val === ''){
      this.umldetails[_variabelName] = '';
      this.umldetails[_variabelName + '_txt'] = '';
      return;
    }
    
    this.getcodeService.getCode(_codeart, '*', '*', 'D', '*', '*', '', 1, 200)
      .subscribe( ret => {
        let found = false;
        for(let row of ret){
          if(val === row.code_wert){
            found = true;
            this.umldetails[_variabelName] = row.code_wert;
            this.umldetails[_variabelName + '_txt'] = row.code_text;
          }
        }
        if(!found){
          (<HTMLInputElement>document.getElementById(_idName)).value = this.umldetails[_variabelName];
        }
    });
  }

  updatePaginator() {
    //paginator und tabellen-daten updaten
    this.aboumleitungensource.paginator._changePageSize(this.aboumleitungensource.paginator.pageSize);
  }
}
