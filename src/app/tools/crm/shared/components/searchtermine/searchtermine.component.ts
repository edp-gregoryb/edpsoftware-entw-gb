import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import {FormControl} from '@angular/forms';

import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { Observable,timer} from 'rxjs';
import { map } from "rxjs/operators";
import { CommonService } from '../../comm/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { MaterialTableComponent } from '../../../../shared/components/material-table/material-table.component';
import { MaterialTableComponent } from '../../../../shared/components/material-table/material-table.component';

@Component({
  selector: 'app-searchtermine',
  templateUrl: './searchtermine.component.html',
  styleUrls: ['./searchtermine.component.css']
})
export class SearchtermineComponent implements OnInit {
kundenCtrl: FormControl;
  filteredKunden: any;
  results:any;
  msgs:any;
  kundesuchtext:any;
  rowselectkunde:any;
  showaddkunde:boolean = false;
 kundenchangedata:any = {};
 kundenrap:any;
 kundenbez:any;
 kundeninfo:any;
//private numberOfRowsSelectable: number[];
 
 @Output() sucheagendaitems:any = new EventEmitter();
// @Output() neuerTerminkeineAnzeige = new EventEmitter();


kundenCols:any =  [{
        'property': 'vname',
        'name': 'Vorname',
        'sortIcon':false
    },

    {
        'property': 'fname',
        'name': 'Name',
        'sortIcon':false
    },

    {
        'property': 'bfname',
        'name': 'F-Name',
        'sortIcon':false
    },
    {
        'property': 'bzusatz1',
        'name': 'Zusatz1',
        'sortIcon':false
    },

    {
        'property': 'bzusatz2',
        'name': 'Zusatz2',
        'sortIcon':false
    },

    {
        'property': 'bstrasse',
        'name': 'Strasse',
        'sortIcon':false
    },

    {
        'property': 'bort',
        'name': 'Ort',
        'sortIcon':false
    },

    {
        'property': 'bbeznr',
        'name': 'Nr',
        'sortIcon':false
    }];


  constructor(private adrkundenService:AdrkundenService, private commObserver: CommonService,private router: Router,
  public dialogRef: MatDialogRef<SearchtermineComponent>) { }

 getkundemitsuche(suche){
//   console.log("suche",suche);
   if (suche.length > 1){
       timer(300)
          .pipe(map(() => this.msgs = []))
          .subscribe(() => {
            console.log("abfrage verzögert" );
          }); 
    this.adrkundenService.getKunde(suche, 'yes', 'yes')
                    .subscribe(kunden => {
                        let tempjson = JSON.stringify(kunden);
                        this.results = tempjson;
                        // console.log("this.results", this.results);
                    }, err => {
                        console.error(err);
                    });
      
   }
 }
  ngOnInit() {
    //this.numberOfRowsSelectable = [3, 5, 10];
    var queryresult:any = this.dialogRef.componentInstance;
  // console.log("queryresult",queryresult);
   if (queryresult){
       console.log("queryresult",queryresult);
        //this.results = JSON.stringify(queryresult.value);
        let tempjson = (queryresult.value);
        this.results = tempjson;
      //console.log("this.results", this.results);
   }
   
    if (this.router.url === '/agendaview/agendaitems-show'){
        this.showaddkunde = false;
        console.log("this.showaddkunde",this.showaddkunde);
      }else if ('/kundenview/kunden-show'){
        console.log("this.showaddkunde",this.showaddkunde);
        this.showaddkunde = true;
      }
  
  }

  onRowSelect(val){
    console.log("rowselected",val[0]);
    this.commObserver.notifyOther9(2);
    this.rowselectkunde = val[0];
     if (this.router.url === '/agendaview/agendaitems-show'){
         console.log("Kundenauswahl von agenda");
         this.kundenchangedata = {beznr:val[0].bbeznr,Name:val[0].bfname,vname:val[0].bvname,zusatz1:val[0].bzusatz1,zusatz2:val[0].bzusatz2,zusatz3:val[0].bzusatz3,strasse:val[0].bstrasse,ort:val[0].bort,land:val[0].bland }; 
         this.sucheagendaitems.next(this.kundenchangedata);
         this.kundenrap = "";
         this.kundenbez = val[0].bbeznr;
     }
     else{
     console.log("KundenSuche");
     sessionStorage.setItem('KundenSuche', JSON.stringify({value:this.results, kundennummer:val[0].bbeznr,sicht:'M' }));         
     this.commObserver.notifyOther1({ option: 'selectedvalue', value: val[0].bbeznr, value3:'M' });//Verbindung zu headeranzeige Component
     
     
     }
          
  }
  addNeuerKunde(){
    //   this.commObserver.notifyOther9(1);
      console.log("this.rowselectkunde",this.rowselectkunde);
    //   this.commObserver.notifyOther9(1);
       this.commObserver.notifyOther14({ option: 'neuerTermin1', value: true, kunde: this.rowselectkunde });
  }
  
  anzeigeDetails(){
      console.log("anzeigeDetails");
       this.commObserver.notifyOther9(1);
      

  }
  

}
  