import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class KundenkarteService {
loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  showkundenkarte(kunde, name, datumvonbis, abschlussdatumvonbis,formularid) {
  
    let body = '{"request":{"filter":"restitKundenkarte%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06Beznr%05' + kunde + '%06Name%05' + name + '%06DatumVonBis%05' + datumvonbis + '%06AbschlDatumVonBis%05' + abschlussdatumvonbis + '%06formularid%05' + formularid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
    // .pipe(map((res:Response) => res['REST'][0].messageResponse))
    //                   .pipe(map(res => JSON.parse(res)))
    //                   .pipe(map(res => res.tt_itKundenkarte))
      .pipe(map(this.extractData));
  }


  private extractData(res: Response) {
    // console.log("res",res);
    // if (res['REST'].lenght >= 0){
    console.log("res",res);
    let result = res['REST'][0].messageResponse;
    let resultJson2 = JSON.parse(result);
    let result2 = resultJson2.tt_itKundenkarte;
    return result2;
    // } else {

    //   return 0;
    // }

  }

}