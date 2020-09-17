import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestBankenService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getBanken(_beznr: number) {
    let body = '{"request":{"filter":"restgetbank%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06beznr%05' + _beznr.toString() + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_bank));
  }
}
