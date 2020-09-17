import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

import { CommentAnhang } from '../entities/CommentAnhang';
import {RestVlbilddownloadService} from './rest-vlbilddownload.service';

@Injectable({
  providedIn: 'root'
})
export class RestKommentarAnhangService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt einen anhang an einen kommentar hinzu
  addKommentarAnhang(anhang: CommentAnhang) {
    let body = '{"request":{"filter":"restwfaddkommanhang%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06stat%05' + anhang.stat + 
                '%06dateiname%05' + anhang.dateiname + '%06kommentarid%05' + anhang.kommentarid + '%06datei%05' + anhang.datei + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende addKommentarAnhang()
  
  //gibt eine liste aller anhaenge eines kommentares zurueck
  getKommentarAnhangList(status: string, kommentarid: number) {
    let body = '{"request":{"filter":"restwfgetkommanhanglist%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06stat%05' + status + 
                '%06kommentarid%05' + kommentarid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende getKommentarAnhangList()
  
  //gibt den anhang eines kommentars zurueck
  getKommentarAnhang(status: string, dateiname: string, speicherplatz: string, kommentarid: number) {
    //dateipfad alle \ durch /  ersetzen
    let str = '';
    for(let i = 0; i < speicherplatz.length; i++){
      if(speicherplatz[i] === '\\'){
        str += '/';
      } else {
        str += speicherplatz[i];
      }
    }
    let body = '{"request":{"filter":"restwfgetkommanhang%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06stat%05' + status + 
                '%06dateiname%05' + dateiname + '%06speicherplatz%05' + str + '%06kommentarid%05' + kommentarid + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  } //ende getKommentarAnhang()
  
  //sendet http-request und liefert deren response
  sendRequest(body: string) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfkommanhang));
  } //ende sendRequest()
}
