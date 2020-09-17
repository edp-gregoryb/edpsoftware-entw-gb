import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FarosdateienService {
loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  showfarosdateien(aufnr,objekt,erscheinung,typ) {

    let body = '{"request":{"filter":"farosGetDateien%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' + erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}'

    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' + erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06';
        
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"farosGetDateien%04'+jsonbase64+'"}}';

            const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
                    .pipe(map(this.extractData));

  }


  private extractData(res: Response) {
   
     if (res['REST'].length === 0) {console.log("farosdateien leer")} else {
       if (res['REST'][0].messageResponse === "{}" || res['REST'][0].messageResponse.indexOf('F',0) === 0 ){
      
        console.log("res ist leer");
        let emptyvalue = [{}];
         return emptyvalue;
        
   } else {
    let result = res['REST'][0].messageResponse;
    
     var message_expression = /\\u000a/g;
    result = result.replace(message_expression, '');
    
    var tempres = JSON.parse(result);
    console.log("tempres farosdateien",tempres);
    if (!tempres){
        console.log("tempres leer "+ JSON.stringify(tempres) );
            }
            else{
            
            //console.log("tempres " + JSON.stringify(tempres));
            var collection = tempres.dateien.slice();
            var colkey = [["dataname", "dataurl"]];
            var keys = colkey.shift();

            collection = collection.map(function (e) {
                var obj = {};

                keys.forEach(function (key, i) {
                    obj[key] = e[i];
                });

                return obj;
            });
            }
    
   
    return collection;

  }/**/
}
}
}
           