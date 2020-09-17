import { Injectable } from '@angular/core';

@Injectable()
export class NeuerterminService {
  neuerTerminjson:any;
  constructor() {

  }
  getneuertermin(beznr, name) {
    var rapdatumtemp = new Date();
    var termdatumtemp = new Date();
    var rappzeitweb = new Date(2016, 1, 1, 0, 0, 0, 0);
    var termzeitweb = new Date(2016, 1, 1, 7, 0, 0, 0);

    this.neuerTerminjson = [{
      "fehlercode":"00",
                   "fehlertext":"",
                    firma: 0,
                    rapnr: 0,
                    beznr: 0,
                    erledigt: "",
                    NAME: "",
                    strasse: "",
                    zusatz1: "",
                    zusatz2: "",
                    ort: "",
                    telge: "",
                    telgedi: "",
                    natel: "",
                    email: "",
                    termKontaktBeznr: 0,
                    termkontaktpers: "",
                    kontakttelge: "",
                    kontakttelgedi: "",
                    kontaktnatel: "",
                    kontaktemail: "",
                    rapKontaktBeznr: 0,
                    rapkontaktpers: "",
                    rapkontakttelge: "",
                    rapkontakttelgedi: "",
                    rapkontaktnatel: "",
                    rapkontaktemail: "",
                    aktivid: "",
                    aktividcd: "",
                    rapdatum: rapdatumtemp,
                    rapzeit: rappzeitweb,
                    rapptext: "",
                    termaktivid: "",
                    termaktividcd: "",
                    termdatum: termdatumtemp,
                    termzeit: termzeitweb,
                    termrapptext: "",
                    agenturbeznr: 0,
                    agenturname: "",
                    agenturstrasse: "",
                    agenturzusatz1: "",
                    agenturzusatz2: "",
                    agenturort: "",
                    agenturtelge: "",
                    agenturtelgedi: "",
                    agenturnatel: "",
                    agenturemail: "",
                    objekt: "",
                    objektbezeichnung: "",
                    aktioncode: "",
                    aktionbezeichnung: "",
                    grundcode: "",
                    grundbezeichnung: "",
                    mitbeznr: 0,
                    mitarbeitername: name,
                    termmitbeznr: 0,
                    termmitarbeitername: name,
                    memotext: "",
                    ROWID: "",
    }];
    return this.neuerTerminjson;
  }

}
