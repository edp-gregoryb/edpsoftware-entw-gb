import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class RestitobjkeyabfrageService {

 loginparameter:any;
public obj: Array<any> = [];
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
     this.loginparameter = this.loginparameterService.getparameter();
   }
   
   restitgetObjbezeichung(objekt, sicht){
 
    let body = '{"request":{"filter":"restitobjkeyabfrage%04Termid%05'+this.loginparameter.logintermid+'%06prache%05'+this.loginparameter.loginsprache+'%06objekt%05'+objekt+'%06sicht%05'+sicht+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
         
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body,  {headers})
      .pipe(map(this.extractDataAusgvar));
    
  }
  
   private extractDataAusgvar(res: Response) {
    let result = res['REST'][0].messageResponse;
    let resultJson2 = JSON.parse(result);
    let result2 = resultJson2.tt_itobjabfrage;
    // console.log("ausgvar",result2);
    return result2;

  }

}
