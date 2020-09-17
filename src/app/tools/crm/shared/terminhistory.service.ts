import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class TerminhistoryService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) { 
     this.loginparameter = this.loginparameterService.getparameter();
  }

    public getTerminhistory( kunde:number, hist:string,verknuepfung:string, obj:string,rubrik:string,urubrik:string){
      console.log(kunde);

    let body = '{"request":{"filter":"restittermine%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06verknuepfung%05'+verknuepfung+'%06sicht%05A'+
    '%06firma%05'+this.loginparameter.loginfirma+'%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06mitarb%05' +this.loginparameter.mitarbeiter+'%06aschlussel%05%06aktividcd%05%06datumvon%05%06datumbis%05%06aktion%05%06history%05'+hist+'"}}'
    
    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06verknuepfung%05'+verknuepfung+'%06sicht%05A'+
    '%06firma%05'+this.loginparameter.loginfirma+'%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06urubrik%05'+urubrik+'%06mitarb%05' +this.loginparameter.mitarbeiter+'%06aschlussel%05%06aktividcd%05%06datumvon%05%06datumbis%05%06aktion%05%06history%05'+hist;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restittermine%04'+jsonbase64+'"}}';
     
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_ittermine));
  }


}
