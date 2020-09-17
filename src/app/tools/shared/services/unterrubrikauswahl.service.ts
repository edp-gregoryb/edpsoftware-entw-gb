import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class UnterrubrikauswahlService {
  loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  showUrubrik(objekt: string,urubrik: string, rubrik: string) {

    let body = '{"request":{"filter":"restitunterrubrikabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + '%06urubrik%05' + urubrik +'%06rubrik%05' + rubrik + '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    //let headers = new Headers({ 'content-type': 'application/json' });
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_urubrikabfrage));
  }
  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_urubrikabfrage;
  //   console.log("service", result2);
  //   return result2;

  // }
}
