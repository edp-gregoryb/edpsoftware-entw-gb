import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Workflow } from  '../entities/Workflow';

@Injectable({
  providedIn: 'root'
})
export class RestProzessService {

  loginparameter:any;
  
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  // fuegt einen prozess hinzu
  addProzess(wf: Workflow) {
    wf.prozessid = 0; // = neuer prozess
    
    return this.updateProzess(wf);
  } // ende addProzess()
  
  //updated einen prozess (oder erstellt neuen bei prozessId = 0)
  updateProzess(wf: Workflow) {
    let body = '{"request":{"filter":"restwfaddprozess%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06bez%05' + wf.bez + '%06beschreibung%05' + wf.beschreibung + '%06gruppe%05' + wf.gruppe + '%06stat%05' + wf.stat + '%06prozessid%05' + wf.prozessid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.httpPost(body);
  } //ende updateProzess()
  
  // loescht einen Prozess, dessen schritte, deren aufgabengruppen und deren aufgaben
  deleteProzess(prozessid: number) {
    let body = '{"request":{"filter":"restwfdeleteprozess%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06prozessid%05' + prozessid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.httpPost(body);
  } // ende deleteProzess()
  
  // gibt alle prozesse zurueck
  getAllProzess(){
    return this.getProzess(0);
  } // ende getAllProzess()
  
  // gibt ein prozess zurueck (oder alle bei prozessId = 0)
  getProzess(prozessid: number) {
    let body = '{"request":{"filter":"restwfgetprozess%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06prozessid%05' + prozessid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.httpPost(body);
  } // ende getProzess()
  
  //sendet und returned einen http.post
  httpPost(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfprozess));
  } //ende httpPost()
}
