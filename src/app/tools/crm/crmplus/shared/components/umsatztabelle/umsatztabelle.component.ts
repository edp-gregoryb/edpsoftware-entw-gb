import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UmsatzkundeService } from '../../services/umsatzkunde.service';
import { UmsatzvertreterService } from '../../services/umsatzvertreter.service';
import { UmsatzvermittlerService } from '../../services/umsatzvermittler.service';
import { UmsatzobjektService } from '../../services/umsatzobjekt.service';
import { UmsatzdynamischService } from '../../services/umsatzdynamisch.service';
import { OsgruppennamenService } from '../../services/osgruppennamen.service';
import { UmsatzService } from '../../../../shared/umsatz.service';
import { RestsygetdefaultService } from '../../services/restsygetdefault.service';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-umsatztabelle',
  templateUrl: './umsatztabelle.component.html',
  styleUrls: ['./umsatztabelle.component.css']
})
export class UmsatztabelleComponent implements OnInit {
  
  @Input() dynosName: any;
  @Input() umsatzdata: any;
  @Output() diagramdata = new EventEmitter();
  @Output() selecteddropdownvalue = new EventEmitter();
  
  sort = { spalte: '', reverse: false};
  columnone:any = [];
  controlauswahl:any;
  selected;
  temptable: Array<string> = [];
  osgruppen:any;
  searchumsatz:boolean = false;
  displayedColumns = ['feld1bez', 'sTOTAL', 'sTOTALVJ', 'sbdiffabs', 'sbdiffproz', 'sbudget', 'sdiffabs', 'sdiffproz', 'sTOTALNJ'];
  dataSource = new MatTableDataSource();
  dataSubject = new BehaviorSubject<any[]>([]);
  constructor(private umsatzkundeService: UmsatzkundeService,
              private umsatzvertreterService: UmsatzvertreterService,
              private umsatzvermittlerService: UmsatzvermittlerService,
              private umsatzobjektService: UmsatzobjektService,
              private umsatzdynamischService: UmsatzdynamischService,
              private changeDetectorRefs: ChangeDetectorRef,
              private osgruppennamenService:OsgruppennamenService,
              private umsatzService:UmsatzService,
              private restsygetdefaultService:RestsygetdefaultService ) { 
    
    this.osgruppennamenService.getosgruppennamen().subscribe(data => {
      console.log("getosgruppennamen",data);
      this.osgruppen = data;
      
      this.columnone = [
        {value: 'Kunde'},
        {value: 'Objekt'},
        {value: 'Vermittler'},
        {value: 'Vertreter'},
        {value: 'Monat'},
        {value: this.osgruppen[0].bez, index:this.osgruppen[0].liste},
        {value: this.osgruppen[1].bez, index:this.osgruppen[1].liste},
        {value: this.osgruppen[2].bez, index:this.osgruppen[2].liste},
        {value: this.osgruppen[3].bez, index:this.osgruppen[3].liste},
        {value: this.osgruppen[4].bez, index:this.osgruppen[4].liste}
      ];
    });
  }

  ngOnInit() {
    console.log("this.umsatzdata",this.umsatzdata);
    //this.dataSource.data = this.umsatzdata;
    
    //richtiger dropdown-default auswaehlen 
    this.restsygetdefaultService.getdefault('crm-umsatz','')
      .subscribe( data => {
        for(let i = 0; i < data.length; i++){
          if(data[i].FILE === 'crm-umsatz' && data[i].feld === 'diagramm'){ //default finden
            if(isNaN(Number(data[i].wert))){
              //default ist keine zahl
              this.selected = data[i].wert;
              this.controlchanges({ value: data[i].wert });
            } else {
              //default ist eine zahl
              let str = '';
              let index = Number(data[i].wert);
              switch(index){
                case 1:
                  str = "Kostenstelle";
                  break;
                case 2:
                  str = "Konzern/Kunde";
                  break;
                case 3:
                  str = "Objekttyp";
                  break;
                case 4:
                  str = "Kombivariante";
                  break;
                case 5:
                  str = "Branche Code-text1";
                  break;
                default:
                  break;
              }
              this.selected = str;
              this.controlchanges({ value: str, index: Number(data[i].wert)});
            }
          }
        }
      }, err => {
        console.log(err);
    });
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log("changes", changes);
    console.log("controlauswahl",this.controlauswahl);
    if(this.controlauswahl){
      this.controlchanges(this.controlauswahl);
    }
    /* console.log("controlauswahl",this.controlauswahl);
    if (this.umsatzdata & this.controlauswahl){
      console.log("this.selected",this.selected, this.umsatzdata);
      if (this.selected === "Kunde"){
        
        console.log("getumsatzkunde");
        this.getumsatzkunde(this.umsatzdata);
      
      } 
      else if (this.selected === "Objekt") {
        
        console.log("getumsatzobjekt");
        this.getumsatzobjekt(this.umsatzdata);
        
      } else if (this.selected === "Vermittler") {
        
        console.log("getumsatzvermittler");
        this.getumsatzvermittler(this.umsatzdata);
        
      } else if (this.selected === "Vertreter") {
        
        console.log("getumsatzvertreter");
        this.getumsatzvertreter(this.umsatzdata);
        
      } else if (this.controlauswahl.index === 1) {
      
        console.log("Kostenstelle");
        this.getumsatzdynymisch(this.umsatzdata, 1);
        
      } else if (this.controlauswahl.index === 2) {
        
        console.log("Konzern/Kunde");
        this.getumsatzdynymisch(this.umsatzdata, 2);
        
      } else if (this.controlauswahl.index === 3) {
        
        console.log("Objekttyp");
        this.getumsatzdynymisch(this.umsatzdata, 3);
        
      } else if (this.controlauswahl.index === 4) {
        
        console.log("Kombivariante");
        this.getumsatzdynymisch(this.umsatzdata, 4);
        
      } else if (this.controlauswahl.index === 5) {
      
        console.log("Branche Code-text1");
        this.getumsatzdynymisch(this.umsatzdata, 5);
        
      } else if (this.selected === "Monat") {
      
        console.log("Monat");
        this.getumsatzmonat(this.umsatzdata);
      }
    }*/
  }
  
  public getumsatzkunde(querydata):void {
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzkundeService.showumsatzkunde(querydata).subscribe(data => {
          data.forEach(element => {
            //console.log("umsatzkunde", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
           //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
  }
  
  public getumsatzobjekt(querydata):void {
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzobjektService.showumsatzobjekt(querydata).subscribe(data => {
          data.forEach(element => {
           // console.log("umsatzobjekt", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
            //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
  }
  
  public getumsatzvertreter(querydata):void {
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzvertreterService.showumsatzvertreter(querydata).subscribe(data => {
          data.forEach(element => {
           // console.log("umsatzvertreter", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
            //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
    
  }
  
  public getumsatzvermittler(querydata):void {
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzvermittlerService.showumsatzvermittler(querydata).subscribe(data => {
          data.forEach(element => {
           // console.log("umsatzvermittler", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
            //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
    
  }

  
  public getumsatzdynymisch(querydata, liste):void {
     console.log("getumsatzdynymisch", querydata);
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzdynamischService.showumsatzdynamisch(querydata, liste).subscribe(data => {
          data.forEach(element => {
           // console.log("umsatzvermittler", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
            //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
    
  }
   public getumsatzmonat(querydata):void {
    this.temptable = [];
    this.searchumsatz = true;
    this.umsatzService.showUmsatzCrm(querydata).subscribe(data => {
          data.forEach(element => {
           // console.log("umsatzvermittler", element);
            this.temptable.push(element);
            this.dataSource.data = this.temptable;
            
            //this.changeDetectorRefs.detectChanges();
          });
          this.searchumsatz = false;
          this.diagramdata.emit(this.temptable);
        });
   }
  
  controlchanges(val){
    console.log("val",val);
    this.controlauswahl = val;
        if (this.umsatzdata){
      console.log("this.selected",this.selected, this.umsatzdata);
      if (this.selected === "Kunde"){
        
        console.log("getumsatzkunde");
        this.getumsatzkunde(this.umsatzdata);
      
      } else if (this.selected === "Objekt") {
        
        console.log("getumsatzobjekt");
        this.getumsatzobjekt(this.umsatzdata);
        
      } else if (this.selected === "Vermittler") {
        
        console.log("getumsatzvermittler");
        this.getumsatzvermittler(this.umsatzdata);
        
      } else if (this.selected === "Vertreter") {
        
        console.log("getumsatzvertreter");
        this.getumsatzvertreter(this.umsatzdata);
        
      } else if (val.index === 1) {
        //console.log("this.osgruppen[0].liste",this.osgruppen);
        console.log("Kostenstelle");
        this.getumsatzdynymisch(this.umsatzdata, 1);
        
      } else if (val.index === 2) {
        
        console.log("Konzern/Kunde");
        this.getumsatzdynymisch(this.umsatzdata, 2);
        
      } else if (val.index === 3) {
        
        console.log("Objekttyp");
        this.getumsatzdynymisch(this.umsatzdata, 3);
        
      } else if (val.index === 4) {
        
        console.log("Kombivariante");
        this.getumsatzdynymisch(this.umsatzdata, 4);
        
      } else if (val.index === 5) {
      
        console.log("Branche Code-text1");
        this.getumsatzdynymisch(this.umsatzdata, 5);
        
      } else if (this.selected === "Monat") {
      
        console.log("Monat");
        this.getumsatzmonat(this.umsatzdata);
      }
    }
  }
  
  //sortiert tabelle nach der spalte die als parameter uebergeben wird
  sortTable(sortBy) {
    if(sortBy === this.sort.spalte){
      //mehrmals die selbe spalte angeklickt -> reihenfolge invertiert bei klick
      this.sort.reverse = !this.sort.reverse;
    } else {
      //andere spalte als zuvor -> aufsteigend sortieren nach dieser spalte
      this.sort.spalte = sortBy;
      this.sort.reverse = false;
    }
    //alle spalten die string sind und nicht number
    let dataSourceText = ['fehlertext', 'feld1bez'];
    
    //muss spalte nach string oder number sortiert werden
    if(dataSourceText.includes(sortBy)){
      //Text compare
      this.dataSource.data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
    } else {
      //Number compare
      this.dataSource.data.sort((a, b) => (Number(a[sortBy]) > Number(b[sortBy])) ? 1 : -1);
    }
    
    //falls invertiert werden muss, passiert das hier
    if(this.sort.reverse){
      this.dataSource.data.reverse();
    }
    //datasource.data loeschen und neu laden, damit tabelle neu laedt
    let buf = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = buf;
  } //ende sortTable()
  
  //exportiert eine .csv datei der aktuell dargestellten tabelle
  exportCSV(){
    let exportString = '';
    if(this.dataSource && this.dataSource.data && this.dataSource.data.length > 0){
      //spalten-titel hinzufuegen
      var map = {
        'feld1bez':   this.selected + ';',
        'sTOTALVJ':   'Vorjahr;',
        'sTOTAL':     'Akt. Jahr;',
        'sTOTALNJ':   'Nachjahr;',
        'sdiffabs':   'Diff-Abs;',
        'sdiffproz':  'Diff%;',
        'sbudget':    'Budget;',
        'sbdiffabs':  'Diff-Bud-Abs;',
        'sbdiffproz': 'Diff%-Bud;'
      };
      for(let prop in (<any>this.dataSource.data[0])){
        if(map[prop]){
          exportString += map[prop];
        }
      }
      //letztes komma entfernen und enter einfuegen
      exportString = exportString.slice(0, exportString.length - 1);
      //alle reihen einfuegen
      for(let i = 0; i < this.dataSource.data.length; i++){
        exportString += '\r\n';
        for(let prop in (<any>this.dataSource.data[i])){
          if (map[prop]) {
            //console.log("this.dataSource.data", this.dataSource.data);
            if (this.dataSource.data[i][prop] === null) { console.log('null im json')} else {
              this.dataSource.data[i][prop] = this.dataSource.data[i][prop].toString().replace(/"/g, "'");
              exportString += '"' + this.dataSource.data[i][prop] + '";';
            }

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
    link.setAttribute('download', this.selected + '.csv');
    link.click();
  } //ende exportCSV()
}
