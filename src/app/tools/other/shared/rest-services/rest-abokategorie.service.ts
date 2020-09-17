import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RestAbokategorieService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAboKategorien(_vorgnr: number, _posnr: number): Observable<any> {
    let body = '{"request":{"filter":"restgetabomerk%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06vorgnr%05' + _vorgnr + 
                '%06posnr%05' + _posnr + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abomerk))
  }

  createEmptyAboKategorie(_vorgnr: number, _posnr: number): Observable<any> {
    let body = '{"request":{"filter":"restcreateabomerk%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06vorgnr%05' + _vorgnr + 
                '%06posnr%05' + _posnr + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abomerk[0]));
  }

  updateAboKategorie( _mutcode: string, _abomerk: any ): Observable<any> {
    _abomerk.mutationscode = _mutcode;

    let stringjson = JSON.stringify({"tt_abomerk":[_abomerk]});
    let stringjsonBase64 = btoa(stringjson);
    
    let body = '{"request":{"filter":"restupdateabomerk%04' +
                'Termid%05' + this.loginparameter.logintermid + 
                '%06Abomerk%05' + stringjsonBase64 + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => res.replace(/\\u000a/g, '')))
      .pipe(map(res => JSON.parse(res).tt_abomerk));
  }

  deleteAboKategorie( _abomerk: any ): Observable<any> {
    return this.updateAboKategorie('L', _abomerk);
  }
}
