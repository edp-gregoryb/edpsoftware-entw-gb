import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; 
import { Observable }  from 'rxjs';
import { LoginparameterService } from './../../../shared/services/loginparameter.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FisvlumluntrbrdispService {

  loginparameter:any;
 constructor(private http: HttpClient, private loginparameterService:LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
   }
   
     public getUmleitungabo (vorgansnr,possnr){
   let body = '{"request":{"filter":"fisVLUmlUntrbrDisp%04sprache%05'+this.loginparameter.loginsprache+'%06vorgansnr%05'+vorgansnr+'%06possnr%05'+possnr+'%06firma%05'+this.loginparameter.loginfirma+'"}}';
 
   
        const headers = new HttpHeaders().set( "content-type", "application/json" );
    return this.http.post(this.loginparameter.loginurl, body, {headers})
      .pipe(map((res:Response) => res['REST']))
                      //.pipe(map(res => JSON.parse(res)))
                      .pipe(map(res => res));
  }
}