import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {LoginparameterService} from '../../../shared/services/loginparameter.service';

@Injectable({
  providedIn: 'root'
})
export class RestVlobjmusterService {

  loginparameter: any

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getMusterObjekt(objekt, suche) {
    let body = '{"request":{"filter":"restvlobjmuster%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt +
        '%06suche%05' + suche + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlobjabfrage));


  }
}
