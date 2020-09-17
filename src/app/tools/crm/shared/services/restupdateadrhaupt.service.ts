import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestupdateadrhauptService {
  loginparameter: any;
  tt_adrn: any = {};
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  postHauptadresse(adressJson, mutation) {
    //console.log('adressJson', adressJson);
    // adressJson.termid = adressJson.termid;
    adressJson.mutationscode = mutation;
    this.tt_adrn = {'tt_adrn': [adressJson] };
    let stringjson = JSON.stringify(this.tt_adrn);
    console.log('stringjson', stringjson);
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));

    let body = '{"request":{"filter":"restupdateadrhaupt%04Termid%05' + this.loginparameter.logintermid +
        '%06sprache%05' + this.loginparameter.loginsprache+ '%06adrn%05' + stringjsonBase64 + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res)));
  }


}
