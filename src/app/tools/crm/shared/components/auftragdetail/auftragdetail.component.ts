import { Component, OnInit } from '@angular/core';
import { AuftragdetailService } from '../../services/auftragdetail.service';
import { FarosdateienService } from '../../services/farosdateien.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PosrekapService } from '../../services/posrekap.service';
//import { MaterialTableComponent } from '../../../../shared/components/material-table/material-table.component';
// import { MaterialTableComponent } from '../../../../shared/components/material-table/material-table.component';
import { FisFileDownloadService } from '../../services/fis-file-download.service';
import { WindowrefService } from '../../comm/windowref.service';
import { AuftragbestService } from '../../services/auftragbest.service';
import { FarosgetinseratejpgService } from '../../../crmplus/shared/services/farosgetinseratejpg.service';
import { FakturaService } from '../../services/faktura.service';
import { map } from "rxjs/operators";
import {DataSource} from '@angular/cdk/collections';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

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
  aufnr:number;
  
  nettototal : any = [];
  nettoNettototal : any = [];

  displayedColumns = ['posbez', 'netto', 'nettoNetto'];
  dataSource = new MatTableDataSource();

  displayedColumns1 = ['posbez','nettototal', 'nettoNettototal'];
  posrekabtotal = new MatTableDataSource();


  displayedColumns2 = ['erscheinung','rubrik', 'urubrik', 'poskey', 'preisman', 'betrexkl', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];
  erscheiungensource = new MatTableDataSource();

  //displayedColumns3 = ['','', '', '', '', 'totaltotalsumme', '', '', '', '', '', '', '', '', '', ''];
  displayedColumns3 = ['erscheinung','rubrik', 'urubrik', 'poskey', 'preisman', 'totaltotalsumme', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];

  erscheinungentotal = new MatTableDataSource();
  

    keinDokuhinterlegt:boolean = false;
    ladendoku:boolean = false;
    inseratejpganwesend:boolean = false;
    // tempbase64pdf:any;
  constructor(private auftragdetailService:AuftragdetailService, private farosdateienService:FarosdateienService,
  public dialogRef: MatDialogRef<any>, private posrekapService:PosrekapService,private fisFileDownloadService:FisFileDownloadService,
  private windowrefService:WindowrefService, private auftragbestService:AuftragbestService,
  private fakturaService:FakturaService, private farosgetinseratejpgService: FarosgetinseratejpgService) { }

  ngOnInit() {
    
   
    this.queryresult = this.dialogRef.componentInstance;
     console.log("queryresult",this.queryresult);
     this.getAuftragsdetail();
     this.getPosrekap();
     this.getFarosdateien();
     this.getFarosAuftragdateien();
     this.openInseratejpg(this.queryresult.aufnr,this.queryresult.sujetnr);
  }
   public openimagejpg(){
      this.openInseratejpgButton(this.queryresult.aufnr,this.queryresult.sujetnr);
  }
   openInseratejpgButton(aufnr, sujetnr){
      console.log("openInseratejpg", aufnr);
      this.farosgetinseratejpgService.getfarosInserat(aufnr+sujetnr)
        .subscribe(jpg => {var mimetype = 'image/jpg;base64';
        if (jpg !== "Fehlercode\\u000501"){
            console.log("jpg");
            this.inseratejpganwesend = true;
        var blob = this.base64dataToBlob(jpg.getInserateJPG[0], mimetype);
        var blobUrl = URL.createObjectURL(blob);
         this.window = this.windowrefService.getNativeWindow();
         this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
        }else{
            this.inseratejpganwesend = false;
            console.log("Keine Bestätigung vorhanden");
        }
    });
  }
  openInseratejpg(aufnr, sujetnr){
      console.log("openInseratejpg", aufnr);
       this.ladendoku = true;
      this.farosgetinseratejpgService.getfarosInserat(aufnr+sujetnr)
        .subscribe(jpg => {var mimetype = 'image/jpg;base64';
        if (jpg !== "Fehlercode\\u000501"){
            console.log("jpg",jpg);
            this.inseratejpganwesend = true;
         this.ladendoku = false;
        }else{
            this.inseratejpganwesend = false;
            this.ladendoku = false;
            console.log("Keine Bestätigung vorhanden");
        }
    });
  }
  getAuftragsdetail(){
    var tempauftragdetails:any;
    this.auftragdetailService.showauftragdetail(this.queryresult.kunde,this.queryresult.objekt,this.queryresult.ndatum,this.queryresult.ndatum,this.queryresult.aufnr,this.queryresult.sujetnr)
      .subscribe(aufdet => { tempauftragdetails = aufdet;
      this.erscheiungensource.data = tempauftragdetails;
        var temptotal:any = [];
        for (let i = 0; i < tempauftragdetails.length; i++){
          temptotal[i] = tempauftragdetails[i].betrexkl;
        }
        let temptotal1 = temptotal.reduce(this.getSum);
        console.log("temptotal1",temptotal1);
        this.erscheinungentotal.data =  [{"totaltotalsumme":temptotal1}];
     // this.erschJsonData = JSON.stringify(tempauftragdetails);
      if (tempauftragdetails.length >= 1){
         this.auftragdetails.push(tempauftragdetails[0]);
      } else {
        this.auftragdetails = tempauftragdetails;
      }
      
        console.log("this.auftragdetails",this.auftragdetails.length);
      });
  }
  getFarosdateien(){
    // console.log("this.queryresult.aufnr+this.queryresult.sujetnr",this.queryresult);auftrag
    this.erschdat = this.queryresult.datum.substr(0, 8);
    this.farosdateienService.showfarosdateien(this.queryresult.aufnr+this.queryresult.sujetnr,this.queryresult.objekt,this.erschdat,'kunde')
      .subscribe(farosdat => { this.farosdateien = farosdat;
        //console.log("this.auftragdetails",this.farosdateien);
      });
  }
  getFarosAuftragdateien(){
    var erschdat = this.queryresult.datum.substr(0, 8);
    this.farosdateienService.showfarosdateien(this.queryresult.aufnr+this.queryresult.sujetnr,this.queryresult.objekt,erschdat,'auftrag')
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
        }
         let tempnettototalsumme = this.nettototal.reduce(this.getSum);
         let tempnettoNettototalsumme = this.nettoNettototal.reduce(this.getSum);
         this.posrekabtotal.data =  [{"nettototal":tempnettototalsumme, "nettoNettototal":tempnettoNettototalsumme}];
      });
  }
  opendok(event){
    // console.log("event",event);
  }
  selectrowersch(val){
    console.log("val",val);
     this.ladendoku = true;
    this.fakturaService.getfaktur(val)
         .subscribe(pdf => {var mimetype = 'application/pdf;base64';
        if (pdf.length >= 1){
        var blob = this.base64dataToBlob(pdf[0].pdf, mimetype);
        var blobUrl = URL.createObjectURL(blob);
        this.window = this.windowrefService.getNativeWindow();
        this.window.open(blobUrl, '_blank');
        // console.log("Blob", blobUrl);
         this.ladendoku = false;
        }else{
            this.ladendoku = false;
            console.log("Keine Bestätigung vorhanden");
        }
    })
  }
  selectrowposrek(val){
    console.log("val",val);
    
  }
  
  getSum(total, num) {
    return total + num;
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
        }
        
        })
        // $window.open(blobUrl, '_blank');
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
}
