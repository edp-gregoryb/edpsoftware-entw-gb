import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { LoginparameterService } from '../services/loginparameter.service';
import { Vermittler } from '../entities/vermittler';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { map } from "rxjs/operators";

@Injectable()
export class CrmEmailidService {
 loginparameter: any;
 public kunden: Array<Vermittler> = [];
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getmailid(){
    let body = '{"request":{"filter":"restCRMemailid%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '06firma%05'+this.loginparameter.loginfirma + '"}}'

    //let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma;
    
    //let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);

    const headers = new HttpHeaders().set( "content-type", "application/json" );

  return this.http.post(this.loginparameter.loginurl, body, {headers})
     .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_crmemail));

  }

    getWEOAmailid(){
        let body = '{"request":{"filter":"restWEOAemailid%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '06firma%05'+this.loginparameter.loginfirma + '"}}'

        //let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma;

        //let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);

        const headers = new HttpHeaders().set( "content-type", "application/json" );

        return this.http.post(this.loginparameter.loginurl, body, {headers})
            .pipe(map((res:Response) => res['REST'][0].messageResponse))
            .pipe(map(res => JSON.parse(res)))
            .pipe(map(res => res.tt_WEOAemail));

    }
}
