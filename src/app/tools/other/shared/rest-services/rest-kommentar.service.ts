import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { Comment } from '../entities/Comment';

@Injectable({
  providedIn: 'root'
})
export class RestKommentarService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt einen kommentar hinzu
  addKommentar(comment: Comment) {
    let tempUrsprId: string;
    if(comment.ursprungsid === -1){
      tempUrsprId = '';
    } else{
      tempUrsprId = comment.ursprungsid.toString();
    }
    
    let body = '{"request":{"filter":"restwfaddkommentar%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06arbgeb%05' + comment.arbgeb + 
                '%06titel%05' + comment.titel + '%06inhalt%05' + comment.inhalt + '%06farbcode%05' + comment.farbcode + '%06stat%05' + comment.stat + '%06objekt%05' + comment.objekt + 
                '%06aschlussel%05' + comment.aschlussel + '%06objektartikel%05' + comment.objektartikel + '%06ursprungsid%05' + tempUrsprId + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende addKommentar()
  
  //updated einen bestehenden kommentar
  updateKommentar(comment: Comment) {
    let tempUrsprId: string;
    if(comment.ursprungsid === -1){
      tempUrsprId = '';
    } else{
      tempUrsprId = comment.ursprungsid.toString();
    }
    
    let body = '{"request":{"filter":"restwfaddkommentar%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06arbgeb%05' + comment.arbgeb + 
                '%06titel%05' + comment.titel + '%06inhalt%05' + comment.inhalt + '%06farbcode%05' + comment.farbcode + '%06stat%05' + comment.stat + '%06objekt%05' + comment.objekt + 
                '%06aschlussel%05' + comment.aschlussel + '%06objektartikel%05' + comment.objektartikel + '%06kommentarid%05' + comment.kommentarid + '%06ursprungsid%05' + tempUrsprId + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende updateKommentar()
  
  //loescht einen kommentar
  deleteKommentar(kommentarid: number) {
    
    let body = '{"request":{"filter":"restwfdeletekommentar%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06kommentarid%05' + kommentarid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende deleteKommentar()
  
  //gibt bestimmte kommentare zurueck
  getKommentare(objekt: string, aschlussel: string, objektartikel: string, kommentarid: number, ursprungsid: number) {
    
    let body = '{"request":{"filter":"restwfgetkommentar%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + 
                '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel;
    if(kommentarid !== -1){
      body +=   '%06kommentarid%05' + kommentarid;
    }
    if(ursprungsid !== -1){
      body +=   '%06ursprungsid%05' + ursprungsid;
    }
    body +=     '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende getKommentare()
  
  //sendet http-request und gibt deren response zurueck
  sendRequest(body: string) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfkommentar));
  } //sendRequest()
}
