import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { UmsatzService } from '../../../../shared/umsatz.service';
import { GoogleChartComponent } from '../googlechart/googlechart.component';
import { UmsatzDaten } from '../../../../../shared/entities/umsatzdaten';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { words } from '../../../../../../../locale/words';

@Component({
  selector: 'app-umsatzchart',
  templateUrl: './umsatzchart.component.html',
  styleUrls: ['./umsatzchart.component.css']
})
export class UmsatzchartComponent implements OnInit {
  
  // chart = [];


  visibleJaNein: boolean;
  options:any;
  loaded:boolean = false;
  @Input() umsatzdata : UmsatzDaten;

  // view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  barPadding:number = 2;
  showLegend:boolean = true;
  balkendiagrammumsatz:any = [];
  tempcombi:any;
  
  constructor(private umsatzService: UmsatzService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    if (this.umsatzdata){
      // for (let propName in changes){
      //     if (propName === 'umsatzdata'){
      //         let change = changes[propName];
      //         let curVal  = change.currentValue;
      //       console.log('umsatzdata curVal',curVal);
      
      // console.log("this.umsatzdata",this.umsatzdata);
      this.loaded = false;
      this.loadData();
    }
  }
  
  loadData() {
    this.tempcombi = [];
    
    this.umsatzService.showUmsatzCrm(this.umsatzdata).subscribe(data => {
      data.forEach(element => {
        let total:number = (element.sTOTAL);
        let totalvj:number =  (element.sTOTALVJ);
        let totalnj:number =  (element.sTOTALNJ);
        let budget:number =  (element.sbudget);
        
        
        this.tempcombi.push({"name": element.feld1bez, "series":[{"name": words.year, "value":total},{"name": words.budget, "value":budget},{"name": words.prevYear, "value":totalvj},{"name": words.nextYear, "value":totalnj}]});
      });
      
      this.balkendiagrammumsatz = this.tempcombi;
      this.loaded = true;
      // console.log("this.balkendiagrammumsatz",this.balkendiagrammumsatz);
    });
    
  }
    
  getSumofArray(total, num){
    return total +num;
  }
  
  getsummeofyear(data){
    if (data.length > 1){
      var sum = data.reduce(this.getSumofArray);
      if (sum > 1  ){
        // console.log("data1 ist grösser als 1",sum);
        return sum;
      } else {
        console.log("keine Werte enthalten");
        return sum = 0;
      }
    }
  }
  
  checkifarrayhavedata(data){
    if (data.length > 1){
      var sum = data.reduce(this.getSumofArray);
      if (sum > 1  ){
        console.log("data1 ist grösser als 1",sum);
        return true;
      } else {
        console.log("data1 ist kleiner als 1",this.visibleJaNein);
        return false;
      }
    }
  }
  
  onSelect(event){
    console.log("onSelect(event)", event);
  }
}


