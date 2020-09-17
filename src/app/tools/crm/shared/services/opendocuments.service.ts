import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { RestitdownloaddateiService } from './restitdownloaddatei.service';
import { WindowrefService } from '../comm/windowref.service';

@Injectable({
  providedIn: 'root'
})
export class OpendocumentsService {
  
  window:Window;
  
  constructor(private restitdownloaddateiService: RestitdownloaddateiService, private windowrefService:WindowrefService) { }
  
  //oeffnet file
  public openselectedItem(val, beznr, rapnr) {
        console.log("openselectedItem", val);
        this.restitdownloaddateiService.downloadDatei(beznr, rapnr, 'rapport', val.datei)
            .pipe(map((res)=> {
                console.log("res",res);
                var _file = res;
                var dateityp = val.datei.substr((~-val.datei.lastIndexOf(".") >>> 0) + 2).toLowerCase();
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
                    case 'html':
                        mimetype = 'text/html';
                        break;
                    case 'msg':
                        mimetype = 'application/vnd.ms-outlook';
                        break;
                    default:
                        mimetype = 'application/octet-stream';
                        return
                }
                // var blob = this.base64dataToBlob(_file[0][0], mimetype);
                if(_file[0]){
                    var blob = this.base64dataToBlob(_file[0].datei, mimetype);
                    var blobUrl = URL.createObjectURL(blob);
                    this.window = this.windowrefService.getNativeWindow();
                    this.window.open(blobUrl, '_blank');
                } else {
                    console.log("Couldn't open Document");
                }
                // console.log("blobUrl",blobUrl);
            }))

            .subscribe(temp => {
                //     console.log("restitdownloaddateiService", temp);
                //    // this.openMedia(temp)
            });
    }
    
    //erstellt blob aus base64 daten
    public base64dataToBlob(base64data, mimeType) {
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
