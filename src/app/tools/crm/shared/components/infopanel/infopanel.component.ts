import { Component, OnInit, OnChanges, Input} from '@angular/core';
// import { UmsatzdiagramComponent } from '../../components/umsatzdiagram/umsatzdiagram.component';

import { words } from '../../../../../../locale/words';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-infopanel',
  templateUrl: './infopanel.component.html',
  styleUrls: ['./infopanel.component.css']
})
export class InfopanelComponent implements OnInit {
  @Input() showContent:any;
  @Input() termin:any;
  @Input() merkrefresh:any;
  @Input() fromModul:any;
  @Input() selectedInfoTab: any;
  //kundenbezvoneingang:any;
  @Input() kontaktpersbez: string;
  kundenbez:string;
  kundenobjekt:string;
  vertretername:string;
  kundenbezref:any;
  selectedIndex = new FormControl(0);
  
  dyntab:any = [{
    tab1name : words.h,
    tab1anzeigen : true,
    tab2name : "!",
    tab2anzeigen : true,
    tab3name : "*",
    tab3anzeigen : true,
    tab4name : words.orders,
    tab4anzeigen : true,
    tab5name : words.offers,
    tab5anzeigen : true,
    tab6name : words.mails,
    tab6anzeigen : true,
    tab7name : words.abo,
    tab7anzeigen : true,
  }];
  kontaktbez: any;




  constructor() {
    // console.log("this.selectedInfoTab", this.selectedInfoTab);
    // let tempnr = this.selectedInfoTab;
    // console.log("tempnr", tempnr);
    // this.selectedIndex = new FormControl(tempnr);
       // this.selectedIndex = new FormControl(this.selectedInfoTab);//sessionStorage.getItem(this.fromModul + "infopanel");

  }
  
  ngOnChanges(changes: any){
    console.log("termin", this.termin);
    console.log(this.kontaktpersbez);
    if (this.termin){
      this.kundenbez = this.termin.beznr;
      this.kundenobjekt = this.termin.objekt;
      this.vertretername = this.termin.vertr_name;
    }
    console.log("this.selectedInfoTab", this.selectedInfoTab);
    if (this.selectedInfoTab === 1) {
      sessionStorage.setItem(this.fromModul + "infopanel", this.selectedInfoTab.toString());
      this.selectedIndex = new FormControl(this.selectedInfoTab);
    } else if (this.selectedInfoTab === 2) {
      this.selectedIndex = new FormControl(this.selectedInfoTab);
      sessionStorage.setItem(this.fromModul + "infopanel", this.selectedInfoTab.toString());
    }  else if (this.selectedInfoTab === 3) {
      this.selectedIndex = new FormControl(this.selectedInfoTab);
      sessionStorage.setItem(this.fromModul + "infopanel", this.selectedInfoTab.toString());
    } else if (this.selectedInfoTab === 4) {
      this.selectedIndex = new FormControl(this.selectedInfoTab);
      sessionStorage.setItem(this.fromModul + "infopanel", this.selectedInfoTab.toString());
    } else if (this.selectedInfoTab === 5) {
      this.selectedIndex = new FormControl(this.selectedInfoTab);
      sessionStorage.setItem(this.fromModul + "infopanel", this.selectedInfoTab.toString());
    }
    else {
      this.setValue(this.selectedInfoTab);
    }
    
    if(changes.showContent){
      if(changes.showContent.currentValue === false){
        this.termin = undefined;
        this.kundenbez = undefined;
      }
    }

    if (this.merkrefresh) {
      console.log('this.merkrefresh', this.merkrefresh);
      this.kundenbezref = this.merkrefresh;
      // this.kontaktbez = this.merkrefresh.vertbez;
    } else {
      // this.kundenbez = undefined;
      // this.kontaktbez = undefined;
    }
  }
  
  ngOnInit() {

          // this.selectedIndex = sessionStorage.getItem(this.fromModul + "infopanel");


  }
  onSelectTabChange(event){
    //console.log('event',event);
    if (event.index === 3){
      // console.log('Timelines');
        // this.showdiagram();
        
    }
  }
  
  setValue(event){
    sessionStorage.setItem(this.fromModul + "infopanel", event);
  }


  
  // public newBeznr(val){
  //   console.log("newBeznr", val);
  //   this.kundenbezvoneingang = val;
  // }
  

}
