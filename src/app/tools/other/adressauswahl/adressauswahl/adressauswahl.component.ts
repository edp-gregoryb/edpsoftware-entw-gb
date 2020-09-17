import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-adressauswahl',
  templateUrl: './adressauswahl.component.html',
  styleUrls: ['./adressauswahl.component.css']
})
export class AdressauswahlComponent implements OnInit {

  //Standard-Variablen
  currentUser: string = '';
  modulename: string;
  innerheight: number;
  currentAppModule: string = 'WABO'; //muss noch geaendert werden
  lastAppModule: string = '';
  sidenavExpanded: boolean = false;
  licensedModules: any = [];
  sidenavmodules: any = [];
  progressbar_visible: boolean = false;

  constructor(private cookieService: CookieService) { }

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

    this.innerheight = self.innerHeight - 60 - 4;
  } //ngOnInit() fertig

  windowResize(e: Event) {
    this.innerheight = self.innerHeight - 60 - 4;
  }
}
