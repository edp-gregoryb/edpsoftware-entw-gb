import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AbodetailComponent } from '../../abodetail/abodetail.component';
import { RestAbomerkstService } from '../../../rest-services/rest-abomerkst.service';
import { RestAbokategorieService } from '../../../rest-services/rest-abokategorie.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-abokategorien',
  templateUrl: './abokategorien.component.html',
  styleUrls: ['./abokategorien.component.css']
})
export class AbokategorienComponent implements OnInit {

  data: any = [];

  @Input() abodetailsInput: any;
  @Input() isOpen: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  abokategoriensource = new MatTableDataSource();
  columnsToDisplay = ['vorgnr', 'posnr', 'merkArt', 'bezeichnung', 'merk1', 'bezeichnung1', 'merk2', 'bezeichnung2', 'merk3', 'bezeichnung3', 'datum1', 'datum2', 'menge', 'textfeld', 'firma'];
  abodetails: any;

  kategorienAuswahl: any;
  ausgewaehlteKategorie: any;

  selectedRowIndex: number = -1;
  kategorieDetails: any;

  constructor(private abodetailComponent: AbodetailComponent,
              private merkstService: RestAbomerkstService,
              private kategorienService: RestAbokategorieService) { }

  ngOnInit() {
    this.abodetails = this.abodetailsInput.abo;
    this.setup();
  }

  ngOnChanges(change: any) {
    this.abodetails = this.abodetailsInput.abo;
    if(change && (change.abodetailsInput || change.zwischenspeicher)){
      this.data = [];
      this.setup();
    }
  }

  setup() {
    this.resetVariables();

    this.kategorienService.getAboKategorien(this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( ret => {
        if(ret){
          for(let i = 0; i < ret.length; i++) {
            ret[i].textfeld = decodeURI(ret[i].textfeld);
          }
          this.data = ret;
          this.resetVariables();
        }
    });

    this.merkstService.getMerkmalstammAuswahl()
      .subscribe(ret => {
        this.kategorienAuswahl = ret;
    });
  }

  resetVariables() {
    this.selectedRowIndex = -1;
    this.kategorieDetails = null;

    this.abokategoriensource.paginator = this.paginator;
    this.abokategoriensource.data = this.data;
    this.abokategoriensource.sort = this.sort;
  }

  //fuehrt eine funktion aus mit dem namen _funcName
  execFunction(_funcName: string, _param?: any){
    if(this.isOpen){
      if(_param !== undefined) {this[_funcName](_param);}
      else {this[_funcName]();}
    }
  }

  highlight(row){
    let sorted = this.getSortedData();
    for(let i = 0; i < sorted.length; i++){
      if(JSON.parse(JSON.stringify(sorted[i])).r_rowid === row.r_rowid){
        this.selectedRowIndex = i;
      }
    }
    this.kategorieDetails = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));
  }

  shouldBeHighlighted(row: any): boolean{
    if(this.selectedRowIndex === -1){ return false; }
    let sorted = this.getSortedData();
    if(!sorted || !sorted[this.selectedRowIndex]){ return false; }
    
    if(JSON.parse(JSON.stringify(sorted[this.selectedRowIndex])).r_rowid === row.r_rowid){
      return true;
    }
    return false;
  }

  skipKategorie(num: number) {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.abokategoriensource.data.length - 1 || this.selectedRowIndex === -1))){
      return;
    }

    let sorted = this.getSortedData();
    if(num < 0){
      this.abokategoriensource.paginator.firstPage();
      this.highlight(sorted[0]);
    } else if(num > 0){
      this.abokategoriensource.paginator.pageIndex = Math.floor((this.abokategoriensource.data.length-1) / this.abokategoriensource.paginator.pageSize);
      this.highlight(sorted[sorted.length - 1]);
    }

    //paginator und tabellen-daten updaten
    this.abokategoriensource.paginator._changePageSize(this.abokategoriensource.paginator.pageSize);
  }

  changeKategorie(num: number) {
    if((num < 0 && this.selectedRowIndex < 1) || (num > 0 && (this.selectedRowIndex === this.abokategoriensource.data.length - 1 || this.selectedRowIndex === -1))){
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
    this.abokategoriensource.paginator.pageIndex = Math.floor(indexAfter / this.abokategoriensource.paginator.pageSize);
    //paginator und tabellen-daten updaten
    this.abokategoriensource.paginator._changePageSize(this.abokategoriensource.paginator.pageSize);
  }

  getSortedData(){
    let sortedData:any;
    return this.abokategoriensource.sortData(this.abokategoriensource.filteredData, this.abokategoriensource.sort);
  }

  // fuegt eine kategorie hinzu
  addKategorie(): void {
    let tempData = JSON.parse(JSON.stringify(this.abokategoriensource.data));
    let tempKat = this.kategorienAuswahl.find(x => x.r_rowid === this.ausgewaehlteKategorie);
    if(!tempKat){return};
    
    this.kategorienService.createEmptyAboKategorie(this.abodetails.vorgnr, this.abodetails.posnr)
      .subscribe( kateg => {
        for(var prop in tempKat) {
          if(tempKat.hasOwnProperty(prop)) {
            kateg[prop] = tempKat[prop];
          }
        }

        //speichern und fuegt kategorie hinzu
        this.kategorienService.updateAboKategorie('N', kateg)
          .subscribe( ret => {
            if(ret[0].fehlercode !== '' && ret[0].fehlercode !== '200') {
              window.alert("Speicherung nicht erfolgreich.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
            } else {
              tempData.push(ret[0]);
              this.abokategoriensource.data = JSON.parse(JSON.stringify(tempData));
      
              this.abokategoriensource.paginator._changePageSize(this.abokategoriensource.paginator.pageSize);
              //diese anwaehlen
              this.skipKategorie(1);
            }
        });
    });
  } // ende addKategorie()

  //speichert oder updated eine kategorie
  saveKategorie(): void {
    let sorted = this.getSortedData();
    let aboToSave: any = JSON.parse(JSON.stringify(sorted[this.selectedRowIndex]));
    
    if(!aboToSave){return};
    aboToSave = JSON.parse(JSON.stringify(aboToSave));

    //ESCAPE Textfeld
    aboToSave.textfeld = encodeURIComponent(aboToSave.textfeld);
    //FORMAT Datum1 && Datum2, 15.2.0001 --> 0001-02.15
    aboToSave.datum1 = moment(aboToSave.datum1).format('YYYY-MM-DD');
    aboToSave.datum2 = moment(aboToSave.datum2).format('YYYY-MM-DD');

    //im Bakcend updaten
    this.kategorienService.updateAboKategorie('M', aboToSave)
      .subscribe( ret => {
        if(ret[0].fehlercode !== '' && ret[0].fehlercode !== '200') {
          window.alert("Speicherung nicht erfolgreich.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
        }
    });
  } // ende saveKategorie

  //loescht eine kategorie
  deleteKategorie() {
    if(this.selectedRowIndex === -1){ return; }

    //kontroll-dialog
    this.abodetailComponent.openLoeschenDialog('Kategorie')
    .then(ret => {
      //wenn user wirklich koschen moechte
      if(ret && ret === '1'){
        //kategorie suchen
        for(let i = 0; i < this.abokategoriensource.data.length; i++){
          if(JSON.parse(JSON.stringify(this.abokategoriensource.data[i])).r_rowid === this.kategorieDetails.r_rowid){

            //backend informieren
            this.kategorienService.deleteAboKategorie(this.abokategoriensource.data[i])
              .subscribe( ret => {
                if(ret[0].fehlercode !== "") {
                  window.alert("Löschen fehlgeschlagen.\nAngezeigt: Error [" + ret[0].fehlercode + '], "' + ret[0].fehlertext + '"');
                  return;
                }

                //tabellen-daten updaten
                let tempData = JSON.parse(JSON.stringify(this.abokategoriensource.data));
                tempData.splice(i, 1)
                this.abokategoriensource.data = tempData;

                //paginator updaten
                if(this.abokategoriensource.data.length % 5 === 0 && this.abokategoriensource.paginator.getNumberOfPages() === this.abokategoriensource.paginator.pageIndex){
                  this.abokategoriensource.paginator.pageIndex--;
                }
                this.selectedRowIndex = -1;
                this.abokategoriensource.paginator._changePageSize(this.abokategoriensource.paginator.pageSize);
            });
          }
        }
      }
    });
  } // ende deleteKategorie()

  kategorieSchonDa(_rowid): boolean {
    this.abokategoriensource.data.forEach( (elem) => {
      if(JSON.parse(JSON.stringify(elem)).r_rowid.toString() == _rowid.toString()) {
        return true;
      }
    });
    return false;
  }

  //zeigt detailinfor wie zB auser, nuser,...
  showErstellInfo(){
    if(this.selectedRowIndex === -1){ return; }

    this.abodetailComponent.openDetailinfoDialog({abomerk: this.kategorieDetails});
  }
}
