import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestCrystalGetPdfService {

  loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  getDispoliste(funktion: string, subfunktion: string, formular: string, paramname1: string, paramwert1: string,
                paramname2: string, paramwert2: string, paramname3: string, paramwert3: string, paramname4: string, paramwert4: string,
                paramname5: string, paramwert5: string, paramname6: string, paramwert6: string, paramname7: string, paramwert7: string,
                paramname8: string, paramwert8: string, paramname9: string, paramwert9: string, paramname10: string, paramwert10: string){

    let body = '{"request":{"filter":"restCrystalGetPdf%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06funktion%05'
        + funktion + '%06subfunktion%05' + subfunktion + '%06formular%05' + formular + '%06paramname1%05' + paramname1 + '%06paramwert1%05'
        + paramwert1 + '%06paramname2%05' + paramname2 + '%06paramwert2%05' + paramwert2 +'%06paramname3%05' + paramname3 + '%06paramwert3%05'
        + paramwert3 + '%06paramname4%05' + paramname4 + '%06paramwert4%05' + paramwert4 + '%06paramname5%05' + paramname5 + '%06paramwert5%05'
        + paramwert5 +'%06paramname6%05' + paramname6 + '%06paramwert6%05' + paramwert6 +'%06paramname7%05' + paramname7 + '%06paramwert7%05'
        + paramwert7 +'%06paramname8%05' + paramname8 + '%06paramwert8%05' + paramwert8 + '%06paramname9%05' + paramname9 + '%06paramwert9%05'
        + paramwert9 + '%06paramname10%05' + paramname10 + '%06paramwert10%05' + paramwert10 + '%06firma%05' + this.loginparameter.loginfirma + '"}}'



    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => JSON.parse(res)))
        .pipe(map(res => res.tt_CrystalGetPdf));

  }


}



// p-paramname1 = param-wert(i-text,'paramname1':U,CHR(6))
// p-paramwert1 = param-wert(i-text,'paramwert1':U,CHR(6))
