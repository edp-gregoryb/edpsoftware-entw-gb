import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class PreispositionenService {

    loginparameter: any;
    constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
        this.loginparameter = this.loginparameterService.getparameter();
    }
  
    public showPreispositionen(aufdetnr: string) {
    
        let body = '{"request":{"filter":"restitgetpreispositionen%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufdetnr%05' + aufdetnr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
        //let headers = new Headers({ 'content-type': 'application/json' });
        //let options = new RequestOptions({ headers: headers, method: 'POST' });
        const headers = new HttpHeaders().set( "content-type", "application/json" );
        return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itgetpreispositionen));
    }
    
    // private extractData(res: Response) {
    //     let resultJson = res.json();
    //     let result = resultJson.REST[0].messageResponse;
    //     let resultJson2 = JSON.parse(result);
    //     let result2 = resultJson2.tt_itgetpreispositionen;
    //     console.log("preispositionenservice: ", result2);
    //     return result2;
        
    //     // Result-Struktur
        
    //     /*
    //       FIELD fehlercode AS CHAR
    //       FIELD fehlertext AS CHAR
    //       FIELD typ AS CHAR
    //       FIELD bezeichnung AS CHAR
    //       FIELD poskey AS CHAR
    //       FIELD preisUser AS CHAR
    //       FIELD preisAmasys AS CHAR.
    //     */
    // }

}
