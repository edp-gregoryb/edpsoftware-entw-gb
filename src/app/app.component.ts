import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, RoutesRecognized, ActivatedRoute } from '@angular/router';

import { ReloginService } from './shared/relogin.service';
import { CookieService } from 'ng2-cookies';
import { DataService } from './shared/data.service';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',

    styleUrls: ['./app.component.css']
})
export class AppComponent  {

    browserFingerprint: any;
    tempfilelocalstorage:any;
    tempfilecurrentuser:any;
    useremail:string;
    termid:string;
    instanz:string;
    mandant:string;
    message:string;
    private subscription: Subscription;
    
    constructor(private router: Router, private cookieService: CookieService,
              private reloginService:ReloginService, private data: DataService,
              private activatedRoute: ActivatedRoute) {
        router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
            console.debug('router event', e);   
        });
        
    this.tempfilelocalstorage = localStorage.getItem('instanz');
    this.tempfilecurrentuser = this.cookieService.get('currentUser');
    
    router.events.pipe(filter(e => e instanceof RoutesRecognized))
      .pipe(pairwise())
      .subscribe((e: any[]) => {
      console.log("e[0].urlAfterRedirects",e[0].urlAfterRedirects);
      let offertparam = (e[0].urlAfterRedirects);
      
      if (offertparam.includes("offertview/offerte-show") ) {
          let tempjson = JSON.stringify({"url":offertparam});
          sessionStorage.setItem('offertstarturl', tempjson);
      }
      
      if (offertparam.includes("umsatzdetailview/umsatzdetail-show") ) {
          let tempjson = JSON.stringify({"url":offertparam});
          sessionStorage.setItem('umsatzstarturl', tempjson);
      }
    });

    }
    
    ngOnInit() {
      
      if (this.tempfilelocalstorage){
        console.log("tempfilelocalstorage",this.tempfilelocalstorage);
        var instanzfile = JSON.parse(this.tempfilelocalstorage);
        this.instanz = instanzfile.instvalue;
        this.mandant = instanzfile.mandvalue;
      }
      
      //nimmt Instanz und Mandant von pasoe-web und laedt sie zu localStorage
      var pasoeInstanz;
      var pasoeMandant;
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['params']){
          pasoeInstanz = window.atob(params['params']);
          if(pasoeInstanz){
            localStorage.setItem('pasoeInstanz', pasoeInstanz);
            this.instanz = pasoeInstanz;
          }
        }
        if(params['params2']){
          pasoeMandant = window.atob(params['params2']);
          if(pasoeMandant){
            localStorage.setItem('pasoeMandant', pasoeMandant);
            this.mandant = pasoeMandant;
          }
        }
      });
  
      if (this.tempfilecurrentuser){
      let currentUserstring = atob(this.tempfilecurrentuser);
      let userjson = JSON.parse(currentUserstring)
  
    
      this.useremail = userjson[0].email;
      this.termid = userjson[0].termid;
      }
          
      this.subscription = this.data.notifyObservable$.subscribe((res) => {
          console.log("this.message",res);
          //localStorage.clear(); /* NICHT SICHER OB ES DIESES CLEAR BRAUCHT, ABER MIT CLEAR FUNKTIONIERT AUTOMATISCHES RELOGIN NICHT MEHR - Cedric*/
          if (this.useremail&&this.termid&&res&& this.mandant&&this.instanz){
              this.loginstatus(this.useremail,this.termid,res, this.mandant,this.instanz);
              } else {
                  this.router.navigate(['/login']);
              }
          
      });
    
    }
    
    //  this.loginstatus(this.useremail,this.termid,this.mandant,this.instanz);
    public loginstatus(email, termid,fingerprint, mandant, instanz){
    
    this.reloginService.relogin(email,termid,fingerprint , mandant, instanz)
    .subscribe(relog => {
      console.log("relog",relog);
        let tempjson:any = JSON.parse(relog["REST"][0].messageResponse);
        let result = tempjson.tt_login;
        if (result[0].fehlercode === '00') {
          console.log("result[0].fehlercode",result[0].fehlercode);
          return  true;
          
        
        } else {
          this.router.navigate(['/login']);
        }
        
    });
    
  }


}