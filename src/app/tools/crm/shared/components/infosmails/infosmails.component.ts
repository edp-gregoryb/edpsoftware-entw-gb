import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { FarosdateienkundeService } from '../../services/farosdateienkunde.service';
import { WindowrefService } from '../../comm/windowref.service';
import { FisfiledownkundeService } from '../../services/fisfiledownkunde.service';
import { UploadDateiService } from '../../../shared/services/uploaddatei.service';
import { map } from "rxjs/operators";
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-infosmails',
  templateUrl: './infosmails.component.html',
  styleUrls: ['./infosmails.component.css']
})
export class InfosmailsComponent implements OnInit {
  @Input() kundenbez:any;
 
  maillinks:any;
  window:Window;
  saveimage:boolean = false;
  innerheight:number;
  showProgressBar:boolean = false;
  private resizeSubscription:Subscription;
  constructor(private farosdateienkundeService:FarosdateienkundeService,
                private windowrefService:WindowrefService,
                private fisfiledownkundeService:FisfiledownkundeService,
                private uploadDateiService:UploadDateiService,
                private windowsizeService:WindowsizeService) { }

  ngOnInit() {
    console.log(this.kundenbez)
    this.innerheight = self.innerHeight - 60 - 53;
  }
  ngOnChanges(){
    // console.log(this.kundenbez !== undefined)
    if (this.kundenbez !== undefined){
        this.showProgressBar = true;
        this.maillinks = [];
    this.farosdateienkundeService.showfarosdateienkunde(this.kundenbez, 'datedesc')
        .subscribe(mails => {
            this.maillinks = mails;
            console.log("mails", mails);
            this.showProgressBar = false;
      }, err => {
        console.error(err);
      });
    } else {
        this.maillinks = [];
    }
    
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
        console.log("windowsize", size.innerHeight);
        this.innerheight = size.innerHeight - 60 - 53;
    });
  }
  
  openMedia(media){
    console.log("blob",this.kundenbez,media);
    this.fisfiledownkundeService.getfiskundendateien(this.kundenbez,media)
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

    public selectFile(event){
        this.saveimage = true;
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                let filename = file.name;
                let filetype = file.type;
                let value = (reader.result as string).split(',')[1];
                
                this.uploadDateiService.uploadDatei(this.kundenbez,filename, value,'' ,'kunde')
                .subscribe(file => {
                    console.log("fileupload");
                    this.saveimage = false;
                    event.srcElement.value = null;
                    if (this.kundenbez !== undefined){
                        this.showProgressBar = true;
                        this.maillinks = [];
                        this.farosdateienkundeService.showfarosdateienkunde(this.kundenbez, 'datedesc')
                            .subscribe(mails => {
                                this.maillinks = mails;
                                console.log("mails", mails);
                                this.showProgressBar = false;
                            }, err => {
                                console.error(err);
                        });
                    }
                });
                
                
            };
        
        }
    }

}
