import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { CrmEmailidService } from '../../../../shared/services/restcrmemailid.service';
import { TeleupdateService } from '../../services/teleupdate.service';
import { AdrkundenService } from '../../../../shared/services/adrkunden.service';
import {RestgetadrhauptService} from '../../services/restgetadrhaupt.service';
import {RestdeleteadrhauptService} from '../../services/restdeleteadrhaupt.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RestupdateadrhauptService} from '../../services/restupdateadrhaupt.service';


@Component({
    selector: 'app-kundenfacts',
    templateUrl: './kundenfacts.component.html',
    styleUrls: ['./kundenfacts.component.css'],
    providers: [ CrmEmailidService ]
  })
  export class KundenfactsComponent implements OnInit {

    telgek:any;
    telgedik:any;
    telprivk:any;
    telnatelk:any;
    email:any;
  bsperrtext: any;
    btelgek:any;
    btelgedik:any;
    btelprivk:any;
    btelnatelk:any;
    bemail:any;
    ladendoku:boolean = false;
    ungleichebeznr:boolean = false;
    @Input() kundendetails:any;
    @Output() refreshChipsanzeige = new EventEmitter();
    tempAgent: any;
    firma:number;
    licensedModules: any;
    
    showloc:boolean = false;
    canEdit:boolean = false;
    mailinnendienst:string;
    kundenbeznr: string;
    kontaktpersnr: string;

    constructor(private router: Router, private cookieService: CookieService,
                private crmEmailidService:CrmEmailidService,
                private teleupdateService: TeleupdateService, //updated telefonnummern im backoffice
                private adrkundenService: AdrkundenService, //um kunden aus dem backoffice anzufordern
                private getadrhauptService: RestgetadrhauptService,
                public dialog: MatDialog
                ) {
      var tempfilelocalstorage = this.cookieService.get('currentUser');
      if (tempfilelocalstorage){
        let currentUserstring = atob(tempfilelocalstorage);
        let userjson = JSON.parse(currentUserstring);
        console.log(userjson);
        
        this.firma = userjson[0].firma;
        console.log("userjson",this.firma);
        
        this.licensedModules = userjson[0].module;
      }
    }
    
    ngOnInit(){
    }
    
    ngOnChanges(){
      //kunde vom backend anfordern (mit beznr)
      if(this.kundendetails){
        this.kundenbeznr = this.kundendetails.bbeznr;
        this.kontaktpersnr = this.kundendetails.beznr;
        this.adrkundenService.getKunde(this.kundendetails.beznr, 'no', 'yes')
          .subscribe((kunden) => {
            console.log(kunden[0]);
            //kundedaten vom frontend updaten
            if(kunden.length >= 1){
              this.kundendetails.telge = kunden[0].telge;
              this.kundendetails.telgedi = kunden[0].telgedi;
              this.kundendetails.telpriv = kunden[0].telpriv;
              this.kundendetails.natel = kunden[0].natel;
              this.kundendetails.email = kunden[0].email;
              this.kundendetails.bbeznr = kunden[0].bbeznr;
              this.kundendetails.fname = kunden[0].fname;
              this.kundendetails.vname = kunden[0].vname;
              this.kundendetails.zusatz1 = kunden[0].zusatz1;
              this.kundendetails.zusatz2 = kunden[0].zusatz2;
              this.kundendetails.strasse = kunden[0].strasse;
              this.kundendetails.ort = kunden[0].ort;
              this.kundendetails.land = kunden[0].land;
            }
            //die angezeigten links updaten
            this.updateLinks();
          },
          (err) => {
            console.warn(err);
            //die angezeigten links updaten
            this.updateLinks();
          }
        );
      }
    }//ende ngOnChanges()

  changeKontaktperson(kotapersNr) {
    console.log('kotapersNr', kotapersNr)
    this.adrkundenService.getKunde(kotapersNr.value, 'no', 'yes')
        .subscribe((kunden) => {
              console.log(kunden[0]);

              //kundedaten vom frontend updaten
              if(kunden.length >= 1){
                this.kundendetails.telge = kunden[0].telge;
                this.kundendetails.telgedi = kunden[0].telgedi;
                this.kundendetails.telpriv = kunden[0].telpriv;
                this.kundendetails.natel = kunden[0].natel;
                this.kundendetails.email = kunden[0].email;
                this.kundendetails.bbeznr = kunden[0].bbeznr;
                this.kundendetails.beznr = kunden[0].beznr;
                this.kundendetails.fname = kunden[0].fname;
                this.kundendetails.vname = kunden[0].vname;
                this.kundendetails.zusatz1 = kunden[0].zusatz1;
                this.kundendetails.zusatz2 = kunden[0].zusatz2;
                this.kundendetails.strasse = kunden[0].strasse;
                this.kundendetails.ort = kunden[0].ort;
                this.kundendetails.land = kunden[0].land;

                this.refreshChipsanzeige.emit({ 'bbeznr' :this.kundendetails.bbeznr, 'beznr' : this.kundendetails.beznr, 'change' : new Date().getMilliseconds() });
              }
              //die angezeigten links updaten
              this.updateLinks();
            },
            (err) => {
              console.warn(err);
              //die angezeigten links updaten
              this.updateLinks();
            }
        );
  }
    
    //updated telefon und email-links
    updateLinks(){
      console.log("this.kundendetails",this.kundendetails);
      if (this.kundendetails){
        //updated links
        this.btelgek = '<a href="tel:'+this.kundendetails.btelge+'">'+this.kundendetails.btelge+'</a>';
        this.btelgedik = '<a href="tel:'+this.kundendetails.btelgedi+'">'+this.kundendetails.btelgedi+'</a>';
        this.btelprivk = '<a href="tel:'+this.kundendetails.btelpriv+'">'+this.kundendetails.btelpriv+'</a>';
        this.btelnatelk = '<a href="tel:'+this.kundendetails.bnatel+'">'+this.kundendetails.bnatel+'</a>';
        this.bemail = '<a href="mailto:'+this.kundendetails.bemail+'">'+this.kundendetails.bemail+'</a>';

        this.telgek = '<a href="tel:'+this.kundendetails.telge+'">'+this.kundendetails.telge+'</a>';
        this.telgedik = '<a href="tel:'+this.kundendetails.telgedi+'">'+this.kundendetails.telgedi+'</a>';
        this.telprivk = '<a href="tel:'+this.kundendetails.telpriv+'">'+this.kundendetails.telpriv+'</a>';
        this.telnatelk = '<a href="tel:'+this.kundendetails.natel+'">'+this.kundendetails.natel+'</a>';
        this.email = '<a href="mailto:'+this.kundendetails.email+'">'+this.kundendetails.email+'</a>';
        
        //bestimmt ob kontaktperson besteht oder ob es nur den kunden gibt
        if (this.kundendetails.beznr != this.kundendetails.bbeznr){
          this.ungleichebeznr = true;
        } else {
          this.ungleichebeznr = false;
        }
      }
    }//ende updateLinks()
    
    //schalted map ein und aus
    showLocation(){
      this.showloc = !this.showloc;
    }//ende showLocation()
    
    //speichert einen temporaeren Vertreter um diesen zu bearbeiten
    editAgent(openAgentEdit:number){
      if(openAgentEdit === 1){
        this.tempAgent = JSON.parse(JSON.stringify(this.kundendetails));
      }
      this.canEdit = !this.canEdit;
    }//ende editAgent()
    
    //speichert telefonnummern
    saveAgent(){
      //aufs backend speichern
      this.teleupdateService.updateTelnummer(this.tempAgent.natel, this.tempAgent.telge, this.tempAgent.telgedi, this.tempAgent.telpriv, this.tempAgent.email, this.kundendetails.beznr)
        .subscribe(ret => {
          console.log("Success: " + JSON.stringify(ret));
          
          //bearbeiten beenden
          this.canEdit = false;
          
          //anzeige updaten
          this.ngOnChanges();
        }, err => {
          console.log("Error: " + JSON.stringify(err));
          //bearbeiten beenden
          this.canEdit = false;
        }
      );
    }//ende saveAgent()
    
    //checkt mithilfe der modul-abkuerzung ob ein bestimmtes modul lizensiert ist oder nicht
    moduleBerechtigt(_shorthand: string): boolean{
      //fuer alle lizensierten Module...
      for(let module of this.licensedModules){
        //input-modul ist lizensiert
        if(_shorthand === module.shorthand){
          return true;
        }
      }
      //input-modul ist nicht lizensiert
      return false;
    } //ende moduleBerechtigt
    
    @ViewChild('innendiensttxt', { static: false }) innendiensttxt: ElementRef;
    public getMailid(event){
      this.innendiensttxt.nativeElement.focus();
      
      event.stopPropagation();
      this.crmEmailidService.getmailid()
        .subscribe(id => {
          this.mailinnendienst = id[0].emailid
          console.log("getmailid",id);
        });
    }

    public neuertermin(){
      let tempdaten = JSON.stringify([this.kundendetails]);
       sessionStorage.setItem('KundenSuche',JSON.stringify({value:tempdaten, kundennummer:this.kundendetails.bbeznr,sicht:'M' }));
        this.router.navigate(['./kundenview/kunden-show',{"neu":true,"kundevonsuche":tempdaten, "returnlink":"./kundensucheview/kundensuche-show"}]);
    }
    public neuerofferte(){
        
     if (this.kundendetails)  {
      
      this.router.navigate(['./offertview/offerte-show',{firma : this.firma, beznr : this.kundendetails.bbeznr, objekt : "",
        rubrik : "", urubrik : "", termKontaktBeznr: this.kundendetails.beznr, termmitbeznr: 0 }]);
     } 
     
    }
  // , termKontaktBeznr: '17474', termkontaktpers: 'Herr Arthur Wismer'
  //http://localhost:4200/#/edp/offertview/offerte-show;fehlercode=00;fehlertext=;firma=2;rapnr=31604;beznr=2;erledigt=Nein;NAME=EDP-Services%20AG%20;
      // strasse=W%C3%B6lflistrasse%201;zusatz1=Software%20Service%20Center;zusatz2=;ort=3006%20Bern;telge=0413491717;telgedi=;natel=%2B41792946965;
  // email=jgerber@edp.ch;termKontaktBeznr=17474;termkontaktpers=Herr%20Arthur%20Wismer;kontakttelge=;kontakttelgedi=;kontaktnatel=;
  // kontaktemail=;rapKontaktBeznr=0;rapkontaktpers=;rapkontakttelge=0413491717;rapkontakttelgedi=;rapkontaktnatel=%2B41792946965;
  // rapkontaktemail=jgerber@edp.ch;aktivid=;aktividcd=;rapdatum=09%2F17%2F2018;rapzeit=%20%20%20%20%20;rapptext=;termaktivid=Anwerbung;
  // termaktividcd=ANWERB;termdatum=09%2F30%2F2018;termzeit=%20%20%20%20%20;termrapptext=Neue%20Aktion;agenturbeznr=0;agenturanrede=;
  // agenturname=;agenturvorname=;agenturstrasse=;agenturzusatz1=;agenturzusatz2=;agenturort=;agenturtelge=;agenturtelgedi=;agenturnatel=;
  // agenturtelpriv=;agenturemail=;agenturfnamefirma=;agenturzusatz1firma=;agenturzusatz2firma=;objekt=SoWo;objektbezeichnung=Sonderwochenzeitung;
  // aktioncode=;aktionbezeichnung=;grundcode=;grundbezeichnung=;mitbeznr=0;mitarbeitername=;termmitbeznr=2488;
  // termmitarbeitername=Kurt%20Portmann;memotext=;ROWID=0x0000000000b3640c;rapdatetimetz=2019-12-16T16:53:15.901%2B01:00;
  // rapdatetime=2019-12-16T16:53:15.901;rubrik=;urubrik=;aschlussel=;ausgbez=;dauer=0;termort=;bsperr=;bsperrtext=;gebvertrname=Kurt%20Portmann;quali=
    public gotoTerminliste(){
      if (this.kundendetails)  {
      
        this.router.navigate(['./terminlistview/terminlist-show', {"kunde": this.kundendetails.bbeznr}]);
       } 
    }

    public gotoWerbeauftragsliste(){
      if (this.kundendetails)  {
      
        this.router.navigate(['./timelinelistview/timelinelist-show',{"kunde": this.kundendetails.bbeznr}]);
       } 
    }

    public gotoUmsatz(){
      if (this.kundendetails)  {
      
        this.router.navigate(['./umsatzdetailview/umsatzdetail-show',{"kunde": this.kundendetails.bbeznr}]);
       } 
    }

    goToAbos() {
      if(this.kundendetails && this.kundendetails.bbeznr){
        sessionStorage.setItem('aboAdressnr', this.kundendetails.bbeznr);
        sessionStorage.setItem('aboShowAllgemein', 'true');
        sessionStorage.removeItem('aboVorgangsnr');
        sessionStorage.removeItem('aboPosnr');
    
        this.router.navigate(['./abodetailview/abodetail-show']);
      }
    }

    sendEmailtoinnendienst(val){

    }

  editHauptkunde(val) {
    if (val) {
      this.getadrhauptService.getHauptadresse(val)
          .subscribe(adr => {

            console.log("hauptadresse", adr);
            let tempjson = JSON.stringify(adr);
            this.router.navigate(['./kundensucheview/neuerkunde-show',{"kunde": tempjson}]);
          });
    }
  }

  deleteKunde(bbeznr) {
    console.log("deleteOfferte",bbeznr);

    const dialogRef = this.dialog.open(DeleteAdresseDialog, {
      width: '250px',
      data: {'bbeznr': bbeznr}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  NewkontaktpersonChanged(val) {
    console.log('NewkontaktpersonChanged', val);
    if (val.value === 0) {
      console.log('NewkontaktpersonChanged', val);
      // this.ungleichebeznr = false;
      this.changeKontaktperson({'value' : this.kundendetails.bbeznr});
    } else {
      this.kundendetails.bbeznr = val.value;
      this.changeKontaktperson(val);
    }
  }
}


@Component({
  selector: 'delete-adress-dialog',
  templateUrl: 'DeleteAdressDialog.html',
})
export class DeleteAdresseDialog {

  constructor(
      public dialogRef: MatDialogRef<DeleteAdresseDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private deleteadrhauptService: RestdeleteadrhauptService,
      private updateadrhauptService: RestupdateadrhauptService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteKunde(val) {
    console.log('delete adresse grad nach aufruf', val);
    if (val) {
      console.log('delete adresse', val.bbeznr);
      this.updateadrhauptService.postHauptadresse(val.bbeznr, 'L:U')
          .subscribe(adr => {
            console.log("deleteAdresse", adr);
    });
      // this.deleteadrhauptService.deleteAdresse(val)
      //     .subscribe(adr => {
      //       console.log("deleteAdresse", adr);
      //     });
      this.dialogRef.close();
    }
  }

}
