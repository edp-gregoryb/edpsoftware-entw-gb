import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from '../../../shared/services/loginparameter.service';
import { map, filter } from "rxjs/operators";

import { Reciever } from '../entities/Reciever';

@Injectable({
  providedIn: 'root'
})
export class RestEmpfaengerService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }
  
  //fuegt empfaenger hinzu
  addEmpfaenger(empf: Reciever) {
    let body = '{"request":{"filter":"restwfaddkommempf%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06stat%05' + empf.stat + '%06kommentarid%05' + empf.kommentarid + '%06beznr%05' + empf.beznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //liefert alle empfaenger eines kommentars
  getAllEmpfaenger(empf: Reciever) {
    empf.beznr = 0;
    return this.getEmpfaenger(empf);
  }
  
  //liefert einen bestimmten empfaenger eines kommentars
  getEmpfaenger(empf: Reciever) {
    let body = '{"request":{"filter":"restwfgetkommempf%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06stat%05' + empf.stat + '%06kommentarid%05' + empf.kommentarid + '%06beznr%05' + empf.beznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //loescht empfaenger
  deleteEmpfaenger(empf: Reciever) {
    let body = '{"request":{"filter":"restwfdeletekommempf%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + 
                '%06kommentarid%05' + empf.kommentarid + '%06beznr%05' + empf.beznr + '%06firma%05' + this.loginparameter.loginfirma + '%06"}}';
    return this.sendRequest(body);
  }
  
  //sendet http-request und liefert deren response
  sendRequest(body: string) {
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    
    return this.http.post(this.loginparameter.loginurl, body, { headers })
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
      .pipe(map(res => JSON.parse(res)))
      .pipe(map(res => res.tt_wfkommempf));
  }
}
