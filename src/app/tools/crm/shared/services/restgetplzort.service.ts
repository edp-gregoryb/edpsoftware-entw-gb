import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestgetplzortService {
  loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getPlzort(plz, ort, land) {

    let body = '{"request":{"filter":"restgetplzort%04Termid%05' + this.loginparameter.logintermid +
        '%06prache%05' + this.loginparameter.loginsprache + '%06plz%05' + plz  + '%06ort%05' + ort  + '%06land%05' + land +
        '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res).tt_plzort));
  }
}
