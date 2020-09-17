import {Component, OnInit, Input, OnChanges, Inject} from '@angular/core';
import { VerkaufschancenService } from '../../verkaufschancen.service';
import { GetofferteService } from '../../services/getofferte.service';
import { Router } from '@angular/router';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';
import {RestitgeterscheinungenService} from '../../services/restitgeterscheinungen.service';
import {RestinsdeleteofferteService} from '../../services/restinsdeleteofferte.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DocumentIndex} from 'ndx';
import {RestitauftraggesamtService} from '../../services/restitauftraggesamt.service';

@Component({
  selector: 'app-infosofferten',
  templateUrl: './infosofferten.component.html',
  styleUrls: ['./infosofferten.component.css']
})
export class InfosoffertenComponent implements OnInit {
  offertenhist: any;
  offerte:any;
  // window:Window;
  @Input() termindata:any;
  innerheight:number;
  showProgressBar:boolean = false;
  private resizeSubscription:Subscription;
    val0: any;
    temphistoryliste: any;

  constructor(private verkaufschancenService: VerkaufschancenService,
     private getofferteService:GetofferteService,
     private router: Router,
     private windowsizeService:WindowsizeService,
     private restitgeterscheinungenService: RestitgeterscheinungenService,
              private auftraggesamtService: RestitauftraggesamtService,
              public dialog: MatDialog) {

      this.innerheight = self.innerHeight - 60 - 53;
      console.log("innerheight",this.innerheight);
     }

  ngOnInit() {
  }
  ngOnChanges(){
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
        console.log("windowsize", size.innerHeight);
        this.innerheight = size.innerHeight - 60 - 53;
      });

    if (this.termindata){
      console.log("this.termindata",this.termindata);
      this.showoffertenhistory(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik, '03');
    } else {
      this.offertenhist = [];
    }
  }
  
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  showoffertenhistory(kunde, verknuepfung, obj, rubrik, urubrik, aufart) {
    this.showProgressBar = true;
    this.offertenhist = [];
    // this.restitgeterscheinungenService.getOfferten(kunde, verknuepfung, obj, rubrik, urubrik, aufart)
    //     .subscribe(verkaufschancen => {
    //       this.offertenhist = verkaufschancen ;
    //       console.log("verkaufschancen",verkaufschancen);
    //       this.showProgressBar = false;
    //     }, err => {
    //       console.log(err);
    //     });
      let aufnr = '';
      let mitarb = '';
      this.auftraggesamtService.getAuftraggesamt(kunde, aufart, aufnr, verknuepfung, urubrik, mitarb)
          .subscribe(verkaufschancen => {
                    this.offertenhist = verkaufschancen ;
                    console.log("verkaufschancen",verkaufschancen);
                    this.showProgressBar = false;
                  }, err => {
                    console.log(err);
                  });

      // {"request":{"filter":"restitgeterscheinungen%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05A%06start%051%06anzahl%0550%06
      // firma%052%06kunde%0517171%06objekt%05undefined%06rubrik%05undefined%06aufart%0503%06aufnr%05%06vermittler%05%06vertreter%05%06vondatum%05
      // %06bisdatum%05%06verknuepfung%05yes%06urubrik%05undefined%06mitarb%052488"}}

      // {"request":{"filter":"restitauftraggesamt%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05A%06start%051%06anzahl%0550%06firma%052%06kunde%05" +
      // "17171%06aufart%0503%06aufnr%0501,10%06vermittler%05%06vertreter%05%06vondatum%05%06bisdatum%05%06verknuepfung%05yes%06urubrik%05undefined%06mitarb%05"}}
  }



  // showoffertenhistory(kunde, verknuepfung, obj, rubrik, urubrik) {
  //   this.showProgressBar = true;
  //   this.offertenhist = [];
  //   this.verkaufschancenService.showall(kunde, verknuepfung, obj, rubrik, urubrik)
  //     .subscribe(verkaufschancen => {
  //       this.offertenhist = verkaufschancen ;
  //       console.log("verkaufschancen",verkaufschancen);
  //       this.showProgressBar = false;
  //     }, err => {
  //       console.log(err);
  //     });
  // }



  getofferte(aufnr){
    
    this.router.navigate(['./offertview/offerte-show',{"aufnr": aufnr,"beznr":this.termindata.beznr,"rapnr":this.termindata.rapnr}]);

  }
  openOfferteinnewTab(val){
   console.log("json",val);

  }

    deleteOfferte(val, aufnr) {
      val.stopPropagation();
        console.log("deleteOfferte",aufnr);

            const dialogRef = this.dialog.open(DeleteOfferteDialog, {
                width: '250px',
                data: {'aufnr': aufnr}
            });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.showoffertenhistory(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik, '03');
        });

        // this.deleteofferteService.delOfferte(aufnr)
        //     .subscribe(temp)
    }

    searchttermine(event) {
        if(!this.termindata){
            return;
        }
        if (!event) {
            this.showoffertenhistory(this.termindata.beznr, 'yes', this.termindata.objekt, this.termindata.rubrik, this.termindata.urubrik, '03');
        }
        this.temphistoryliste = this.offertenhist;
        const index = new DocumentIndex();
        // index.addField("aufnr");
         index.addField("sujet");
        index.addField("sujetnr");
        index.addField("datum");
        index.addField("objekt");
        index.addField("rubrik");
        index.addField("urubrik");
        index.addField("groesse");
        // index.addField("aufnr");
        this.temphistoryliste.forEach((doc) => {
            index.add(doc, doc);
        });
        var obj = index.search(event);
        // console.log("index",obj);

        var tempjsonArray = [];
        for (var i = 0; i <= obj.length - 1; i++) {
            tempjsonArray.push(obj[i].docId);
        }
        this.offertenhist = tempjsonArray;
    }
}

@Component({
    selector: 'delete-offerte-dialog',
    templateUrl: 'DeleteOfferteDialog.html',
})
export class DeleteOfferteDialog {

    constructor(
        public dialogRef: MatDialogRef<DeleteOfferteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private deleteofferteService: RestinsdeleteofferteService) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteOfferte(aufnr) {
        this.deleteofferteService.delOfferte(aufnr)
            .subscribe(temp => {
                console.log("offerte Deletet", temp);
            });
        this.dialogRef.close();
    }

}
