import { Component, OnInit, ViewContainerRef, Output,EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProgramminformationComponent } from '../../../shared/dialogs/programminformation/programminformation.component';
import { LoginService } from '../../../../shared/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-defaultheader',
  templateUrl: './defaultheader.component.html',
  styleUrls: ['./defaultheader.component.css']
})


export class DefaultheaderComponent implements OnInit {
  
  sidenavExpanded: boolean;
  dialogRef: MatDialogRef<any>;
  instanz:string;
  mandant:string;
  currentUser:string;
  
  // @Input() termindaten:any;
  // @Output() searchvalues = new EventEmitter();
  @Input() modulename:string;
  @Input() currentAppModule: string;
  @Output() onSidenavToggle = new EventEmitter<boolean>();
  @Output() changeSicht = new EventEmitter();
  @Output() customerforsearch = new EventEmitter();
  @Output() loading = new EventEmitter<boolean>(); //ob etwas im defaultheader am laden ist (z. B. Kundensuche)
  anzeigenjanein:boolean = false;
  sichtjanein: boolean = false;

  constructor(public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    private cookieService: CookieService,
    private router:Router,
    private loginService:LoginService) { 
    

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
    
    this.sidenavExpanded = false; // default status = Sidenav geschlossen = false
    
    if (this.router.url.indexOf('/kundensucheview/kundensuche-show') > -1) {
       this.anzeigenjanein = true;
       this.sichtjanein = false;
    } else if (this.router.url.indexOf('/kundensucheview/neuerkunde-show') > -1) {
      this.anzeigenjanein = false;
      this.sichtjanein = false;
    } else {
      this.anzeigenjanein = false;
      this.sichtjanein = true;
    }


  }
  
  
  programminformationen(){
    let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(ProgramminformationComponent, config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
  
  
  logout(event){
     this.loginService.logout();
      this.router.navigate(['/login']);
  }
  
  expanderToggle() {
    if (this.sidenavExpanded == false) this.sidenavExpanded = true;
    else this.sidenavExpanded = false;
    console.log("header, sidenav toggler: " + this.sidenavExpanded);
  }
  
  //updated this.loading
  currentlyLoading(event){
    this.loading.emit(event);
  }
  
  public valuesicht(val){
    console.log("sichtvalue", val);
    this.changeSicht.next(val);
  }

  public getcustsearch(val){
    //console.log("getcustsearch", val);
    this.customerforsearch.next(val);
  }
  
  // backtoAgenda(){
  //   var reiter = sessionStorage.getItem("reiter");
  //   var data;
  //   if (this.termindaten){
  //     data = this.termindaten;
  //     console.log("backtoAgenda data",data);
  //   }
  //   sessionStorage.setItem('switchtoagenda', (data));
  //   this.router.navigate([reiter]);
  // }

}
