import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map, filter } from "rxjs/operators";

import { Anhang } from '../entities/Anhang';
import {RestVlbilddownloadService} from './rest-vlbilddownload.service';

@Injectable({
  providedIn: 'root'
})
export class RestAnhangService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //laedt eine datei hoch
  addAnhang(anhang: Anhang, mitArtikel: boolean) {
    let body = '{"request":{"filter":"restvladdprodanhang%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06objekt%05' + anhang.objekt + '%06aschlussel%05' + anhang.aschlussel;
    if(mitArtikel) {
      body += '%06objektartikel%05' + anhang.objektartikel;
    }
    body += '%06stat%05' + anhang.stat + '%06dateiname%05' + anhang.dateiname + '%06datei%05' + anhang.datei + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    
    return this.sendRequest(body);
  }
  
  //liefert alle dateien eines produkts/artikels
  getAnhangList(anhang: Anhang, mitArtikel: boolean) {
    let body = '{"request":{"filter":"restvlgetprodanhanglist%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06objekt%05' + anhang.objekt + '%06aschlussel%05' + anhang.aschlussel + '%06objektartikel%05' + anhang.objektartikel +
                '%06stat%05' + anhang.stat + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert eine bestimmte datei
  getAnhang(anhang: Anhang, mitArtikel: boolean) {
    //dateipfad alle \ durch /  ersetzen
    let str = '';
    for(let i = 0; i < anhang.speicherpfad.length; i++){
      if(anhang.speicherpfad[i] === '\\'){
        str += '/';
      } else {
        str += anhang.speicherpfad[i];
      }
    }
    console.log(this.loginparameter.loginsprache);
    let body = '{"request":{"filter":"restvlgetprodanhang%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
        '%06objekt%05' + anhang.objekt + '%06aschlussel%05' + anhang.aschlussel + '%06objektartikel%05' + anhang.objektartikel +
        '%06stat%05' + anhang.stat + '%06dateiname%05' + anhang.dateiname + '%06speicherplatz%05' + str + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http-request und liefert deren response
  sendRequest(body) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlprodanhang));
  } //ende sendRequest()
}
