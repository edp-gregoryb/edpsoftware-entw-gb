import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class PosrekapService {
 loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
       this.loginparameter = this.loginparameterService.getparameter();
      
  }
    public showposrekap(sujetnr: string, objekt: string, aufnr: string) {
    let body = '{"request":{"filter":"restitaufposrekap%04Termid%05' + this.loginparameter.logintermid 
      + '%06sujetnr%05' + sujetnr 
      + '%06objekt%05' + objekt 
      + '%06firma%05' + this.loginparameter.loginfirma 
      + '%06aufnr%05' + aufnr 
      + '%06sprache%05' + this.loginparameter.loginsprache 
      + '"}}';
    
    let jsondata = 'Termid%05' + this.loginparameter.logintermid 
      + '%06sujetnr%05' + sujetnr 
      + '%06objekt%05' + objekt 
      + '%06firma%05' + this.loginparameter.loginfirma 
      + '%06aufnr%05' + aufnr 
      + '%06sprache%05' + this.loginparameter.loginsprache;
      
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     // let body = '{"request":{"filter":"restitaufposrekap%04'+jsonbase64+'"}}';
    
    // let headers = new Headers({ 'content-type': 'application/json' });

    // let options = new RequestOptions({ headers: headers, method: 'POST' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );


    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itaufposrekap));
  }
//   private extractData(res: Response) {
//     let resultJson = res.json();
//     let result = resultJson.REST[0].messageResponse;
//     let resultJson2 = JSON.parse(result);
//     let result2 = resultJson2.tt_itaufposrekap;
//     // console.log("SSservice",result2);
//     return result2;

//   }
}
