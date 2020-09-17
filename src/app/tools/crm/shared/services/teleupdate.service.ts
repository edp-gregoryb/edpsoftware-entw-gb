import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class TeleupdateService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) { 
    this.loginparameter = this.loginparameterService.getparameter();
  }

  updateTelnummer(natel, telge, telgedi, telpriv, email, beznr) {
    let body = '{"request":{"filter":"restadrntelupdate%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06telge%05' + telge +'%06telgedi%05' + telgedi + '%06telpriv%05' + telpriv +'%06natel%05' + natel + '%06email%05' + email + '%06beznr%05' + beznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    
    /*let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06telge%05' + telge +'%06telgedi%05' + telgedi +'%06telpriv%05' + telpriv +'%06natel%05' + natel + '%06beznr%05' + beznr +'%06firma%05' + this.loginparameter.loginfirma + '%06';
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
    let body = '{"request":{"filter":"restadrntelupdate%04'+jsonbase64+'"}}';*/
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    console.log(body);
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_adrntelupdate));
  }
  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_adrntelupdate;
  //   //console.log("service",result2);
  //   return result2;

  // }/**/
}
