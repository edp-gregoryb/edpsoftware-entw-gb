import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';
import {Anhang} from '../entities/Anhang';

@Injectable({
  providedIn: 'root'
})
export class RestVldelteprodanhangService {

  loginparameter: any;

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  deleteAnhang(anhang: Anhang) {
    let body = '{"request":{"filter":"restvldeleteprodanhang%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06objekt%05' + anhang.objekt + '%06aschlussel%05' + anhang.aschlussel + '%06objektartikel%05' + anhang.objektartikel +
        '%06stat%05' + anhang.stat + '%06dateiname%05' + anhang.dateiname +
        '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlprodanhang));


  }
}
