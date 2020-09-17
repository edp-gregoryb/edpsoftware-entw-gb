import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class MerkmaleService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
       this.loginparameter = this.loginparameterService.getparameter();
   }

   showMerkmale(beznr){
    
    let body = '{"request":{"filter":"restitmerkmale%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06beznr%05'+beznr+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
    
    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06beznr%05'+beznr+'%06firma%05'+this.loginparameter.loginfirma;    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitmerkmale%04'+jsonbase64+'"}}';
  
  const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map(this.extractData));
   
  }
  private extractData(res: Response) {
     
    //  let resultJson = JSON.parse(res);
     let result = res['REST'][0].messageResponse;
     var message_expression = /\\u000a/g;
    result = result.replace(message_expression, '');
    
    var tempres = JSON.parse(result);
    return tempres.dsMerkmale;
    
  }/**/

}
