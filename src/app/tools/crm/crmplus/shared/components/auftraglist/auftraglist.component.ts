import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {DataSource } from '@angular/cdk/collections';
import { TimelineService } from '../../../../shared/timeline.service';
import { Timeline } from '../../../../../shared/entities/timeline';

@Component({
  selector: 'app-auftraglist',
  templateUrl: './auftraglist.component.html',
  styleUrls: ['./auftraglist.component.css']
})
export class AuftraglistComponent implements OnChanges {
  @Input() aufnummer:any;
  @Input() kunde : any;
  @Input() obj:string;
  @Input() vondatum:string;
  @Input() bisdatum:string;
  @Input() vermittler:string;
  @Input() rubrik:string;
  @Input() aufart:string;
  @Input() vertreter:string;
  @Input() sicht:string;
  
  @Output() rowfordetail = new EventEmitter();
  @Output() tableload = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  searchparameter: Timeline;
  searchauftrag:boolean = false;
  
  displayedColumns = ['vertreter','aufnr','sujetnr','ndatum','datum','NAME','sujet','objekt','rubrik', 'brutto','nettoNetto','aufart','memotext']; //this.columns.map(x => x.columnDef);
 //Anzeige der Column mit show oder nicht anzeigen mit none
  spalteshow = {vertreter : 'show',aufnr: 'show',sujetnr: 'show', ndatum: 'show', datum: 'show', NAME: 'show', sujet: 'show', objekt: 'show', rubrik: 'show', brutto: 'show', nettoNetto: 'show', aufart: 'show', memotext: 'none'  };
  timelinessource = new MatTableDataSource();

  constructor(private timelineService:TimelineService) { 
     
  }

  ngOnInit() {}

   ngOnChanges(changes: SimpleChanges){
    console.log("auftraglist changes", changes);   

   let tempaufnummer = "";
   let tempobjekt = "";
   let tempvondatum = "";
   let tempbisdatum = "";
   let tempaufart = "";
   let temprubrik = "";
   let tmepaufart = "";
   let tempvertreter = "";
   let tempvermittler = "";
   let tempsicht = "";
   let tempkunde = "";
   
   if (this.aufnummer !== undefined){
     tempaufnummer = this.aufnummer;
   }
   
   console.log("this.obj",this.obj);
   
  if (this.obj !== undefined){
     tempobjekt = this.obj;
   }
  if (this.vondatum !== undefined){
     tempvondatum = this.vondatum;
   }
  if (this.bisdatum !== undefined){
     tempbisdatum = this.bisdatum;
   }  
   
   if (this.rubrik !== undefined){
       temprubrik = this.rubrik;
   }
   
   if (this.aufart !== undefined){
       tempaufart = this.aufart;
   }
   
   if (this.vertreter !== undefined){
       tempvertreter = this.vertreter;
   }
   
   if (this.vermittler !== undefined){
       tempvermittler = this.vermittler;
   }
   
   if (this.sicht !== undefined){
       //manchmal wird die sicht faelschlicherweise als objekt (z.B.: {"value": "A"}) uebergeben.
       //Falls dies passiert wird es geparsed und ausgelesen.
       if(this.sicht[0] === "{"){
           tempsicht = JSON.parse(this.sicht).value;
       } else {
           tempsicht = this.sicht;
       }
   }
   
   if (this.kunde !== undefined){
       tempkunde = this.kunde;
   }
   
   this.searchparameter = {kunde: this.kunde, vertreter:tempvertreter, vermittler: tempvermittler, aufnr: tempaufnummer, objekt: tempobjekt, rubrik:temprubrik, vondatum: tempvondatum, bisdatum: tempbisdatum, aufart: tempaufart, sicht:tempsicht};

   //this.Timeline.rubrik = //this.objekt;
   //this.Timeline.vermittler = this.objekt;
   //this.Timeline.vertreter = 
   //this.Timeline.verknuepfung =
   this.searchauftrag = true;
   var temptimeline:any;
    this.timelineService.showallwitparam(this.searchparameter)
    .subscribe(timeline => {
      temptimeline = timeline;
      //console.log("temptimeline",temptimeline),
      
       if (temptimeline != undefined){
      for (let i=0;i <= temptimeline.length -1; i++){
          if (temptimeline[i].aufart === '01'){
              temptimeline[i].aufart = 'play_circle_filled';
          }
          if (temptimeline[i].aufart === '02'){
              temptimeline[i].aufart = 'play_circle_outline';
          }
          if (temptimeline[i].aufart === '04'){
              temptimeline[i].aufart = 'hourglass_empty';
          }
          if (temptimeline[i].aufart === '10'){
              temptimeline[i].aufart = 'play_circle_outline';
          }
          if (temptimeline[i].aufart === ''){
              temptimeline[i].aufart = '';
          }

      }
      this.searchauftrag = false;
      this.timelinessource.data = temptimeline;
       } else {
         console.log("keine daten");
       }
  }, err => {
        console.error(err);
      });
  }

  
  ngAfterViewInit() {
    this.timelinessource.paginator = this.paginator;
     this.timelinessource.sort = this.sort;
  }
  
  public showdetail(val){
    console.log("showdetail", val);
    this.rowfordetail.next(val);
  }
  
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.timelinessource.filter = filterValue;
  }


    //exportiert eine .csv datei der aktuell dargestellten tabelle
    exportCSV(){
        let exportString = '';
        if(this.timelinessource && this.timelinessource.data && this.timelinessource.data.length > 0){
            //spalten-titel hinzufuegen
            var map = {
                'vertreter':   'Initialen' + ';',
                'aufnr':   'Aufnr;',
                'sujetnr':     'Sujetnr;',
                'ndatum':   'Eingang;',
                'datum':   'Erscheinung;',
                'NAME':  'Kunde;',
                'sujet':    'Sujet;',
                'objekt':  'Objekt;',
                'rubrik': 'Rubrik;',
                'brutto': 'Brutto;',
                'nettoNetto': 'netto Netto;',
                'aufart': 'Aufart;',
                'memotext': 'Kommentar;'
            };
            for(let prop in (<any>this.timelinessource.data[0])){
                if(map[prop]){
                    exportString += map[prop];
                }
            }
            //letztes komma entfernen und enter einfuegen
            exportString = exportString.slice(0, exportString.length - 1);
            //alle reihen einfuegen
            for(let i = 0; i < this.timelinessource.data.length; i++){
                exportString += '\r\n';
                for(let prop in (<any>this.timelinessource.data[i])){
                    if(map[prop]){
                        this.timelinessource.data[i][prop] = this.timelinessource.data[i][prop].toString().replace(/"/g, "'");
                        exportString += '"' + this.timelinessource.data[i][prop] + '";';
                    }
                }
                //letztes komma entfernen und enter einfuegen
                exportString = exportString.slice(0, exportString.length - 1);
            }
        }

        //export
        if(exportString === undefined || exportString === null || exportString === ''){
            return;
        }
        exportString = 'data:text/csv;charset=utf-16,\uFEFF' + encodeURIComponent(exportString);
        //let data = encodeURI(exportString);

        let link = document.createElement('a');
        link.setAttribute('href', exportString);
        link.setAttribute('download', 'Werbeauftrasliste' + '.csv');
        link.click();
    } //ende exportCSV()

}

export interface timelineData {
  //select:boolean;
  vertreter: string;
  aufnr: string;
  sujetnr: string;
  ndatum: string;
  datum: string;
  NAME: string;
  sujet: string;
  objekt: string;
  nettoNetto: string;
  aufart: string;
  memotext: string;
}
