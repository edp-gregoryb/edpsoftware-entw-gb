import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MerkmaleService } from '../../services/merkmale.service';
import { MerkmaldeleteService } from '../../services/merkmaldelete.service';
import { SearchpanelMerkmaleComponent } from '../../dialogs/searchpanel-merkmale/searchpanel-merkmale.component';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-chipsanzeige',
  templateUrl: './chipsanzeige.component.html',
  styleUrls: ['./chipsanzeige.component.css']
})
export class ChipsanzeigeComponent implements OnInit {
  
  @Input() kundenbez:any;
  @Input() kontaktbez:any;
  @Input() refreshChipbez:any;
  merkmallist:any;
 
 // @Output() reloadchipsliste = new EventEmitter();
  dialogRef: MatDialogRef<any>;
  merkmalehistory: any = null;
  innerheight:number;
  showProgressBar: boolean = false;
  
  private resizeSubscription:Subscription;
  //str:string = JSON.stringify(this.chipslist);
  constructor(public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    private merkaleService: MerkmaleService,
    private merkmaldeleteService:MerkmaldeleteService,
    private windowsizeService:WindowsizeService
    ) { }

  ngOnInit() {
    this.innerheight = self.innerHeight - 60 - 53;
  }
  ngOnChanges(changes: any){
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
       // console.log("windowsize", size.innerHeight);
        this.innerheight = size.innerHeight - 60 - 53;
      });
     console.log("this.kundenbez", this.kundenbez);
    if (this.kundenbez !== undefined){
      this.showMerkamle(this.kundenbez);
    } else {
      this.merkmallist = [];
    }
    if (this.refreshChipbez) {
      console.log("this.refreshChipbez", this.refreshChipbez);
      // this.showMerkamle(this.refreshChipbez);
    }
  }
   showMerkamle(beznr) {
     this.showProgressBar = true;
     this.merkmallist = [];
    this.merkaleService.showMerkmale(beznr)
      .subscribe(merkmale => {
        this.merkmalehistory = merkmale.tt_itmerkmale;
        this.merkmallist = this.merkmalehistory;
        this.showProgressBar = false;
      }, err => {
        console.error(err);
        this.showProgressBar = false;
      });
  }
  addChip(event){
    // console.log("addChip",event);
     this.openMerkmalSuche(event);
  }
  deletechips(beznr,event){
    var tempdel;
    // console.log("deletechips",beznr,event);
    this.merkmaldeleteService.deleteMerkmal(beznr, event.mkmart,event.mkmerk1,event.mkmerk2,event.mkmerk3)
            .subscribe(merkobj => { tempdel = merkobj }, err => {
                    console.error(err);
                });
    //this.reloadchipsliste.next({value:true});
    this.showMerkamle(this.kundenbez);
  }
  
  openMerkmalSuche(kundenbez) {
    // console.log("beznr0",kundenbez);
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    // console.log("beznr",kundenbez);
    this.dialogRef = this.dialog.open(SearchpanelMerkmaleComponent, config);
    this.dialogRef.componentInstance.param1 = kundenbez;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
     // this.reloadchipsliste.next({value:true});
      this.showMerkamle(this.kundenbez);
    });
   
   
  }
  
  

}
