import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FarosGetDateienService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
  this.loginparameter = this.loginparameterService.getparameter();
  }

  public getfarosdateien(aufnr:string,objekt:string,erscheinung:string,typ:string){
    let body = '{"request":{"filter":"farosGetDateien%04Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' +erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}'

    let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06user-sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05' + aufnr + '%06objekt%05' + 
        objekt + '%06typ%05' + typ +'%06erschdat%05' +erscheinung + '%06firma%05' + this.loginparameter.loginfirma + '%06';
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"farosGetDateien%04'+jsonbase64+'"}}';

//   let headers = new Headers({ 'content-type': 'application/json' });

//      let options = new RequestOptions({ headers: headers, method: 'POST'});
    const headers = new HttpHeaders().set( "content-type", "application/json" );
     

    return this.http.post(this.loginparameter.loginurl,body,{headers})
                      .pipe(map(this.extractData));
                     //   .map(resp => resp.json());
  }
  private extractData(res:Response){
     let resultJson = res.json();
     if (resultJson){
     let result = resultJson['REST'][0].messageResponse;
     var message_expression = /\\u000a/g;
     let result1 = result.replace(message_expression, '');
     let resultJson2 = JSON.parse(result1);
     let result2 = resultJson2;
     

     
     var collection = result2.dateien.slice();
     var colkey = [["dataname", "dataurl"]];
     var keys = colkey.shift();
     collection = collection.map((e)=> {
       var obj = {};

                keys.forEach(function (key, i) {
                    obj[key] = e[i];
                });
                 return obj;
     })
    //let datajson = (result2);
     console.log("service",collection);
     return collection;
     } else {
         return null;
     }

   }
  
   private arrayToObjekt(){
     
   }
  

}

