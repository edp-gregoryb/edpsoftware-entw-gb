import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestGetadrzuService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAdrzu(suche, bbeznr, beznr) {
    let body = '{"request":{"filter":"restgetadrzu%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
        '%06suche%05' + suche + '%06bbeznr%05' + bbeznr + '%06beznr%05' + beznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res:Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_adrzu));
  }


}
