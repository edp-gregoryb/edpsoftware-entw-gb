import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestAbopreisService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAboPreis(_gueltigab: string, _vorgnr: number, _posnr: number) {
    let body = '{"request":{"filter":"restgetabopreis%04' + 
                'Termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06gueltigab%05' + format(_gueltigab) + 
                '%06vorgnr%05' + _vorgnr + 
                '%06posnr%05' + _posnr + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_abopreis[0]));
  }
}

//formatiert datum von yyyy-mm-dd zo dd.mm.yyyy
function format(datum): string {
  let pattern = /(\d{4})\-(\d{2})\-(\d{2})/; // "\d" = 0-9
  if(!datum.match(pattern)) {
    return datum;
  }
  return datum.replace(pattern, '$3.$2.$1');
}

