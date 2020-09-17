import { Injectable } from '@angular/core';
import { KontaktpersonService } from '../services/kontaktperson.service';

@Injectable()
export class Autocompletes {

constructor(private kontaktpers: KontaktpersonService){

}

    //main-edit main-new
     kundeeditieren(isActiveKunde) {
         console.log("isActiveKunde",isActiveKunde);
    if (isActiveKunde === false) {
      return isActiveKunde = true;
    } else {
     return isActiveKunde = false;

    }
  }

  getkontaktpersonen(nummer){
      var kontaktpersonen;
      console.log("changeKontakperson", nummer);
      this.kontaktpers.showkontaktperson(nummer,'', '')
      .subscribe(kopers => { kontaktpersonen = kopers ;
                                console.log(kopers);
                                  }, err => {
        console.error(err);
      });


  }
}