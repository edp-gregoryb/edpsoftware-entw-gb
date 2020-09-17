import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RestAboobjektService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getAboObjekte(_artnr: string, _suche: string): Observable<any> {
    let body = '{"request":{"filter":"restgetobjekt%04' + 
                'termid%05' + this.loginparameter.logintermid + 
                '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06artnr%05' + _artnr + 
                '%06suche%05' + _suche + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_itobjabo));
  }
}
