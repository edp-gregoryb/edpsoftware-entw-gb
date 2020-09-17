import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Task } from  '../entities/Task';

@Injectable({
  providedIn: 'root'
})
export class RestAufgabengruppeService {
  
  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt aufgabengruppe hinzu
  addAufgabengruppe(task: Task) {
    task.aufgabengruppeid = 0; // = neuer task
    return this.updateAufgabengruppe(task);
  }
  
  //updated aufgabengruppe
  updateAufgabengruppe(task: Task) {
    let body = '{"request":{"filter":"restwfaddaufgabengruppe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06bez%05' + task.bez + 
                '%06beschreibung%05' + task.beschreibung + '%06stat%05' + task.stat + '%06reihenfolge%05' + task.reihenfolge + '%06schrittid%05' + task.schrittid + 
                '%06aufgabengruppeid%05' + task.aufgabengruppeid + '%06defaultVerantwortlicher%05' + task.defaultVerantwortlicher + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht aufgabengruppe und dessen aufgaben
  deleteAufgabengruppe(aufgabengruppeid) {
    let body = '{"request":{"filter":"restwfdeleteaufgabengruppe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06aufgabengruppeid%05' + aufgabengruppeid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle aufgabengruppen eines schrittes
  getAllAufgabengruppe(schrittid) {
    return this.getAufgabengruppe(schrittid, 0);
  }
  
  //liefert eine aufgabengruppe
  getAufgabengruppe(schrittid, aufgabengruppeid) {
    let body = '{"request":{"filter":"restwfgetaufgabengruppe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06schrittid%05' + schrittid +
                '%06aufgabengruppeid%05' + aufgabengruppeid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http.post und liefert response
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfaufgabengruppe));
  }
}
