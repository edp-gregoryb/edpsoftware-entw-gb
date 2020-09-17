import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginparameterService} from '../../../shared/services/loginparameter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestVlupdtobjektService {

  loginparameter:any
  constructor(private http: HttpClient, private loginparameterService: LoginparameterService) {
    this.loginparameter = this.loginparameterService.getparameter();
  }

  putVlOpjekt(vlobjjson) {

    console.log("putVLOpjekt(vlobjjson) -> original vlobjjson:", vlobjjson);
    console.log("putVLOpjekt(vlobjjson) -> original vlobjjson[0]:", vlobjjson[0]);
    
    vlobjjson.termid = this.loginparameter.logintermid;
    
    console.log("putVLOpjekt(vlobjjson) -> original vlobjjson mit logintermid:", vlobjjson);
    console.log("putVLOpjekt(vlobjjson) -> original vlobjjson[0] mit logintermid:", vlobjjson[0]);
    
    let stringjson = JSON.stringify(vlobjjson);//vlobjjson[0] manchmal kommt es im Array daher 24.10.19
    console.log('putVLOpjekt(vlobjjson) -> stringjson untrimmed:', stringjson);
    console.log('putVLOpjekt(vlobjjson) -> stringjson trimmed:', stringjson.trim());
    let stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode(("0x" + p1) as any); }));

    console.log('putVLOpjekt(vlobjjson) -> stringjsonBase64:',stringjsonBase64);


    //let body = '{"request":{"filter":"restvlupdtobjekt%04' +stringjsonBase64 + '%06Termid%05' + this.loginparameter.logintermid + '"}}';
    let body = '{"request":{"filter":"restvlupdtobjekt%04Termid%05' + this.loginparameter.logintermid + '%06inhalt%05' + stringjsonBase64 + '"}}';

    const headers = new HttpHeaders().set( "content-type", "application/json" );

    return this.http.post(this.loginparameter.loginurl, body, { headers })
        .pipe(map((res: Response) => res['REST'][0].messageResponse))
        .pipe(map(res => res.replace(/\\u000a/g, '')))
        .pipe(map(res => JSON.parse(res)));
  }
}
