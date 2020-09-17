import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';
import {Anhang} from '../entities/Anhang';

@Injectable({
  providedIn: 'root'
})
export class RestVlbilduploadService {
  loginparameter: any

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  postAnhang(anhang: Anhang) {//(objekt, bildname, bildtyp, loeschen, dateiname, bemerkung, datei) {
    let body = '{"request":{"filter":"restvlbildupload%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06objekt%05' + anhang.objekt + '%06bildname%05' + anhang.bildname + '%06bildtyp%05' + anhang.bildtyp +
        '%06delete%05' + anhang.loeschen + '%06dateiname%05' + anhang.dateiname + '%06bemerkung%05' + anhang.bemerkung + '%06datei%05' +
        anhang.datei + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlbildupload));


  }
}
