import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class DelkundenmemoService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
 this.loginparameter = this.loginparameterService.getparameter();
   }
    delKundenmemo(rowid) {

    let body = '{"request":{"filter":"restitdeletekundenmemo%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06rowid%05'+rowid+
    '%06firma%05'+this.loginparameter.loginfirma+'"}}';

    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06rowid%05'+rowid+
    '%06firma%05'+this.loginparameter.loginfirma;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitdeletekundenmemo%04'+jsonbase64+'"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itkundenmemo));
  }
  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_itkundenmemo;
  //   //console.log("service",result2);
  //   return result2;

  // }
}
