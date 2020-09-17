import { Component, OnInit, ViewContainerRef, Output,EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProgramminformationComponent } from '../../../shared/dialogs/programminformation/programminformation.component';
import { LoginService } from '../../../../shared/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';
//import { CommonService } from '../../comm/common.service';

@Component({
  selector: 'app-headersomedia',
  templateUrl: './headersomedia.component.html',
  styleUrls: ['./headersomedia.component.css']
})
export class HeadersomediaComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
   instanz:string;
    mandant:string;
    currentUser:string;
    sidenavExpanded: boolean;
    @Input() termindaten:any;
     @Output() searchvalues = new EventEmitter();
     @Output() onSidenavToggle = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog,
        public viewContainerRef: ViewContainerRef,
        private cookieService: CookieService,
        private router:Router, private loginService:LoginService) { 
           var tempfilelocalstorage = this.cookieService.get('currentUser');
          if (tempfilelocalstorage){
            let currentUserstring = atob(tempfilelocalstorage);
            let userjson = JSON.parse(currentUserstring)
            //var currentUser1 = JSON.parse(sessionStorage.getItem('currentUser'));
            this.currentUser = userjson[0].email;
            
            this.mandant = userjson[0].firma;
            console.log("userjson[0]",userjson[0]);
            }
        var tempinstanz = localStorage.getItem("instanz");
        if (tempinstanz){
          let tempinstanzJson = JSON.parse(tempinstanz);
          this.instanz = tempinstanzJson.instvalue;
        } else {
          console.log("keine Instanz ausgewählt!");
        }
        }

  ngOnInit() {
    
  }
  
  programminformationen(){
      let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
   // console.log("beznr",kundenbez);
    this.dialogRef = this.dialog.open(ProgramminformationComponent, config);
    //this.dialogRef.componentInstance.param1 = kundenbez;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
     
    });
  }
  logout(event){
      this.loginService.logout();
      this.router.navigate(['/login']);
  }
  
  backtoAgenda(){
   var reiter = sessionStorage.getItem("reiter");
    var data;
    if (this.termindaten){
      data = this.termindaten;
      console.log("backtoAgenda data",data);
    }
    // this.commonService.notifyOther9(2);
    // this.commonService.notifyOther14({ option: 'neuerTermin1', value: true, kunde: data });
    sessionStorage.setItem('switchtoagenda', (data));
    this.router.navigate([reiter]);
  }

  expanderToggle() {
    if (this.sidenavExpanded == false) this.sidenavExpanded = true;
    else this.sidenavExpanded = false;
    console.log("header, sidenav toggler: " + this.sidenavExpanded);
  }

}
