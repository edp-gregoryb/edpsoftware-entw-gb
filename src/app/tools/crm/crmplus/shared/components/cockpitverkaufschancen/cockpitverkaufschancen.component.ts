import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { VerkaufschancenService } from '../../../../shared/verkaufschancen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cockpitverkaufschancen',
  templateUrl: './cockpitverkaufschancen.component.html',
  styleUrls: ['./cockpitverkaufschancen.component.css']
})
export class CockpitverkaufschancenComponent implements OnInit {
  
  @Input() searchverkaufschancen:any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['vertreter', 'datum', 'nettoNetto', 'NAME', 'sujet', 'sujetnr', 'aufnr', 'objekt', 'aufart'];
  verkaufschancensource = new MatTableDataSource();
  
  constructor(private verkaufschancenService:VerkaufschancenService, private router:Router) { }

   ngAfterViewInit() {
    this.verkaufschancensource.paginator = this.paginator;
    
  }
    ngOnChanges(changes:SimpleChanges){
   if (changes) {
    this.getVerkaufschancen(changes.searchverkaufschancen.currentValue);
    console.log("changes",changes.searchverkaufschancen.currentValue);
   }
   
  }
  
  ngOnInit() {


}
public getVerkaufschancen(search){
      var tempverkaufschancen:any;
    this.verkaufschancenService.showallwithoutparam(search)
    .subscribe(verkaufs => {
      tempverkaufschancen = verkaufs;
      console.log("tempverkaufschancen",tempverkaufschancen);
      if (tempverkaufschancen != undefined){
      
      for (let i=0;i <= tempverkaufschancen.length -1; i++){
          if (tempverkaufschancen[i].aufart === '01'){
              tempverkaufschancen[i].aufart = 'play_circle_filled';
          }
          if (tempverkaufschancen[i].aufart === '02'){
              tempverkaufschancen[i].aufart = 'play_circle_outline';
          }
          if (tempverkaufschancen[i].aufart === '04'){
              tempverkaufschancen[i].aufart = 'hourglass_empty';
          }
          if (tempverkaufschancen[i].aufart === '10'){
              tempverkaufschancen[i].aufart = 'play_circle_outline';
          }
          if (tempverkaufschancen[i].aufart === ''){
              tempverkaufschancen[i].aufart = '';
          }
          
      }
      var leeresArray = [];
      if (tempverkaufschancen.length < 10){
          console.log("tempverkaufschancen",tempverkaufschancen.length);
           for (let i = 0;tempverkaufschancen.length < 10; i++){
              tempverkaufschancen.push(leeresArray);
           } 
      }
      
      this.verkaufschancensource.data = tempverkaufschancen;
      } else {
        console.log("keine daten");
      }
      
  }, err => {
        console.error(err);
      });
}

public showdetail(val){
    //console.log("showdetail cockpit", val);
   
    sessionStorage.setItem('lastmodule', 'VECO');
    this.router.navigate(["/timelinelistview/timelinedetail-show",{"kunde":val.kunde,"objekt":val.objekt,"aufnr":val.aufnr,"sujetnr":val.sujetnr,"datum":val.datum,"returnlink":"./cockpitview/cockpit"}]);
   }
// public showverkaufschancen(){
  
// }

}
