import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RestitgetaktionService } from '../../services/restitgetaktion.service';

@Component({
  selector: 'app-aktiondropmaterial',
  templateUrl: './aktiondropmaterial.component.html',
  styleUrls: ['./aktiondropmaterial.component.css']
})
export class AktiondropmaterialComponent implements OnInit {
  
  @Input() aktion: any;
  @Output() aktionvaluechanged = new EventEmitter();
  
  aktiondata: any;
  
  constructor(private getAktionService: RestitgetaktionService) { }

  ngOnInit() {
    this.getAktionService.getAktionen()
      .subscribe(ret => {
        if(ret){
          this.aktiondata = ret;
        }
      }, err => {
        console.log(err);
      }
    );
  }
  
  selectedAktion(aktionvalue){
    if (aktionvalue) {
      this.aktionvaluechanged.next({value: aktionvalue.value});
    }
  }
}
