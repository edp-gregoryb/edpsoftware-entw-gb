import { Component, OnInit,ViewChild, Input, OnChanges } from '@angular/core';
import { UmsatzService } from '../../umsatz.service';
import { Subscription } from 'rxjs';
import { UIChart } from "primeng/components/chart/chart";
import { CommonService } from '../../comm/common.service';
import {BrowserModule} from '@angular/platform-browser';

import { words } from '../../../../../../locale/words';

@Component({
  selector: 'app-umsatzdiagram',
  templateUrl: './umsatzdiagram.component.html',
  styleUrls: ['./umsatzdiagram.component.css']
})
export class UmsatzdiagramComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: UIChart;
  @Input() objekt:string;
  @Input() kundenbez:string;
  columnChartOptions: any;
  umsatz: Array<number> = [];
  data: any;
  promise: Promise<any>;
  temparray: any;
  first: Promise<number>;
  labels: any;
  label: any;
  type: any;
  options: any;
  chartdata:any;
  chartshwo: Array<number> = [];
  temp: any;
  results:any;
  chartbudget:Array<number> = [];
  chartnextjahr:Array<number> = [];
  val: number = 3;
  val1: number = 4;
  val2: number = 6;
  width:string ='400px';
  height:string = '300px';
  termindatenforUmsatz:any;
  changedData:any;
  visibleJaNein:boolean = false;
  
  private subscription: Subscription;
  constructor(private umsatzService: UmsatzService,
  private commonService: CommonService) { 
    
  }
  
  ngOnChanges(changes: any){
    console.log("this.kundenbez, this.objekt", this.kundenbez,this.objekt);
    this.chartshwo = [];
    this.chartbudget = [];
    this.chartnextjahr = [];
    if(this.kundenbez === undefined){
      this.visibleJaNein = true;

      return;
    }
    
    this.loadData();
    this.showBarChart(this.chartshwo,this.chartbudget, this.chartnextjahr);
  }
  
  ngOnInit() {
    
  }
  
  
  loadData() {
    this.chartshwo = [];
    this.chartbudget = [];
    if (this.kundenbez){// && this.objekt
      this.umsatzService.showall(this.kundenbez).subscribe(data => {
        
        let count = 0;
        data.forEach(element => {
          this.chartshwo.push(parseInt(data[count].sTOTALVJ));
          this.chartbudget.push(parseInt(data[count].sTOTAL));
          this.chartnextjahr.push(parseInt(data[count].sTOTALNJ))
          count++;
        });
        
        // this.showBarChart();
        // this.chartupdate();
        // console.log(" this.chartshwo", this.chartshwo);
        this.showBarChart(this.chartshwo,this.chartbudget, this.chartnextjahr);
        // this.chartupdate();
        //this.chart.refresh();
        setTimeout(() => this.chart.reinit(), 100);
      });
        
    } else {
      console.log("this.kundenbez und objekt leer");
    } 
     
   
  }
  getSumofArray(total, num){
    return total +num;
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
  
  showBarChart(data1,data2,data3) {
    // if (data1.length > 1){
    // var sum = data1.reduce(this.getSumofArray);
    // if (sum > 1  ){
    // console.log("data1 ist grösser als 1",sum);
    // this.visibleJaNein = true;
    // } else {
    //   this.visibleJaNein = false;
    //   console.log("data1 ist kleiner als 1",this.visibleJaNein);
    // }
    // }
    var summevj = this.getsummeofyear(data1);
    var summej = this.getsummeofyear(data2);
    var summenj = this.getsummeofyear(data3);
    var array1 = this.checkifarrayhavedata(data1);
    var array2 = this.checkifarrayhavedata(data2);
    var array3 = this.checkifarrayhavedata(data3);
    if (array1 === true || array2 === true || array3 === true){
    this.visibleJaNein = true;
    this.options = {
            responsive: false
           
        },
    this.data = {
      // options:[{responsive: false}],
      labels: [words.january, words.february, words.march, words.april, words.may, words.june, words.july, words.august, words.september, words.october, words.november, words.december],
      datasets:[
        {
          label: words.prevYear+summevj,
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: data1
          },
        {
          label: words.year+summej,
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: data2
        },
        {
          label: words.nextYear+summenj,
          backgroundColor: '#FF0000',
          borderColor: '#8A0808',
          data: data3
        }

      ]
     
      }
    } else {
      console.log("array1 und array2 sind leer")
      this.visibleJaNein = false;
    }
    
    }
  
  update(event ) {
    
       setTimeout(() => this.chart.refresh(), 100);
  }

selectData(){

}


}
