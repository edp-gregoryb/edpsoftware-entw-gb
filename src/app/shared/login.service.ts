import { Injectable } from '@angular/core';
// import { URLSearchParams, Headers,Response,RequestOptions} from '@angular/http'
import { Observable }  from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Dexie from 'dexie';

@Injectable()
export class LoginService {
  public token: string;
  public body: string;
  instanzstring:any;
  userloggedin:boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
   
  public login(username: string, password: string, instanz:string, mandant:string, fingerprint:string) {
   
    console.log("instanz - raw: " + instanz);
    
    if (instanz.toLowerCase().indexOf('http')>-1) {  
        console.log("URL-Instanz, keine manuelles URL-Building nötig.");
        console.log("instanz - ohne URL-Building: " + instanz);
    } else {
        instanz = window.location.protocol + "//" + window.location.hostname + ':' + window.location.port + '/RESTService-' + instanz + '-LP' + '/rest/POST/Server';
        console.log("instanz - nach URL-Building: " + instanz);
    }

    let urlinstanz = {instanz: instanz, sprache: 'd',sicht: 'M'};
    console.log("urlinstanz: " + urlinstanz);
    
    let tempUrljson = JSON.stringify(urlinstanz);
    console.log("tempUrljson: " + tempUrljson);
    
    let tempUrlbase64 = btoa(tempUrljson);
    console.log("tempUrlbase64: " + tempUrlbase64);
    
    this.cookieService.set('url', tempUrlbase64,7);
    this.body =  '{"request":{"filter":"fisExtAnmeld%04Userid%05' + username + '%06Passwort%05' + password + '%06bhash%05' + fingerprint + '%06user-sprache%05d%06json%05yes%06firma%05'+mandant+'"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    this.userloggedin = true;
    return this.http.post(instanz,this.body, {headers});
    
  }

   
   loggedId(){
   return this.userloggedin;
   }
   
    logout(): void {
        this.cookieService.delete('currentUser');
        this.cookieService.delete('url');
        sessionStorage.removeItem('offertstarturl');
        
        sessionStorage.removeItem('VEAGklicktindex');
        sessionStorage.removeItem('VEAGscroll');
        sessionStorage.removeItem('VEAGinfopanel');
        sessionStorage.removeItem('ADCOklicktindex');
        sessionStorage.removeItem('ADCOscroll');
        sessionStorage.removeItem('ADCOinfopanel');
        Dexie.delete('WfHelpTable');
        location.reload();
    }
}
