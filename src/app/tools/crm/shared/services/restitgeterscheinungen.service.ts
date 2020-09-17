import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class RestitgeterscheinungenService {
loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
     this.loginparameter = this.loginparameterService.getparameter();
   }

   getErscheinungen(kunde:number,verknuepfung:string,obj:string,rubrik:string,urubrik:string){
    var mitarb = "";
    if (obj === undefined || obj === "" || obj === null){
        mitarb = this.loginparameter.mitarbeiter;
    } else {
        console.log("obj anwesend restitauftragueber");
    }
    let body = '{"request":{"filter":"restitgeterscheinungen%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
        '%06kunde%05'+kunde+'%06objekt%05'+obj+'%06rubrik%05'+rubrik+'%06aufart%0501,10%06aufnr%05'+
        '%06vermittler%05%06vertreter%05'+
        '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +mitarb+'"}}';

    
    
    const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
        .pipe(map(this.extractData));

  }

    getOfferten(kunde:number,verknuepfung:string,obj:string,rubrik:string,urubrik:string, aufart:string){
        var mitarb = "";
        if (obj === undefined || obj === "" || obj === null){
            mitarb = this.loginparameter.mitarbeiter;
        } else {
            console.log("obj anwesend restitauftragueber");
        }
        let body = '{"request":{"filter":"restitgeterscheinungen%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06sicht%05A%06start%051%06anzahl%0550%06firma%05'+this.loginparameter.loginfirma+''+
            '%06kunde%05' + kunde + '%06objekt%05' + obj + '%06rubrik%05' + rubrik + '%06aufart%05' + aufart + '%06aufnr%05'+
            '%06vermittler%05%06vertreter%05'+
            '%06vondatum%05%06bisdatum%05%06verknuepfung%05'+verknuepfung+'%06urubrik%05'+urubrik+'%06mitarb%05' +mitarb+'"}}';



        const headers = new HttpHeaders().set( "content-type", "application/json" );
        return this.http.post(this.loginparameter.loginurl, body, {headers})
            .pipe(map(this.extractData));

    }

  private extractData(res: Response) {
    //let resultJson = res.json();
    //console.log("service",res);
    if (res){
    let result = res['REST'][0].messageResponse;
    //console.log("service",result);
    let resultJson2 = JSON.parse(result);
    let result2 = resultJson2.tt_itgeterscheinungen;
    //console.log("service",result2);
    return result2;
    }
  }

}
