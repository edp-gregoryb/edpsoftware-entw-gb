import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class WerbeformateService {
loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  public showWerbeformate(objekt: string, rubrik: string, urubrik: string) {

    let body = '{"request":{"filter":"restitgetwerbeformate%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + '%06urubrik%05' + urubrik +'%06rubrik%05' + rubrik + '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    //let headers = new Headers({ 'content-type': 'application/json' });
     const headers = new HttpHeaders().set( "content-type", "application/json" );
    //let options = new RequestOptions({ headers: headers, method: 'POST' });

    return this.http.post(this.loginparameter.loginurl, body, {headers})
     .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itgetwerbeformate));
  }
  
  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_itgetwerbeformate;
  //   console.log("Werbeformateservice", result2);
  //   return result2;

  // }

}
