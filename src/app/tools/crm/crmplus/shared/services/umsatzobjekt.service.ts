import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class UmsatzobjektService {

   loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
  this.loginparameter = this.loginparameterService.getparameter();

  }

    
  showumsatzobjekt(umsatz) {
      
      let body = '{"request":{"filter":"restitumsatzobjekt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06sicht%05' + umsatz.sicht + '%06vondatum%05' + umsatz._datumvon + '%06bisdatum%05' + umsatz._datumbis + '%06s-kunde%05' + umsatz.kunde + '%06s-vermittler%05' + umsatz.vermittler + '%06s-objekt' +
        '%05' + umsatz.objekt + '%06s-vertreter%05' + umsatz.vertreter + '%06s-key1%05' + umsatz.key1 + '%06s-key2%05' + umsatz.key2 + '%06s-key3%05' + umsatz.key3 + '%06s-key4%05' + umsatz.key4 + '%06s-key5' +
        '%05' + umsatz.key5 + '%06r-kunde%05' + umsatz.r_kunde + '%06r-vermittler%05' + umsatz.r_vermittler + '%06r-objekt%05' + umsatz.r_objekt + '%06r-vertreter%05' + umsatz.r_vertreter + '%06r-key1%05' + umsatz.r_key1 + '%06r-key2' +
        '%05' + umsatz.r_key2 + '%06r-key3%05' + umsatz.r_key3 + '%06r-key4%05' + umsatz.r_key4 + '%06r-key5%05' + umsatz.r_key5 + '%06kunde%05%06firma%05' + this.loginparameter.loginfirma + '%06start%050%06anzahl%051000"}}'

   const headers = new HttpHeaders().set( "content-type", "application/json" );


    return this.http.post(this.loginparameter.loginurl,body, {headers})
                      .pipe(map(this.extractData));  
  }
  
  private extractData(res:Response){
     let result = res['REST'][0].messageResponse;
     let resultJson2 = JSON.parse(result);
     let result2 = resultJson2.tt_itumsatzobjekt;
     console.log("umsatzdiagram",result2);
     return result2;

   }

}
