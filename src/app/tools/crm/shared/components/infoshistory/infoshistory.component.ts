import {Component, OnInit, Input, OnChanges, Inject, ViewContainerRef} from '@angular/core';
import {TerminhistoryService} from '../../terminhistory.service';
import {DocumentIndex} from 'ndx';
import {WindowsizeService} from '../../../../shared/services/windowsize.service';
import {Subscription} from 'rxjs';
import {RestitdownloaddateiService} from '../../../shared/services/restitdownloaddatei.service';
import {RestitgetdateienService} from '../../../shared/services/restitgetdateien.service';
import { WindowrefService } from '../../comm/windowref.service';
import { OpendocumentsService } from '../../services/opendocuments.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';



@Component({
    selector: 'app-infoshistory',
    templateUrl: './infoshistory.component.html',
    styleUrls: ['./infoshistory.component.css']
})
export class InfoshistoryComponent implements OnInit {
    terminhist: any;
    @Input() termindata: any;
    termindataChanged: boolean = false; //wechselt von true zu false oder zurueck jedes mal wenn termindata sich veraendert
    temphistoryliste: any;
    verknuepfung: boolean;
    verknuepfungicon:boolean = false;
    val0: any;
    innerheight: number;
    private resizeSubscription: Subscription;
    _window:Window;
    window:Window;
    dokus: Array<string> = [];
    selected: string;
    documents: any;
    dialogRef: MatDialogRef<any>;

    constructor(private terminhistservice: TerminhistoryService, private windowsizeService: WindowsizeService,
                private restitdownloaddateiService: RestitdownloaddateiService, private  restitgetdateienService: RestitgetdateienService,
                private windowrefService:WindowrefService, private opendocumentsService: OpendocumentsService, public dialog: MatDialog,
                public viewContainerRef: ViewContainerRef) {
        this._window = this.windowrefService.getNativeWindow();
    }

    ngOnInit() {
        this.innerheight = self.innerHeight - 60 - 92; //60 Header, 92 Rest
        //console.log("this.kundenbez",this.kundenbez);
        //this.showhistroy(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
        //this.verknuepfungicon = true;
    }

    ngOnChanges(changes: any) {
        //this.verknuepfungicon = true;
        if(changes.termindata){
            this.termindataChanged = !this.termindataChanged;
        }
        
        this.resizeSubscription = this.windowsizeService.onResize$
            .subscribe(size => {
                this.innerheight = size.innerHeight - 60 - 92;
            });
        if (this.termindata) {
             console.log("infoshistory",this.termindata);
            this.terminhist = [];
            this.verknuepfungicon = true;
            this.showhistroy(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
        } else {
            this.terminhist = [];
        }
    }

    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }

    verknuepfungEinAus(val) {
        if(!this.termindata){
            return;
        }
        console.log("verknuepfungEinAus",val);
        this.verknuepfung = val;
        if (this.verknuepfung === true) {
            this.verknuepfungicon = true;

            this.showhistroy(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
        } else {
            this.verknuepfungicon = true;

            this.showhistroy(this.termindata.beznr, 'no', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
        }

    }

    // showhistroy(beznr, verknuepf, obj, rubrik, urubrik) {
    //     // console.log("test", beznr);
    //     this.terminhistservice.getTerminhistory(beznr, verknuepf, 'yes', obj, rubrik, urubrik)
    //         .subscribe(termhist => {
    //             this.terminhist = termhist;
    //             console.log('terminhist', this.terminhist);
    //             this.verknuepfungicon = false;
    //         }, err => { // console.log("terminhist", this.terminhist);
    //             console.error(err);
    //         });
    // }

    // searchttermine(event) {
    //     // console.log("searchttermine", event);
    //     if (!event) {
    //         this.showhistroy(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
    //     }
    //     this.temphistoryliste = this.terminhist;
    //     const index = new DocumentIndex();
    //     index.addField('termkontaktpers');
    //     index.addField('termaktivid');
    //     index.addField('termdatum');
    //     index.addField('termrapptext');
    //     this.temphistoryliste.forEach((doc) => {
    //         index.add(doc, doc);
    //     });
    //     var obj = index.search(event);
    //     // console.log("index",obj);
    //
    //     var tempjsonArray = [];
    //     for (var i = 0; i <= obj.length - 1; i++) {
    //         tempjsonArray.push(obj[i].docId);
    //     }
    //     this.terminhist = tempjsonArray;
    // }

  //}
  //verknuepfungEinAus(val){
    // console.log("verknuepfungEinAus",val);
    //this.verknuepfung = val;
  //}
  
  showhistroy(beznr, verknuepf, obj, rubrik, urubrik) {
    
    // console.log("test", beznr);
    this.terminhistservice.getTerminhistory(beznr, 'yes', verknuepf, obj, rubrik, urubrik)
      .subscribe(termhist => { this.terminhist = termhist;
        this.verknuepfungicon = false;
        //fuer alle history-eintraege
        for(let i = 0; i < this.terminhist.length; i++){
          //alle anfuehrungs- und schlusszeichen entfernen
          var str = JSON.stringify(this.terminhist[i].dokumentnamen).replace(/"/g, '');
          //komma-getrennter string in array aufteilen
          var arr = str.split(',');
          //array in der history abspeichern
          this.terminhist[i].dokArray = arr;
        }
      }, err => { // console.log("terminhist", this.terminhist);
        console.error(err);
      });
  }//ende showhistory()
  
  //oeffnet dokument
  openDocument(name:string, _hist){
    console.log("opebdoc name",name);
    
    //laedt alle dateien dieser beznr und rapnr
    this.restitgetdateienService.GetDatei(_hist.beznr, _hist.rapnr, 'rapport')
      .subscribe(temp => {
        this.verknuepfungicon = false;
        this.documents = temp;
        
        //sucht den namen des dokumentes im dokumenten-array und oeffnet das richtige
        for(let i = 0; i < this.documents.length; i++){
          if(this.documents[i].datei === name){
            this.opendocumentsService.openselectedItem(this.documents[i], _hist.beznr, _hist.rapnr);
            //this.openselectedItem(this.documents[i]);
            return;
          }
        }
      }
    );
  }
  
  searchttermine(event) {
      if(!this.termindata){
          return;
      }
      if (!event) {
          this.showhistroy(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik);
      }
      this.temphistoryliste = this.terminhist;
      const index = new DocumentIndex();
      index.addField("termkontaktpers");
      index.addField("termaktivid");
      index.addField("termdatum");
      index.addField("termrapptext");
      index.addField("objekt");
      index.addField("ausgbez");
      index.addField("vertr_name");
      index.addField("termzeit");
      this.temphistoryliste.forEach((doc) => {
          index.add(doc, doc);
      });
      var obj = index.search(event);
      // console.log("index",obj);

      var tempjsonArray = [];
      for (var i = 0; i <= obj.length - 1; i++) {
          tempjsonArray.push(obj[i].docId);
      }
      this.terminhist = tempjsonArray;
  }
    public refreshDateien(beznr, rapnr) {
        this.restitgetdateienService.GetDatei(beznr, rapnr, 'rapport')
            .subscribe(temp => {
                console.log('restitgetdateienService', temp);
                this.dokus = temp;
                if (this.dokus.length > 0) {
                    this.selected = temp[0].datei;
                }


            });
    }

    public openMemoinDialog(val) {

        let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(MemoDialog, {
        height: '700px',
        width: '1300px',
        data: val
    });
    // this.dialogRef.componentInstance = val;

    this.dialogRef.afterClosed().subscribe(result => {
    this.dialogRef = null;
});
    }

}


@Component({
    selector: 'memo-dialog',
    templateUrl: 'memo-dialog.html',
})
export class MemoDialog {

    memozoom: any;
    constructor(
        public dialogRef: MatDialogRef<MemoDialog>,
         @Inject(MAT_DIALOG_DATA) public data: any) {

         this.memozoom = data;
         // console.log("this.memozoom", data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
