import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../services/loginparameter.service';
import { Kunden } from '../entities/kunden';
import { map } from "rxjs/operators";

@Injectable()
export class AdrkundenService {
loginparameter:any;
public kunden: Array<Kunden> = [];
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  public getKunde(suche: string, privat: string, alle:string): Observable<Kunden[]> {

    let body = '{"request":{"filter":"restitadrkunde%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06privat%05' + privat + '%06alle%05' + alle +'%06sicht%05' + this.loginparameter.loginsicht + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma + '"}}'


    //let headers = new Headers({ 'content-type': 'application/json' });
     const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });
    
    /*this.http.post(this.loginparameter.loginurl, body, {headers})
      .subscribe(ret => {
        console.log(ret);
      });*/
    
    return this.http.post(this.loginparameter.loginurl,body,{headers})
                      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_adresse));
                      
  }
  
    public getKundeCRM(suche: string, privat: string, alle:string, sicht:string): Observable<Kunden[]> {

    let body = '{"request":{"filter":"restitadrkunde%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06privat%05' + privat + '%06alle%05' + alle +'%06sicht%05' + sicht + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma + '"}}'


    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl,body, {headers})
                      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_adresse));
  }

  // private extractData(res:Response){
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_adresse;
  //   //console.log("service",result2);
  //   return result2;

  // }

}
