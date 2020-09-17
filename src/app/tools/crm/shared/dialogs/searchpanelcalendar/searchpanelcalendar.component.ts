import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {CalendarModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { TerminverschiebenService } from '../../services/terminverschieben.service';
import { TerminService } from '../../termin.service';
import { DatumzeitauswahlComponent } from '../../components/datumzeitauswahl/datumzeitauswahl.component';

@Component({
  selector: 'app-searchpanelcalendar',
  templateUrl: './searchpanelcalendar.component.html',
  styleUrls: ['./searchpanelcalendar.component.css']
})
export class SearchpanelcalendarComponent implements OnInit {
  nativeWindow:any;
  newtime: Date;
  newdate:Date;
  param1:any;
  constructor(public dialogRef: MatDialogRef<any>,private terminverschieb:TerminverschiebenService,private terminService: TerminService) {
    //this.nativeWindow = this.winref.getNativeWindow();
   }

  ngOnInit() {

    this.newtime = this.checkaktuellDate(this.param1.termdatum,this.param1.termzeit);
  }
  checkaktuellDate(dateaktuell,timeaktuell){
    let aktuell,datetemp, timetemp;
    
    datetemp = dateaktuell.split('.');
    timetemp = timeaktuell.split(':');
    //console.log("timeaktuell", timetemp);
    aktuell = new Date(datetemp[2]+','+datetemp[1]+','+datetemp[0]+','+timetemp[0]+':'+timetemp[1]+':'+'00');//+','+timetemp[0]+','+timetemp[1]+','+'0'+','+'0'
   // console.log("start, aktuell", start, aktuell);
    return aktuell;
  }

  onclick(event,param){
     var verschrueck:any = null;
      if (event.dateValuenew){
    var zeittodb = event.timeValuenew;
    let tempdate = event.dateValuenew;
    let tempdatearray = tempdate.split('-');
    var datetodb = tempdatearray[2]+''+tempdatearray[1]+''+tempdatearray[0];
    } else {
        console.log("dateValuenew leer");
      datetodb = "";
    }
     //console.log("datetodb", datetodb, zeittodb);
      this.terminverschieb.terminVersch(param,datetodb,zeittodb)
    .subscribe(verschieb => { verschrueck = verschieb }, err => {
        console.error(err);
      });
      
    // }
  }
  

}
