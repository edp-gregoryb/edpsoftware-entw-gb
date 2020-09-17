import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewContainerRef} from '@angular/core';
// import { CommonService } from '../../../../../comm/common.service';
import {Subscription} from 'rxjs';
import {DropdownModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {SavetermindetailService} from '../../services/savetermindetail.service';
import {DatumzeitauswahlComponent} from '../../components/datumzeitauswahl/datumzeitauswahl.component';
import {CookieService} from 'ng2-cookies';
import {KundensuchfeldComponent} from '../../components/kundensuchfeld/kundensuchfeld.component';
import {AgentursuchfeldComponent} from '../../components/agentursuchfeld/agentursuchfeld.component';
import {RubrikdropmaterialComponent} from '../../components/rubrikdropmaterial/rubrikdropmaterial.component';
import {UrubrikdropmaterialComponent} from '../../components/urubrikdropmaterial/urubrikdropmaterial.component';
import {ObjektdropmaterialComponent} from '../../components/objektdropmaterial/objektdropmaterial.component';
import {KontaktpersdropmaterialComponent} from '../../components/kontaktpersdropmaterial/kontaktpersdropmaterial.component';
import {AktivitaetdropmaterialComponent} from '../../components/aktivitaetdropmaterial/aktivitaetdropmaterial.component';
import {MitarbeiterdropmaterialComponent} from '../../components/mitarbeiterdropmaterial/mitarbeiterdropmaterial.component';
import {AschluesseldropmaterialComponent} from '../../components/aschluesseldropmaterial/aschluesseldropmaterial.component';
import {WindowrefService} from '../../comm/windowref.service';
import {AgenturwechselComponent} from '../../components/agenturwechsel/agenturwechsel.component';
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {CommonService} from '../../comm/common.service';
import {Router} from '@angular/router';
import {AuftragxlsxService} from '../../services/auftragxlsx.service';
import {TeleupdateService} from '../../services/teleupdate.service';
import { RestsygetdefaultService } from '../../../crmplus/shared/services/restsygetdefault.service';

@Component({
    selector: 'app-mainpanelnew',
    templateUrl: './mainpanelnew.component.html',
    styleUrls: ['./mainpanelnew.component.css']
})
export class MainpanelnewComponent implements OnInit {

    private subscription: Subscription;
    jsonzumspeichern: any;
    @Input() termmitbeznr: any;
    @Input() kundevonauswahl: any;
    @Input() mitarbeiterneu: string;
    @Input() tempdatenzukunde: any;
    @Input() progressbar_visible: boolean;
    @Input() returnlink: string;
    @Input() kundevonsuche: any;
    @Output() neuabbrechen = new EventEmitter();
    @Output() neuerterminerstellt = new EventEmitter();
    @Output() agenturgeaendert = new EventEmitter();
    @Output() termzeit = new EventEmitter();
    kundevorbelegung: any = [];
    dateValuenew: Date;
    zeitValuenew: Date;
    showEdit: boolean = false;
    msgs: Message[] = [];
    canEdit: boolean;
    isActiveKunde: boolean = false;
    isActiveAgentur: boolean = false;
    isActiveObjekt: boolean = false;
    isActiveKontakpers: boolean = false;
    isActiveAktivitaet: boolean = false;
    termrapptextkunde: string = null;
    objekttodb: any;
    beznrkunde: number;
    mitarbeiter: string;
    mitarbeitername: string;
    mitarbeiterdropdown: string = null;
    aktionfordrop:string;
    aktiontodb:string;
    agenturtodb: any;
    kundetodb: any;
    kontaktperstodb: any;
    aschluesseltodb: any;
    rubriktodb: any;
    urubriktodb: any;
    aktivitaettodb: any;
    mitarbeitertodb: any;
    _window: Window;
    currenUser: any;
    mitarbeiterbezfordrop: any;
    objektfordrop: any;
    agenturneu: any;
    agenturanzeigen: boolean = false;
    dialogRef: MatDialogRef<AgenturwechselComponent>;
    myControl = new FormControl();
    agenturneuhtml: string;
    newbez: any;
    telupdate: boolean = false;
    telgeupdate: string = '';
    telgediupdate: string = '';
    telnatelupdate: string = '';
    telprivupdate: string = '';
    bznragentur: string;
    aschluesselnew: any;
    rubriktextnew: any;
    urubriktextnew: any;
    kontaktpersnrnew: any;
    aktivitaetfordropnew: any;
    objekttodbnew: any;

    constructor(private savetermindetailService: SavetermindetailService, private windowrefService: WindowrefService,
                private cookieService: CookieService, public viewContainerRef: ViewContainerRef, public dialog: MatDialog,
                private commonService: CommonService, private router: Router, private auftragxlsxService: AuftragxlsxService,
                private teleupdateService: TeleupdateService, private restsygetdefaultService:RestsygetdefaultService) {
        this._window = this.windowrefService.getNativeWindow();
        // console.log("this._window",this._window);
        //this.currenUser = sessionStorage.getItem('currentUser');
        var tempfilelocalstorage = this.cookieService.get('currentUser');
        if (tempfilelocalstorage) {
            let currentUserstring = atob(tempfilelocalstorage);
            this.currenUser = JSON.parse(currentUserstring)
            console.log('this.currenUser', this.currenUser[0].Beznr);
        }

        //Von Dialog Agentur
        this.subscription = this.commonService.notify18Observable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'NeueAgentur') {
                this.agenturneu = res.value;
                console.log('this.agenturneu', this.agenturneu);
                if (this.agenturneu) {
                    this.agenturanzeigen = this.agenturneu.agenturAnzeigen;
                    this.agenturneugenerieren(this.agenturneu);
                }
            }
        });
        
        this.restsygetdefaultService.getdefault('crm-mainpanel-Adresse', '')
            .subscribe( ret => {
                console.log(ret);
                for(let i = 0; i < ret.length; i++){
                    //setzt default-notiz
                    if(ret[i].feld === "Notiz"){
                        this.termrapptextkunde = ret[i].wert;
                    }
                }
            }, err => {
            console.log(err);
        });
    }

    ngOnInit() {

        // if (this.termmitbeznr){
        // this.mitarbeiter = this.termmitbeznr[0].termmitbeznr;
        // this.mitarbeitername = this.termmitbeznr[0].mitarbeitername;
        // this.mitarbeiterdropdown = this.mitarbeitername;
        // //this.beznrkunde = this.termmitbeznr[0].beznr;
        // console.log("this.mitarbeiter",this.mitarbeiter ,this.mitarbeitername);
        // }
        //console.log("this.kundevonsuche",this.kundevonsuche);
        if (this.kundevonsuche) {
            let tempdaten = JSON.parse(this.kundevonsuche)
            console.log('this.kundevonsuche', tempdaten);
            this.kundevorbelegung[0] = tempdaten;
        }
        if (this.kundevonauswahl) {
            console.log('this.kundevonauswahl', this.kundevonauswahl);
            this.kundevorbelegung[0] = this.kundevonauswahl;
        }
        if (this.tempdatenzukunde) {
            console.log('this.tempdatenzukunde', this.tempdatenzukunde);
            this.objekttodbnew = this.tempdatenzukunde.objekt.value;
            this.objekttodb = this.tempdatenzukunde.objekt;
            this.aktionfordrop = this.tempdatenzukunde.aktioncode;
            this.aktiontodb = this.tempdatenzukunde.aktioncode;
            this.aschluesselnew = this.tempdatenzukunde.aschlussel.value;
            console.log('this.aschluesselnew', this.aschluesselnew);
            this.aschluesseltodb = this.tempdatenzukunde.aschlussel;
            this.rubriktextnew = this.tempdatenzukunde.rubrik.value;
            this.rubriktodb = this.tempdatenzukunde.rubrik;
            this.urubriktextnew = this.tempdatenzukunde.urubrik.value;
            this.termrapptextkunde = this.tempdatenzukunde.notiz;
            this.kontaktpersnrnew = this.tempdatenzukunde.termKontaktBeznr.value;
            this.kontaktperstodb = this.tempdatenzukunde.termKontaktBeznr;

            if (this.tempdatenzukunde.hasOwnProperty('aktivi')) {
                this.aktivitaetfordropnew = this.tempdatenzukunde.aktivi.value;
                this.aktivitaettodb = this.tempdatenzukunde.aktivi;
            }

        }

        if (this.currenUser) {
            // console.log("ausgabequerysave",this.ausgabequerysave);
            // var queryresultat = JSON.parse(this.currenUser);
            let persnr = Number(this.currenUser[0].Beznr);
            console.log('persnr', persnr);
            this.mitarbeiterbezfordrop = Number(persnr);
            //this.mitarbeiterbezfordrop = queryresultat[0].Beznr;
        }


        var datetoday = new Date();
        this.dateValuenew = datetoday;
    }

    changeWebToStringzeit(datumoderzeit) {
        var crmdatumtemp = datumoderzeit.toLocaleString();
        //var crmdatumtemp1 = crmdatumtemp.toString().split(',');
        var enda = crmdatumtemp.toString().split('.');
        var tempenda0 = enda[0];
        var tempenda1 = enda[1];
        if (enda[0].length < 2) {
            // console.log("enda[0]",enda[0]);
            tempenda0 = '0' + enda[0];
        }
        if (enda[1].length < 2) {
            // console.log("enda[1]",enda[1]);
            tempenda1 = '0' + enda[1];
        }
        var crmdatum1 = tempenda0 + tempenda1 + enda[2];
        var crmdatum;
        return crmdatum = crmdatum1.toString().split(',');
    }

    neuerTerminSave(datumzeit, kpdrop) {
        var datetoday = new Date().toLocaleDateString();
        var datetime = datumzeit;//this.changeWebToStringzeit(datetoday);
        console.log('kpdrop', kpdrop);

        var d = new Date();
        var newtime = d.getTime();

        let tempdate = datetime.dateValuenew;
        let tempdatearray = tempdate.split('-');
        var dateValuenew = tempdatearray[2] + '.' + tempdatearray[1] + '.' + tempdatearray[0];
        var timenow = new Date().toLocaleTimeString();
        var beznrkunde = '';
        if (this.kundetodb) {
            beznrkunde = this.kundetodb.value;
        }
        var agentbeznr = '';
        if (this.agenturtodb) {
            agentbeznr = this.agenturtodb;
        }
        var kontaktbez = '';
        var kontaktgesname = '';
        if (this.kontaktperstodb) {
            console.log('this.kontaktperstodb', this.kontaktperstodb);
            kontaktbez = this.kontaktperstodb.value;
            if (kpdrop.kontaktpersondata.length >= 1) {
                kontaktgesname = kpdrop.kontaktpersondata[0].gesname;
            }

        }
        var aschluessel = '';
        if (this.aschluesseltodb) {
            aschluessel = this.aschluesseltodb.value;
        }
        var objekt = '';
        if (this.objekttodb) {
            objekt = this.objekttodb.value;
        }
        var rubrik = '';
        if (this.rubriktodb) {
            rubrik = this.rubriktodb.value;
        }
        var urubrik = '';
        if (this.urubriktodb) {
            urubrik = this.urubriktodb.value;
        }
        var aktivitaet = '';
        if (this.aktivitaettodb) {
            aktivitaet = this.aktivitaettodb.value;
        }
        var mitarbeiter = '';
        if (this.mitarbeitertodb) {
            console.log('this.mitarbeitertodb', this.mitarbeitertodb);
            // mitarbeiter = this.mitarbeitertodb.value;
            mitarbeiter = this.mitarbeitertodb;
        } else {
            mitarbeiter = this.mitarbeiterbezfordrop;
        }
        if (this.termrapptextkunde === '' || this.termrapptextkunde === undefined || this.termrapptextkunde === null) {
            var termapte: string = '';
        } else {
            var termapte: string = this.deletelinebreack(this.termrapptextkunde);
        }
        var zeittodb = this.checkifzeitorstringtodb(datumzeit.zeitValuenew);
        
        //let loginBeznr = JSON.parse(atob(this.cookieService.get('currentUser')))[0].Beznr; //beznr aus fisextanmeld
        
        this.jsonzumspeichern = {
            ROWID: 'RN',
            agenturbeznr: agentbeznr,
            aktioncode: this.aktiontodb,
            aktividcd: aktivitaet,
            aschlussel: aschluessel,
            beznr: beznrkunde,
            grundcode: '',
            mitarbeitername: JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginVorname + JSON.parse(atob(this.cookieService.get('currentUser')))[0].LoginName,
            mitbeznr: JSON.parse(atob(this.cookieService.get('currentUser')))[0].Beznr, //mitarbeiter, ängerung 19.11. cg
            objekt: objekt,
            rapKontaktBeznr: kontaktbez,
            rapdatum: datetoday,//tagesdatum
            rapptext: termapte,
            rapzeit: timenow.toString().substring(0, 5),
            rubrik: rubrik,
            termKontaktBeznr: kontaktbez,
            termaktivcd: aktivitaet,
            termdatum: dateValuenew,
            termkontaktpers: kontaktgesname,
            termmitbeznr: mitarbeiter,
            termrapptext: termapte,
            termzeit: datetime.timeValuenew,
            urubrik: urubrik,
            kontaktpers: kontaktgesname
        }

        console.log(' this.jsonzumspeichern', this.jsonzumspeichern);

        var antwortsavetermindetail;
        this.savetermindetailService.saveTermindetail(this.jsonzumspeichern)
            .subscribe(termindetail => {
                antwortsavetermindetail = termindetail;
                // this.commonService.notifyOther5({ option: 'TerminNeu', value: beznrkunde });
                this.neuabbrechen.next(false);
                this.neuerterminerstellt.next(beznrkunde);

                this.termzeit.next(newtime);


            }, err => {
                console.error(err);
            });
        this._window.scrollTo(0, 0);
        if (this.returnlink) {
            console.log('returnlink', this.returnlink);
            this.router.navigate([this.returnlink]);

        }
        // this.commonService.notifyOther4({ option: 'abbrechen', value: this.canEdit, value1: false });
    }

    deletelinebreack(str) {
        var temp1 = str.replace(/\n/gi, '%0a');
        var temp2 = temp1.replace(/\n/gi, '%0d')
        console.log('linearray1', temp2);
        var string2 = temp2;
        return string2;
    }

    myDbvalueChanged(val) {
        // console.log("Objekt",val);
        this.objekttodb = val;
        this.objekttodbnew = val.value;
    }

    NewRubrikvalueChanged(val) {
        // console.log("NewRubrikvalueChanged",val);
        this.rubriktodb = val;
        this.rubriktextnew = val.value;
    }

    NewKundevalueChanged(val) {
        console.log('Output Event', val);
        this.kundetodb = val;
        this.beznrkunde = this.kundetodb.value;
    }

    NewAgenturvalueChanged(val) {
        console.log('NewAgenturvalueChanged', val);
        this.agenturtodb = val.value;
        // this.agenturgeaendert.next(this.agenturtodb);
    }

    //NewKontaktpersonvalueChanged
    NewkontaktpersonChanged(val) {
        this.kontaktperstodb = val;
    }

    NewausgabeonvalueChanged(val) {
        // console.log("Output Event",val);
        this.aschluesseltodb = val;
    }

    NewUrubrikonvalueChanged(val) {
        // console.log("NewUrubrikonvalueChanged",val);
        this.urubriktodb = val;
    }

    NewAktivitaetonvalueChanged(val) {
        // console.log("Output Event",val);
        this.aktivitaettodb = val;
    }
    
    NewaktionvalueChanged(val){
        // console.log("Output Event",val);
        if (val.value){
            this.aktiontodb = val.value;
        } else {
            this.aktiontodb = '';
        }
    }

    NewMitarbeitertonvalueChanged(val) {
        console.log('Output Event', val);
        this.mitarbeitertodb = val;
    }

    newagenturgeaendert(val) {
        console.log('newagenturgeaendert', val);
    }

    kundeeditieren() {
        if (this.isActiveKunde === false) {
            this.isActiveKunde = true;
        } else {
            this.isActiveKunde = false;

        }
    }

    showInfoAbbrechen() {
        this.canEdit = false;
        this.neuabbrechen.next(false);

        if (this.returnlink) {
            console.log('returnlink', this.returnlink);
            this.router.navigate([this.returnlink]);
        }
        // this.commonService.notifyOther4({ option: 'abbrechen', value: this.canEdit, value1: false });
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: '', detail: 'nicht gespeichert'});
    }

    checkifdateorstringtodb(datum) {
        var value;
        if (datum) {
            var crmdatumtemp = datum.toLocaleString();
            // console.log("crmdatumtemp",crmdatumtemp);
            var enda = crmdatumtemp.toString().split('.');
            var tempenda0 = enda[0];
            var tempenda1 = enda[1];
            if (enda[0].length < 2) {
                // console.log("enda[0]",enda[0]);
                tempenda0 = '0' + enda[0];
            }
            if (enda[1].length < 2) {
                // console.log("enda[1]",enda[1]);
                tempenda1 = '0' + enda[1];
            }
            var crmdatum1 = tempenda0 + tempenda1 + enda[2];
            var crmdatum = crmdatum1.toString().split(',');
            return value = crmdatum[0];
        } else {
            return value = '';
        }
    }

    checkifzeitorstringtodb(zeit) {
        var value;
        if (zeit) {
            var crmdatumtemp = zeit.toLocaleString();
            // console.log("crmdatumtemp",crmdatumtemp);
            var enda = crmdatumtemp.toString().split(',');
            var crmdatum = enda[1];//crmdatum1.toString().split(',');
            return value = crmdatum.toString().trim().substring(0, 5);
        } else {
            return value = '';
        }
    }

    editAgentur() {
        var selectedAgentur: any;
        let config = new MatDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        // console.log("terminsuche");
        this.dialogRef = this.dialog.open(AgenturwechselComponent, {
            height: '250px',
            width: '900px',
        });
        // this.dialogRef.componentInstance = this.termindetaillist;
        this.dialogRef.afterClosed().subscribe(result => {
            //console.log('result: ' + result);
            this.dialogRef = null;
        });

    }

    changeAgenturTel() {
        this.telupdate = true;
        console.log('agenturdata', this.agenturneu);
        this.telgeupdate = this.agenturneu.telgeforupdate;
        this.telgediupdate = this.agenturneu.telgediforupdate;
        this.telnatelupdate = this.agenturneu.telnatelforupdate;
        this.telprivupdate = this.agenturneu.telprivforupdate;
    }

    deleteAgentur() {
        this.agenturanzeigen = false;
        this.bznragentur = '0';
        this.agenturtodb = '0';
    }

    agenturneugenerieren(agenturdata) {
        this.bznragentur = agenturdata.bznragentur;
        this.agenturtodb = agenturdata.bznragentur;
        // this.agenturanwesend = false;

        this.agenturneuhtml = '<label style=\'display: inline-block;width: 20%\'>Beznr:</label><span>' + agenturdata.bznragentur + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Name:</label><span>' + agenturdata.vnameagentur + '</span>&nbsp<span>' + agenturdata.fnameagentur + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Zusatz1:</label><span>' + agenturdata.zusatz1 + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Zusatz2:</label><span>' + agenturdata.zusatz2 + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Firma:</label><span>' + agenturdata.fnamefirma + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Firmazusatz1:</label><span>' + agenturdata.zusatz1firma + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Firmazusatz2:</label><span>' + agenturdata.zusatz2firma + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Strasse:</label><span>' + agenturdata.strasseagentur + '</span><br>' +
            '<label style=\'display: inline-block;width: 20%\'>Ort:</label><span>' + agenturdata.agenturort + '</span><br>' +
            '<span class=\'fa fa-user-circle\' style=\'width: 15px;margin-right:3px;display: inline-block;width: 20%\'></span>' +
            '<a href=\'phone:' + agenturdata.telge + '\'>' + agenturdata.telge + '</a><br>' +
            '<span class=\'fa fa-building-o\' style=\'width: 15px;margin-right:3px;display: inline-block;width: 20%\'></span>' +
            '<a href=\'phone:' + agenturdata.telgedi + '\'>' + agenturdata.telgedi + '</a><br>' +
            '<span class=\'fa fa-mobile\' style=\'width: 15px;margin-right:3px;display: inline-block;width: 20%\'></span>' +
            '<a href=\'phone:' + agenturdata.telnatel + '\'>' + agenturdata.telnatel + '</a><br>' +
            '<span class=\'fa fa-home\' style=\'width: 15px;margin-right:3px;display: inline-block;width: 20%\'></span>' +
            '<a href=\'phone:' + agenturdata.telpriv + '\'>' + agenturdata.telpriv + '</a><br>' +
            '<span class=\'fa fa-envelope-square\' style=\'width: 15px;margin-right:3px;display: inline-block;width: 20%\'></span>' +
            '<a href=\'mailto:' + agenturdata.email + '\'>' + agenturdata.email + '</a>';
    }

    changetelnumerAgentur(natel, telge, telgedi, telpriv, beznr) {
        var telnummer;
        if (this.telupdate === true) {
            // console.log("telnummerpriv", natel,telge,telgedi,telpriv,beznr);
            var neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr;
            neu_natel = natel;
            neu_telge = telge;
            neu_telgedi = telgedi;
            neu_telpriv = telpriv;
            neu_email = '';
            neu_beznr = beznr;
            this.teleupdateService.updateTelnummer(neu_natel, neu_telge, neu_telgedi, neu_telpriv, neu_email, neu_beznr)
                .subscribe(telnummern => {
                    telnummer = telnummern;
                    // console.log("telnummer",telnummer);
                    this.telupdate = false;
                    this.agenturneu.telge = neu_telge;
                    this.agenturneu.telgedi = neu_telgedi;
                    this.agenturneu.telnatel = neu_natel;
                    this.agenturneu.telpriv = neu_telpriv;
                    // console.log("this.agenturneu",this.agenturneu);
                    this.agenturneugenerieren(this.agenturneu);
                }, err => {
                    console.error(err);
                });
        }
    }

    changetelnumerAgenturAbbrechen() {
        this.telupdate = false;
    }

    showOfferte() {
        if (this.kundetodb) {
            var kunde: any = this.kundetodb.value;
        } else {
            var kunde: any = '';
        }
        if (this.kontaktperstodb) {
            var kontakt: any = this.kontaktperstodb.value;
        } else {
            var kontakt: any = '';
        }
        if (this.objekttodb) {
            var obj: any = this.objekttodb.value;
        } else {
            var obj: any = '';
        }
        if (this.rubriktodb) {
            var rubrik: any = this.rubriktodb.value;
        } else {
            var rubrik: any = '';
        }
        if (this.urubriktodb) {
            var urubrik: any = this.urubriktodb.value;
        } else {
            var urubrik: any = '';
        }
        if (this.aschluesseltodb) {
            var aschlussel: any = this.aschluesseltodb.value;
        } else {
            var aschlussel: any = '';
        }
        if (this.termrapptextkunde === '' || this.termrapptextkunde === undefined || this.termrapptextkunde === null) {
            var termrapte: string = '';
        } else {
            var termrapte: string = this.deletelinebreack(this.termrapptextkunde);
        }

        var agentbeznroffert = '';
        if (this.agenturtodb) {
            agentbeznroffert = this.agenturtodb;
        }

        if (this.currenUser) {
            var firma = this.currenUser[0].firma;
        }

        var data = {
            'firma': firma,
            'beznr': kunde,
            'termKontaktBeznr': kontakt,
            'objekt': obj,
            'termmitbeznr': this.mitarbeiterbezfordrop,
            'rubrik': rubrik,
            'urubrik': urubrik,
            'aschlussel': aschlussel
        };
        var tempdata = {
            'firma': firma,
            'beznr': kunde,
            'termKontaktBeznr': {value: kontakt},
            'objekt': {value: obj},
            'termmitbeznr': this.mitarbeiterbezfordrop,
            'rubrik': {value: rubrik},
            'urubrik': {value: urubrik},
            'aschlussel': {value: aschlussel},
            'notiz': termrapte,
            'aktioncode': this.aktiontodb,
            'aktivi': this.aktivitaettodb,
            'agentbeznroffert': agentbeznroffert
        };
        //console.log("showOfferte",data);

        //speichern der daten um zurück zu kommen von der Offerte

        let temptermin = JSON.stringify(this.kundevonauswahl);
        let temptermindata = JSON.stringify(tempdata);

        sessionStorage.setItem('tempterminkunde', temptermin);
        sessionStorage.setItem('temptermindata', temptermindata);
        sessionStorage.setItem('reiter', this.router.url);

        this.progressbar_visible = true; // Progressbar anzeigen

        this.router.navigate(['./offertview/offerte-show', data]);
    }

    openkundenexcel() {

        if (this.kundetodb) {
            var kunde: any = this.kundetodb.value;
        } else {
            var kunde: any = '';
        }
        if (this.kontaktperstodb) {
            console.log('this.kontaktperstodb', this.kontaktperstodb);
            var kontakt: any = this.kontaktperstodb.value;
        } else {
            var kontakt: any = '';
        }
        if (this.objekttodb) {
            var obj: any = this.objekttodb.value;
        } else {
            var obj: any = '';
        }
        if (this.rubriktodb) {
            var rubrik: any = this.rubriktodb.value;
        } else {
            var rubrik: any = '';
        }
        if (this.urubriktodb) {
            var urubrik: any = this.urubriktodb.value;
        } else {
            var urubrik: any = '';
        }
        if (this.aschluesseltodb) {
            console.log('this.aschluesseltodb', this.aschluesseltodb);
            var aschlussel: any = this.aschluesseltodb.value;
        } else {
            var aschlussel: any = '';
        }
        if (this.bznragentur) {
            console.log('this.bznragentur', this.bznragentur);
            var agentur: any = this.bznragentur;
        } else {
            var agentur: any = '';
        }
        if (this.mitarbeitertodb || this.mitarbeiterbezfordrop) {
            console.log('this.mitarbeitertodb', this.mitarbeitertodb, this.mitarbeiterbezfordrop);
            if (this.mitarbeitertodb) {
                var mitarbeiter: any = this.mitarbeitertodb.value;
            } else if (this.mitarbeiterbezfordrop) {
                var mitarbeiter: any = this.mitarbeiterbezfordrop;
            }
        } else {
            var mitarbeiter: any = '';
        }

        var blobUrl = '';
        var blob = null;
        console.log('obj, kunde, kontakt, agentur, mitarbeiter', obj, kunde, kontakt, agentur, mitarbeiter);
        this.auftragxlsxService.getexcelfile(obj, kunde, kontakt, agentur, mitarbeiter)
            .subscribe(excel => {
                var mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
                if (excel.length >= 1) {
                    blob = this.base64dataToBlob(excel[0].excel, mimetype);
                    blobUrl = URL.createObjectURL(blob);
                    console.log('blob', blob);
                    // this.tempbase64pdf = blobUrl;
                    this._window = this.windowrefService.getNativeWindow();
                    this._window.open(blobUrl, '_blank');
                }
            }, err => {
                console.error(err);
            });
    }

    base64dataToBlob(base64data, mimeType) {
        // this.window = this.windowrefService.getNativeWindow();
        // wandle b64 encodierten string in einen String bestehend aus Byte-Zeichen um
        // console.log("base64data",base64data);
        var byteCharactersString = window.atob(base64data);

        // Erstelle einen Array-Buffer im Umfang des Strings aus Byte-Zeichen
        var arrayBuffer = new ArrayBuffer(byteCharactersString.length);

        // Erstelle einen Byte-Array in der Grösse vom Array-Buffer
        var byteArray = new Uint8Array(arrayBuffer);

        // Schleife über alle Zeichen des Strings aus Byte-Zeichen
        for (var i = 0; i < byteCharactersString.length; i++) {

            // an aktueller Position den Unicode-Wert des Byte-Zeichens auslesen und an derselben Position in den Byte-Array eintragen
            byteArray[i] = byteCharactersString.charCodeAt(i);

        }

        var blob = new Blob([arrayBuffer], {type: mimeType});
        return blob;

    }

}
