import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class TerminService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
     this.loginparameter = this.loginparameterService.getparameter();
   
   }

public showall (){

    var body = '{"request":{"filter":"restittermine%04Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.loginparameter.loginsicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05%06history%05'+
        '%06rapnr%05%06objekt%05%06aktividcd%05%06datumvon%0501.01.2017%06datumbis%0531.12.9999'+
        '%06agentur%05%06mitarb%05' +this.loginparameter.mitarbeiter + '"}}';
    
    let jsondata = 'Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.loginparameter.loginsicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05%06history%05'+
        '%06rapnr%05%06objekt%05%06aktividcd%05%06datumvon%0501.01.2017%06datumbis%0531.12.9999'+
        '%06agentur%05%06mitarb%05' +this.loginparameter.mitarbeiter;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
   
     //let body = '{"request":{"filter":"restittermine%04'+jsonbase64+'"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }
  


  public showone (kunde,sicht,obj, aschluessel){
    //   console.log("terminservice", kunde,sicht,obj,aschluessel);
    let body = '{"request":{"filter":"restittermine%04Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+sicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05'+kunde+'%06history%05'+
        '%06rapnr%05%06objekt%05'+obj+'%06rubrik%05%06urubrik%05%%06aschlussel%05'+aschluessel+'%06aktividcd%05%06datumvon%0501.01.0001%06datumbis%0531.12.9999'+
        '%06agentur%05%06mitarb%05' +this.loginparameter.mitarbeiter + '%06"}}';


    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }

  public showObj (obj,aschluessel,sicht,kunde){
      console.log("terminservice", obj,aschluessel,kunde);

    let body = '{"request":{"filter":"restittermine%04Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+sicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05'+kunde+'%06history%05'+
        '%06rapnr%05%06objekt%05'+obj+'%06rubrik%05%06urubrik%05%06aschlussel%05'+aschluessel+'%06aktividcd%05%06datumvon%0501.01.0001%06datumbis%0531.12.9999'+
        '%06agentur%05%06mitarb%05' +this.loginparameter.mitarbeiter + '%06"}}';
  

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }

   public showAschluessel (obj, rubrik, urubrik,aschluessel){
      console.log("terminservice", obj, aschluessel);

    let body = '{"request":{"filter":"restittermine%04Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.loginparameter.loginsicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05%06history%05'+
        '%06rapnr%05%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06aschlussel%05'+aschluessel+'%06aktividcd%05%06datumvon%0501.01.0001%06datumbis%0531.12.9999'+
        '%06agentur%05%06mitarb%05' +this.loginparameter.mitarbeiter + '%06"}}';
  

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }
  
  public getWithParams (val){
    let searchparams = val;
    //let hist = "no";
    let rapnr = "";
    let rubrik = "*";
    let urubrik = "*";
    let aschluessel = "*";
    
    let kundenNr = "";
    console.log("getWithParams",val);
    //kunde: this.kunde, vertreter:tempvertreter, vermittler: tempvermittler, aufnr: tempaufnummer, objekt: tempobjekt, rubrik:temprubrik, vondatum: tempvondatum, bisdatum: tempbisdatum, aufart: tempaufart, sicht:tempsich
    let body = '{"request":{"filter":"restittermine%04Termid%05' +this.loginparameter.logintermid + '%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+searchparams.sicht+'%06firma%05' +this.loginparameter.loginfirma + '%06kunde%05'+searchparams.kunde+'%06history%05'+searchparams.history+''+
        '%06rapnr%05'+rapnr+'%06objekt%05'+searchparams.objekt+'%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06aschlussel%05'+aschluessel+'%06aktividcd%05'+searchparams.aktivitaet+'%06datumvon%05'+searchparams.vondatum+'%06datumbis%05'+searchparams.bisdatum+
        '%06agentur%05'+searchparams.vermittler+'%06aktion%05'+ searchparams.aktion+'%06mitarb%05' + searchparams.mitarbeiter + '%06"}}';


    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }

//   private extractData(res:Response){
//      let resultJson = res.json();
//      let result = resultJson.REST[0].messageResponse;
//      let resultJson2 = JSON.parse(result);
//      let result2 = resultJson2.tt_ittermine;
//      //console.log("service",result2);
//      return result2;

//   }

  
}
