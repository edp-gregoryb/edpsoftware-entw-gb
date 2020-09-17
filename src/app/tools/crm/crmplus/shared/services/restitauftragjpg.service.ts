import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class RestitauftragjpgService {

   loginparameter:any;  
    constructor(private http: HttpClient, private loginparameterService:LoginparameterService) { 
    this.loginparameter = this.loginparameterService.getparameter();
  }


    getauftragjpg(aufnr,sujetnr,objket){
 
     let body = '{"request":{"filter":"restitauftragjpg%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06firma%05'+this.loginparameter.loginfirma+'%06%06aufnr%05'+aufnr+'%06sujetnr%05'+sujetnr+'%06objket%05'+objket+'%06"}}';   
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body,  {headers})
      .pipe(map(this.extractData));
  }
  private extractData(res: Response) {
    let result = res['REST'][0].messageResponse;
    let resultJson2 = JSON.parse(result);
    let result2 = resultJson2.tt_itauftragjpg;
    console.log("service",result2);
    return result2;

  }
    
}
