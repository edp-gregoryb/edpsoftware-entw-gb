/*
  Handelt alles was mit Dokumenten zu tun hat
*/

import { Injectable } from '@angular/core';

import { RestKommentarAnhangService } from '../rest-services/rest-kommentar-anhang.service';
import { RestAnhangService } from '../rest-services/rest-anhang.service';
import { CommentAnhang } from '../entities/CommentAnhang';
import { Anhang } from '../entities/Anhang';
import {RestVlbilddownloadService} from '../rest-services/rest-vlbilddownload.service';
import {WindowrefService} from '../../../shared/comm/windowref.service';


@Injectable({
  providedIn: 'root'
})
export class FilesService {
  window: Window;
  constructor(private restKomAnhangService: RestKommentarAnhangService, private restAnhangService: RestAnhangService,
              private vlbilddownloadService: RestVlbilddownloadService, private windowrefService: WindowrefService) { }
  
  //oeffnet dokument
  openFile(anhang: CommentAnhang) {
    this.restKomAnhangService.getKommentarAnhang(anhang.stat, anhang.dateiname, JSON.parse(JSON.stringify(anhang)).speicherpfad, anhang.kommentarid)
      .subscribe( ret => {
          console.log("openFile", ret);
          //this.openArtikel(ret[0].datei)
          // let split = atob(ret).split(",");
          let filetyp = ret[0].dateiname.split('.');
          if (filetyp.length >= 1) {
              let mimetyp = this.getMimetype(filetyp[1]);
              this.open(ret[0].datei, mimetyp);
          }
      }, err => {
        console.log(err);
    });
  } //ende openFile()
  
  //laedt ein dokument herunter
  downloadFile(anhang: CommentAnhang) {
    this.restKomAnhangService.getKommentarAnhang(anhang.stat, anhang.dateiname, JSON.parse(JSON.stringify(anhang)).speicherpfad, anhang.kommentarid)
      .subscribe( ret => {
          console.log("openFile", ret);
          //this.downloadArtikel(ret[0].datei, ret[0].dateiname);
          let filetyp = ret[0].dateiname.split('.');
          if (filetyp.length >= 1) {
              let mimetyp = this.getMimetype(filetyp[1]);
              this.download(ret[0].datei, ret[0].dateiname, mimetyp);
          }
      }, err => {
        console.log(err);
    });
  } //ende downloadFile()
  
  //oeffnet anhang
  openAnhang(anhang: Anhang, mitArtikel: boolean) {
    if (mitArtikel === true) {
        console.log("anhang", anhang);
      this.restAnhangService.getAnhang(anhang, mitArtikel)
          .subscribe( ret => {
              console.log("anhang", ret)
              let filetyp = ret[0].dateiname.split('.');
              if (filetyp.length >= 1) {
                  let mimetyp = this.getMimetype(filetyp[1]);
                  this.open(ret[0].datei, mimetyp);
              }
             // this.openArtikel(ret[0].datei);

          }, err => {
            console.log(err);
          });
    } else {
      this.vlbilddownloadService.getAnhang(anhang)
        .subscribe( ret => {

          if (ret.length >= 1) {
              let filetyp = ret[0].bildname.split('.');
              if (filetyp.length >= 1) {
                  let mimetyp = this.getMimetype(filetyp[1]);
                  this.open(ret[0].datei, mimetyp);
              }


          }
        }, err => {
          console.log(err);
        });
    }



  } //ende openAnhang()
  
  //laedt anhang herunter
  downloadAnhang(anhang: Anhang, mitArtikel: boolean) {
    if (mitArtikel === true) {
      this.restAnhangService.getAnhang(anhang, mitArtikel)
          .subscribe(ret => {
              let filetyp = ret[0].dateiname.split('.');
              if (filetyp.length >= 1) {
                  let mimetyp = this.getMimetype(filetyp[1]);
                  this.download(ret[0].datei, ret[0].dateiname, mimetyp);
              }
              // console.log(ret)
              // this.download(ret[0].datei, ret[0].dateiname);
          }, err => {
            console.log(err);
          });
    } else {
      this.vlbilddownloadService.getAnhang(anhang)
          .subscribe( ret => {

            if (ret.length >= 1) {
              console.log("anhang",ret)
                let filetyp = ret[0].bildname.split('.');
                if (filetyp.length >= 1) {
                    let mimetyp = this.getMimetype(filetyp[1]);
                    this.download(ret[0].datei, ret[0].dateiname, mimetyp);
                }
            }
          }, err => {
            console.log(err);
          });
    }
  } //ende downloadAnhang()
  
  //oeffnet eine datei
  open(datei: string, mimetype: string) {


     let split = atob(datei).split(",");
    console.log("mimetype", split)
      var blob = this.base64dataToBlob(datei, mimetype);
      //extrahiert blob-url
      var blobUrl = URL.createObjectURL(blob);
      //oeffnet dokument in neuem tab
      window.open(blobUrl, '_black');
    // console.log(split)
    // if(split.length > 1) {
    //   let base64Data = split[1];
    //   split[0] = split[0].split(':')[1];
    //   let mimetype = split[0].split(';')[0];
    //   //erstellt blob aus base64 daten
    //   var blob = this.base64dataToBlob(split, 'application/pdf');
    //   //extrahiert blob-url
    //   var blobUrl = URL.createObjectURL(blob);
    //   //oeffnet dokument in neuem tab
    //   window.open(blobUrl, '_black');
    // }
  } //ende open()
  openArtikel(datei: string) {


      let split = atob(datei).split(",");
      console.log("mimetype", split[0])
      // var blob = this.base64dataToBlob(datei, mimetype);
      // //extrahiert blob-url
      // var blobUrl = URL.createObjectURL(blob);
      // //oeffnet dokument in neuem tab
      // window.open(blobUrl, '_black');
      // console.log(split)
      if(split.length > 1) {
        let base64Data = split[1];
        split[0] = split[0].split(':')[1];
        let mimetype = split[0].split(';')[0];
        //erstellt blob aus base64 daten
        var blob = this.base64dataToBlob(base64Data, mimetype);
        //extrahiert blob-url
        var blobUrl = URL.createObjectURL(blob);
        //oeffnet dokument in neuem tab
        window.open(blobUrl, '_black');
      }
  }

  openVlbild(datei, typ) {
    let split = atob(datei).split(",");
    // console.log(split)
    let mimetype = typ;//'application/"' + typ + '";base64';
    let blob = this.base64dataToBlob(split, mimetype);
    let blobUrl = URL.createObjectURL(blob);
    this.window = this.windowrefService.getNativeWindow();

    this.window.open(blobUrl, '_blank');

  }
  
  //laedt eine datei herunter
  download(datei: string, dateiname: string, mimetype: string) {
    // let split = atob(datei).split(",");
    // if(split.length > 1){
    //   let base64Data = split[1];
    //   split[0] = split[0].split(':')[1];
    //   let mimetype = split[0].split(';')[0];
      //erstellt blob aus base64 daten
      var blob = this.base64dataToBlob(datei, mimetype);
      
      //laedt file herunter
      // url von blob generieren
      let url = window.URL.createObjectURL(blob);
      // objekt generieren
      let link = document.createElement('a');
      // objekt 'befuellen'
      link.setAttribute('href', url);
      link.setAttribute('download', dateiname);
      // auf objekt 'klicken'
      link.click();

  } //ende download()
    downloadArtikel(datei: string, dateiname: string) {
        let split = atob(datei).split(",");
        if(split.length > 1){
            let base64Data = split[1];
            split[0] = split[0].split(':')[1];
            let mimetype = split[0].split(';')[0];
            //erstellt blob aus base64 daten
            var blob = this.base64dataToBlob(base64Data, mimetype);

            //laedt file herunter
            // url von blob generieren
            let url = window.URL.createObjectURL(blob);
            // objekt generieren
            let link = document.createElement('a');
            // objekt 'befuellen'
            link.setAttribute('href', url);
            link.setAttribute('download', dateiname);
            // auf objekt 'klicken'
            link.click();
        }

    }
  
  //konvertiert base64-daten zu einem blob
  public base64dataToBlob(base64data, mimeType) {
      // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
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
      
      //erstelle blob aus content und mimeType
      var blob = new Blob([arrayBuffer], { type: mimeType });
      return blob;
  }

  public getMimetype(dateityp) {
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
          case 'zip':
              mimetype = 'application/zip';
              break;
          default:
              mimetype = 'application/octet-stream';
      }
      console.log(mimetype);
      return mimetype;
  }
}
