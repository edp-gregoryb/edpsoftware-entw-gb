import { Injectable } from '@angular/core';
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from '../../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable()
export class FarosgetinseratejpgService {

 loginparameter:any;
  constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
  this.loginparameter = this.loginparameterService.getparameter();

  }
  getfarosInserat(aufnr){
  let body = '{"request":{"filter":"farosGetInserateJPG%04Termid%05'+this.loginparameter.logintermid+'%06sprache%05'+this.loginparameter.loginsprache+'%06aufnr%05'+aufnr+'%06firma%05'+this.loginparameter.loginfirma+'"}}';
 const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl,body, {headers})
                      .pipe(map(this.extractData));  
  }
  
  private extractData(res:Response){
     // let resultJson = res.json();
     // console.log("inseratejpg",resultJson);
     let result = res['REST'][0].messageResponse;
      var message_expression = /\\u000a/g;
    //   console.log("result",result);
     if (result == "Fehlercode\\u000501"){
         return result;
     } else {
     let result1 = result.replace(message_expression, '');
     let resultJson2 = JSON.parse(result1);
    //  let resultJson2 = JSON.parse(result);
     let result2 = resultJson2;
     console.log("inseratejpg",result2);
     return result2;
     }

   }

}
