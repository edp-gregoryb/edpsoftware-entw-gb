import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TerminService } from '../../../../shared/termin.service';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cockpitnexttermin',
  templateUrl: './cockpitnexttermin.component.html',
  styleUrls: ['./cockpitnexttermin.component.css']
})
export class CockpitnextterminComponent implements OnInit {
 
  // pageSizeOptions:any;
  
  @Input() searchtermine:any;
   //searchparameter:any;
   kunde:any;
   vertreter:any;
   vermittler:any;
   aufnr:any;
   objekt:any;
   rubrik:any;
   vondatum:any;
   bisdatum:any;
   aufart:any;
   
   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns = ['vetreter', 'termdatum', 'termzeit', 'NAME', 'termrapptext', 'termaktivic'];
  nextterminesource = new MatTableDataSource();


  
  
  constructor(private terminService:TerminService, private router: Router) { }

  ngAfterViewInit() {
    this.nextterminesource.paginator = this.paginator;
    
  }
  
  
  ngOnChanges(changes:SimpleChanges){
   
   
   if (changes) {
       console.log("changes",changes.searchtermine.currentValue);
    //changes.currentValue = {kunde: this.kunde, vertreter:this.vertreter, vermittler: this.vermittler, aufnr: this.aufnr, objekt: this.objekt, rubrik:this.rubrik, vondatum: this.vondatum, bisdatum: this.bisdatum, aufart: this.aufart, sicht:this.sicht};
    this.getTermine(changes.searchtermine.currentValue);
   }
   
  }
  
  ngOnInit() {
    //   this.searchtermine = {kunde: this.kunde, vertreter:this.vertreter, vermittler: this.vermittler, aufnr: this.aufnr, objekt: this.objekt, rubrik:this.rubrik, vondatum: this.vondatum, bisdatum: this.bisdatum, aufart: this.aufart, sicht:this.sicht};
    //this.getTermine(this.searchparameter);
  }
  
  public getTermine(sparam){
   
       var temptermine:any;
    // this.terminService.showall()
    this.terminService.getWithParams (sparam)
    .subscribe(termine => {
      temptermine = termine;
      console.log("temptermine",temptermine);
      
      for (let i=0;i <= temptermine.length -1; i++){
          if (temptermine[i].termaktivic === 'EM'){
              temptermine[i].termaktivic = 'mail';
          }
          if (temptermine[i].termaktivic === 'BE'){
              temptermine[i].termaktivic = 'group';
          }
          if (temptermine[i].termaktivic === 'AU'){
              temptermine[i].termaktivic = 'insert_invitation';
          }
          if (temptermine[i].termaktivic === 'TE'){
              temptermine[i].termaktivic = 'phone';
          }
          if (temptermine[i].termaktivic === 'BR'){
              temptermine[i].termaktivic = 'format_align_left';
          }
          if (temptermine[i].termaktivic === 'EV'){
              temptermine[i].termaktivic = 'event';
          }
          if (temptermine[i].termaktivic === 'MA'){
              temptermine[i].termaktivic = 'filter_none';
          }
          if (temptermine[i].termaktivic === 'PR'){
              temptermine[i].termaktivic = 'local_parking';
          }
      }
      var leeresArray = [];
      if (temptermine.length < 10){
          console.log("temptermine",temptermine.length);
           for (let i = 0;temptermine.length < 10; i++){
              temptermine.push(leeresArray);
           } 
      }
      console.log("temptermine",temptermine.length);
      this.nextterminesource.data = temptermine;
    }, err => {
        console.error(err);
      });
  }
  
   showtermine() {
     this.router.navigate(['./terminlistview/terminlist-show']);
  }
  
  
  
  
  public neuertermin(){
      this.router.navigate(['./kundensucheview/kundensuche-show']);
      // this.router.navigate(['./kundensucheview/kundensuche-show',{"neu":true, "returnlink":"./cockpitview/cockpit"}]);
  }
  
  public gotoTermindetail(val){
      console.log("gotoTermindetail", val);
      
      //this.rapnrvonlink, this.kundevonlink, this.rubrikvonlink,this.urubrikvonlink,this.aschlusselvonlink
      this.router.navigate(['./termindetailview/termindetail-show',{"rapnr":val.rapnr,"kunde":val.beznr,"returnlink":"./cockpitview/cockpit"}]);
  }
  
  public gotoAgenda(){
      this.router.navigate(['./agendaview/agendaitems-show']);
  }

}
