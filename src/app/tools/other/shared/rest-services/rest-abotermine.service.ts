import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestAbotermineService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAboTermine(_vorgnr: number, _posnr: number) {
    let body = '{"request":{"filter":"restgetaboterm%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache +
                '%06vorgnr%05' + _vorgnr + 
                '%06posnr%05' + _posnr +
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_aboterm));
  }

  createEmptyAboTermin(_vorgnr: number, _posnr: number) {
    let body = '{"request":{"filter":"restcreateaboterm%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache +
                '%06vorgnr%05' + _vorgnr + 
                '%06posnr%05' + _posnr +
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_aboterm[0]));
  }

  updateAboTermin(_abotermin: any, _mutcode: string): Observable<any> {
    _abotermin.mutationscode = _mutcode;
    
    let stringjson = JSON.stringify({"tt_aboterm": [_abotermin]});
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));
    let body = '{"request":{"filter":"restupdateaboterm%04' + 
                'aboterm%05' + stringjsonBase64 + 
                '%06Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_aboterm));
  }

  deleteAboTermin(_abotermin: any): Observable<any> {
    return this.updateAboTermin(_abotermin, "L");
  }
}
