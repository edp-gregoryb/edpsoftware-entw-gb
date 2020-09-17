import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestVlcreatobektService {

  loginparameter: any

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  greateObjekt(vorlage, objekt, objektbez, digitalflag, isbn, issn) {

    console.log("greateObjekt -> context (vorlage, objekt, objektbezeichnung, digitalflag): ",vorlage, objekt, objektbez, digitalflag);

    let body = '{"request":{"filter":"restvlcreateobjekt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06vorlage%05' + vorlage +
        '%06objekt%05' + objekt + '%06objektbez%05' + objektbez + '%06digital%05' + digitalflag + '%06isbn%05' + isbn + '%06issn%05' + issn + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlcreateobjekt));


  }
}
