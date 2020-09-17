import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http'
import { Observable }  from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


@Injectable()
export class ReloginService {
    
    
    constructor(private http: HttpClient,private cookieService: CookieService) {
    }

    public relogin(email:string, termid:string, fingerprint:string, mandant:string,  instanz:string) {
   
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

    var body =  '{"request":{"filter":"fisExtAnmeld%04email%05' + email + '%06termid%05' + termid +  '%06bhash%05' + fingerprint + '%06user-sprache%05d%06json%05yes%06firma%05'+mandant+'"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(instanz,body, {headers});
  }


}