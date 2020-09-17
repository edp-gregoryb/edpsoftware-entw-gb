import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class GetofferteService {
loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  getOfferte(aufnr) {
    
    //console.log('hallo',stringjsonBase64);
    let body = '{"request":{"filter":"restinsgetofferte%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05'+aufnr+'%06firma%05'+this.loginparameter.loginfirma+'"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" ); 

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map(this.extractData));
  }

   private extractData(res: Response) {
    let resultJson = res.json();
    let result = resultJson['REST'][0].messageResponse;
    //console.log("result", result);
     var message_expression = /\\u000a/g;
    result = result.replace(message_expression, '');
    
    var tempres = JSON.parse(result);
    
//   console.log("service", tempres);
    return tempres;

  }

}
