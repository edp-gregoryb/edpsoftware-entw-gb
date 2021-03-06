import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http'
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 

@Injectable()
export class RestitaufartabfrageService {

 loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
  this.loginparameter = this.loginparameterService.getparameter();

  }
 public getAufart(sicht){
  let body = '{"request":{"filter":"restitaufartabfrage%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05'+sicht+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
  const headers = new HttpHeaders().set( "content-type", "application/json" );
  
    return this.http.post(this.loginparameter.loginurl,body, {headers})
                      .pipe(map(this.extractData));  
  }
  
  private extractData(res:Response){
     let result = res['REST'][0].messageResponse;
     let resultJson2 = JSON.parse(result);
     let result2 = resultJson2.tt_itaufartabfrage;
     console.log("restitgebabfrage",result2);
     return result2;

   }

}
