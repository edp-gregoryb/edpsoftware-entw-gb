import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VorerfassungService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  setVorerfassung(aufnr) {
    let body = '{"request":{"filter":"restinssetvorerfassung%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06firma%05' + this.loginparameter.loginfirma + '%06aufnr%05' + aufnr + '%06"}}';
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    console.log(body, {headers});
    
    return this.http.post(this.loginparameter.loginurl, body, {headers});
  }
}
