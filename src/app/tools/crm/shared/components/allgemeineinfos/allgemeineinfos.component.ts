import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DelkundenmemoService } from '../../services/delkundenmemo.service';
import { KundenmemoService } from '../../services/kundenmemo.service';
import { SavekundenmemoService } from '../../services/savekundenmemo.service';
import { OverlayPanelModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { WindowsizeService } from '../../../../shared/services/windowsize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allgemeineinfos',
  templateUrl: './allgemeineinfos.component.html',
  styleUrls: ['./allgemeineinfos.component.css']
})
export class AllgemeineinfosComponent implements OnInit {
   memouebersicht: any;
   @Input() beznr:any;
   @Input() vertrname:any;
   neuesmemo: string;
   temphist: any;
   canEdit: boolean = false;
   isActive:boolean = false;
   showProgressBar: boolean = false;
  showEdit: boolean = false;
  innerheight: number;
  private resizeSubscription:Subscription;
  constructor(private memouebersichtService: KundenmemoService,
              private memodelService: DelkundenmemoService,
              private kundenmemoupdateNewService: SavekundenmemoService,
              private windowsizeService:WindowsizeService,
              public overlaypanel: OverlayPanelModule
              ) {}

  ngOnInit() {
    this.innerheight = self.innerHeight - 60 - 53;
  }
  ngOnChanges(){
    if (this.beznr){
      this.showMemos(this.beznr);
      this.showEdit = true;
    } else {
      this.memouebersicht = [];
      this.showEdit = false;
    }
    
    this.resizeSubscription =  this.windowsizeService.onResize$
      .subscribe(size => {
        console.log("windowsize", size.innerHeight);
        this.innerheight = size.innerHeight - 60 - 53;
    });
  }
  
  showMemos(beznr) {
    this.showProgressBar = true;
    this.memouebersicht = []
    this.memouebersichtService.getKundenmemos(this.beznr, 'K')
      .subscribe(memos => {
        this.memouebersicht = memos;
        this.showProgressBar = false;
      }, err => {
        console.error(err);
        this.showProgressBar = false;
      });
  }
  
  UpdateMemo(text, memonr) {
    var memoupdate;
    // console.log("UpdateMemo", this.beznrfornewmemo, text, memonr, this.zustaendigername);
    this.kundenmemoupdateNewService.saveKundenmemo(this.beznr, memonr, this.vertrname, text)
      .subscribe(memos => { memoupdate = memos; 
       this.showMemos(this.beznr);
                            // this.showMemos(this.beznr, 'K');
      }, err => {
        console.error(err);
      });

  }
  DeleteMemo(rownr) {
    var memodel;
    // console.log("DeleteMemo", rownr);
    this.memodelService.delKundenmemo(rownr)
      .subscribe(memos => { memodel = memos; 
       this.showMemos(this.beznr);
                            // this.showMemos(this.beznr, 'K');  
      }, err => { 
        console.error(err);
      });
  }
  NeuesMemo(memotext) {
    var memoneu;
    // console.log("NeuesMemo", memotext);
    this.kundenmemoupdateNewService.saveKundenmemo(this.beznr, 'MN', this.vertrname, memotext)//MN = neues Memo
      .subscribe(memos => {
        memoneu = memos;
        // this.showMemos(this.beznr, 'K'); 
        this.showMemos(this.beznr);
      }, err => {
        console.error(err);
      });
    this.neuesmemo = "";

  }
  
   editieren() {
    if (this.canEdit === false) {
      this.canEdit = true;
      this.isActive = true;
      // console.log("isActive",this.isActive);
    } else {
      this.canEdit = false;
      this.isActive = false;
      // console.log("isActive",this.isActive);
    }

  }
  
  onSelect(event, hist, overlaypanel) {
    // console.log("event", event, hist);
    this.temphist = (hist.termrapptext);
    overlaypanel.toggle(event);
  }
  
   onSelectmemo(event, memo, overlaypanel) {
    // console.log("event", event, memo);
    this.temphist = (memo.memotext);
    overlaypanel.toggle(event);
  }
  

}
