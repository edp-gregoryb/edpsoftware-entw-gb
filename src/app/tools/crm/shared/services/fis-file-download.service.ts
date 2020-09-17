import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FisFileDownloadService {
loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
      public getfisdateien(aufnr:string,objekt:string,erscheinung:string,typ:string,dateiname){
    let body = '{"request":{"filter":"fisFileDownload%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' +erscheinung +'%06dateiname%05' + dateiname + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}'

    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' +erscheinung +'%06dateiname%05' + dateiname + '%06firma%05' + this.loginparameter.loginfirma + '%06';
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"fisFileDownload%04'+jsonbase64+'"}}';

   

    const headers = new HttpHeaders().set( "content-type", "application/json" ); 

    return this.http.post(this.loginparameter.loginurl,body,{headers})
                      .pipe(map(this.extractData));
                     
  }
  private extractData(res:Response){
     
     if (res['REST'][0].messageResponse === "{}" || res['REST'][0].messageResponse.indexOf('F',0) === 0 ){
      
        console.log("res ist leer");
        let emptyvalue = [{}];
         return emptyvalue;
        
   } else {
     let result = res['REST'][0].messageResponse;
     var message_expression = /\\u000a/g;
     let result1 = result.replace(message_expression, '');
     let resultJson2 = JSON.parse(result1);

     return resultJson2;
   } 

  
}
}
