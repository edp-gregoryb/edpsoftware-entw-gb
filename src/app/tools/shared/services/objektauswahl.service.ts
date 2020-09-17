import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../services/loginparameter.service';
import { Objekte } from '../entities/objekte';
import { map } from "rxjs/operators";

@Injectable()
export class ObjektauswahlService {
loginparameter:any;
public obj: Array<Objekte> = [];
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
     this.loginparameter = this.loginparameterService.getparameter();
   }

   showObjekt(suche, eigene){
    console.log("suche", suche);
    let body = '{"request":{"filter":"restitobjabfrage%04Termid%05'+this.loginparameter.logintermid+'%06prache%05'+this.loginparameter.loginsprache+'%06suche%05'+suche+'%06eigene%05'+eigene+'%06sicht%05'+this.loginparameter.loginsicht+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
         
    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itobjabfrage));
    
  }
  
     showObjektCRM(sicht): Observable<Objekte[]>{
 
    let body = '{"request":{"filter":"restitobjabfrage%04Termid%05'+this.loginparameter.logintermid+'%06prache%05'+this.loginparameter.loginsprache+'%06sicht%05'+sicht+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
         
    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itobjabfrage));
    
  }
  
  restitgetausgvar(objekt){
 
    let body = '{"request":{"filter":"restitgetausgvar%04Termid%05'+this.loginparameter.logintermid+'%06prache%05'+this.loginparameter.loginsprache+'%06objekt%05'+objekt+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
         
    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itausgvar));
    
  }
  
  // private extractDataObj(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_itobjabfrage;
  //   // console.log("service",result2);
  //   return result2;

  // }
  
  // private extractDataAusgvar(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_itausgvar;
  //   console.log("ausgvar",resultJson2);
  //   return result2;

  // }

}
