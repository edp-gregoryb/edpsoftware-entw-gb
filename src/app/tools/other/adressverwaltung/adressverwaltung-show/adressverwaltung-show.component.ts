import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ng2-cookies';


@Component({
  selector: 'app-adressverwaltung-show',
  templateUrl: './adressverwaltung-show.component.html',
  styleUrls: ['./adressverwaltung-show.component.css']
})
export class AdressverwaltungShowComponent implements OnInit {

  currentUser: string = '';
  licensedModules: any = [];
  sidenavmodules: any = [];
  sidenavExpanded: boolean = false;

  innerheight: number;
  progressbar_visible: boolean = false;
  currentAppModule: string = 'ADSS';
  modulename: string;

  lastAppModule: string = '';

  constructor(private router: ActivatedRoute, private cookieService: CookieService) {

    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if (tempfilelocalstorage) {
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)

      let licensedModulestemp = userjson[0].module;
      this.currentUser = userjson[0].LoginVorname;

      for (let row of  licensedModulestemp) {

        this.licensedModules.push(row);
        if (row.shorthand == this.currentAppModule) {
          this.modulename = row.name;
        }
      }
      //sidenav
      for (let row of  licensedModulestemp) {
        if (row.show) {
          this.sidenavmodules.push(row);
        }
      }


      console.log('lizenzierte und frei gegebene Module für eingeloggten Benutzer', this.licensedModules);
      if (this.licensedModules.length == 1) console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.licensedModules.find(x => x.shorthand == this.licensedModules[0]).route);
      if (this.licensedModules.length == 0) console.log('User hat kein lizenziertes Modul, daher Meldung auf Home. Route = ./demo/demo-show');
      if (this.licensedModules.length > 1) console.log('User hat mehrere lizenzierte Module, daher Start auf Home. Route = ./demo/demo-show');
      //["PRWF","PRAU","WECR","WIKU","WIVM","WIAU","WIVE","WIAP","WMEM","WIOB","WIOS","WEAU","WIOF"
    }
  }

  ngOnInit() {

    this.innerheight = self.innerHeight + 200;
  }

  windowResize() {
    
  }
}
