import { Component, OnInit,Output,EventEmitter,  Input,ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SearchtermineComponent } from '../../components/searchtermine/searchtermine.component';
import { KundeterminsucheComponent } from '../../dialogs/kundeterminsuche/kundeterminsuche.component';


@Component({
  selector: 'app-kundenanzeige',
  templateUrl: './kundenanzeige.component.html',
  styleUrls: ['./kundenanzeige.component.css']
})
export class KundenanzeigeComponent implements OnInit {
  @Input() kundendata: any;
  kundenwechsel:any;
  beznrkunde: number;
  vnamekunde:string;
  zusatz1kunde:string;
  zusatz2kunde:string;
  zusatz3kunde:string;
  fnamekunde: string;
  strassekunde: string;
  ortkunde: string;
  dialogRef: MatDialogRef<any>;
  @Output() kundevalueChanged:any = new EventEmitter();
  constructor(public dialog: MatDialog,
        public viewContainerRef: ViewContainerRef) { 
          
        }

  ngOnInit() {
     
    
     if(this.kundendata){
        console.log("this.kundendata",this.kundendata);
      this.beznrkunde = this.kundendata[0].beznr;
    this.fnamekunde = this.kundendata[0].NAME;
    this.strassekunde = this.kundendata[0].strasse;
    this.ortkunde = this.kundendata[0].ort;
    this.vnamekunde = this.kundendata[0].vname;
    this.zusatz1kunde = this.kundendata[0].zusatz1;
    this.zusatz2kunde = this.kundendata[0].zusatz2;
    this.zusatz3kunde = this.kundendata[0].zusatz3;
  }
  }
  
  openkundensuche(){
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    // console.log("terminsuche");
   
    let dialogRef = this.dialog.open(KundeterminsucheComponent, {
        height: '600px',
        width: '1200px',
    });
    var dataresult = dialogRef.componentInstance.onRowclick.subscribe((data) => {
      this.kundenwechsel = data;
      if (this.kundenwechsel){
     console.log("this.kundenwechsel",this.kundenwechsel);
     var  kundenwechsellokalstring = JSON.stringify(this.kundenwechsel); 
     var  kundenwechsellokal = JSON.parse(kundenwechsellokalstring); 
    this.beznrkunde = kundenwechsellokal.beznr;
    this.fnamekunde = kundenwechsellokal.Name;
    this.strassekunde = kundenwechsellokal.strasse;
    this.ortkunde = kundenwechsellokal.ort;
    this.vnamekunde = kundenwechsellokal.vname;
    this.zusatz1kunde = kundenwechsellokal.zusatz1;
    this.zusatz2kunde = kundenwechsellokal.zusatz2;
    this.zusatz3kunde = kundenwechsellokal.zusatz3;
    
    this.kundevalueChanged.next(this.beznrkunde);
    }
      // console.log("result von kundensuche",data);
    })
    //dialogRef.componentInstance.param1 = kundenbez;
    dialogRef.afterClosed().subscribe(result => {
      
      this.dialogRef = null;
    
    });
  }

}
