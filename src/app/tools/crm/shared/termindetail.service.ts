import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class TermindetailService {
  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) { 
    this.loginparameter = this.loginparameterService.getparameter();
  }

  public getTermindetail(rapnr:number, kunde:number, rubrik:string,urubrik:string,aschlussel:string){
    let body = '{"request":{"filter":"restittermdetail%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06rapnr%05'+rapnr+'%06firma%05'+this.loginparameter.loginfirma+'%06kunde%05'+kunde+
                '%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06aschlussel%05'+aschlussel+'"}}';
    
    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06rapnr%05'+rapnr+'%06firma%05'+this.loginparameter.loginfirma+'%06kunde%05'+kunde+
                '%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06aschlussel%05'+aschlussel;
                
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restittermdetail%04'+jsonbase64+'"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermdetail));
  }
//   private extractData(res:Response){
//      let resultJson = res.json();
//      let result = resultJson.REST[0].messageResponse;
//      let resultJson2 = JSON.parse(result);
//      let result2 = resultJson2.tt_ittermdetail;
//      //console.log("service",result2);
//      return result2;

      
//   }

}
