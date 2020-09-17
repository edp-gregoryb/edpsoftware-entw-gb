import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class OfferteshowService {
   loginparameter: any;
   constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  readwriteOfferte(offertJson) {
    offertJson.termid = this.loginparameter.logintermid;
    let stringjson = JSON.stringify(offertJson);
    //console.log('stringjson',stringjson);
    
    // UTF-unsafe encoding
    // let stringjsonBase64 = window.btoa(stringjson);
    
    // UTF-safe encoding
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));
  
    //console.log('*** START: utf-8 to base64 string');
    //console.log(stringjsonBase64);
    //console.log('*** END: utf-8 to base64 string');
    
    //console.log('hallo',stringjsonBase64);
    let body = '{"request":{"filter":"restinsofferte%04'+stringjsonBase64+'"}}';

    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
 
  }
  
  
  restinsgetOfferte(aufnr: string, fremdID: string) {
    // holt JSON einer bestehenden Offerte
    
    console.log('### Start restinsgetOfferte ###');
    console.log('aufnr:' + aufnr);
    console.log('fremdID:' + fremdID);
    
    let body = '{"request":{"filter":"restinsgetofferte%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06fremdID%05' + fremdID + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restinsgetOfferte ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
    
  }
  
  
  restinsofferteSpeichern(aufnr: string, datei:string, abschliessen: string, vorlage:string, indivHTML: string = '') { 
    
    // aufnr: Auftragsnummer
    // datei HTML-Datei für Printausgabe als String
    // abschliessen: String, ob Offerte abgeschlossen werden soll (yes | no)
    // vorlage: Vorlagen-Code
    // indivHTML: HTML-Code aus Editor-DIV falls freeform Vorlage/Template
    
    // falsche Werte für abschliessen korrigieren -> im Zweifelsfall kein Abschliessen
    if (abschliessen != 'yes') abschliessen = "no";
    
    //this.loginparameter.logintermid;
    
    console.log('### Start restinsofferteSpeichern ###');
   
    console.log('aufnr:' + aufnr);
    console.log('abschliessen:' + abschliessen);
    
    // UTF-unsafe encoding
    // let stringjsonBase64 = window.btoa(datei);
    
    // UTF-safe encoding
    let stringjsonBase64 = btoa(encodeURIComponent(datei).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));
    let indivHTMLbase64 = btoa(encodeURIComponent(indivHTML).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));
  
    let body = '{"request":{"filter":"restinsofferteSpeichern%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06abschliessen%05' + abschliessen + '%06aufnr%05' + aufnr + '%06firma%05' + this.loginparameter.loginfirma + '%06datei%05' + stringjsonBase64 + '%06indivHTML%05' + indivHTMLbase64 + '%06vorlage%05' + vorlage + '"}}';
    
    // console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restinsofferteSpeichern ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }
  
  
  restinsofferteOeffnen(aufnr: string) {
    
    console.log('### Start restinsofferteOeffnen ###');
    console.log('aufnr:' + aufnr);
    
    let body = '{"request":{"filter":"restinsofferteOeffnen%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    // console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restinsofferteOeffnen ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }
  
  
  restinsofferteZeigen(aufnr: string) {
    
    console.log('### Start restinsofferteZeigen ###');
    console.log('aufnr:' + aufnr);
    
    let body = '{"request":{"filter":"restinsofferteZeigen%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    // console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restinsofferteZeigen ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }
  
  
  restinsoffertegetHTML(aufnr: string) {
    
    console.log('### Start restinsoffertegetHTML ###');
    console.log('aufnr:' + aufnr);
    
    let body = '{"request":{"filter":"restinsoffertegetHTML%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    // console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restinsoffertegetHTML ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }
  
  
  restItGetInternetZuschlag(objekt: string) {
    
    console.log('### Start restItGetInternetZuschlag ###');
    console.log('objekt:' + objekt);
    
    let body = '{"request":{"filter":"restItGetInternetZuschlag%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    // console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restItGetInternetZuschlag ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }
  
  
  restGetInstanzdata() {
    
    console.log('### Start restGetInstanzdata ###');
    
    let body = '{"request":{"filter":"restGetInstanzdata%04termid%05'+ this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '"}}';
    
     console.log('request-body:',body);
    
    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restGetInstanzdata ###');
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => res.replace(/\\u000a/g, '')))
                      .pipe(map(res => JSON.parse(res)));
  }

  restitgetkvariante(objekt) {
    let body = '{"request":{"filter":"restitgetkvariante%04termid%05'+ this.loginparameter.logintermid + '%06objekt%05' + objekt + '%06sprache%05' + this.loginparameter.loginsprache + '"}}';

    // console.log('request-body:',body);

    //let headers = new Headers({ 'content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    console.log('### CALL (POST) restGetInstanzdata ###');

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res:Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_itkvariante));;
  }
  

  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   // console.log("result from offerteshow.service.ts -> raw result", result);
    
  //   // Sonderzeichen
  //   // console.log("result from offerteshow.service.ts -> result_new");
  //   //console.log(decodeURIComponent(Array.prototype.map.call(atob(result), (c) => {
  //   //        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //   //    }).join("")));
        

    
  //   // \u000a herausfiltern
  //   var message_expression = /\\u000a/g;
  //   result = result.replace(message_expression, '');
    
  //   var tempres = JSON.parse(result);
  //   //console.log("result from offerteshow.service.ts -> tempres", tempres);
    
  //   return tempres;

  // }
  
}
