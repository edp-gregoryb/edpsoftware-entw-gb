import { Injectable } from '@angular/core';
import { LoginparameterService } from '../services/loginparameter.service';
import { Vermittler } from '../entities/vermittler';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { map } from "rxjs/operators";

@Injectable()
export class CrmMailversandService {
 loginparameter: any;
 public kunden: Array<Vermittler> = [];
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  sendemail(emailid, mailtext){
    console.log("sendemail",emailid, mailtext);
    let jsonbase64 = this.loginparameterService.stringtobase64(mailtext);
    console.log("jsonbase64",jsonbase64);
    let body = '{"request":{"filter":"restCRMmailversand%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06emailid%05' + emailid + '%06mailtext%05' + jsonbase64 + '"}}'

    //let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06emailid%05' + emailid + '%06mailtext%05' + mailtext + '%06firma%05' + this.loginparameter.loginfirma;
    
    
    //let body = '{"request":{"filter":"restCRMmailversand%04'+jsonbase64+'"}}'; 
    const headers = new HttpHeaders().set( "content-type", "application/json" );

  return this.http.post(this.loginparameter.loginurl, body, {headers})
     .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_crmemail));

  }

  //* restWEOAemailid

    sendWEOAemail(emailid, mailtext){
        console.log("sendemail",emailid, mailtext);
        let jsonbase64 = this.loginparameterService.stringtobase64(mailtext);
        console.log("jsonbase64",jsonbase64);
        let body = '{"request":{"filter":"restWEOAmailversand%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06emailid%05' + emailid + '%06mailtext%05' + jsonbase64 + '"}}'

        //let jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06emailid%05' + emailid + '%06mailtext%05' + mailtext + '%06firma%05' + this.loginparameter.loginfirma;


        //let body = '{"request":{"filter":"restCRMmailversand%04'+jsonbase64+'"}}';
        const headers = new HttpHeaders().set( "content-type", "application/json" );

        return this.http.post(this.loginparameter.loginurl, body, {headers})
            .pipe(map((res:Response) => res['REST'][0].messageResponse))
            .pipe(map(res => JSON.parse(res)))
            .pipe(map(res => res.tt_WEOAemail));

    }
}
