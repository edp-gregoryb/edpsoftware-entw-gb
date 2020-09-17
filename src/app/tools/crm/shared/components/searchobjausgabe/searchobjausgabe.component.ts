import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../comm/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { words } from '../../../../../../locale/words';
import {RestCrystalGetPdfService} from '../../services/rest-crystal-get-pdf.service';
import {map} from 'rxjs/operators';
import {WindowrefService} from '../../comm/windowref.service';
import {LoadingScreenService} from '../../../../shared/services/loading-screen.service';


@Component({
  selector: 'app-searchobjausgabe',
  templateUrl: './searchobjausgabe.component.html',
  styleUrls: ['./searchobjausgabe.component.css']
})
export class SearchobjausgabeComponent implements OnInit {
  objektforausgabe: any;
  selectedValue: string = 'M';
  objekttext: any;
  aschluessel: any;
  aschluesselpast: any;
  window:Window;
  @Output() sucheagendaitems = new EventEmitter();
  sichten = [
    {
      value: 'M', viewValue: words.own
    },
    {
      value: 'A', viewValue: words.all
    }
  ];

  constructor(private commObserver: CommonService, public dialogRef: MatDialogRef<SearchobjausgabeComponent>,
              private getdispo: RestCrystalGetPdfService, private windowrefService: WindowrefService,
              private waitmoment: LoadingScreenService) {
  }

  ngOnInit() {
    var queryresult: any = this.dialogRef.componentInstance;
    console.log("queryresult", queryresult);
    if (queryresult) {
      // console.log("queryresult",queryresult.value1);
      this.objekttext = queryresult.value1;
      this.objektforausgabe = queryresult.value1;
      this.aschluessel = queryresult.value2;
      this.aschluesselpast = queryresult.value2;
      this.selectedValue = queryresult.value3;
    }

  }

  objvalueChanged(val) {
    // console.log("objvalueChanged",val);
    this.objektforausgabe = val.value;
  }

  searchObjAusgabe(obj, ausgabe) {
    console.log('searchObjAusgabe', obj, ausgabe);
    sessionStorage.setItem('AusgabeSuche', JSON.stringify({
      value1: obj.objekttext,
      value2: ausgabe.aschluessel,
      value3: this.selectedValue
    }));
    this.commObserver.notifyOther1({
      option: 'selectedvalue',
      value1: obj.objekttext,
      value2: ausgabe.aschluessel,
      value3: this.selectedValue
    });
  }

//   clearfilter(){
//       sessionStorage.setItem('AusgabeSuche', JSON.stringify({}));
//       this.objekttext = "";
//       this.objektforausgabe = ""
//       this.aschluessel = "";
//       this.commObserver.notifyOther1({ option: 'selectedvalue',  value1: this.objekttext, value2: this.aschluessel, value3:this.selectedValue });
//   }


  dispolisteAnzeigen() {
    // this.waitmoment.startLoading();
    this.getdispo.getDispoliste('VEAU', '', 'Dispoliste', '03Aschlussel', this.aschluesselpast,
        '03Objekt', this.objekttext, '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '')

        .subscribe(temp => {
          console.log("Dispoliste", temp);
          var blob = null;
          var blobUrl = "";
          var mimetype = 'application/pdf;base64';
          if (temp[0].pdf.length >= 1) {
                      blob = this.base64dataToBlob(temp[0].pdf, mimetype);
                      blobUrl = URL.createObjectURL(blob);
                      //   console.log("blob",blob);
                      // this.tempbase64pdf = blobUrl;
                      this.window = this.windowrefService.getNativeWindow();
                      this.window.open(blobUrl, '_blank');
                      // this.ladendoku = false;
                      // console.log("Blob", blobUrl);
                     // this.waitmoment.stopLoading();
                    } else {
                      console.log("Keine Bestätigung vorhanden");
                      // this.keinDokuhinterlegt = true;
                      // this.ladendoku = false;
                    }
        });
  }

  ausgabechanged(val) {
    console.log("ausgabechanged", val);
    if (val) {
      this.aschluesselpast = val.value;
    }

  }


  // showauftragbest(val) {
  //   console.log("showauftragbest", val);
  //   var blobUrl = "";
  //   var blob = null;
  //   this.keinDokuhinterlegt = false;
  //   this.ladendoku = true;
  //   this.auftragbestService.getauftragpdf(val)
  //       .subscribe(pdf => {
  //
  //         var mimetype = 'application/pdf;base64';
  //         if (pdf.length >= 1) {
  //           blob = this.base64dataToBlob(pdf[0].pdf, mimetype);
  //           blobUrl = URL.createObjectURL(blob);
  //           //   console.log("blob",blob);
  //           // this.tempbase64pdf = blobUrl;
  //           this.window = this.windowrefService.getNativeWindow();
  //           this.window.open(blobUrl, '_blank');
  //           this.ladendoku = false;
  //           // console.log("Blob", blobUrl);
  //         } else {
  //           console.log("Keine Bestätigung vorhanden");
  //           this.keinDokuhinterlegt = true;
  //           this.ladendoku = false;
  //         }
  //
  //       })
  //   // $window.open(blobUrl, '_blank');
  // }



  base64dataToBlob(base64data, mimeType) {
    // this.window = this.windowrefService.getNativeWindow();
    // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
    // console.log("base64data",base64data);
    var byteCharactersString = window.atob(base64data);

    // Erstelle einen Array-Buffer im Umfang des Strings aus Byte-Zeichen
    var arrayBuffer = new ArrayBuffer(byteCharactersString.length);

    // Erstelle einen Byte-Array in der Grösse vom Array-Buffer
    var byteArray = new Uint8Array(arrayBuffer);

    // Schleife über alle Zeichen des Strings aus Byte-Zeichen
    for (var i = 0; i < byteCharactersString.length; i++) {

      // an aktueller Position den Unicode-Wert des Byte-Zeichens auslesen und an derselben Position in den Byte-Array eintragen
      byteArray[i] = byteCharactersString.charCodeAt(i);

    }

    var blob = new Blob([arrayBuffer], {type: mimeType});
    return blob;

  }

}
