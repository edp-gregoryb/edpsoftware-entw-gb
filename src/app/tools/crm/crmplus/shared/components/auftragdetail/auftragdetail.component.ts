import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuftragdetailService } from '../../../../shared/services/auftragdetail.service';
import { FarosdateienService } from '../../../../shared/services/farosdateien.service';
// import {MatDialog } from '@angular/material';
import { PosrekapService } from '../../../../shared/services/posrekap.service';

import { FisFileDownloadService } from '../../../../shared/services/fis-file-download.service';
import { WindowrefService } from '../../../../shared/comm/windowref.service';
import { AuftragbestService } from '../../../../shared/services/auftragbest.service';
import { FakturaService } from '../../../../shared/services/faktura.service';
import { FarosgetinseratejpgService } from '../../services/farosgetinseratejpg.service';
import { RestitauftragjpgService } from '../../../shared/services/restitauftragjpg.service';
import {DataSource} from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

// import { Observable , Observer, Subscriber} from 'rxjs';

@Component({
  selector: 'app-auftragdetail',
  templateUrl: './auftragdetail.component.html',
  styleUrls: ['./auftragdetail.component.css']
})
export class AuftragdetailComponent implements OnInit {
  auftragdetails:any = [];
  farosdateien:any;
  erschJsonData:any;
  queryresult:any;
  rekapJsonData:any;
  farosAuftragdateien:any;
  window:Window;
  erschdat:string;
  
  @Input()  kunde:number;
  @Input()  objekt:string;
  @Input()  aufnr:number;
  @Input()  sujetnr:string;
  @Input()  datum:string;
  @Input() returnlink:any;
  @Output() switchback = new EventEmitter();

  nettototal : any = [];
  nettoNettototal : any = [];
  Mwst: any = [];

  displayedColumns = ['posbez', 'netto', 'nettoNetto'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['Mwst', 'nettototal', 'nettoNettototal'];
  posrekabtotal = new MatTableDataSource();

  displayedColumns2 = ['erscheinung', 'obj_bezeichnung', 'sujet','rubrik', 'urubrik', 'poskey', 'preisman', 'betrexkl', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];
  erscheiungensource = new MatTableDataSource();

  //displayedColumns3 = ['','', '', '', '', 'totaltotalsumme', '', '', '', '', '', '', '', '', '', ''];
  displayedColumns3 = ['erscheinung', 'obj_bezeichnung', 'sujet','rubrik', 'urubrik', 'poskey', 'preisman', 'totaltotalsumme', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];

  erscheinungentotal = new MatTableDataSource();

 
    keinDokuhinterlegt:boolean = false;
    ladendoku:boolean = false;
    inseratejpganwesend:boolean = false;
    
    // tempbase64pdf:any;
  constructor(private auftragdetailService:AuftragdetailService, private farosdateienService:FarosdateienService,
  private posrekapService:PosrekapService,private fisFileDownloadService:FisFileDownloadService,
  private windowrefService:WindowrefService, private auftragbestService:AuftragbestService,
  private fakturaService:FakturaService, public snackBar: MatSnackBar,
  private farosgetinseratejpgService: FarosgetinseratejpgService,
  private restitauftragjpgService:RestitauftragjpgService,
  private router: Router) { }
//private windowrefService:WindowrefService,
  ngOnInit() {

//"restitauftragdet%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05M%06start%051%06anzahl%0550%06firma%052%06kunde%0517171%06aufnr%054011951%06sujetnr%05A%06vondatum%0523.01.2018%06bisdatum%0523.01.2018%06objekt%05SoWo"
//"restitauftragdet%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05M%06start%051%06anzahl%0550%06firma%052%06kunde%0517171%06aufnr%054011951%06sujetnr%05undefined%06vondatum%0523.01.2018%06bisdatum%0523.01.2018%06objekt%05SoWo"    
    
    // this.queryresult = this.dialogRef.componentInstance;
    this.queryresult = {"kunde":this.kunde, "objekt":this.objekt, "aufnr":this.aufnr, "sujetnr":this.sujetnr, "datum":this.datum};
     console.log("queryresult",this.queryresult);
     this.getAuftragsdetail();
     this.getPosrekap();
     this.getFarosdateien();
     this.getFarosAuftragdateien();
     this.openInseratejpg(this.aufnr,this.sujetnr, this.objekt);
  }

  getAuftragsdetail(){
    var tempauftragdetails:any;
    this.auftragdetailService.showauftragdetail(this.queryresult.kunde,this.queryresult.objekt,this.queryresult.datum,this.queryresult.datum,this.queryresult.aufnr,this.queryresult.sujetnr)
      .subscribe(aufdet => { tempauftragdetails = aufdet;
        this.erscheiungensource.data = tempauftragdetails;
        var temptotal:any = [];
        for (let i = 0; i < tempauftragdetails.length; i++){
          temptotal[i] = tempauftragdetails[i].betrexkl;
        }
         console.log("temptotal",temptotal);
         if (temptotal.length === 0 ){
           temptotal[0] = 0;
         }
        let temptotal1 = temptotal.reduce(this.getSum);
        console.log("temptotal1",temptotal1);
        this.erscheinungentotal.data =  [{"totaltotalsumme":temptotal1}];
     // this.erschJsonData = JSON.stringify(tempauftragdetails);
      if (tempauftragdetails.length >= 1){
         this.auftragdetails.push(tempauftragdetails[0]);
         // this.auftragdetails = tempauftragdetails;
         console.log("this.auftragdetails",this.auftragdetails);
      } else {
        this.auftragdetails = tempauftragdetails;
      }

        console.log("this.auftragdetails",this.auftragdetails.length);
      });
  }
  getFarosdateien(){
    // console.log("this.queryresult.aufnr+this.queryresult.sujetnr",this.queryresult);auftrag
    //this.erschdat = this.queryresult.datum.substr(0, 8);
    let temperschdat = this.queryresult.datum.substr(0, 8);
    this.erschdat = temperschdat;
    this.farosdateienService.showfarosdateien(this.queryresult.aufnr+this.queryresult.sujetnr,this.queryresult.objekt,this.erschdat,'kunde')
      .subscribe(farosdat => { this.farosdateien = farosdat;
        console.log("this.auftragdetails",this.farosdateien);
      });
  }
  getFarosAuftragdateien(){
//"farosGetDateien%04Termid%05WEB0010022008166%06user-sprache%05d%06aufnr%054012101A%06objekt%05hotel%06typ%05auftrag%06erschdat%0530.01.2018%06firma%052%06"
//"farosGetDateien%04Termid%05WEB0010022008166%06user-sprache%05d%06aufnr%054011951A%06objekt%05SoWo%06typ%05kunde%06erschdat%0529.01.18%06firma%052%06"
    // var erschdat = this.queryresult.datum.substr(0, 8);
   let temperschdat = this.queryresult.datum.substr(0, 8);
    this.erschdat = temperschdat;
    this.farosdateienService.showfarosdateien(this.queryresult.aufnr+this.queryresult.sujetnr,this.queryresult.objekt,this.erschdat,'auftrag')
      .subscribe(farosdat => { this.farosAuftragdateien = farosdat;
      });
  }
  getPosrekap(){
    this.posrekapService.showposrekap(this.queryresult.sujetnr, this.queryresult.objekt, this.queryresult.aufnr)
      .subscribe(posrekap => {
        this.dataSource.data = posrekap;
        console.log("posrekap",posrekap);
        for (let i = 0; i < posrekap.length;i ++){

          this.nettototal[i] = posrekap[i].netto;

          this.nettoNettototal[i] = posrekap[i].nettoNetto;
          this.Mwst[i] = posrekap[i].Mwst;
        }
         let tempnettototalsumme = this.nettototal.reduce(this.getSum);
         let tempnettoNettototalsumme = this.nettoNettototal.reduce(this.getSum);
         let tempMwstsumme = this.Mwst.reduce(this.getSum);
         this.posrekabtotal.data =  [{"nettototal":tempnettototalsumme, "nettoNettototal":tempnettoNettototalsumme, "Mwst": tempMwstsumme + tempnettoNettototalsumme}];
       // this.rekapJsonData = JSON.stringify(posrekap);
      });
  }

  getSum(total, num) {
    return total + num;
  }
  opendok(event){
    // console.log("event",event);
  }
  selectrowersch(val){
    console.log("val",val);

    this.fakturaService.getfaktur(val[0].faknr)
         .subscribe(pdf => {var mimetype = 'application/pdf;base64';
        if (pdf.length >= 1){
        var blob = this.base64dataToBlob(pdf[0].pdf, mimetype);
        var blobUrl = URL.createObjectURL(blob);
         this.window = this.windowrefService.getNativeWindow();
         this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
        }else{
            console.log("Keine Bestätigung vorhanden");
        }
    })
  }
  selectrowposrek(val){
    console.log("val",val);

  }
  showauftragbest(val){
       console.log("showauftragbest",val);
       var blobUrl = "";
       var blob = null;
        this.keinDokuhinterlegt = false;
        this.ladendoku = true;
       this.auftragbestService.getauftragpdf(val)
        .subscribe(pdf => {

        var mimetype = 'application/pdf;base64';
        if (pdf.length >= 1){
        blob = this.base64dataToBlob(pdf[0].pdf, mimetype);
        blobUrl = URL.createObjectURL(blob);
        //   console.log("blob",blob);
        // this.tempbase64pdf = blobUrl;
        this.window = this.windowrefService.getNativeWindow();
        this.window.open(blobUrl, '_blank');
         this.ladendoku = false;
        // console.log("Blob", blobUrl);
        }else{
            console.log("Keine Bestätigung vorhanden");
            this.keinDokuhinterlegt = true;
              this.ladendoku = false;
              this.snackBar.open('Kein Auftrag hinterlegt!', '', { duration: 7000 });
        }

        })
        // $window.open(blobUrl, '_blank');
  }
  
  public backtolist(){
      console.log("this.returnlink",this.returnlink);
      if (this.returnlink){
        this.router.navigate([this.returnlink]);
      } else {
        this.switchback.next(true);
      }
      
  }
  
  public openimagejpg(){
      this.openInseratejpgButton(this.aufnr,this.sujetnr, this.objekt);
  }
//   openInseratejpgButton(aufnr, sujetnr){
//       console.log("openInseratejpg", aufnr);
//       this.farosgetinseratejpgService.getfarosInserat(aufnr+sujetnr)
//         .subscribe(jpg => {var mimetype = 'image/jpg;base64';
//         if (jpg !== "Fehlercode\\u000501"){
//             console.log("jpg");
//             this.inseratejpganwesend = true;
//         var blob = this.base64dataToBlob(jpg.getInserateJPG[0], mimetype);
//         var blobUrl = URL.createObjectURL(blob);
//          this.window = this.windowrefService.getNativeWindow();
//          this.window.open(blobUrl, '_blank');
//         // console.log("Blob", blobUrl);
//         }else{
//             this.inseratejpganwesend = false;
//             console.log("Keine Bestätigung vorhanden");
//         }
//     });
//   }
   openInseratejpgButton(aufnr, sujetnr, objekt){
      console.log("openInseratejpg", aufnr);
      this.restitauftragjpgService.getauftragjpg(aufnr, sujetnr, objekt)
        .subscribe(jpg => {
             var mimetype = 'image/jpg;base64';
            // if (jpg !== "Fehlercode\\u000501"){
            // console.log("jpg");
            // this.inseratejpganwesend = true;
            // var blob = this.base64dataToBlob(jpg.getInserateJPG[0], mimetype);
            // var blobUrl = URL.createObjectURL(blob);
            // this.window = this.windowrefService.getNativeWindow();
            // this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
        if (jpg.length !== 0){
            
            this.inseratejpganwesend = true;
            this.ladendoku = true;
            var blob = this.base64dataToBlob(jpg[0].bild, mimetype);
            var blobUrl = URL.createObjectURL(blob);
            this.window = this.windowrefService.getNativeWindow();
            this.window.open(blobUrl, '_blank');
            this.ladendoku = false;
        
        }else{
            this.inseratejpganwesend = false;
            this.ladendoku = false;
            console.log("Keine Bestätigung vorhanden");
        }
    });
  }
  
//   openInseratejpg(aufnr, sujetnr){
//       console.log("openInseratejpg", aufnr);
//       this.farosgetinseratejpgService.getfarosInserat(aufnr+sujetnr)
//         .subscribe(jpg => {var mimetype = 'image/jpg;base64';
//         if (jpg !== "Fehlercode\\u000501"){
//             console.log("jpg",jpg);
//             this.inseratejpganwesend = true;
//         // var blob = this.base64dataToBlob(jpg[0], mimetype);
//         // var blobUrl = URL.createObjectURL(blob);
//         //  this.window = this.windowrefService.getNativeWindow();
//         //  this.window.open(blobUrl, '_blank');
//         // console.log("Blob", blobUrl);
//         }else{
//             this.inseratejpganwesend = false;
//             console.log("Keine Bestätigung vorhanden");
//         }
//     });
//   }
  
  openInseratejpg(aufnr, sujetnr, objekt){
      console.log("openInseratejpg", aufnr);
      this.restitauftragjpgService.getauftragjpg(aufnr, sujetnr, objekt)
        .subscribe(jpg => {
            //  var mimetype = 'image/jpg;base64';
        // if (jpg !== "Fehlercode\\u000501"){
        //     console.log("jpg",jpg);
        //     this.inseratejpganwesend = true;
        // var blob = this.base64dataToBlob(jpg[0], mimetype);
        // var blobUrl = URL.createObjectURL(blob);
        //  this.window = this.windowrefService.getNativeWindow();
        //  this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
        if (jpg.length !== 0){
             this.inseratejpganwesend = true;
            // var blob = this.base64dataToBlob(jpg[0].bild, mimetype);
            // var blobUrl = URL.createObjectURL(blob);
            // this.window = this.windowrefService.getNativeWindow();
            // this.window.open(blobUrl, '_blank');
        }else{
            this.inseratejpganwesend = false;
            console.log("Keine Bestätigung vorhanden");
        }
    });
  }
  
  openRechnung(faknr) {
       console.log("val",faknr);

    this.fakturaService.getfaktur(faknr)
         .subscribe(pdf => {var mimetype = 'application/pdf;base64';
        if (pdf.length >= 1){
        var blob = this.base64dataToBlob(pdf[0].pdf, mimetype);
        var blobUrl = URL.createObjectURL(blob);
         this.window = this.windowrefService.getNativeWindow();
         this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
        }else{
            console.log("Keine Bestätigung vorhanden");
        }
    })
        }

   openMedia(media,art){
     console.log("blob",media,art);

    //
    this.fisFileDownloadService.getfisdateien(this.queryresult.aufnr+this.queryresult.sujetnr,this.queryresult.objekt,this.erschdat,art,media)
              .pipe(map((res)=> {
                  console.log("res",res);
                     var _file = res;
                     var dateityp = media.substr((~-media.lastIndexOf(".") >>> 0) + 2).toLowerCase();
                     console.log("dateityp",dateityp);
                     var mimetype = '';
                     switch (dateityp) {
                        case 'txt':
                            mimetype = 'text/plain';
                            break;
                        case 'pdf':
                            mimetype = 'application/pdf';
                            break;
                        case 'jpg':
                        case 'jpeg':
                            mimetype = 'image/jpeg';
                            break;
                        case 'png':
                            mimetype = 'image/png';
                            break;
                        case 'tif':
                        case 'tiff':
                            mimetype = 'image/tiff';
                            break;
                        case 'doc':
                        case 'docx':
                        case 'dot':
                        case 'dotx':
                            mimetype = 'application/msword';
                            break;
                        case 'xls':
                        case 'xlsx':
                            mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                            break;
                        case 'eps':
                        case 'eps':
                        case 'epsf':
                        case 'epsi':
                            mimetype = 'image/x-eps'
                            break;
                        case 'indd':
                            mimetype = 'application/x-indesign';
                            break;
                        case 'psd':
                            mimetype = 'application/photoshop';
                            break;
                        case 'ai':
                            mimetype = 'application/illustrator';
                            break;
                        case 'msg':
                            mimetype = 'application/vnd.ms-outlook';
                              break;
                        default:
                            mimetype = 'application/octet-stream';
                            return
                     }
                    // var blob = this.base64dataToBlob(_file[0][0], mimetype);
                     var blob = this.base64dataToBlob(_file.FileDownload[0], mimetype);
                    var blobUrl = URL.createObjectURL(blob);
                    this.window = this.windowrefService.getNativeWindow();
                    this.window.open(blobUrl, '_blank');
                    // console.log("blobUrl",blobUrl);
                      }))

             .subscribe(res => { console.log("doku");
          }, err => {
            console.error(err);
          });

  }

  base64dataToBlob(base64data, mimeType) {
            // this.window = this.windowrefService.getNativeWindow();
            // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
            // console.log("base64data",base64data);
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
//test matTable
export interface Posrekap {
  posbez: string;
  netto: number;
  nettoNetto:number;
}



