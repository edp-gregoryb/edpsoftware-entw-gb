import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrormessageService {

  constructor() { }

  untersuchFehlercode(_action: string, _msg: any): string {
    if(_msg.fehlercode === '' || _msg.fehlercode === '200'){
      return 'worked';
    } else if(_msg.fehlerart === 'W') {
      let answer = window.confirm(_msg.fehlertext);
      if(answer === true) {
        return 'sendConfirmation';
      } else {
        return 'sendDenial';
      }
    }
    window.alert(_action + " fehlgeschlagen:\n[" + _msg.fehlercode + '], "' + _msg.fehlertext + '"');
    return 'failed';
  }
}
