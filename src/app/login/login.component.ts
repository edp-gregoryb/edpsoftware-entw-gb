import {Component, OnInit, LOCALE_ID, Inject} from '@angular/core';
import {Router, RoutesRecognized, ActivatedRoute} from '@angular/router';
import {CookieService} from 'ng2-cookies';
import {LoginService} from '../shared/login.service';
import {DataService} from '../shared/data.service';
import {Subscription} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {appModules} from '../tools/shared/const/appModules';
import {RestgetmoduleService} from '../shared/restgetmodule.service';
import {NodeServiceService} from '../tools/other/shared/rest-services/node-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [{provide: LOCALE_ID, useValue: 'de-CH' }]
})

export class LoginComponent implements OnInit {

    subscription: Subscription;
    model: any = {};
    loading = false;
    error = '';
    successmsg: string = '';
    tempfilelocalstorage: any;
    tempPasoeInstanz: any;
    tempPasoeMandant: any;
    cookies: Object;
    keys: Array<string>;
    cName: string;
    cValue: string;
    rName: string;
    checkName: string;
    offertparam: string = '';
    dialogRef: MatDialogRef<any>;
    progressbar_visible: boolean;
    browserFingerprint: any;
    //licensedModules: string[];
    licensedModules: any;
    targetRoute: string = '';
    defaultRoute: string = './demo/demo-show';
    selected: string = 'de';
    languangelist = [
        {code: 'de', label: 'Deutsch'},
        {code: 'fr', label: 'Französisch'},
        {code: 'it', label: 'Italienisch'}
    ]

    constructor(private router: Router, private route: ActivatedRoute,
                private loginservice: LoginService,
                private cookieService: CookieService,
                public dialog: MatDialog, private data: DataService,
                private restgetmoduleService: RestgetmoduleService,
                @Inject(LOCALE_ID) public locale: string
                ) {
        
        this.tempfilelocalstorage = localStorage.getItem('instanz');
        this.tempPasoeInstanz = localStorage.getItem('pasoeInstanz');
        this.tempPasoeMandant = localStorage.getItem('pasoeMandant');
        console.log("Locale_id", this.locale);
        // let temp = this.getUsersLocale('de-CH');
        // console.log("getUsersLocale", temp);
    }
    navigateTo(value) {
        console.log("navigateTo", value);
        //
        this.router.navigate(['../', value.value]);
    }

    ngOnInit() {

        this.progressbar_visible = false;

        if (this.tempfilelocalstorage) {
            console.log('tempfilelocalstorage', this.tempfilelocalstorage);
            var instanzfile = JSON.parse(this.tempfilelocalstorage);
            this.model.instanz = instanzfile.instvalue;
            this.model.mandant = instanzfile.mandvalue;

            if (this.tempPasoeInstanz) {
                this.model.instanz = this.tempPasoeInstanz;
                console.log('pasoeInstanz');
            }

            if (this.tempPasoeMandant) {
                this.model.mandant = this.tempPasoeMandant;
                console.log('pasoemandant');
            }
        }
        
        this.route.queryParamMap.subscribe(params => {
            if(params.get("params")){
                this.model.instanz = atob(params.get("params"));
                localStorage.setItem('pasoeInstanz', this.model.instanz);
            }
            if(params.get("params2")){
                this.model.mandant = atob(params.get("params2"));
                localStorage.setItem('pasoeMandant', this.model.mandant);
            }
        });

        this.subscription = this.data.notifyObservable$.subscribe((res) => {
            console.log('this.message', res);
            this.browserFingerprint = res;
        });

    }

    getUsersLocale(defaultValue: string): string {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return defaultValue;
        }
        const wn = window.navigator as any;
        let lang = wn.languages ? wn.languages[0] : defaultValue;
        lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
        return lang;
    }


    login() {

        this.error = '';
        this.successmsg = '';
        this.loading = true;
        this.progressbar_visible = true;
        this.loginservice.login(this.model.username, this.model.password, this.model.instanz, this.model.mandant, this.browserFingerprint)
            .subscribe(resulttemp => {
                    let tempjson: any = JSON.parse(resulttemp['REST'][0].messageResponse);
                    let result = tempjson.tt_login;
                    let tempdetberecht = JSON.stringify(result[0].detberecht);
                    sessionStorage.setItem("detberecht", tempdetberecht);
                    //detailber
                    delete result[0].detberecht
                    
                    //console.log("loginresult", result["REST"][0].messageResponse.tt_login);
                    //if (result === true ) {
                    if (result[0].fehlercode === '00') {
                        console.log('Login successfull');
                        console.log('Returnvalue: ', result);
                        console.log('Instanz: ' + this.model.instanz);

                        //Aufruf Module Methode
                        // console.log("result",result);
                        // this.restgetmoduleService.getModule(this.model.instanz,result[0].termid)
                        //   .subscribe(module => {
                        //     console.log("module", module);
                        //   });
                        //ende aufruf methode
                        this.successmsg = 'Anmeldung erfolgreich. Benutzerumgebung wird vorbereitet.';

                        localStorage.setItem('instanz', JSON.stringify({'instvalue': this.model.instanz, 'mandvalue': this.model.mandant}));
                        let tempjson = JSON.stringify(result);
                        let tempbase64 = btoa(tempjson);
                        
                        this.cookieService.set('currentUser', tempbase64, 7);
                        
                        // sessionStorage.setItem('currentUser', tempbase64);

                        // this.restgetmoduleService.getModule()
                        //   .subscribe(module => {
                        //   console.log("module", module);
                        //   });

                        // Routing ------------------------------
                        console.log('Useritems:startseite : ' + result[0].startseite);
                        //this.licensedModules  = result[0].berecht;
                        this.licensedModules = result[0].module;
                        // leere und ungültige Module innerhalb der lizenzierten Module rausfiltern
                        // for (var i = 0; i < this.licensedModules.length; i++) {
                        //   if ((this.licensedModules[i]==="") || (!appModules.find(x => x.shorthand == this.licensedModules[i]))){
                        //     this.licensedModules.splice(i,1);
                        //     i--;
                        //   }
                        // }



                        // ENDE: leere und ungültige Module innerhalb der lizenzierten Module rausfiltern


                        // bereinigte lizenzierte Module und Default-Route ausgeben
                        console.log('lizenzierte und frei gegebene Module für eingeloggten Benutzer', this.licensedModules);
                        if (!this.licensedModules) {

                            this.successmsg = '';
                            this.error = 'Sie haben keine Module zugewiesen';
                        }

                        console.log('DefaultRoute: ' + this.defaultRoute);

                        // targetRoute bestimmen ---
                        //   if (this.offertparam.includes("offertview/offerte-show")){
                        //offertview/offerte-show;firma=2;beznr=19866;termKontaktBeznr=19948;objekt=hotel;termmitbeznr=2488;rubrik=;urubrik=;
                        let tempoffertparam = sessionStorage.getItem('offertstarturl');
                        console.log('tempoffertparam', tempoffertparam);
                        if (tempoffertparam) {
                            let tempurl = JSON.parse(tempoffertparam);
                            this.offertparam = tempurl.url;

                            console.log('this.offertparam', this.offertparam);

                            if (this.offertparam.includes('offertview/offerte-show')) {
                                let stringtemp = this.offertparam.substring(25, this.offertparam.length);
                                for (let i = 0; i < stringtemp.length; i++) {
                                    stringtemp = stringtemp.replace(';', ',');
                                }
                                for (let i = 0; i < stringtemp.length; i++) {
                                    stringtemp = stringtemp.replace('=', ':');
                                }
                                let offertparamarray = [] = stringtemp.split(',');

                                var temparray = [];
                                for (var i = 0; i <= offertparamarray.length - 1; i++) {
                                    temparray[i] = offertparamarray[i].split(':');
                                }

                                console.log('temparray', temparray);

                                if (this.tempfilelocalstorage) {
                                    var instanzfile = JSON.parse(this.tempfilelocalstorage);
                                    var instanz = instanzfile.instvalue;
                                }

                                //this.router.navigate(['/offertview/offerte-show'],{queryParams: {firma:temparray[0][1],beznr:temparray[1][1],termKontaktBeznr:temparray[2][1],objekt:temparray[3][1],termmitbeznr:temparray[4][1],rubrik:temparray[5][1],urubrik:temparray[6][1]}});
                                // https://sv0089.suedostschweiz.ch:8980/edpofferttool/#/edp/offertview/offerte-show;firma=1;beznr=286793;termKontaktBeznr=;objekt=;termmitbeznr=100858;rubrik=;urubrik=;OpportunityId=0068E00000DraxnQAB
                                if (temparray.length < 6) {
                                    console.log('temparray zu klein', temparray);
                                    this.router.navigate([this.defaultRoute]);
                                } else {
                                    this.router.navigate(['/offertview/offerte-show', {
                                        firma: temparray[0][1],
                                        beznr: temparray[1][1],
                                        termKontaktBeznr: temparray[2][1],
                                        objekt: temparray[3][1],
                                        termmitbeznr: temparray[4][1],
                                        rubrik: temparray[5][1],
                                        urubrik: temparray[6][1],
                                        OpportunityId: temparray[7][1]
                                    }]);


                                }
                            }
                        } else {
                            if (this.licensedModules.length == 1) {
                                //this.targetRoute = appModules.find(x => x.shorthand == this.licensedModules[0]).route;
                                this.targetRoute = this.licensedModules[0].route;
                                console.log('User hat nur 1 lizenziertes Modul, daher direkter Start in diesem Modul. Route = ' + this.targetRoute);

                                this.router.navigate([this.targetRoute]);
                            }
                            if (this.licensedModules.length == 0) {
                                this.targetRoute = this.defaultRoute;
                                console.log('User hat kein lizenziertes Modul, daher Start mit Home inkl. Meldung. Route = ' + this.targetRoute);
                                this.router.navigate([this.targetRoute]);
                            }
                            if (this.licensedModules.length > 1) {
                                console.log('User hat mehrere lizenzierte Module...')




                                if (result[0].startseite !== '' && (this.licensedModules.find(x => x == result[0].startseite) !== '')) {
                                    //this.targetRoute = appModules.find(x => x.shorthand == result[0].startseite).route;
                                    this.targetRoute = this.licensedModules.find(x => x.shorthand == result[0].startseite).route;
                                    console.log('... und eine Startseitenpräferenz (inkl. entsprechender Lizenzierung), daher Start auf Startseite ' + this.targetRoute);
                                    //Test starten des WF nodeservers

                                    this.router.navigate([this.targetRoute]);
                                }
                                else {
                                    this.targetRoute = this.defaultRoute;
                                    console.log('... und keine Startseitenpräferenz, daher Start auf DefaultRoute ' + this.targetRoute);
                                    this.router.navigate([this.targetRoute]);
                                }
                            }
                        }
                        //this.router.navigate([this.targetRoute]);


                    } // ENDE Handling im Falle von Fehlercode 00


                    else {
                        // Login failed - falsche Credentials
                        this.successmsg = '';
                        this.error = 'Anmeldung nicht erfolgreich, bitte Angaben übeprüfen.';
                        this.loading = false;
                        this.progressbar_visible = false;
                    }
                },
                (error: Response) => {

                    // Login failed - faros konnte nicht erreicht werden
                    this.successmsg = '';
                    this.loading = false;
                    this.progressbar_visible = false;

                    switch (error.status) {
                        case 404:
                            console.log('Die Instanz-URL wurde nicht gefunden', error);
                            this.error = 'Instanz nicht erreichbar/vorhanden.';
                            break;
                        case 500:
                            console.log('Server-Fehler beim Laden vom Login', error);
                            this.error = 'Genereller Server-Fehler beim Login (500).';
                            break;
                        case 0:
                            console.log('Zertifikatsproblem', error);
                            this.error = 'Web-Browser vertraut dem Zertifikat nicht.';
                            this.openDialog();
                            break;
                        default:
                            console.log('Anderes Problem anstehend', error);
                            this.error = 'Unbekanntes Problem aufgetaucht.';
                    }
                });
    }

    openDialog() {
        this.dialogRef = this.dialog.open(LoginComponentDialog);
        this.dialogRef.afterClosed().subscribe(result => {
        });

    }

}


@Component({
    selector: 'login-component-dialog',
    templateUrl: 'login-component-dialog.html',
})
export class LoginComponentDialog {

    constructor(public dialogRef: MatDialogRef<LoginComponentDialog>) {

    }
}
