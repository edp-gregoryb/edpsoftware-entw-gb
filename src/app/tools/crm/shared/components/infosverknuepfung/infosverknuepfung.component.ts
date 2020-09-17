import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-infosverknuepfung',
  templateUrl: './infosverknuepfung.component.html',
  styleUrls: ['./infosverknuepfung.component.css']
})
export class InfosverknuepfungComponent implements OnInit, OnChanges {
  isActiveLink:boolean = false;
  verknuepfung:string;
  @Input() termindataChanged;
  @Output() verknuepfungEinAusSchalter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(change: any){
    if(change.termindataChanged){
      this.isActiveLink = false;
    }
  }
  
  verknuepfungEinAus(event) {
    // console.log("verknuepfungEinAus");
    if (this.isActiveLink === false) {
      this.verknuepfungEinAusSchalter.next(false);
      // this.commonService.notifyOther8({ option: 'verknuepfungAus', value: false });
      this.isActiveLink = true;
      this.verknuepfung = 'yes';
    } else {
      this.isActiveLink = false;
      this.verknuepfungEinAusSchalter.next(true);
      // this.commonService.notifyOther8({ option: 'verknuepfungAus', value: true });
      this.verknuepfung = '';
    }
  }

}
