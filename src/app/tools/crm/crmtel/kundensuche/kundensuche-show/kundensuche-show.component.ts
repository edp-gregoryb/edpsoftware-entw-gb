import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { appModules } from '../../../../shared/const/appModules';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {RestsygetdefaultService} from '../../../crmplus/shared/services/restsygetdefault.service';
import { WindowsizeService} from '../../../../shared/services/windowsize.service';
import { Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-kundensuche-show',
    templateUrl: './kundensuche-show.component.html',
    styleUrls: ['./kundensuche-show.component.css']
  })
  export class KundensucheShowComponent implements OnInit {

    currentAppModule: string    = "ADCO";
    modulename:string;
    lastAppModule: string       = "";
    currentUser: string = "";
    licensedModules: any = [];
    sidenavmodules:any = [];
    sidenavExpanded:boolean = false;
    customers:any;
    newTerm:any;
    newTermnotmod:any;
    selectedInfoTab: number;
    showProgressBar: boolean  = false; //ob ladebalken angezeigt werden muss
    refreshmerk: any;
    innerheight:number;
    private resizeSubscription:Subscription;
    kontbez: any;
    
    constructor(private route:ActivatedRoute, private cookieService: CookieService,
                private restsygetdefaultService: RestsygetdefaultService,
                private windowsizeService:WindowsizeService,
                private _snackBar: MatSnackBar) {

        var tempfilelocalstorage = this.cookieService.get('currentUser');
      if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)
  
      // this.licensedModules  = userjson[0].berecht;
      // this.currentUser      = userjson[0].LoginVorname; 
      let licensedModulestemp  = userjson[0].module;
      this.currentUser      = userjson[0].LoginVorname; 
      
      for (let row of  licensedModulestemp){
       
          this.licensedModules.push(row);
          if (row.shorthand == this.currentAppModule){
            this.modulename = row.name;
          }
      }
      //sidenav
      for (let row of  licensedModulestemp){
        if (row.show){
          this.sidenavmodules.push(row);
        }
      }
      // for (var i = 0; i < this.licensedModules.length; i++) {
      //   if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
      //     this.licensedModules.splice(i,1);         
      //     i--;
      //   }
      // }
      
      console.log("lizenzierte und frei gegebene Module für eingeloggten Benutzer", this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
      //["PRWF","PRAU","WECR","WIKU","WIVM","WIAU","WIVE","WIAP","WMEM","WIOB","WIOS","WEAU","WIOF"
      }
        this.restsygetdefaultService.getdefault('crm-defaultpanel', 'ADCO').subscribe(data => {
            console.log('crm-defaultpanel', data);
            if (data[0].wert === '!') {
                this.selectedInfoTab = 1;
            } else if (data[0].wert === '*') {
              this.selectedInfoTab = 2;
            } else if (data[0].wert === 'Auftrage') {
              this.selectedInfoTab = 3;
            } else if (data[0].wert === 'Offerte') {
              this.selectedInfoTab = 4;
            } else if (data[0].wert === 'Mails') {
              this.selectedInfoTab = 5;
            }

        });
    }

    ngOnInit() {
      
      this.innerheight = self.innerHeight - 60 - 4;

      let tempkundenliste = sessionStorage.getItem('kundenliste');
      let tempkundendetail = sessionStorage.getItem('kundendetailinfo');

      if (tempkundenliste){
        this.customers = JSON.parse(tempkundenliste);
      }

      if (tempkundendetail){
        console.log("tempkundendetail",tempkundendetail);
        let kundendettemp = JSON.parse(tempkundendetail);
        // let tempbbeznr = kundendettemp.bbeznr;
        // kundendettemp.beznr = tempbbeznr;
        this.newTerm = kundendettemp;//JSON.parse(tempkundendetail);
        this.kundendetailinfo(kundendettemp);
      }


    }
    
    //updated die hoehe des contents (angepasst an die neue bildschirmhoehe)
    windowResize(event){
      this.innerheight = self.innerHeight - 60 - 4;
    }
    
    //updated ob der ladebalken angezeigt werden muss

    currentlyLoading(event) {
      this.showProgressBar = event;
    }

    public kundenliste(val){
      console.log("kundenliste",val);
      this.customers = val;
      let templiste = JSON.stringify(val);
      sessionStorage.setItem('kundenliste', templiste);
      if (val.length === 0) {
        console.log("kein Suchresultat!!")
        this._snackBar.open('Keine Daten vorhanden', '', {
          duration: 2000, horizontalPosition: 'left', verticalPosition: 'top'
        })
      }
    }

    public kundendetailinfo(val){
      console.log("kundendetailinfo",val);
      let valtemp = val;
      this.newTermnotmod = valtemp;//beznr mnicht modifiziert
      //this.newTerm = val; Änderung damit das Infomodule mit der bbeznr funktioniert. 05.sept.2018 dli
      
      let tempdetail = JSON.stringify(valtemp);
      sessionStorage.setItem('kundendetailinfo', tempdetail);
      sessionStorage.setItem('kundendetailinfoforNewTerm', tempdetail);
      
     
      let tempval = sessionStorage.getItem('kundendetailinfoforNewTerm');
      if (tempval){
        let tempvaljson = JSON.parse(tempval);
         let tempbbeznr = tempvaljson.bbeznr;
         tempvaljson.beznr = tempbbeznr;
         this.newTerm = tempvaljson;
      }
      
     
    }

    public sichtchange(val){}


  refreshChips(val) {
    console.log('refreshChips', val);
    if (val.change) {
      console.log('refreshChips yes', val);
      // this.refreshmerk = {'bbeznr': val.bbeznr};
      this.refreshmerk = {'beznr': val.bbeznr, 'vertbez': val.beznr, 'change': val.change};
    }
  }
}
