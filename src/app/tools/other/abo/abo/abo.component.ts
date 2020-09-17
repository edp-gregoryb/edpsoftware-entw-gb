/*
  Im von allen components des abo-moduls ist die aboverwaltung-component ab besten auskommentiert, viele Methoden
  sind in den meisten components die kommentare koennen analog dazu gelesen werden. Die anderen components werden
  auch noch auskommentiert, ich hatte fuer dies jedoch zu wenig zeit bis jetzt. - CG 21.06.2019
*/

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { AbolistComponent } from '../../shared/components/abolist/abolist.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-abo',
  templateUrl: './abo.component.html',
  styleUrls: ['./abo.component.css']
})
export class AboComponent implements OnInit {

  @ViewChild(AbolistComponent, { static: false }) abolist: AbolistComponent;

  //Standard-Variablen
  currentUser: string = '';
  modulename: string;
  currentAppModule: string = 'WABO';
  lastAppModule: string = '';
  sidenavExpanded: boolean = false;
  licensedModules: any = [];
  sidenavmodules: any = [];
  progressbar_visible: boolean = false;

  breadcrumbs: string[] = []; //breadcrumbs im header

  moduleShow: string = 'WABO'; //welches modul gerade angezeigt wird
  //daten fuer module
  tempData: any;

  //zwischenspeicher geupdated von CODN und ADRW
  updatedZwischenspeicher: any;

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
    //die benoetigten angaben aus dem cookie 'currentUser' auslesen
    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if (tempfilelocalstorage) {
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring);

      let licensedModulestemp = userjson[0].module;
      this.currentUser = userjson[0].LoginVorname;

      for (let row of licensedModulestemp) {

        this.licensedModules.push(row);
        if (row.shorthand == this.currentAppModule) {
          this.modulename = row.name;
        }
      }
      //sidenav
      for (let row of licensedModulestemp) {
        if (row.show) {
          this.sidenavmodules.push(row);
        }
      }
    }
  } //ngOnInit() fertig

  //oeffnet ein module
  public loadModule(obj: any, _module: string) {
    this.breadcrumbs = [_module];
    this.moduleShow = _module;
    this.tempData = obj;
  }

  //wird aufgerufen wenn in CODN || ADRW eine Auswahl getroffen wurde
  moduleAuswahl(e: Event) {
    if(!this.tempData.zwischenspeicher){
      return;
    }
    //updatedZwischenspeicher variabeln updaten
    this.updatedZwischenspeicher = JSON.parse(this.tempData.zwischenspeicher);

    if(e){
      let tempE = JSON.parse(JSON.stringify(e));
      let varName = this.tempData.variabelName;

      if(tempE.toString() !== 'empty'){
        if(this.moduleShow === 'CODN') {
          if(varName.match(/t-kurzmitt\dz/)) {
            this.updatedZwischenspeicher[varName + '1'] = tempE.ctext;
            this.updatedZwischenspeicher[varName + '2'] = tempE.ctext1;
            this.updatedZwischenspeicher[varName + '3'] = tempE.ctext2;
          } else {
            this.setAboVar(varName,  tempE.cwert,  tempE.ctext);
          }
        } else if(this.moduleShow === 'ADRW') {
          this.setAboVar(varName,  tempE.beznr,  tempE.bfname);
        }
      } else {
        this.setAboVar(varName, "", "");
      }
    }

    //Modul ausblenden
    this.breadcrumbs = [];
    this.moduleShow = 'WABO';
  }

  //setzt abodetails-variablen auf einen bestimmten wert
  private setAboVar(_varName: string, _value: any, _text: string) {
    if(_varName.startsWith('merkmal')){
      this.lookup(this.updatedZwischenspeicher, ([_varName.slice(0, -1), '[', (Number(_varName.slice(-1))-1).toString()].join('') + ']'), _value);
    } else {
      this.lookup(this.updatedZwischenspeicher, _varName, _value);
    }
    this.lookup(this.updatedZwischenspeicher, (_varName + '_txt'), _text);
  } // ende setAboVar()

  //updated variabel die im verschachtelten objekt "obj" under dem pfad "path" liegt
  lookup(obj: any, path: string, updatedVar: any){
    let parts = path.replace(/\]/g, "").split(/\.|\[/);
    if(parts.length === 1) {
      obj[parts[0]] = updatedVar;
      return obj[parts[0]];
    }
    return this.lookup(obj[parts[0]], parts.slice(1).join("."), updatedVar);
  } // ende recLookup()
}
