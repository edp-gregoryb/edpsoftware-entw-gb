import {Component, OnInit, ViewContainerRef, OnChanges, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import { ObjektauswahlService } from '../../../../shared/services/objektauswahl.service';
import { CommonService } from '../../comm/common.service';
import { Observable, Subscription} from 'rxjs';
import { map } from "rxjs/operators";
import { timer } from 'rxjs/observable/timer';
import { LoginService } from '../../../../../shared/login.service';
import { AschluesselauswahlService } from '../../../../shared/services/aschluesselauswahl.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProgramminformationComponent } from '../../../../shared/dialogs/programminformation/programminformation.component';
import { SearchtermineComponent } from '../../components/searchtermine/searchtermine.component';
import { SearchobjausgabeComponent }from '../../components/searchobjausgabe/searchobjausgabe.component';
import { ObjausgabesucheComponent } from '../../dialogs/objausgabesuche/objausgabesuche.component';
import { KundeterminsucheComponent } from '../../dialogs/kundeterminsuche/kundeterminsuche.component';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-headeranzeige',
  templateUrl: './headeranzeige.component.html',
  styleUrls: ['./headeranzeige.component.css']
})
export class HeaderanzeigeComponent implements OnInit, AfterViewInit {
 
  public fullpathimg: string;
    private subscription: Subscription;
    private subscription2: Subscription;
    dialogRef: MatDialogRef<any>;
    public supportedLangs: any[];
    currentUser:string;
    Aschluesselresult:any;
    results: any;
    Objektresult: any;
    showheadersuche:boolean = true;
    showiconforproject:boolean = false;
    showiconforkunden:boolean = false;
    sidenavExpanded: boolean;
    currentDate: Date;
    dateSubscription: Subscription;
    ausgabequerysave:any;
    queryresultat:any;
    kundenquerysave:any;
    kundenqueryresult:any;
    instanz:string;
    mandant:string;
    vonfilter: any;
    @Output() searchvalues = new EventEmitter();
    @Output() onSidenavToggle = new EventEmitter<boolean>();
    @Input() modulename:string;
    @Input() currentAppModule: string;


    @Input() breadcrumbs?: string[]; //optional

    constructor(
        private adrkundeservice: AdrkundenService, private commObserver: CommonService,
        private objektauswahlService: ObjektauswahlService,
        private router:Router,private activatedRoute:ActivatedRoute, private aschluesselauswahlService:AschluesselauswahlService,
        private titleService: Title, private loginService:LoginService,
        public dialog: MatDialog,private cookieService: CookieService,
        public viewContainerRef: ViewContainerRef) {
        this.vonfilter = sessionStorage.getItem('AusgabeSuche');
        this.getStartPicture();
        if (this.router.url === '/agendaview/agendaitems-show'){
            this.showiconforproject = false;
            this.showiconforkunden = false;
            //this.showheadersuche = false;
            // console.log("this.showheadersuche true",this.showheadersuche);
        } else if (this.router.url === '/projektview/projekte-show'){
            //this.showheadersuche = true;
            this.showiconforproject = true;
            this.showiconforkunden = false;
            // console.log("this.showheadersuche false",this.showheadersuche);
        } else if (this.router.url === '/adresselect/adresselect-show') {
            this.showiconforproject = false;
            this.showiconforkunden = false;
            // console.log("this.showheadersuche false",this.showheadersuche);
        } else {
            this.showiconforproject = false;
            this.showiconforkunden = true;
        }
        
         this.ausgabequerysave = sessionStorage.getItem('AusgabeSuche');
         this.kundenquerysave = sessionStorage.getItem('KundenSuche');
         
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
        
      //   var urlparams = this.activatedRoute.params.subscribe(params => {
      //   console.log("params", params);
      //   // let newbez = params.beznr;
      //   // let newrap = params.rapnr;
      // });
    }

    getStartPicture() {
        //this.fullpathimg = "../img/edp-logo_.png";
        // this.fullpathimg = "../img/koemedia-logo.jpg";
    }


    expanderToggle() {
      if (this.sidenavExpanded == false) this.sidenavExpanded = true;
      else this.sidenavExpanded = false;
      console.log("header, sidenav toggler: " + this.sidenavExpanded);
    }

    ngAfterViewInit(): void {
        setTimeout( () => {
            console.log('vonfilter', this.vonfilter);
            if (this.router.url === '/projektview/projekte-show' && !this.vonfilter) {
                this.openterminsuche();
            }
        }, 500 );
    }

    ngOnInit() {
      this.sidenavExpanded = false;


    //   this.currentTime$ = Observable.timer(0,1000).map(()=> new Date());
    //   console.log(this.currentTime$);
       this.dateSubscription = timer(1000,1000)
      .pipe(map(() => new Date()))
      .subscribe(value => {
        // console.log("currentDate",value);
        this.currentDate = value;
      });
      
        this.supportedLangs = [
            {
                display: 'Deutsch', value: 'de'
            }, {
                display: 'Französisch', value: 'fr'
            },
        ];

    this.subscription = this.commObserver.notify1Observable$.subscribe((res1) => {
      if (res1.hasOwnProperty('option') && res1.option === 'selectedvalue') {
        // console.log("test service S", (res1.value), res1.value1, res1.value3, res1.value2);
        console.log("res1",res1);
        if (res1.value){
          if (res1.value.beznr){
          var beznr = res1.value.beznr;
          } else {
            var beznr = res1.value;
          }
        }
        if (res1.value3){
          var sicht = res1.value3;
        }
        if (res1.value1){
          if (res1.value1.objekt){
          var obj = res1.value1.objekt;
          } else {
            var obj = res1.value1;
          }
        }
        if (res1.value2){
          if (res1.value2.aschlussel){
          var aschluessel = res1.value2.aschlussel;
          } else {
            var aschluessel = res1.value2;
          }
        }
        // if (res1.value4){
        //   console.log("res1.value4",res1.value4);
        //   if (res1.value4){
        //   var keintermin = res1.value4;
        //   } else {
        //     var keintermin = res1.value4;
        //   }
        // }
        this.searchvalues.next({beznr:beznr,sicht:sicht,obj:obj,aschluessel:aschluessel});
      }
    });

         if (this.ausgabequerysave){
            // console.log("ausgabequerysave",this.ausgabequerysave);
            this.queryresultat = JSON.parse(this.ausgabequerysave); 
         }
         if (this.kundenquerysave){
            // console.log("ausgabequerysave",this.ausgabequerysave);
            this.kundenqueryresult = JSON.parse(this.kundenquerysave); 
         }
         
         
      //             var urlparams = this.activatedRoute.params.subscribe(params => {
      //   console.log("params", params);
      //   // let newbez = params.beznr;
      //   // let newrap = params.rapnr;
      // });
         
     }
    ngOnDestroy() {
         this.subscription.unsubscribe();
        // this.subscription2.unsubscribe();
         this.dateSubscription.unsubscribe();
    }
    
    public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
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
  //Projektsuche sowie Kundensuche
  openterminsuche(){
        console.log("openterminsuche");
    this.ausgabequerysave = sessionStorage.getItem('AusgabeSuche');
    if (this.ausgabequerysave){
            // console.log("ausgabequerysave",this.ausgabequerysave);
            this.queryresultat = JSON.parse(this.ausgabequerysave); 
         }
        let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    // console.log("terminsuche");
    let dialogRef = this.dialog.open(ObjausgabesucheComponent, {
         height: '600px',
        width: '1200px',
    });
    dialogRef.componentInstance = this.queryresultat;
   
    dialogRef.afterClosed()
    .subscribe(selectedValue => {
        // console.log("ObjausgabesucheComponent", selectedValue);
         dialogRef = null;
    });
    // dialogRef = null;
  }
  openobjausgabesuche(){
    this.kundenquerysave = sessionStorage.getItem('KundenSuche');
    if (this.kundenquerysave){
      this.kundenqueryresult = JSON.parse(this.kundenquerysave);
    }
          let config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    // console.log("terminsuche");
    let dialogRef = this.dialog.open(KundeterminsucheComponent, {
         height: '700px',
        width: '1200px',
    });
    dialogRef.componentInstance = this.kundenqueryresult;
    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    
    });
  }
  logout(event){
      this.loginService.logout();
      this.router.navigate(['/login']);
  }
  

}
