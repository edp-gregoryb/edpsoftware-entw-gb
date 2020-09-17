import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FisfiledownkundeService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) { 
      this.loginparameter = this.loginparameterService.getparameter();
  }
  
     public getfiskundendateien(beznr,dateiname){
    let body = '{"request":{"filter":"fisFileDownloadKunde%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06beznr%05' + beznr +
     '%06dateiname%05' + dateiname +'%06firma%05' + this.loginparameter.loginfirma + '%06"}}'

    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06beznr%05' + beznr +
     '%06dateiname%05' + dateiname +'%06firma%05' + this.loginparameter.loginfirma + '%06';
     
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"fisFileDownloadKunde%04'+jsonbase64+'"}}';

   const headers = new HttpHeaders().set( "content-type", "application/json" ); 

    return this.http.post(this.loginparameter.loginurl,body,{headers})
                      .pipe(map(this.extractData));
  }
  private extractData(res:Response){
     
     
     let resultbase64 = res['REST'][0].messageResponse;
    //  let result = window.atob(resultbase64);
    
      var message_expression = /\\u000a/g;
      let result1 = resultbase64.replace(message_expression, '');
      let jsonparse = JSON.parse(result1)
    //   let result = window.atob(jsonparse.FileDownload[0]);
    //  let resultJson2 = JSON.parse(result1);
    //  let result2 = resultJson2;

     
    //  var collection = result2.dateien.slice();
    //  var colkey = [["dataname", "dataurl"]];
    //  var keys = colkey.shift();
    //  collection = collection.map((e)=> {
    //   var obj = {};

    //             keys.forEach(function (key, i) {
    //                 obj[key] = e[i];
    //             });
    //              return obj;
    //  })
    //let datajson = (result2);
    //  console.log("service",result);
     return jsonparse;

   }

}
