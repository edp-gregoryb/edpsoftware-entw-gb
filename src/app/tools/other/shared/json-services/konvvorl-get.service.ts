import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonvvorlGetService {

  constructor(private http: HttpClient) { }

  getKonvl() {
    let body = {"method":"edp.private.basis.getKonvVorl","termid":"WEB0010021708166","token":"BCD","applicationId":"BCD","bhash":"BCD","vendorId":"BCD","sprache":"D","firma":"02","data":[{"konvl_id":"30"}]};
    return this.sendRequest(body);
  }

  createKonvVorl() {
    let body = {"method":"edp.private.basis.createKonvVorl","termid":"WEB0010021708166","token":"BCD","applicationId":"BCD","bhash":"BCD","vendorId":"BCD","sprache":"D","firma":"02",
      "data": [{"bezeichnung":"aaa","beschreibung":"bbb","stat":"0"}]};
    return this.sendRequest(body);
  }

  sendRequest(body) {
    const headers = new HttpHeaders().set("content-type", "application/json");

    return this.http.post('https://edp-api.faros.ch/test.aspx', body, {headers})
        .pipe(map((res: Response) => res))
        .pipe(map(res => res));


  }
}
