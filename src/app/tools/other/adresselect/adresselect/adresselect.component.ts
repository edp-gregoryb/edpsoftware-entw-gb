import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, AfterContentChecked} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ng2-cookies';
import {FormControl} from '@angular/forms';
import {RestStartadrselService} from '../../shared/rest-services/rest-startadrsel.service';






@Component({
  selector: 'app-adresselect',
  templateUrl: './adresselect.component.html',
  styleUrls: ['./adresselect.component.css']
})
export class AdresselectComponent implements OnInit{


  currentUser: string = '';
  licensedModules: any = [];
  sidenavmodules: any = [];
  sidenavExpanded: boolean = false;
  selectedInfoTab: number;
  innerheight: number;
  progressbar_visible: boolean = false;
  currentAppModule: string = 'ADSS';
  modulename: string;

  lastAppModule: string = '';

  mkmart: Array<string> = [];
  mkmerk1: Array<string> = [];
  mkmerk2: Array<string> = [];
  mkmerk3: Array<string> = [];

  mkmartohne: Array<string> = [];
  mkmerk1ohne: Array<string> = [];
  mkmerk2ohne: Array<string> = [];
  mkmerk3ohne: Array<string> = [];

  objekt1: Array<string> = [];
  objekt2: Array<string> = [];
  mitKrit: string = "mitKrit";
  ohneKrit: string = "ohneKrit";

  beschreibung: string;

  constructor(private router: ActivatedRoute, private cookieService: CookieService,
              private adrselService: RestStartadrselService) {

    var tempfilelocalstorage = this.cookieService.get('currentUser');
    if (tempfilelocalstorage) {
      let currentUserstring = atob(tempfilelocalstorage);
      let userjson = JSON.parse(currentUserstring)

      // this.licensedModules  = userjson[0].berecht;
      // this.currentUser      = userjson[0].LoginVorname;
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



  ngOnInit(){
    this.innerheight = self.innerHeight + 200;
  }


  merkmals(val) {
    console.log("merkals", val);
    for (let item of val) {
      this.mkmart.push(item.mkmart);
      this.mkmerk1.push(item.mkmerk1);
      this.mkmerk2.push(item.mkmerk2);
      this.mkmerk3.push(item.mkmerk3);
    }
  }

  merkmalsohne(val) {
    console.log("merkals", val);
    for (let item of val) {
      this.mkmartohne.push(item.mkmart);
      this.mkmerk1ohne.push(item.mkmerk1);
      this.mkmerk2ohne.push(item.mkmerk2);
      this.mkmerk3ohne.push(item.mkmerk3);
    }
  }

  aobjekts(val) {
    console.log("aobjekts", val);
    for (let item of val) {
      this.objekt1.push(item.objekt);
    }
  }

  bobjekts(val) {
    console.log("bobjekts", val);
  for (let item of val) {
    this.objekt2.push(item.objekt);
  }
  }

  deletemerkal(val) {
    console.log("deletemerkal", val);
    this.mkmart = [];
    this.mkmerk1 = [];
    this.mkmerk2 = [];
    this.mkmerk3 = [];
    for (let item of val) {
      this.mkmart.push(item.mkmart);
      this.mkmerk1.push(item.mkmerk1);
      this.mkmerk2.push(item.mkmerk2);
      this.mkmerk3.push(item.mkmerk3);
    }
  }

  deletemerkalohne(val) {
    console.log("deletemerkal", val);
    this.mkmartohne = [];
    this.mkmerk1ohne = [];
    this.mkmerk2ohne = [];
    this.mkmerk3ohne = [];
    for (let item of val) {
      this.mkmartohne.push(item.mkmart);
      this.mkmerk1ohne.push(item.mkmerk1);
      this.mkmerk2ohne.push(item.mkmerk2);
      this.mkmerk3ohne.push(item.mkmerk3);
    }
  }

  deleteobja(val) {
    this.objekt1 = [];
    for (let item of val) {
      this.objekt1.push(item.objekt);
    }
  }

  deleteobjb(val) {
    this.objekt2 = [];
    for (let item of val) {
      this.objekt2.push(item.objekt);
    }
  }

  windowResize() {

  }


  startAdresselection() {

    let krit1mkmart = this.mkmart.join();
    let krit1mmerk1 = this.mkmerk1.join();
    let krit1mmerk2 = this.mkmerk2.join();
    let krit1mmerk3 = this.mkmerk3.join();
    let okritmkmart = this.mkmartohne.join();
    let okrtmkmerk1 = this.mkmerk1ohne.join();
    let okrtmkmerk2 = this.mkmerk2ohne.join();
    let okrtmkmerk3 = this.mkmerk3ohne.join();

    let objekt1 = this.objekt1.join();
    let objekt2 = this.objekt2.join();
    let beschreibung = this.beschreibung;

    this.adrselService.postStartAdrsel(objekt1, krit1mkmart, krit1mmerk1, krit1mmerk2, krit1mmerk3, okritmkmart,
        okrtmkmerk1, okrtmkmerk2, okrtmkmerk3, objekt2, beschreibung)
        .subscribe(antwort => {
            console.log("postStartAdrsel", antwort);
        });


  }
}
