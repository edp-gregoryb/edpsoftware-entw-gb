import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-infopanelprojekt',
  templateUrl: './infopanelprojekt.component.html',
  styleUrls: ['./infopanelprojekt.component.css']
})
export class InfopanelprojektComponent implements OnInit {
 // @Input() termin:any;
  kundenbez:string;
  kundenobjekt:string;
  constructor() { }
  
  ngOnChanges(){
     // console.log("termin", this.termin);
     // if (this.termin){
     //   this.kundenbez = this.termin.beznr;
     //   this.kundenobjekt = this.termin.objekt;
     // }
    
  }
  ngOnInit() {
  }
  onSelectTabChange(event){
    //console.log('event',event);
    if (event.index === 3){
       // console.log('Timelines');
        // this.showdiagram();
        
    }
  }

}
