import { Injectable } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Injectable()
export class LoginparameterService {
  currentUser:any;
  urlinstanz:any;
  cookies: any;
  
  
  constructor(private cookieService: CookieService) { 
    //var tempfilelocalstorage = localStorage.getItem('currentUser');
    //var tempfilelocalstorage = sessionStorage.getItem('currentUser');
    var tempfilelocalstorage  = this.cookieService.get('currentUser');
    
    // var tempfilesesisonstorage = sessionStorage.getItem('url');
    
    var instanz = this.cookieService.get('url');
    
    //let instanz = sessionStorage.getItem('url');
    if (tempfilelocalstorage){
      let currentUserstring = atob(tempfilelocalstorage);
      this.currentUser = JSON.parse(currentUserstring)
    }
    if (instanz){
      //console.log("testlogininstanz",instanz);
      //this.urlinstanz = JSON.parse(sessionStorage.getItem('url'));
      let urlstring = atob(instanz);
      this.urlinstanz = JSON.parse(urlstring)
    }
  }

  getparameter(){
    console.log(this.currentUser);
    
    let url = this.urlinstanz.instanz;
    let termid = this.currentUser[0].termid;
    let firma = this.currentUser[0].firma;
    let sprache = this.urlinstanz.sprache;
    let sicht = this.urlinstanz.sicht;
    let user = this.currentUser[0].Beznr;
    let loginparam = { loginurl: url, logintermid: termid, loginfirma: firma, loginsprache:sprache,
                loginsicht:sicht, mitarbeiter:user};
    console.log("loginparam",loginparam);
    return loginparam;
  }
  
  stringtobase64(offertJson){

    let stringjson = JSON.stringify(offertJson);
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));
  
    return stringjsonBase64;
  }

}
