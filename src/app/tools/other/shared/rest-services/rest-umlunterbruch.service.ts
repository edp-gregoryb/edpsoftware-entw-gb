import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestUmlunterbruchService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getUmlUnterbruch (_vorgnr: number, _posnr: number){

    let body = '{"request":{"filter":"restgetUmlUnterbruch%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06vorgnr%05'+ _vorgnr + 
                '%06posnr%05'+ _posnr + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_abozustU));
  }

  createEmptyUmlUnt(_vorgnr: number, _posnr: number) {
    let body = '{"request":{"filter":"restcreateUmlUnterbruch%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06vorgnr%05'+ _vorgnr + 
                '%06posnr%05'+ _posnr + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abozustU[0]));
  }

  setUmlUnterbruch (_umlunt: any) {
    let stringjson = JSON.stringify({"tt_abozustU": [_umlunt]});
    let stringjsonBase64 = btoa(stringjson);

    let body = '{"request":{"filter":"restupdateUmlUnterbruch%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06abozust%05' + stringjsonBase64 + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_abozustU));
  }

  deleteUmlUnterbruch (_rowId: string) {
    let body = '{"request":{"filter":"restdelUmlUnterbruch%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06firma%05' + this.loginparameter.loginfirma + 
                '%06r-rowid%05'+ _rowId + '" }}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_abozust));
  }
}
