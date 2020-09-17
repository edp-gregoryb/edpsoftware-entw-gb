import { Component, OnInit, Inject, ViewChild, Input, AfterViewInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DataSource, SelectionModel } from '@angular/cdk/collections';
import { TerminService } from '../../../../shared/termin.service';
import { MemonewService } from '../../../../shared/services/memonew.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kundenterminlist',
  templateUrl: './kundenterminlist.component.html',
  styleUrls: ['./kundenterminlist.component.css']
})
export class KundenterminlistComponent implements OnInit {

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
  @Input() aktion:string;
  @Input() aktivitaet:string;
  @Input() mitarbeiter:string;
  @Input() history:string;
  @Input() actionvar:any;
  
  @Output() rowfordetail = new EventEmitter();
  @Output() tableload = new EventEmitter();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchauftrag:boolean = false;
  searchparameter:any;
  displayedColumns = ['vetreter', 'termdatum', 'termzeit', 'termaktivic', 'beznr', 'NAME', 'termkontaktpers', 'termrapptext', 'memotext','objekt', '_id'];
  spalteshow = {vertreter : 'show',termdatum: 'show',termzeit: 'show', termaktivic: 'show', beznr: 'show', NAME: 'show', termkontaktpers: 'show', termrapptext: 'show', memotext: 'show',objekt: 'show' , _id: 'none' };
  terminlistsource = new MatTableDataSource();
  selection = new SelectionModel<string>(false, null);
  selectedrowString: string;
  selectedrowJson:any;
  
  constructor(private terminService:TerminService, public dialog: MatDialog, private memonewService:MemonewService,  private router: Router) { }

  ngOnInit() {
            // selection changed
    this.selection.changed.subscribe((a) =>
    {
      // console.log('You selected ' + JSON.stringify(a));
        if (a.added[0])   // will be undefined if no selection
        {
           this.selectedrowString = JSON.stringify(a.added[0]);
            //console.log('You selected ' + selectedrowString);
            
        }
    });
  }
  
  openDialog(): void {
    this.selectedrowJson = JSON.parse(this.selectedrowString);
    let dialogRef = this.dialog.open(KommentarShowDialog, {
      width: '300px',
       data: { row:  this.selectedrowJson}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.memonewService.newMemo(this.selectedrowJson.rapnr,result)
      .subscribe(memo => {
        console.log("memo",memo)
      }, err => {
        console.error(err);
      });
      // this.animal = result;
    });
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log("auftraglist changes", changes);
      console.log("actionvar", this.actionvar);
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
   let tempaktion = "";
   let tempaktivitaet = "";
   let tempmitarbeiter = "";
   let temphistory = "";
   
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
       tempsicht = this.sicht;
   }

   if (this.aktion !== undefined){
     tempaktion = this.aktion;
   }

   if (this.aktivitaet !== undefined){
    tempaktivitaet = this.aktivitaet;
  }

  if (this.mitarbeiter !== undefined){
    tempmitarbeiter = this.mitarbeiter;
  }

  if (this.history !== undefined){
    temphistory = this.history;
  }
   
   this.searchparameter = {kunde: this.kunde, vertreter:tempvertreter, vermittler: tempvermittler, aufnr: tempaufnummer, objekt: tempobjekt, aktion:tempaktion, aktivitaet:tempaktivitaet, mitarbeiter:tempmitarbeiter, rubrik:temprubrik, vondatum: tempvondatum, bisdatum: tempbisdatum, aufart: tempaufart, sicht:tempsicht, history: temphistory};


 
  
  
  
 
    this.searchauftrag = true;
    var tempterminejson:any;// getWithParams (kundenNr, hist, rapnr, obj, rubrik, urubrik, aschluessel, aktividcd,datumvon, datumbis, agentur)
    // sicht,kundnr, hist, rapnr, objnr,rubrik, urubrik, aschluessel, aktivitaetnr, dvon,dbis, agenturnr, mitarbeiernr
    var temptermine:any;
    this.terminService.getWithParams (this.searchparameter)
    .subscribe(response => {
        console.log("terminlist response", response);
        // tempterminejson = JSON.parse(response);
        // var temptermine = tempterminejson.tt_ittermine;
        // var temptermine = tempterminejson;
        temptermine = response;
       
      if (temptermine != undefined){
      for (let i=0;i <= temptermine.length -1; i++){
          if (temptermine[i].termaktivic === 'EM'){
              temptermine[i].termaktivic = 'mail';
          }
          if (temptermine[i].termaktivic === 'BE'){
              temptermine[i].termaktivic = 'group';
          }
          if (temptermine[i].termaktivic === 'AU'){
              temptermine[i].termaktivic = 'insert_invitation';
          }
          if (temptermine[i].termaktivic === 'TE'){
              temptermine[i].termaktivic = 'phone';
          }
          if (temptermine[i].termaktivic === 'BR'){
              temptermine[i].termaktivic = 'format_align_left';
          }
          if (temptermine[i].termaktivic === 'EV'){
              temptermine[i].termaktivic = 'event';
          }
          if (temptermine[i].termaktivic === 'MA'){
              temptermine[i].termaktivic = 'filter_none';
          }
          if (temptermine[i].termaktivic === 'PR'){
              temptermine[i].termaktivic = 'local_parking';
          }
      }
       this.searchauftrag = false;
       this.terminlistsource.data = temptermine;
      } else {
         console.log("keine daten");
       }
    }, err => {
        console.error(err);
      });
  
  
  } 

  
  
  
  

   ngAfterViewInit() {
    this.terminlistsource.paginator = this.paginator;
     this.terminlistsource.sort = this.sort;
  }
  
  // public showdetail(val){
  //   console.log("showdetail", val);
  //   this.rowfordetail.next(val);
  // }

  public gotoTermindetail(val){
    console.log("gotoTermindetail", val);
    //this.rapnrvonlink, this.kundevonlink, this.rubrikvonlink,this.urubrikvonlink,this.aschlusselvonlink
    this.router.navigate(['./termindetailview/termindetail-show',val]);
}
  
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.terminlistsource.filter = filterValue;
  }

}
@Component({

  templateUrl: 'kommentar-show-dialog.html'
})
export class KommentarShowDialog {

  constructor(
    public dialogRef: MatDialogRef<KommentarShowDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
