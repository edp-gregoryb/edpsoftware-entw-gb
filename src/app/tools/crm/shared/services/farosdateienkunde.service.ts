import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FarosdateienkundeService {
loginparameter:any
 constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  showfarosdateienkunde(beznr, sort) {

    let body = '{"request":{"filter":"farosGetDateienKunde%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06beznr%05' + beznr + 
     '%06firma%05'+this.loginparameter.loginfirma + '%06sort%05' + sort + '%06"}}';
    
    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05' + this.loginparameter.loginsprache + '%06beznr%05' + beznr + 
     '%06firma%05'+this.loginparameter.loginfirma + '%06';
     
     let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"farosGetDateienKunde%04'+jsonbase64+'"}}';
    
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map(this.extractData));
 
  }


  private extractData(res: Response) {
   
   if (res['REST'][0].messageResponse === "{}" || res['REST'][0].messageResponse.indexOf('F',0) === 0 ){
      
        console.log("resultJson ist leer");
        let emptyvalue = [{}];
         return emptyvalue;
        
   } else {
        let result = res['REST'][0].messageResponse;
        
    var message_expression = /\\u000a/g;
    result = result.replace(message_expression, '');
   var tempres = result;
    //let indvalue = resultJson.REST[0].messageResponse.indexOf('F',0);
    console.log("tempres farosdateien",tempres);
   
            tempres = JSON.parse(result);
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
            
    
   
     return collection;
   }
   
   

  }
}
