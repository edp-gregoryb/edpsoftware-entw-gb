import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestVlupdtobjtxtService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  putVlObjtxt(vlobjjson) {

    //vlobjjson['sprachen'][0].termid = this.loginparameter.logintermid;
    let tt_vlobjtext = { 'tt_vlobjtext': vlobjjson.sprachen};

    let stringjson = JSON.stringify(tt_vlobjtext);

    console.log("stringjson", stringjson);
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));

    let body = '{"request":{"filter":"restvlupdtobjtxt%04Termid%05' + this.loginparameter.logintermid + '%06inhalt%05' + stringjsonBase64 + '"}}';


    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res)));
  }
}
