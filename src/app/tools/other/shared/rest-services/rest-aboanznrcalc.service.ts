import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestAboanznrcalcService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  calcTerminbis(_artnr: string, _terminvon: string, _anznr: number): Observable<any> {
    let body = '{"request":{"filter":"restAboanzNrCalc%04' +
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06artnr%05' + _artnr +  
                '%06terminvon%05' + _terminvon +  
                '%06anznr%05' + _anznr +  
                '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res).tt_AboanzNrCalc));
  }
}
