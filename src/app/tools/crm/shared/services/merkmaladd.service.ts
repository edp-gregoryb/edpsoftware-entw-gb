import { Injectable } from '@angular/core';
//import { Http, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class MerkmaladdService {

  loginparameter:any;

  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
       this.loginparameter = this.loginparameterService.getparameter();
   }

   addMerkmal(beznr,mkmart,mkmerk1,mkmerk2,mkmerk3){

    let body = '{"request":{"filter":"restitaddmerkmal%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06beznr%05'+beznr+'%06mkmart%05'+mkmart+
                '%06mkmerk1%05'+mkmerk1+'%06mkmerk2%05'+mkmerk2+'%06mkmerk3%05'+mkmerk3+'%06firma%05'+this.loginparameter.loginfirma+'"}}'
    
    let jsondata = 'Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06beznr%05'+beznr+'%06mkmart%05'+mkmart+
                '%06mkmerk1%05'+mkmerk1+'%06mkmerk2%05'+mkmerk2+'%06mkmerk3%05'+mkmerk3+'%06firma%05'+this.loginparameter.loginfirma;
    
    let jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
     //let body = '{"request":{"filter":"restitaddmerkmal%04'+jsonbase64+'"}}';             
                
  const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST'][0].messageResponse))
                      .pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res.tt_itmerkmale));
  }
  // private extractData(res: Response) {
  //   let resultJson = res.json();
  //   let result = resultJson.REST[0].messageResponse;
  //   let resultJson2 = JSON.parse(result);
  //   let result2 = resultJson2.tt_itmerkmale;
  //   //console.log("service",result2);
  //   return result2;

  // }/**/

}
