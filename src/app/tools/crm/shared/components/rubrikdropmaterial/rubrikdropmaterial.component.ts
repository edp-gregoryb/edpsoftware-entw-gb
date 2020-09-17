import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import { RubrikauswahlService } from '../../../../shared/services/rubrikauswahl.service';

@Component({
  selector: 'app-rubrikdropmaterial',
  templateUrl: './rubrikdropmaterial.component.html',
  styleUrls: ['./rubrikdropmaterial.component.css']
})
export class RubrikdropmaterialComponent implements OnInit {

rubrikurubrik:boolean;
  rubrikkunde:string;
  rubrikforurubrik:string;
  rubrikdata:any;
  @Input() objforrubrik:any;
  @Input() rubriktext:string;
  @Output() rubrikvalueChanged = new EventEmitter();
  rubriksttodb:string;
  rubrikstodb:string;
  constructor(private rubrikauswahlService: RubrikauswahlService) { }

  ngOnInit() {
  // console.log("rubriktext",this.rubriktext,this.objforrubrik);
     if (this.rubriktext && this.objforrubrik) {
      this.rubrikauswahlService.showRubrik(this.objforrubrik, '')
        .subscribe(rubrik => {
          this.rubrikdata = rubrik;
          // console.log(this.rubrikdata);
        }, err => {
          console.error(err);
        });
    }
    
  }
   selectedrubrik(rubrik) {
    // console.log("rubrik",this.objforrubrik);
     
      if (this.objforrubrik) {
        if (this.objforrubrik.value) {
      this.rubrikauswahlService.showRubrik(this.objforrubrik.value, '')
        .subscribe(rubrik => {
          this.rubrikdata = rubrik;
          // console.log(this.rubrikdata);
        }, err => {
          console.error(err);
        });
        } else {
          this.rubrikauswahlService.showRubrik(this.objforrubrik, '')
        .subscribe(rubrik => {
          this.rubrikdata = rubrik;
          // console.log(this.rubrikdata);
        }, err => {
          console.error(err);
        });
        }
    }
    else {
      console.log("kein objekt ausgewält");
    }
    // console.log("rubrik", rubrik);
    //this.rubrikvalueChanged.next({value:rubrik.value});
    // this.rubrikurubrik = true;
    // this.rubrikkunde = rubrik.rubrik_bezeichnung;
    // this.rubrikforurubrik = rubrik.rubrik;
  }
  rubrikauswahl(rubrik){
    // console.log("rubrik",rubrik.value);
    this.rubrikvalueChanged.next({value:rubrik.value});
  }

}
