import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  // view: any[] = [900, 500];

  // options
  chartOptions = {
    responsive: true
  };

  chartData = [];

  chartLabels = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  
  @Input() piedata: any;
  diagrammumsatz:any[];
  tempcombi: any;
  
  
  constructor() { 
    //Object.assign(this, {this.pieresult})   
  }
  
  ngOnChanges(changes: SimpleChanges){
    
    this.tempcombi = [];
    for (let propName in changes){
        if (propName === 'piedata'){
            let change = changes[propName];
            let curVal  = change.currentValue;
            console.log('piedata',curVal);
            
            if (curVal !== undefined){
            for(let data of curVal) {
              if(data.feld1bez){
                this.tempcombi.push( {"name":data.feld1bez,"value":parseInt(data.sTOTAL)});
              } else {
                this.tempcombi.push( {"name":'',"value":parseInt(data.sTOTAL)});
              }
            }
            this.diagrammumsatz = this.tempcombi;
            }
            // this.chartLabels.push(curVal[0].feld1bez);
            // this.chartData.push(parseInt(curVal[0].sTOTAL));
            // console.log('chartLabels, chartData',this.chartLabels, this.chartData);
        } else {
           console.log("keine Daten enthalten");
        }
    }
    
    // this.tempcombi = [];
    // console.log("this.piedata",this.piedata);
    // if (this.piedata) {
    //   for(let data of this.piedata) {
    
    //     this.tempcombi.push( {"name":data.feld1bez,"value":parseInt(data.sTOTAL)});
    //     this.chartLabels.push(data.feld1bez);
    //     this.chartData.push(parseInt(data.sTOTAL));
    //   }
    //   this.diagrammumsatz = this.tempcombi;
    // } else {
    //   console.log("keine Daten enthalten");
    // }
    
    
    //Versuch mit chart.js
   
  }
  
  ngOnInit() {
    console.log("this.piedata",this.piedata);
  }
  
  onSelect(event: any){
    console.log("onSelect(event)", event);
  }
}
