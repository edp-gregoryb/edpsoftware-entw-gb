import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {Anhang} from '../entities/Anhang';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestVlbilddownloadService {

  loginparameter: any

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAnhang(anhang: Anhang) {

    let body = '{"request":{"filter":"restvlbilddownload%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06objekt%05' + anhang.objekt + '%06bildname%05' + anhang.bildname +
        '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    console.log(body)
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_vlbilddownload));


  }
}
