import {Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MainpanelheadComponent} from '../../../shared/components/mainpanelhead/mainpanelhead.component';
import {MainpaneleditComponent} from '../../../shared/components/mainpaneledit/mainpaneledit.component';
import {CookieService} from 'ng2-cookies';
import {appModules} from '../../../../shared/const/appModules';
import {WindowsizeService} from '../../../../shared/services/windowsize.service';
import {RestsygetdefaultService} from '../../../crmplus/shared/services/restsygetdefault.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-agendaitems-show',
    templateUrl: './agendaitems-show.component.html',
    styleUrls: ['./agendaitems-show.component.css']
})
export class AgendaitemsShowComponent implements OnInit {
    termines: any = null;
    schalterAgenda: boolean = true;
    newbez: any;
    newrap: any;
    newTerm: any;
    rapnrvonfazit: any;
    schalterFazit: number;
    schalterNichtAgenda: number = 0;
    beznrvonOffert: number;
    rapnrvonOffert: number;
    vonOffert: number = 0;
    innerheight: number;
    plus15: any;
    plusp: boolean;
    progressbar_visible: boolean = true;
    private resizeSubscription: Subscription;
    currentAppModule: string = 'VEAG';
    modulename: string;
    lastAppModule: string = '';
    currentUser: string = '';
    licensedModules: any = [];
    sidenavmodules: any = [];
    sidenavExpanded: boolean = false;
    datumJaNein: string = '';
    selectedInfoTab: number;
    showMainPanel:boolean = false;


    constructor(private router: ActivatedRoute, private cookieService: CookieService, private windowsizeService: WindowsizeService,
                private restsygetdefaultService: RestsygetdefaultService) {


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

        this.restsygetdefaultService.getdefault('crm-mainpanel-Agenda', '').subscribe(data => {
            console.log('restsygetdefaultService', data);
            this.datumJaNein = data[0].wert;
            console.log('restsygetdefaultService', this.datumJaNein);

        });

        this.restsygetdefaultService.getdefault('crm-defaultpanel', 'VEAG').subscribe(data => {
            console.log('crm-defaultpanel', data);
            if (data[0].wert === '!') {
                this.selectedInfoTab = 1;
            } else if (data[0].wert === '*') {
                this.selectedInfoTab = 2;
            } else if (data[0].wert === 'Auftrage') {
                this.selectedInfoTab = 3;
            } else if (data[0].wert === 'Offerte') {
                this.selectedInfoTab = 4;
            } else if (data[0].wert === 'Mails') {
                this.selectedInfoTab = 5;
            }

        });

    }

    ngOnInit() {
        this.innerheight = self.innerHeight - 60 - 4;
        console.log('windowsize', this.innerheight);
    }
    
    windowResize(){
        this.innerheight = self.innerHeight - 60 - 4;
    }
    
    ngOnDestroy() {

    }

    progressbar(val) {
        console.log("progressbar_visible",val);
        this.progressbar_visible = val;
    }

    newBeznr(val) {
        // console.log("newBeznr",val);
        this.newbez = val;
    }

    newRapnr(val) {
        // console.log("newRapnr",val);
        this.newrap = val;
    }

    newTermin(val) {
         console.log("newTermin",val);
        this.newTerm = val;
        if (this.newTerm) {
            this.progressbar_visible = false;
        }
    }

    kundenbezvonfazitchanged(val) {

        console.log('kundenbezvonfazitchanged', val);
        if (val !== 0) {
            this.schalterFazit = val;
        }
    }
    
    rapnrvonfazitchanged(val){
        console.log("rapnrvonfazitchanged", val);
        this.rapnrvonfazit = val;
    }
    
    termincountchanged(val){
        console.log("termincountchanged", val);
        if(val === 0){
            this.showMainPanel = false;
        } else {
            this.showMainPanel = true;
        }
    }

    public postpone15(val) {
        console.log('postpone15', val);
        this.plus15 = val;
    }

    public postp(val) {
        console.log('postp', val);
        this.plusp = val;
    }
}
