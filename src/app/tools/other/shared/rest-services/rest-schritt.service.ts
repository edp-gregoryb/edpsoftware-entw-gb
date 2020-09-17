import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Step } from  '../entities/Step';

@Injectable({
  providedIn: 'root'
})
export class RestSchrittService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt einen schritt hinzu
  addSchritt(step: Step) {
    step.schrittid = 0; // = neuer schritt
    return this.updateSchritt(step);
  }
  
  //updated einen schritt
  updateSchritt(step: Step) {
    let body = '{"request":{"filter":"restwfaddschritt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06bez%05' + step.bez + 
                '%06beschreibung%05' + step.beschreibung + '%06stat%05' + step.stat + '%06reihenfolge%05' + step.reihenfolge + '%06prozessid%05' + step.prozessid + 
                '%06schrittid%05' + step.schrittid + '%06defaultVerantwortlicher%05' + step.defaultVerantwortlicher + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht einen Schritt, dessen aufgabengruppen und deren aufgaben
  deleteSchritt(schrittid){
    let body = '{"request":{"filter":"restwfdeleteschritt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06schrittid%05' + schrittid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle schritte eines prozesses
  getAllSchritt(prozessid){
    return this.getSchritt(prozessid, 0);
  }
  
  //liefert einen schritt
  getSchritt(prozessid, schrittid) {
    let body = '{"request":{"filter":"restwfgetschritt%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06prozessid%05' + prozessid + 
                '%06schrittid%05' + schrittid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet einen http.post-request und liefert das ergebnis
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfschritt));
  }
}
