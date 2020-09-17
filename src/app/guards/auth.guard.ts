import {Injectable  } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ng2-cookies';

import { LoginService } from '../shared/login.service';
import { ReloginService } from '../shared/relogin.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate  {
  tempfile:any = null;
  tempfilelocalstorage:any = null;
  instanz:any;
  mandant:any;
  offertparam:any;

  constructor(private cookieService: CookieService, private router: Router,  private loginService:LoginService,
        private reloginService:ReloginService) {
          
    // this.tempfilelocalstorage = localStorage.getItem('instanz');
    
    // if (this.tempfilelocalstorage){
    //   console.log("tempfilelocalstorage",this.tempfilelocalstorage);
    //   var instanzfile = JSON.parse(this.tempfilelocalstorage);
    //   this.instanz = instanzfile.instvalue;
    //   this.mandant = instanzfile.mandvalue;
    // }
    // console.log("this.instanz", this.instanz);
     this.tempfile  = cookieService.get('currentUser');
    
  }

  canActivate(routeSnapshot:ActivatedRouteSnapshot, routerSnapshot:RouterStateSnapshot):Observable<boolean> | boolean {
      if (this.loginService.loggedId() || (this.tempfile)) {
        
        const url = encodeURI(routerSnapshot.url);
        console.log("currentUser true", url);
       
        return true;
        }
 
        // not logged in so redirect to login page

        this.router.navigate(['/login']);
        console.log("currentUser false", this.loginService.loggedId());
        return false;
  }
  
  // public loginstatus(tempfile,mandant, instanz){
  //   let cu = atob(tempfile);
  //   // console.log("this.tempfile", cu);
  //   let rvalue;
  //   let cujson = JSON.parse(cu);
  //   console.log("cujson[0].email", cujson[0].email, cujson[0].termid);
  //   this.reloginService.relogin(cujson[0].email,cujson[0].termid,"" , mandant, instanz)
  //   .subscribe(relog => {
  //     console.log("relog",relog);
  //       let tempjson:any = JSON.parse(relog["REST"][0].messageResponse);
  //       let result = tempjson.tt_login;
  //       if (result[0].fehlercode === '00') {
  //         return this.rvalue = true;
          
        
  //       } else {
  //         return this.rvalue = false;
  //       }
        
  //   });
    
  // }

}
