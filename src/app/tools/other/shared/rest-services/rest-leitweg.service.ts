import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestLeitwegService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getLeitweg(_artnr: string, _teilausg: string, _vart: string, _leitweg: string, _lbeznr: number, _gueltigab: any): Observable<any> {
    let body = '{"request":{"filter":"restgetleitweg%04' +
    'Termid%05' + this.loginparameter.logintermid + 
    '%06sprache%05' + this.loginparameter.loginsprache + 
    '%06artnr%05' + _artnr + 
    '%06teilausg%05' + _teilausg + 
    '%06vart%05' + _vart + 
    '%06leitweg%05' + _leitweg + 
    '%06lbeznr%05' + _lbeznr + 
    '%06gueltigab%05' + _gueltigab + 
    '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
    .pipe(map((res:Response) => res['REST'][0].messageResponse))
    .pipe(map(res => JSON.parse(res)));
  }
}
