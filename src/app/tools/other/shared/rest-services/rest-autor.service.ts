import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestAutorService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt ein autor hinzu
  addAutor(objekt: string, aschlussel: string, objektartikel: string, autorbeznr: number) {
    let body = '{"request":{"filter":"restvladdautoren%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + 
                '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06beznr%05' + autorbeznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body, 'tt_vlautoren');
  }
  
  //loescht ein autor
  deleteAutor(objekt: string, aschlussel: string, objektartikel: string, autorbeznr: number) {
    let body = '{"request":{"filter":"restvldeleteautoren%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + 
                '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06beznr%05' + autorbeznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body, 'tt_vlautoren');
  }
  
  getAuswahlAutoren(objekt: string, aschlussel: string, objektartikel: string, autorbeznr: number) {
    let body = '{"request":{"filter":"restvlautobjabfrage%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + 
                '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06beznr%05' + autorbeznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body, 'tt_vlautobj');
  }
  
  getAutoren(objekt: string, aschlussel: string, objektartikel: string, autorbeznr: number) {
    let body = '{"request":{"filter":"restvlgetautoren%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06objekt%05' + objekt + 
                '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06beznr%05' + autorbeznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body, 'tt_vlautoren');
  }
  
  //sendet http-request und gibt response zurueck
  sendRequest(body: string, tabelle: string) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res[tabelle]));
  }
}
