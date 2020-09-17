import { Component, OnInit, OnChanges, Input, ViewContainerRef, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { TimelineService } from '../../timeline.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuftragdetailComponent } from '../../components/auftragdetail/auftragdetail.component';
import { DocumentIndex } from 'ndx';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { RestitgeterscheinungenService } from '../../services/restitgeterscheinungen.service';
import { Subscription} from 'rxjs';
import { KundenkarteformService } from '../../../shared/services/kundenkarteform.service';
import { KundenkarteService } from '../../../shared/services/kundenkarte.service';
import { WindowrefService } from '../../../../shared/comm/windowref.service';
import { environment } from '../../../../../../environments/environment';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-infosauftraege',
  templateUrl: './infosauftraege.component.html',
  styleUrls: ['./infosauftraege.component.css'],
  providers: [
   {provide: MAT_DATE_LOCALE, useValue: environment.language},
   {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
   {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
   WindowrefService
   ],
})
export class InfosauftraegeComponent implements OnInit, AfterContentChecked {
  
  timelinehist: any;
  @Input() termindata:any;

  dialogRef: MatDialogRef<any>;
  termindataChanged:boolean = false;
  verknuepfung:boolean;
  verknuepfungicon:boolean = false;
  tempauftraegsliste:any;
  autraegesuche:any;
  innerheight:number;
  kundenkarte:boolean = false;
  listkundenkarten:any;
  startdate:any;
  enddate:any;
  abschlussstartdate:any;
  abschlussenddate:any;
  selectedkarte:any;
  pickervalue:any;
  picker1value:any;
  picker2value:any;
  picker3value:any;
  ladekundenkarte:boolean = false;
  window:Window;
  private resizeSubscription:Subscription;
  
  constructor(private timelineService: TimelineService,public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef, private windowsizeService:WindowsizeService,
    private restitgeterscheinungenService:RestitgeterscheinungenService,
    private kundenkarteformService:KundenkarteformService,
    private kundenkarteService:KundenkarteService,
    private windowrefService:WindowrefService) { }

  ngOnInit() { }
  
  @ViewChild('matList', { static: true }) el:ElementRef;
  
  ngAfterContentChecked(){
    this.innerheight = self.innerHeight - this.el.nativeElement.offsetTop - 113;
  }
  
  ngOnChanges(changes: any){

    if(changes.termindata){
      this.termindataChanged = !this.termindataChanged;
    }
    
    if (this.termindata){
      console.log("this.termindata",this.termindata);
      this.showtimelinehistory(this.termindata.beznr, 'no', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
    }

    let year:any = new Date().getFullYear();
    
    let startdate = new Date(year,0,1,0,0,0,0);
    let enddate = new Date(year,11,31,0,0,0,0);

    console.log("startdate enddate year", startdate, enddate, year);
    
    this.startdate = _moment(startdate).format("DD.MM.YYYY");
    this.pickervalue = startdate;
    this.enddate = _moment(enddate).format("DD.MM.YYYY");
    this.picker1value = enddate;

    this.abschlussstartdate = _moment(startdate).format("DD.MM.YYYY");
    this.picker2value = startdate;
    this.abschlussenddate = _moment(enddate).format("DD.MM.YYYY");
    this.picker3value = enddate;
    
    if(changes.termindata){
      if(changes.termindata.currentValue === undefined){
        this.timelinehist = [];
      }
    }
  }
  verknuepfungEinAus(val){
    if(!this.termindata){
      return;
    }
    console.log("verknuepfungEinAus",val);
    this.verknuepfung = val;
      if (this.verknuepfung === true) {
           this.showtimelinehistory(this.termindata.beznr, 'no', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
        //this.showtimelinehistory(this.termindata.beznr, 'no', '', '', '');
      } else {
          this.showtimelinehistory(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);

      }
  }
  showtimelinehistory(kunde, verknuepfung, obj, rubrik, urubrik) {
    // console.log("onSubmitAuftraege", kunde, verknuepfung, obj, rubrik, urubrik);
    // this.timelineService.showall(kunde, verknuepfung, obj, rubrik, urubrik)
    //   .subscribe(timelines => { this.timelinehist = timelines; console.log("this.timelinehist",this.timelinehist);}, err => {
    //     console.error(err);
    //   });
    this.verknuepfungicon = true;
    this.timelinehist = [];
    this.restitgeterscheinungenService.getErscheinungen(kunde, verknuepfung, obj, rubrik, urubrik)
      .subscribe(timelines => {
        this.timelinehist = timelines;
        console.log("this.timelinehist",this.timelinehist);
        this.verknuepfungicon = false;
      }, err => {
        console.error(err);
        this.verknuepfungicon = false;
    });
  }
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
  
  openAuftragModal(val) {

    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AuftragdetailComponent, {
         height: '700px',
        width: '1300px',
    });
    this.dialogRef.componentInstance = val;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
   
   
  }
  searchauftraege(event) {
    // console.log("searchaufträge", event);
    if(!this.termindata){
      return;
    }
    if (!event){
      this.showtimelinehistory(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
    }
    console.log('this.timelinehist', this.timelinehist);

    this.tempauftraegsliste = this.timelinehist;
    const index = new DocumentIndex();
    index.addField("aufnrstr");
    index.addField("sujetnr");
    index.addField("datum");
    index.addField("objekt");
    index.addField("rubrik");
    index.addField("urubrik");
    index.addField("groesse");
    // index.addField("aufnr");
    // index.addField("sujetnr");
    // index.addField("brutto");
    // index.addField("netto");
    // index.addField("nettoNetto");
    this.tempauftraegsliste.forEach((doc) => {
      console.log(doc)
      index.add(doc, doc);
    });
    var obj = index.search(event);
    // console.log("index",obj);
    
    var tempjsonArray = [];
    for (var i=0;i <= obj.length -1;i++){
      tempjsonArray.push(obj[i].docId);
    }
      this.timelinehist = tempjsonArray;
  }

  public openKundenkarte(){
    if(!this.termindata){
      return;
    }
    console.log("openKundenkarte");
    this.kundenkarte = true;
    this.kundenkarteformService.showkundenkarte(this.termindata.beznr)
      .subscribe(kart => { 
        this.listkundenkarten = kart;
        this.selectedkarte = kart[0];
        console.log("kundenkarteformService", kart);

      });
  }  
  public getStartDate(val: MatDatepickerInputEvent<Date>){
    this.startdate = _moment(val.value).format("DD.MM.YYYY");
    console.log("getStartDate",this.startdate);
  }
  public getEndtDate(val: MatDatepickerInputEvent<Date>){
    this.enddate = _moment(val.value).format("DD.MM.YYYY");
    console.log("getEndtDate",this.enddate);
  }
  public getAbschlussStartDate(val: MatDatepickerInputEvent<Date>){
    this.abschlussstartdate = _moment(val.value).format("DD.MM.YYYY");
    console.log("getAbschlussStartDate",this.abschlussstartdate);
  }
  public getAbschlussEndtDate(val: MatDatepickerInputEvent<Date>){
    this.abschlussenddate = _moment(val.value).format("DD.MM.YYYY");
    console.log("getAbschlussEndtDate",this.abschlussenddate);
  }
  public kundenkarteabrechen(){
    this.kundenkarte = false;
  }
  public showKarte(val){
    console.log("showKarte",val);
  }
  public kundenkarteabearbeiten(val){
    console.log("this.termindata.beznr, this.termindata.NAME, this.startdate+'-'+this.enddate,this.abschlussstartdate+'-'+this.abschlussenddate,this.selectedkarte",this.termindata.beznr, this.termindata.NAME, this.startdate+'-'+this.enddate,this.abschlussstartdate+'-'+this.abschlussenddate,this.selectedkarte.formularid);
    this.ladekundenkarte = true;
    this.kundenkarteService.showkundenkarte(this.termindata.beznr, this.termindata.NAME, this.startdate+'-'+this.enddate,this.abschlussstartdate+'-'+this.abschlussenddate,this.selectedkarte.formularid)
      .subscribe(kartdata => {
        console.log("kartdata",kartdata);
        if (kartdata.length >= 1){
          let mimetype = 'application/pdf;base64';
          let blob = this.base64dataToBlob(kartdata[0].kundenkarte, mimetype);
          let blobUrl = URL.createObjectURL(blob);
          this.window = this.windowrefService.getNativeWindow();
          this.window.open(blobUrl, '_blank');
          // console.log("Blob", blobUrl);
          this.kundenkarte = false;
          this.ladekundenkarte = false;
        }else{
          console.log("Keine Bestätigung vorhanden");
          this.kundenkarte = false;
          this.ladekundenkarte = false;
        }
      // this.kundenkarte = false;
      // this.ladekundenkarte = false;
    });
  }

  base64dataToBlob(base64data, mimeType) {
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

// displayedColumns = ['position', 'name', 'weight', 'symbol'];
// dataSource = new MatTableDataSource(ELEMENT_DATA);

}
  


