import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestitgetdateienService {

    loginparameter:any
    constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
        this.loginparameter = this.loginparameterService.getparameter();
    }

    GetDatei(kunde, rapnr, typ) {
        let body = '{"request":{"filter":"restitGetDateien%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06Beznr%05' + kunde + '%06rapnr%05' + rapnr + '%06typ%05' + typ +  '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';

        const headers = new HttpHeaders().set( "content-type", "application/json" );
        return this.http.post(this.loginparameter.loginurl, body, {headers})
            .pipe(map(this.extractData));
    }

    private extractData(res: Response) {
        if (res){
            let result = res['REST'][0].messageResponse;
            let resultJson2 = JSON.parse(result);
            let result2 = resultJson2.tt_itGetDateien;
            return result2;
        } else {
            return 0;
        }
    }
}
