import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestdeleteadrhauptService {
  loginparameter: any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  deleteAdresse(beznr) {

    let body = '{"request":{"filter":"restdeleteadrhaupt%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06beznr%05' + beznr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res).tt_adrn));
  }
}
