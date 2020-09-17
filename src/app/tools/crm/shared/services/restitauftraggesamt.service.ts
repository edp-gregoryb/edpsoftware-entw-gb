import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestitauftraggesamtService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAuftraggesamt(kunde, aufart, aufnr, verknuepfung, urubrik, mitarb) {


    let body = '{"request":{"filter":"restitauftraggesamt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06sicht%05A%06start%051%06anzahl%0550%06firma%05' + this.loginparameter.loginfirma +
        '%06kunde%05' + kunde + '%06aufart%05' + aufart + '%06aufnr%05' + aufnr +
        '%06vermittler%05%06vertreter%05' +
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05' + verknuepfung + '%06urubrik%05' + urubrik + '%06mitarb%05' + mitarb + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );



    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map(this.extractData));
  }

  private extractData(res: Response){
    let result = res['REST'][0].messageResponse;
    let resultJson2 = JSON.parse(result);
    let result2 = resultJson2.tt_itauftraggesamt;
    console.log("restitgebabfrage", result2);
    return result2;

  }
}
