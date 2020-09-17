import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class AuftragdetailService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
   }

  public showauftragdetail (kunde:string,obj:string,vondatum:string,bisdatum:string,aufnr:string,sujetnr:string){
   let body = '{"request":{"filter":"restitauftragdet%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.loginparameter.loginsicht+'%06start%051%06anzahl%0550%06firma%05'+
   this.loginparameter.loginfirma+'%06kunde%05'+kunde+'%06aufnr%05'+aufnr+'%06sujetnr%05'+
   sujetnr+'%06vondatum%05'+vondatum+'%06bisdatum%05'+bisdatum+'%06objekt%05'+obj+'"}}';

   let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+this.loginparameter.loginsicht+'%06start%051%06anzahl%0550%06firma%05'+
   this.loginparameter.loginfirma+'%06kunde%05'+kunde+'%06aufnr%05'+aufnr+'%06sujetnr%05'+
   sujetnr+'%06vondatum%05'+vondatum+'%06bisdatum%05'+bisdatum+'%06objekt%05'+obj;
   
   let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitauftragdet%04'+jsonbase64+'"}}';


    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itauftragdet));
  }
//   private extractData(res:Response){
//      let resultJson = res.json();
//      let result = resultJson.REST[0].messageResponse;
//      let resultJson2 = JSON.parse(result);
//      let result2 = resultJson2.tt_itauftragdet;
//      console.log("service",result2);
//      return result2;

//   }

}
