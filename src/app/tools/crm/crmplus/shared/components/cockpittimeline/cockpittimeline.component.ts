import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import { TimelineService } from '../../../../shared/timeline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cockpittimeline',
  templateUrl: './cockpittimeline.component.html',
  styleUrls: ['./cockpittimeline.component.css']
})
export class CockpittimelineComponent implements OnInit {

 //@Input() kunde : any;
 @Input() searchtimeline:any;
 @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['vertreter', 'datum', 'nettoNetto', 'NAME', 'sujet', 'sujetnr', 'aufnr', 'objekt', 'aufart'];
  timelinessource = new MatTableDataSource();
  
  constructor(private timelineService:TimelineService, private router:Router) { }

   ngAfterViewInit() {
    this.timelinessource.paginator = this.paginator;
    
  }
  
  ngOnChanges(changes:SimpleChanges){
   
   
   if (changes) {
    this.getTimeline(changes.searchtimeline.currentValue);
    console.log("changes",changes.searchtimeline.currentValue);
   }
   
  }

  ngOnInit() {


}
public getTimeline(searchdaten){
      var temptimeline:any;
    this.timelineService.showallwithoutparam(searchdaten)//this.kunde
    .subscribe(timeline => {
      temptimeline = timeline;
      //console.log("temptimeline",temptimeline),
      
       if (temptimeline != undefined){
      for (let i=0;i <= temptimeline.length -1; i++){
          if (temptimeline[i].aufart === '01'){
              temptimeline[i].aufart = 'play_circle_filled';
          }
          if (temptimeline[i].aufart === '02'){
              temptimeline[i].aufart = 'play_circle_outline';
          }
          if (temptimeline[i].aufart === '04'){
              temptimeline[i].aufart = 'hourglass_empty';
          }
          if (temptimeline[i].aufart === '10'){
              temptimeline[i].aufart = 'play_circle_outline';
          }
          if (temptimeline[i].aufart === ''){
              temptimeline[i].aufart = '';
          }
      }
      var leeresArray = [];
      if (temptimeline.length < 10){
          console.log("temptimeline",temptimeline.length);
           for (let i = 0;temptimeline.length < 10; i++){
              temptimeline.push(leeresArray);
           } 
      }
      
      this.timelinessource.data = temptimeline;
       } else {
         console.log("keine daten");
       }
  }, err => {
        console.error(err);
      });
}

public showdetail(val){
 console.log("showdetail cockpit", val);//{aufnr:val.aufnr}
 // {kunde:val.kunde,aufnr:val.aufnr,objekt:val.objekt,art:val.art,auftrag:val.auftrag,vertreter:val.vertreter,vermittler:val.vermittler, searchdetail:false}
 sessionStorage.setItem('lastmodule', 'PRAU');
 this.router.navigate(["/timelinelistview/timelinedetail-show",{"kunde":val.kunde,"objekt":val.objekt,"aufnr":val.aufnr,"sujetnr":val.sujetnr,"datum":val.datum,"returnlink":"./cockpitview/cockpit"}]);
}
public showtimeline(){
 sessionStorage.setItem('lastmodule', 'PRAU');
  this.router.navigate(['/timelinelistview/timelinelist-show']);
}

}
