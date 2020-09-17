import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestFortschrittService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //updated fortschritt einer aufgabe
  updateAufgabe(objekt: string, aschlussel: string, objektartikel: string, aufgabeid: number, done: boolean) {
    let erledigt = 'NO';
    if(done) {
      erledigt = 'YES';
    }
    
    let body = '{"request":{"filter":"restvlupdtprodartikelaufgabe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06aufgabeid%05' + aufgabeid + '%06erledigt%05' + erledigt + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
                
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlprodartikelaufgabe));
  } //ende updateAufgabe()
  
  //liefert einen artikels und fortschritt von all dessen aufgaben
  getAllAufgabe(objekt: string, aschlussel: string, objektartikel: string,) {
    return this.getAufgabe(objekt, aschlussel, objektartikel, 0);
  }
  
  //liefert fortschritt einer aufgabe
  getAufgabe(objekt: string, aschlussel: string, objektartikel: string, aufgabeid: number) {
    let body = '{"request":{"filter":"restvlgetprodartikelaufgabe%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache +
                '%06objekt%05' + objekt + '%06aschlussel%05' + aschlussel + '%06objektartikel%05' + objektartikel + '%06aufgabeid%05' + aufgabeid + 
                '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
                
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_vlprodartikelaufgabe));
  }
}
