import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../../environments/environment';

import { ColorpickerdialogComponent } from  '../../dialogs/colorpickerdialog/colorpickerdialog.component';

import { FilesService } from '../../services/files.service';
import { RestKommentarService } from '../../rest-services/rest-kommentar.service';
import { RestEmpfaengerService } from '../../rest-services/rest-empfaenger.service';
import { RestMitarbeiterService } from '../../rest-services/rest-mitarbeiter.service';
import { RestAnhangService } from '../../rest-services/rest-anhang.service';
import { RestKommentarAnhangService } from '../../rest-services/rest-kommentar-anhang.service';

import { Comment } from '../../entities/Comment';
import { CommentAnhang } from '../../entities/CommentAnhang';
import { Anhang } from '../../entities/Anhang';
import { Reciever } from '../../entities/Reciever';
import {RestGetcodeService} from '../../rest-services/rest-getcode.service';
import {RestVlbilduploadService} from '../../rest-services/rest-vlbildupload.service';
import {RestVlbildlistService} from '../../rest-services/rest-vlbildlist.service';
import {RestVldelteprodanhangService} from '../../rest-services/rest-vldelteprodanhang.service';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {FroalaEditorDirective} from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-docs-and-comments',
  templateUrl: './docs-and-comments.component.html',
  styleUrls: ['./docs-and-comments.component.css']
})
export class DocsAndCommentsComponent implements OnInit {
  
  anhangRequestsLoading:    number = 0; //die anzahl aller http-requests fuer die anhaenge die momentan am laufen sind
  kommentarRequestsLoading: number = 0; //die anzahl aller http-requests fuer die kommentare die momentan am laufen sind
  
  //Anhaenge-Variablen
  currentAnhang:    any; //momentan ausgewaehlter anhang
  anhaenge:         Anhang[]; //alle anhaenge
  
  mitArtikel:       boolean; //'yes' auf artikel-ebene, 'false' auf produkt-ebene
  
  //Kommentar-Variablen
  replyingTo:       number = -1; //gibt an auf welchen kommentar gerade geantwortet wird (input-feld)
  
  objekt:           string;
  aschlussel:       string;
  objektartikel:    string;
  
  comments:         Comment[][]       = []; //alle kommentare
  commentsAnhang:   CommentAnhang[][] = []; //alle kommentar-anhaenge
  
  currentAnhangKom: CommentAnhang; //momentan ausgewaehlter anhang (fuer kommentar)
  currentAnhangRep: CommentAnhang; //momentan ausgewaehlter anhang (fuer kommentar-antwort)
  
  editorContent:    string = ''; //momentaner text (fuer kommentar)
  replyContent:     string = ''; //momentaner text (fuer kommentar-antwort)
  
  currentColor:     string = '#ffffff'; //momentan ausgewaehlte hintergrundfarbe
  
  mitarbeiter:      any[]     = []; //alle mitarbeiter
  empfaenger:       any[][][] = []; //die empfaenger aller kommentare
  
  tempEmpf:         number[] = []; //momentan ausgewaehlte empfaenger (fuer kommentar)
  tempEmpfReply:    number[] = []; //momentan ausgewaehlte empfaenger (fuer kommentar-antwort)
  
  @ViewChild('anhangInput', { static: false }) anhangInput:            ElementRef; //anhang-input-element
  @ViewChild('fileInputComment', { static: false }) fileInputComment:  ElementRef; //input-element des kommentars
  @ViewChild('fileInputReply', { static: false }) fileInputReply:      ElementRef; //input-element der kommentar-antwort
  @Input() objektI: string;
  @Input() aschlusselI: string;
  //optionen fuer den froala-editor
  public froalaOptions: Object = {
    charCounterCount: false,
    toolbarInline: true,
    toolbarVisibleWithoutSelection: true,
    // !ACHTUNG! font-size-toolbar-button wird momentan nicht gebraucht, da dadurch im kommentar-html " gebraucht werden, was mit dem JSON nicht funktioniert
    toolbarButtons: ['bold', 'italic', 'underline', '|', 'outdent', 'indent', '|', 'formatOL', 'formatUL', '|', 'undo', 'redo'],
    language: environment.language,
    key: 're1H1qA2B3D6D7A5B4hBi1a2d2Za1IXBh1f1THTBPLIIWBORpF1F1E1F4F1C11B6C2B5C3==',
    tableResizerOffset: 10,
    tableResizingLimit: 50,
    quickInsertButtons: [],
    quickInsertTags: []
  }
  suchresult: any;
  dokutype: string;
  urlProduct: boolean = true;
  
  constructor(private dialog: MatDialog,
              private fileService: FilesService,
              private restKommentarService: RestKommentarService,
              private cookieService: CookieService,
              private restAnhangService: RestAnhangService, 
              private restEmpfService: RestEmpfaengerService,
              private restMitarbService: RestMitarbeiterService, 
              private route: ActivatedRoute,
              private restKomAnhangService: RestKommentarAnhangService,
              private getcodeService: RestGetcodeService,
              private vlbilduploadService: RestVlbilduploadService,
              private vlbildlistService: RestVlbildlistService,
              private vldelteprodanhangService: RestVldelteprodanhangService) { }

   public getOptions(): any {
       return JSON.parse(JSON.stringify(this.froalaOptions));
   }
  
  ngOnInit() {
    this.getCode();
    //mitarbeiter laden
    this.kommentarRequestsLoading++;
    this.restMitarbService.getAllMitarbeiter('A')
      .subscribe( tempAllMitarbeiter => {
        this.kommentarRequestsLoading--;
        tempAllMitarbeiter.shift(); //erster 'mitarbeiter' ist nur fehlercode rückmeldung deshalb shift
        this.mitarbeiter = tempAllMitarbeiter;
      }, err => {
        console.log(err);
    });
    
    //die wichtigsten daten aus url laden
    this.objekt = this.route.snapshot.paramMap.get('objekt');
    this.aschlussel = this.route.snapshot.paramMap.get('aschlussel');
    //objektartikel ist nur in der url falls auf artikel-ebene gearbeitet wird (auf produkt-ebene nicht)
    this.objektartikel = this.route.snapshot.paramMap.get('articleId');

    console.log('this.objekt', this.objekt);
    if (this.objektI) {
        console.log('this.objektI', this.objektI);
        this.objekt = this.objektI;
        this.aschlussel = this.aschlusselI;
    }


    // console.log("route",this.route.snapshot.url);
    let urlsegment = this.route.snapshot.url;
    for (let i = 0; i< urlsegment.length; i++) {
        // console.log("urlsegment", urlsegment[i].path);
        if (urlsegment[i].path === 'articleInfo') {
            this.urlProduct = false;
            // console.log("urlProduct", this.urlProduct);
        }
    }



    //falls kein objektartikel vorhanden ist -> leerer string
    if(!this.objektartikel){
      this.objektartikel = '';
      this.mitArtikel = false;
    } else {
      this.mitArtikel = true;
    }
    
    //falls objekt, aschlussel oder objektartikel nicht vorhanden sind, gar nicht versuchen
    if(this.objekt !== undefined && this.objekt !== null && this.aschlussel !== undefined && this.aschlussel !== null && this.objektartikel !== undefined && this.objektartikel !== null){
      //anhaenge laden
      this.getAnhaenge();
      
      //kommentare laden
      this.getComments();
    }
  } //ende ngOnInit()
  
  //laedt kommentare
  getComments() {
    //kommentare vom backend laden
    this.kommentarRequestsLoading++;
    this.restKommentarService.getKommentare(this.objekt, this.aschlussel, this.objektartikel, -1, -1)
      .subscribe( tempComments => {
        this.kommentarRequestsLoading--;
        
        //alles reseten
        this.comments = [];
        this.commentsAnhang = [];
        this.empfaenger = [];
        
        //kommentare richtig strukturieren -> 2d-Array
        //fuer jeden kommentar
        for(let i = 0; i < tempComments.length; i++) {
          let commentUrsprungFound = false;
          //die schon vorhandenen listen durchsuchen
          for(let j = 0; j < this.comments.length; j++){
            //wenn kommentar eine antwort auf einen anderen kommentar ist...
            if(this.comments[j][0].ursprungsid === tempComments[i].ursprungsid){
              commentUrsprungFound = true;
              //...kommentar dort hinzufuegen
              this.comments[j].push(tempComments[i]);
            }
          }
          //kommentar-ursprung noch nirgends gefunden
          if(!commentUrsprungFound){
            //kommentar zuhinterst anfuegen
            this.comments.push([tempComments[i]]);
          }
        }
        
        //kommentare nach neueste zuerst sortieren
        this.comments.sort((a, b) => (a[0].ursprungsid > b[0].ursprungsid) ? -1 : 1);
        for(let i = 0; i < this.comments.length; i++){
          //kommentar-antworten nach aelteste zuerst sortieren
          this.comments[i].sort((a, b) => (a.kommentarid > b.kommentarid) ? 1 : -1);
        }
        
        //kommentar-anhaenge laden
        for(let i = 0; i < this.comments.length; i++){
          this.empfaenger.push([]);
          this.commentsAnhang.push([]);
          for(let j = 0; j < this.comments[i].length; j++){
            this.empfaengerFromBackend(i, j, this.comments[i][j].kommentarid);
            this.commentAnhangFromBackend(i, j);
          }
        }
      }, err => {
        console.log(err);
    });
  } //ende getComments()
  
  //laedt anhaenge
  getAnhaenge() {
    if (this.mitArtikel) {
      let tempAnhang: Anhang = {
        objekt: this.objekt,
        aschlussel: this.aschlussel,
        objektartikel: this.objektartikel,
        stat: '0',
        dateiname: undefined,
        datei: undefined
      };
      this.anhangRequestsLoading++;
      this.restAnhangService.getAnhangList(tempAnhang, this.mitArtikel)
          .subscribe(tempAnhaenge => {
            this.anhangRequestsLoading--;
            this.anhaenge = tempAnhaenge;
          }, err => {
            console.log(err);
          });
    } else {
      this.anhangRequestsLoading++;
      this.vlbildlistService.getAnhanglist(this.objekt)
          .subscribe( tempAnhaenge => {
            this.anhangRequestsLoading--;
            this.anhaenge = tempAnhaenge;
          }, err => {
            console.log(err);
          });

    }
  } //ende getAnhaenge()
  
  //fuegt einen anhang hinzu
 getVlAnhaenge() {
   this.anhangRequestsLoading++;
   this.vlbildlistService.getAnhanglist(this.objekt)
       .subscribe( tempAnhaenge => {
         this.anhangRequestsLoading--;
         this.anhaenge = tempAnhaenge;
       }, err => {
         console.log(err);
       });
 }
  addAnhang() {
    if (this.mitArtikel) {
        let tempAnhang: Anhang = { objekt: this.objekt, aschlussel: this.aschlussel, objektartikel: this.objektartikel, stat: '0', dateiname: this.currentAnhang.dateiname, datei: this.currentAnhang.datei};
        console.log(tempAnhang);
        this.anhangRequestsLoading++;
              this.restAnhangService.addAnhang(tempAnhang, this.mitArtikel)
                .subscribe( ret => {
                  this.anhangRequestsLoading--;
                  this.getAnhaenge();
                }, err => {
                  console.log(err);
              });

              this.currentAnhang = undefined;
              this.anhangInput.nativeElement.value = '';
            // } //ende addAnhang()
    } else {
      let tempAnhang: Anhang = { objekt: this.objekt, aschlussel: this.aschlussel, objektartikel: this.objektartikel, stat: '0',
        dateiname: this.currentAnhang.dateiname, datei: this.currentAnhang.datei, bildtyp: this.dokutype};

      console.log("tempAnhang", tempAnhang)
      this.anhangRequestsLoading++;
        this.vlbilduploadService.postAnhang(tempAnhang)
            .subscribe( ret => {
                this.anhangRequestsLoading--;
                this.getVlAnhaenge();
            }, err => {
                console.log(err);
            });

        this.currentAnhang = undefined;
        this.anhangInput.nativeElement.value = '';
    }

  } //ende addAnhang()

  
  //holt empfaenger eines kommentars aus der datenbank
  empfaengerFromBackend(i: number, j: number, kommentarid: number) {
    this.empfaenger[i].push([]);
    
    let tempReciever: Reciever = { stat: '0', kommentarid: kommentarid, beznr: 0 }
    //alle empfaenger eines kommentars laden
    this.kommentarRequestsLoading++;
    this.restEmpfService.getAllEmpfaenger(tempReciever)
      .subscribe( tempAllEmpfaenger => {
        this.kommentarRequestsLoading--;
        for(let p = 0; p < tempAllEmpfaenger.length; p++){
          //dessen namen abspeichern
          this.empfaenger[i][j].push(tempAllEmpfaenger[p].vname + " " + tempAllEmpfaenger[p].fname);
        }
      }, err => {
        console.log(err);
    });
  } //ende empfaengerFromBackend()
  
  //holt anhang eines kommentars aus der datenbank
  commentAnhangFromBackend(i: number, j: number) {
    //kommentar-anhang laden
    this.kommentarRequestsLoading++;
    this.restKomAnhangService.getKommentarAnhangList('0', this.comments[i][j].kommentarid)
      .subscribe( tempCommentAnhang => {
        this.kommentarRequestsLoading--;
        if(tempCommentAnhang.length > 0){
          while(this.commentsAnhang[i].length <= j){
            this.commentsAnhang[i].length++;
          }
          //kommentar-anhang hinzufuegen
          this.commentsAnhang[i][j] = tempCommentAnhang[0];
        }
      }, err => {
        console.log(err);
    });
  } //ende commentAnhangFromBackend()
  
  //kommentar hinzufuegen
  addComment(ursprung: number) {
      console.log('this.replyContent', this.replyContent);
    //text-felder quotation-marks ersetzen durch hochkommas
    this.editorContent = this.editorContent.replace(/"/g, "'");
    this.replyContent = this.replyContent.replace(/"/g, "'");
    console.log("this.replyContent", this.replyContent, this.editorContent, ursprung)
    //antwort-feld entfernen
    this.replyingTo = -1;
    
    //richtigen inhalt laden
    let commentContent: string = '';
    let empfaenger: number[] = [];
    
    if(ursprung === -1){
      //basis-kommentar:
      
      empfaenger = this.tempEmpf;
      
      commentContent = this.editorContent;
      this.editorContent = '';
      
      if(commentContent === '' && !this.currentAnhangKom){
        return;
      }
    } else {
      //antwort auf basis-kommentar
      empfaenger = this.tempEmpfReply;
      console.log("empfaenger", empfaenger)
      commentContent = this.replyContent;
        console.log("commentContent", commentContent)
      this.replyContent = '';
      
      if(commentContent === '' && !this.currentAnhangRep){
        return;
      }
    }
    
    //kommentar hinzufuegen
    let defaultComment: Comment = { arbgeb: '', titel: '', inhalt: commentContent, farbcode: this.currentColor, stat: '', objekt: this.objekt, aschlussel: this.aschlussel, objektartikel: this.objektartikel, kommentarid: -1, ursprungsid: ursprung };
    
    this.kommentarRequestsLoading++;
    this.restKommentarService.addKommentar(defaultComment)
      .subscribe( ret => {
        this.kommentarRequestsLoading--;
        
        //empfaenger hochladen
        for(let i = 0; i < empfaenger.length; i++) {
          let tempReciever: Reciever = { stat: '0', kommentarid: ret[0].kommentarid, beznr: empfaenger[i] };
          this.kommentarRequestsLoading++;
          this.restEmpfService.addEmpfaenger(tempReciever)
            .subscribe( ret => {
              this.kommentarRequestsLoading--;
            }, err => {
              console.log(err);
          });
        }
        
        //bestimmen von wo anhang ist (basis-kommentar oder antwort-kommentar)
        let anhang: any;
        if(ursprung < 0) {
          this.tempEmpf = [];
          anhang = this.currentAnhangKom;
        } else {
          this.tempEmpfReply = [];
          anhang = this.currentAnhangRep;
        }
        
        if(ret[0] && anhang){
          anhang.kommentarid = ret[0].kommentarid;
          
          //kommentar-anhang hinzufuegen
          this.kommentarRequestsLoading++;
          this.restKomAnhangService.addKommentarAnhang(anhang)
            .subscribe( ret => {
              this.kommentarRequestsLoading--;
              if(ursprung === -1) {
                //basis-input loeschen
                this.fileInputComment.nativeElement.value = '';
                this.currentAnhangKom = undefined;
              } else  {
                //antwort-input loeschen
                if(this.fileInputReply){
                  this.fileInputReply.nativeElement.value = '';
                }
                this.currentAnhangRep = undefined;
              }
              //kommentare neu laden
              this.getComments();
            }, err => {
              console.log(err);
          });
        } else {
          this.getComments();
        }
      }, err => {
        console.log(err);
    });
    
    this.currentColor = '#ffffff';
  } //ende addComment()
  
  //loescht einen kommentar
  deleteComment(i: number, j: number) {
    if(j === 0){
      //kommentar ist ein basis-kommentar -> Kommentar und all seine antworten loeschen
      let commentsToDelete = JSON.parse(JSON.stringify(this.comments[i]));
      this.deleteCommentsRecursive(commentsToDelete, 0);
    } else {
      //kommentar ist eine antwort -> kommentar loeschen
      this.deleteCommentsRecursive([this.comments[i][j]], 0);
    }
  } //ende deleteComment()
  
  //hilft alle antworten eines kommentares zu loeschen und erst ganz zum schluss die kommentarliste neu zu laden
  deleteCommentsRecursive(arr: Comment[], i: number) {
    //kommentar loeschen
    this.kommentarRequestsLoading++;
    this.restKommentarService.deleteKommentar(arr[i].kommentarid)
      .subscribe( ret => {
        this.kommentarRequestsLoading--;
        if(i < arr.length - 1) {
          //noch mehr kommentare zum loeschen vorhanden -> auch diese loeschen
          this.deleteCommentsRecursive(arr, i + 1);
        } else {
          //alle geloescht -> kommentarliste neu laden
          this.getComments();
        }
      }, err => {
        console.log(err);
    });
  } //ende deleteCommentsRecursive()
  
  
  //bestimmt wo der Antwort-Editor aufpoppt
  reply(commentNum: number) {
      console.log("commentNum", commentNum)
    this.replyingTo = commentNum;

    //-1 = antwort-editor wird ausgeschaltet, deshalb inhalt von jenem loeschen
    if(commentNum === -1){
      this.replyContent = '';
    }
  } //ende reply()
  
  //kommentar-anhang auswaehlen
  selectFile(event, i): void {
    //fileReader initialisieren
    let reader = new FileReader();
    //falls dokument vorhanden
    if(event.target.files && event.target.files.length > 0) {
      //dokument hochladen
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //momentanes dokument zwischenspeichern
        let base64File = window.btoa((reader.result as string));
        
        if( i < 0 ) {
          this.currentAnhangKom = { stat: '0', kommentarid: -1, dateiname: file.name, datei: base64File };
        } else {
          this.currentAnhangRep = { stat: '0', kommentarid: -1, dateiname: file.name, datei: base64File };
        }
      };
    }
  } //ende selectFile()
  
  //anhang auswaehlen
  selectAnhangFile(event): void {
    //fileReader initialisieren
    let reader = new FileReader();
    //falls dokument vorhanden
    if(event.target.files && event.target.files.length > 0) {
      //dokument hochladen
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //momentanes dokument zwischenspeichern
        // let value = (reader.result as string).split(',')[1];
         let base64File = window.btoa((reader.result as string));

        this.currentAnhang = { dateiname: file.name, datei: base64File };
        console.log("this.currentAnhang", this.currentAnhang);
      };
    }
  } //ende selectAnhangFile()
  
  //oeffnet kommentaranhang
  openFile(anhang: CommentAnhang, val) {
      val.stopPropagation();
    this.fileService.openFile(anhang);
  }
  
  //laedt kommentar-anhang herunter
  downloadFile(anhang: CommentAnhang, val) {
      val.stopPropagation();
    this.fileService.downloadFile(anhang);
  }
  
  //oeffnet Anhang
  openAnhang(anhang: Anhang) {
      console.log(anhang)
    this.fileService.openAnhang(anhang, this.mitArtikel);
  }
  
  //laedt Anhang herunter
  downloadAnhang(anhang: Anhang) {
    this.fileService.downloadAnhang(anhang, this.mitArtikel);
  }
  
  //farbe-auswahlen
  chooseColor() {
    //dialog-fenster oeffnen
    const dialogRef = this.dialog.open(ColorpickerdialogComponent, {
      width: '350px'
    });
    
    //pop-up wird geschlossen
    dialogRef.afterClosed()
      .subscribe( result => {
        if(result) {
          //farbe abspeichern
          this.currentColor = result;
        }
    });
  } //ende chooseColor()

  getCode() {
    console.log();
    this.getcodeService.getCode('ITBILDTP', '*', '*', 'D', '*', '0', '001', 1, 200)
        .subscribe(coden => {
          this.suchresult = coden;

          console.log("coden", coden);
        })

  }

  selectDokutype(code) {
    console.log("code_text", code);
    this.dokutype = code.code_wert;
  }

    deleteImage(anhang: Anhang) {
      console.log("deleteImage", anhang);
        let tempAnhang: Anhang = { objekt: anhang.objekt, loeschen: 'yes', bildname: anhang.bildname, aschlussel:'', stat: '', datei: '', dateiname: ''};
        this.anhangRequestsLoading++;
        this.vlbilduploadService.postAnhang(tempAnhang)
            .subscribe( ret => {
                this.anhangRequestsLoading--;
                this.getVlAnhaenge();
            }, err => {
                console.log(err);
            });
    }

    public deleteArtikelAnhang(anhang: Anhang) {
        console.log("deleteArtikelAnhang", anhang);

        this.anhangRequestsLoading++;
        this.vldelteprodanhangService.deleteAnhang(anhang)
            .subscribe( ret => {
                this.anhangRequestsLoading--;
                this.getAnhaenge();
            }, err => {
                console.log(err);
            });
    }



}
