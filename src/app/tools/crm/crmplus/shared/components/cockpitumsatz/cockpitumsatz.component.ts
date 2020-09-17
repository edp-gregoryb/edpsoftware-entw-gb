import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { UmsatzService } from '../../../../shared/umsatz.service';
import {GoogleChartComponent} from '../googlechart/googlechart.component';
import { RestitaufeinwocheService }  from '../../services/restitaufeinwoche.service';
import { RestitaufeinmonatService } from '../../services/restitaufeinmonat.service';
import { RestitaufeinytodateService } from '../../services/restitaufeinytodate.service';
import { Router } from '@angular/router';
import { UmsatzDaten } from '../../../../../shared/entities/umsatzdaten';

import { words } from '../../../../../../../locale/words';

@Component({
  selector: 'app-cockpitumsatz',
  templateUrl: './cockpitumsatz.component.html',
  styleUrls: ['./cockpitumsatz.component.css']
})
export class CockpitumsatzComponent implements OnInit {

  chart = [];

  @Input() umsatzdata:UmsatzDaten;
  chartshow: Array<number> = [];
  chartbudget: Array<number> = [];
  chartvorjahr:Array<number> = [];
  chartnextjahr:Array<number> = [];
  
  kunde = "*";
  vermittler = "*";
  
  vertreter = "*";
  key1 = "*";
  key2 = "*";
  key3 = "*";
  key4 = "";
  key5 = "*";
  r_kunde:any = "1";
  r_vermittler:any = "1";
  r_vertreter:any = "1";
  r_objekt:any = "1";
  r_key1:any = "1";
  r_key2:any = "1";
  r_key3:any = "1";
  r_key4:any = "1";
  r_key5:any = "1";
  _datumvon = "";
  _datumbis = "";
  //sicht:string = "A";
  
//   umsatzdata : UmsatzDaten = { 
//       "kunde":this.kunde,
//       "vermittler": this.vermittler,
//       "objekt": this.objekt,
//       "vertreter": this.vertreter,
//       "key1": this.key1,
//       "key2": this.key2,
//       "key3": this.key3,
//       "key4": this.key4,
//       "key5": this.key5,
//       "r_kunde": this.r_kunde,
//       "r_vermittler": this.r_vermittler,
//       "r_vertreter": this.r_vertreter,
//       "r_objekt": this.r_objekt,
//       "r_key1": this.r_key1,
//       "r_key2": this.r_key2,
//       "r_key3": this.r_key3,
//       "r_key4": this.r_key4,
//       "r_key5": this.r_key5,
//       "_datumvon": this._datumvon,
//       "_datumbis": this._datumbis,
//       "sicht":this.sicht
//   };
  
  visibleJaNein:boolean = false;
 
  options: any;
  
  public gauge_ChartData = [];
  public gauge_ChartData_monat = [];
  public gauge_ChartData_einytodate = [];
    public gauge_ChartOptions = {
          width: 400, height: 80,
          redFrom: 0, redTo: 20,
          yellowFrom:50, yellowTo: 81,
          greenFrom: 81, greenTo: 100,
          minorTicks: 5
    };     
  constructor(private umsatzService:UmsatzService,  private restitaufeinwocheService:RestitaufeinwocheService,
            private restitaufeinmonatService:RestitaufeinmonatService,  private restitaufeinytodateService:RestitaufeinytodateService,
            private router: Router) { }


ngOnChanges(changes:SimpleChanges){
     console.log("changes", changes);
        if (changes) {
       console.log("changes",changes.umsatzdata.currentValue);
    
   }
     this.loadData(changes.umsatzdata.currentValue);
      this.showBarChart(this.chartshow,this.chartbudget,this.chartvorjahr,this.chartnextjahr);
      this.loadLeistungsdaten(changes.umsatzdata.currentValue);
        
 
      
  }
  
  

  ngOnInit() {
    // this.objekt = 'sowo';
    // this.kundenbez = '17171';
     //this.loadData();

}

loadLeistungsdaten(sichtdaten){
    this.restitaufeinwocheService.getWochewerte(sichtdaten)
        .subscribe(wochenwerte => {
        let woche = wochenwerte[0].leistung;
        console.log("this.woche", woche);
        this.gauge_ChartData = [
            ['Label', 'Value'],
            ['Woche', woche]
            ];

        }, err => {
          console.error(err);
        });
        
    this.restitaufeinmonatService.getMonatwerte(sichtdaten)
        .subscribe(monatwerte => {
        let monat = monatwerte[0].leistung;
        console.log("this.monat", monat);
        this.gauge_ChartData_monat = [
            ['Label', 'Value'],
            ['Monat', monat]
            ];

        }, err => {
          console.error(err);
        });    
        
    this.restitaufeinytodateService.getEinytodatewerte(sichtdaten)
        .subscribe(einytodate => {
        let einytodatedata = einytodate[0].leistung;
        console.log("this.einytodatedata", einytodatedata);
        this.gauge_ChartData_einytodate = [
            ['Label', 'Value'],
            ['Y.t.D.', einytodatedata]
            ];

        }, err => {
          console.error(err);
        });        
}

 loadData(searchdaten) {
    this.chartshow = [];
    this.chartbudget = [];
    
    if (searchdaten){
    this.umsatzService.showUmsatzCrm(searchdaten).subscribe(data => {
            let count = 0;
          data.forEach(element => {
            this.chartshow.push(parseInt(data[count].sTOTAL));
            this.chartbudget.push(parseInt(data[count].sbudget));
            this.chartvorjahr.push(parseInt(data[count].sTOTALVJ));
            this.chartnextjahr.push(parseInt(data[count].sTOTALNJ));
            count++;
          });

        this.showBarChart(this.chartshow,this.chartbudget,this.chartvorjahr,this.chartnextjahr);
        //setTimeout(() => this.chart.reinit(), 100);
        });
        
    } else {
      console.log("this.kundenbez und objekt leer");
    } 
     
   
  }


  showBarChart(data1,data2, data3, data4) {
    
    var summej = this.getsummeofyear(data1);
    var summebudget =this.getsummeofyear(data2);
    var summevj = this.getsummeofyear(data3);
    var summenextj = this.getsummeofyear(data4);
    
    var array1 = this.checkifarrayhavedata(data1);
    var array2 = this.checkifarrayhavedata(data2);
    var array3 = this.checkifarrayhavedata(data3);
    var array4 = this.checkifarrayhavedata(data4);
    if (array1 === true || array2 === true || array3 === true || array4 === true){
        this.visibleJaNein = true;
    
        this.options = {
            responsive: false
        },
        this.chart = new Chart('canvas',{    
            type:'bar',
            data: {
            labels:[words.january, words.february, words.march, words.april, words.may, words.june, words.july, words.august, words.september, words.october, words.november, words.december],
            datasets:[
                {
                label: words.year+" "+summej,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: data1
                },
                {
                label: words.budget+" "+summebudget,
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
                data: data2
                },
                {
                label: words.prevYear+" "+summevj,
                backgroundColor: '#FA5858',
                borderColor: '#FA5858',
                data: data3
                },
                {
                label: words.nextYear+" "+summenextj,
                backgroundColor: '#FA58D0',
                borderColor: '#FA58D0',
                data: data4
                }
            ]
        }
      })

    } else {
      console.log("array1 und array2 sind leer")
      this.visibleJaNein = false;
    }
    
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
  
  public gotoUmsatz(){
       this.router.navigate(['./umsatzdetailview/umsatzdetail-show']);
  }

}
