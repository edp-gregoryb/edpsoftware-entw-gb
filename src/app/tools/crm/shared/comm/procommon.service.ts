import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class ProcommonService {
private notifyer1 = new Subject<any>();
private notifyer2 = new Subject<any>();
 /**
   * Observable string streams
   */
notifyer1Observable$ = this.notifyer1.asObservable();
notifyer2Observable$ = this.notifyer2.asObservable();
  constructor() { }
 public notifyer1Other(data: any) {
    if (data) {
       console.log("test",data);
      this.notifyer1.next(data);
    }
  }
  public notifyer2Other(data: any) {
    if (data) {
       console.log("test2",data);
      this.notifyer2.next(data);
    }
  }
}
