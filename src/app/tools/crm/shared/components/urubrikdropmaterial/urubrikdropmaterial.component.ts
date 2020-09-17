import { Component, OnInit , Input,Output, EventEmitter} from '@angular/core';
import { UnterrubrikauswahlService } from '../../../../shared/services/unterrubrikauswahl.service';

@Component({
  selector: 'app-urubrikdropmaterial',
  templateUrl: './urubrikdropmaterial.component.html',
  styleUrls: ['./urubrikdropmaterial.component.css']
})
export class UrubrikdropmaterialComponent implements OnInit {

   @Input() urubriktext: string = null;
  urubrikdata: any = null;
  @Input() objforrubrik:any;
  rubrikkunde:string
  @Input() rubrikforurubrik:any;
  urubrikstodb:any;
  unterrubrikkunde:any;
  @Output() urubrikonvalueChanged = new EventEmitter();
  constructor(private unterrubrikauswahlService: UnterrubrikauswahlService) { }

  ngOnInit() {
    // console.log("urubriktext",this.urubriktext,this.objforrubrik,this.rubrikforurubrik);
    if (this.objforrubrik && this.rubrikforurubrik && this.urubriktext){
      this.unterrubrikauswahlService.showUrubrik(this.objforrubrik, '', this.rubrikforurubrik)
        .subscribe(urubrik => {
          this.urubrikdata = urubrik;
          // console.log(this.urubrikdata);
        }, err => {
          console.error(err);
        });
    }
  }
   selectedurubrik() {
    // console.log("rubrik", data);
    if (this.objforrubrik && this.rubrikforurubrik){
      if (this.objforrubrik.value && this.rubrikforurubrik.value){
    this.unterrubrikauswahlService.showUrubrik(this.objforrubrik.value, '', this.rubrikforurubrik.value)
        .subscribe(urubrik => {
          this.urubrikdata = urubrik;
          // console.log(this.urubrikdata);
        }, err => {
          console.error(err);
        });
      } else {
        this.unterrubrikauswahlService.showUrubrik(this.objforrubrik, '', this.rubrikforurubrik)
        .subscribe(urubrik => {
          this.urubrikdata = urubrik;
          // console.log(this.urubrikdata);
        }, err => {
          console.error(err);
        });
      }
      
    }
  }
  urubrikauswahl(urubrik){
    // console.log("urubrik",urubrik.value);
    this.urubrikonvalueChanged.next({value:urubrik.value});
  }

}
