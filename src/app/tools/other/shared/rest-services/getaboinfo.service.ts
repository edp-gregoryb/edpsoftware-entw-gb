import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetaboinfoService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  public getAboInfo (_beznr: number){

    let body = '{"request":{"filter":"restgetAbo%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06objekt%05'+ '' + 
                '%06history%05'+ '' + 
                '%06beznr%05'+ _beznr + 
                '%06firma%05' + this.loginparameter.loginfirma + '" }}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abo));
  }

  public getAboDaten (abodetails) {
    let stringjson = JSON.stringify({"tt_abo":[abodetails]});
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));

    let body = '{"request":{"filter":"restgetAboDaten%04' +
                'Termid%05' + this.loginparameter.logintermid + 
                '%06abo%05' + stringjsonBase64 + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '"}}';
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abo[0]));
  }
}
