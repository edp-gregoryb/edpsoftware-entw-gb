import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';

@Injectable({
  providedIn: 'root'
})
export class RestStartadrselService {

  loginparameter: any

  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  postStartAdrsel(objekt, krit1mkmart, krit1mkmerk1, krit1mkmerk2, krit1mkmerk3, okritmkmart, okritmkmerk1, okritmkmerk2, okritmkmerk3, Objekt2, beschreibung) {
    let body = '{"request":{"filter":"reststartadrsel%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
        this.loginparameter.loginsprache + '%06objekt%05' + objekt +
        '%06stat%050%06zustAdr%05yes%06mailing%05no%06vermittler%05yes%06krit1mkmart%05' + krit1mkmart + '%06krit1mkmerk1%05' + krit1mkmerk1 +
        '%06krit1mkmerk2%05' + krit1mkmerk2 + '%06krit1mkmerk3%05' + krit1mkmerk3 +
        '%06okritmkmart%05' + okritmkmart + '%06okritmkmerk1%05' + okritmkmerk1 + '%06okritmkmerk2%05' + okritmkmerk2 + '%06okritmkmerk3%05' + okritmkmerk3 +
        '%06plz%05%06stageb%05%06vertr%05' +
        '%06objekt2%05' + Objekt2 + '%06beschreibung%05' + beschreibung + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    // let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' +
    //     this.loginparameter.loginsprache + '%06objekt%05' + objekt +
    //     '%06stat%050%06zustAdr%05yes%06mailing%05no%06vermittler%05yes%06krit1mkmart%05' + krit1mkmart + '%06krit1mkmerk1%05' + krit1mkmerk1 +
    //     '%06krit1mkmerk2%05' + krit1mkmerk2 + '%06krit1mkmerk3%05' + krit1mkmerk3 +
    //     '%06okritmkmart%05' + okritmkmart + '%06okritmkmerk1%05' + okritmkmerk1 + '%06okritmkmerk2%05' + okritmkmerk2 + '%06okritmkmerk3%05' + okritmkmerk3 +
    //     '%06plz%05%06stageb%05%06vertr%05' +
    //     '%06objekt2%05' + Objekt2 + '%06beschreibung%05' + beschreibung + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    //
    //
    //     let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
        // let body = '{"request":{"filter":"reststartadrsel%04'+jsonbase64+'"}}';
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_adrsel));


  }
}
