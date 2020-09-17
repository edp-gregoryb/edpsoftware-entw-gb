import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestPalettierService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getPalettierIDs() {
    let body = '{"request":{"filter":"restgetaspalettier%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05'+ this.loginparameter.loginsprache + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_aspalettier));
  }
}
