import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Todo } from  '../entities/Todo';

@Injectable({
  providedIn: 'root'
})
export class RestAufgabeService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt aufgabe hinzu
  addAufgabe(todo: Todo) {
    todo.aufgabeid = 0; // = neuer todo
    return this.updateAufgabe(todo);
  }
  
  //updated aufgabe
  updateAufgabe(todo: Todo) {
    let body = '{"request":{"filter":"restwfaddaufgabe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06bez%05' + todo.bez + 
                '%06beschreibung%05' + todo.beschreibung + '%06stat%05' + todo.stat + '%06reihenfolge%05' + todo.reihenfolge + '%06aufgabengruppeid%05' + todo.aufgabengruppeid + 
                '%06aufgabeid%05' + todo.aufgabeid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht aufgabe
  deleteAufgabe(aufgabeid) {
    let body = '{"request":{"filter":"restwfdeleteaufgabe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06aufgabeid%05' + aufgabeid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle aufgaben einer aufgabengruppe
  getAllAufgabe(aufgabengruppeid) {
    return this.getAufgabe(aufgabengruppeid, 0);
  }
  
  //liefert eine aufgabe
  getAufgabe(aufgabengruppeid, aufgabeid) {
    let body = '{"request":{"filter":"restwfgetaufgabe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06aufgabengruppeid%05' + aufgabengruppeid + 
                '%06aufgabeid%05' + aufgabeid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http.post und liefert response
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfaufgabe));
  }
}
