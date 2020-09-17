import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { Vermittler } from './../../../shared/entities/vermittler';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { map } from "rxjs/operators";

@Injectable()
export class AdrvermittlerService {
 loginparameter: any;
 public kunden: Array<Vermittler> = [];
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  // showvermittler(suche): Observable<Vermittler[]>{
  showvermittler(suche){
   console.log("showvermittler");
    let body = '{"request":{"filter":"restitadrvermittler%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma + '"}}'

    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitadrvermittler%04'+jsonbase64+'"}}';

    // let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    // let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
     .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_adresse));
  }
  
  // showvermittlerCRM(suche, sicht:string): Observable<Vermittler[]>{
  showvermittlerCRM(suche, sicht:string){
   console.log("showvermittlerCRM");
    let body = '{"request":{"filter":"restitadrvermittler%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06sicht%05' + sicht + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma + '"}}'

   
    // let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    // let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
       .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_adresse));
  }
  // private extractData() {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_adresse;
  //   console.log("service", result2);
  //   return result2;

  // }

}
