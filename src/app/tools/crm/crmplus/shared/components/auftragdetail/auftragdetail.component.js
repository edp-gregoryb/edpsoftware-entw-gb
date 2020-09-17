"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
require("rxjs/add/operator/map");
var AuftragdetailComponent = /** @class */ (function () {
    // tempbase64pdf:any;
    function AuftragdetailComponent(auftragdetailService, farosdateienService, posrekapService, fisFileDownloadService, windowrefService, auftragbestService, fakturaService, snackBar, farosgetinseratejpgService) {
        this.auftragdetailService = auftragdetailService;
        this.farosdateienService = farosdateienService;
        this.posrekapService = posrekapService;
        this.fisFileDownloadService = fisFileDownloadService;
        this.windowrefService = windowrefService;
        this.auftragbestService = auftragbestService;
        this.fakturaService = fakturaService;
        this.snackBar = snackBar;
        this.farosgetinseratejpgService = farosgetinseratejpgService;
        this.auftragdetails = [];
        this.switchback = new core_1.EventEmitter();
        this.nettototal = [];
        this.nettoNettototal = [];
        this.Mwst = [];
        this.displayedColumns = ['posbez', 'netto', 'nettoNetto'];
        this.dataSource = new material_1.MatTableDataSource();
        this.displayedColumns1 = ['Mwst', 'nettototal', 'nettoNettototal'];
        this.posrekabtotal = new material_1.MatTableDataSource();
        this.displayedColumns2 = ['erscheinung', 'obj_bezeichnung', 'sujet', 'rubrik', 'urubrik', 'poskey', 'preisman', 'betrexkl', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];
        this.erscheiungensource = new material_1.MatTableDataSource();
        //displayedColumns3 = ['','', '', '', '', 'totaltotalsumme', '', '', '', '', '', '', '', '', '', ''];
        this.displayedColumns3 = ['erscheinung', 'obj_bezeichnung', 'sujet', 'rubrik', 'urubrik', 'poskey', 'preisman', 'totaltotalsumme', 'komjupsatz', 'komsatz2', 'komsatz3', 'mengeinheit', 'menge1', 'menge2', 'anzahl', 'farbtext', 'plaztext', 'faknr'];
        this.erscheinungentotal = new material_1.MatTableDataSource();
        this.keinDokuhinterlegt = false;
        this.ladendoku = false;
    }
    //private windowrefService:WindowrefService,
    AuftragdetailComponent.prototype.ngOnInit = function () {
        //"restitauftragdet%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05M%06start%051%06anzahl%0550%06firma%052%06kunde%0517171%06aufnr%054011951%06sujetnr%05A%06vondatum%0523.01.2018%06bisdatum%0523.01.2018%06objekt%05SoWo"
        //"restitauftragdet%04Termid%05WEB0010022008166%06sprache%05d%06sicht%05M%06start%051%06anzahl%0550%06firma%052%06kunde%0517171%06aufnr%054011951%06sujetnr%05undefined%06vondatum%0523.01.2018%06bisdatum%0523.01.2018%06objekt%05SoWo"    
        // this.queryresult = this.dialogRef.componentInstance;
        this.queryresult = { "kunde": this.kunde, "objekt": this.objekt, "aufnr": this.aufnr, "sujetnr": this.sujetnr, "datum": this.datum };
        console.log("queryresult", this.queryresult);
        this.getAuftragsdetail();
        this.getPosrekap();
        this.getFarosdateien();
        this.getFarosAuftragdateien();
    };
    AuftragdetailComponent.prototype.getAuftragsdetail = function () {
        var _this = this;
        var tempauftragdetails;
        this.auftragdetailService.showauftragdetail(this.queryresult.kunde, this.queryresult.objekt, this.queryresult.datum, this.queryresult.datum, this.queryresult.aufnr, this.queryresult.sujetnr)
            .subscribe(function (aufdet) {
            tempauftragdetails = aufdet;
            _this.erscheiungensource.data = tempauftragdetails;
            var temptotal = [];
            for (var i = 0; i < tempauftragdetails.length; i++) {
                temptotal[i] = tempauftragdetails[i].betrexkl;
            }
            console.log("temptotal", temptotal);
            if (temptotal.length === 0) {
                temptotal[0] = 0;
            }
            var temptotal1 = temptotal.reduce(_this.getSum);
            console.log("temptotal1", temptotal1);
            _this.erscheinungentotal.data = [{ "totaltotalsumme": temptotal1 }];
            // this.erschJsonData = JSON.stringify(tempauftragdetails);
            if (tempauftragdetails.length >= 1) {
                _this.auftragdetails.push(tempauftragdetails[0]);
                // this.auftragdetails = tempauftragdetails;
                console.log("this.auftragdetails", _this.auftragdetails);
            }
            else {
                _this.auftragdetails = tempauftragdetails;
            }
            console.log("this.auftragdetails", _this.auftragdetails.length);
        });
    };
    AuftragdetailComponent.prototype.getFarosdateien = function () {
        var _this = this;
        // console.log("this.queryresult.aufnr+this.queryresult.sujetnr",this.queryresult);auftrag
        //this.erschdat = this.queryresult.datum.substr(0, 8);
        var temperschdat = this.queryresult.datum.substr(0, 8);
        this.erschdat = temperschdat;
        this.farosdateienService.showfarosdateien(this.queryresult.aufnr + this.queryresult.sujetnr, this.queryresult.objekt, this.erschdat, 'kunde')
            .subscribe(function (farosdat) {
            _this.farosdateien = farosdat;
            console.log("this.auftragdetails", _this.farosdateien);
        });
    };
    AuftragdetailComponent.prototype.getFarosAuftragdateien = function () {
        var _this = this;
        //"farosGetDateien%04Termid%05WEB0010022008166%06user-sprache%05d%06aufnr%054012101A%06objekt%05hotel%06typ%05auftrag%06erschdat%0530.01.2018%06firma%052%06"
        //"farosGetDateien%04Termid%05WEB0010022008166%06user-sprache%05d%06aufnr%054011951A%06objekt%05SoWo%06typ%05kunde%06erschdat%0529.01.18%06firma%052%06"
        // var erschdat = this.queryresult.datum.substr(0, 8);
        var temperschdat = this.queryresult.datum.substr(0, 8);
        this.erschdat = temperschdat;
        this.farosdateienService.showfarosdateien(this.queryresult.aufnr + this.queryresult.sujetnr, this.queryresult.objekt, erschdat, 'auftrag')
            .subscribe(function (farosdat) {
            _this.farosAuftragdateien = farosdat;
        });
    };
    AuftragdetailComponent.prototype.getPosrekap = function () {
        var _this = this;
        this.posrekapService.showposrekap(this.queryresult.sujetnr, this.queryresult.objekt, this.queryresult.aufnr)
            .subscribe(function (posrekap) {
            _this.dataSource.data = posrekap;
            console.log("posrekap", posrekap);
            for (var i = 0; i < posrekap.length; i++) {
                _this.nettototal[i] = posrekap[i].netto;
                _this.nettoNettototal[i] = posrekap[i].nettoNetto;
                _this.Mwst[i] = posrekap[i].Mwst;
            }
            var tempnettototalsumme = _this.nettototal.reduce(_this.getSum);
            var tempnettoNettototalsumme = _this.nettoNettototal.reduce(_this.getSum);
            var tempMwstsumme = _this.Mwst.reduce(_this.getSum);
            _this.posrekabtotal.data = [{ "nettototal": tempnettototalsumme, "nettoNettototal": tempnettoNettototalsumme, "Mwst": tempMwstsumme + tempnettoNettototalsumme }];
            // this.rekapJsonData = JSON.stringify(posrekap);
        });
    };
    AuftragdetailComponent.prototype.getSum = function (total, num) {
        return total + num;
    };
    AuftragdetailComponent.prototype.opendok = function (event) {
        // console.log("event",event);
    };
    AuftragdetailComponent.prototype.selectrowersch = function (val) {
        var _this = this;
        console.log("val", val);
        this.fakturaService.getfaktur(val[0].faknr)
            .subscribe(function (pdf) {
            var mimetype = 'application/pdf;base64';
            if (pdf.length >= 1) {
                var blob = _this.base64dataToBlob(pdf[0].pdf, mimetype);
                var blobUrl = URL.createObjectURL(blob);
                _this.window = _this.windowrefService.getNativeWindow();
                _this.window.open(blobUrl, '_blank');
                // console.log("Blob", blobUrl);
            }
            else {
                console.log("Keine Bestätigung vorhanden");
            }
        });
    };
    AuftragdetailComponent.prototype.selectrowposrek = function (val) {
        console.log("val", val);
    };
    AuftragdetailComponent.prototype.showauftragbest = function (val) {
        var _this = this;
        console.log("showauftragbest", val);
        var blobUrl = "";
        var blob = null;
        this.keinDokuhinterlegt = false;
        this.ladendoku = true;
        this.auftragbestService.getauftragpdf(val)
            .subscribe(function (pdf) {
            var mimetype = 'application/pdf;base64';
            if (pdf.length >= 1) {
                blob = _this.base64dataToBlob(pdf[0].pdf, mimetype);
                blobUrl = URL.createObjectURL(blob);
                //   console.log("blob",blob);
                // this.tempbase64pdf = blobUrl;
                _this.window = _this.windowrefService.getNativeWindow();
                _this.window.open(blobUrl, '_blank');
                _this.ladendoku = false;
                // console.log("Blob", blobUrl);
            }
            else {
                console.log("Keine Bestätigung vorhanden");
                _this.keinDokuhinterlegt = true;
                _this.ladendoku = false;
                _this.snackBar.open('Kein Auftrag hinterlegt!', '', { duration: 7000 });
            }
        });
        // $window.open(blobUrl, '_blank');
    };
    AuftragdetailComponent.prototype.backtolist = function () {
        this.switchback.next(true);
    };
    AuftragdetailComponent.prototype.openInseratejpg = function (aufnr) {
        this.farosgetinseratejpgService.getfarosInserat(aufnr);
    };
    AuftragdetailComponent.prototype.openRechnung = function (faknr) {
        var _this = this;
        console.log("val", faknr);
        this.fakturaService.getfaktur(faknr)
            .subscribe(function (pdf) {
            var mimetype = 'application/pdf;base64';
            if (pdf.length >= 1) {
                var blob = _this.base64dataToBlob(pdf[0].pdf, mimetype);
                var blobUrl = URL.createObjectURL(blob);
                _this.window = _this.windowrefService.getNativeWindow();
                _this.window.open(blobUrl, '_blank');
                // console.log("Blob", blobUrl);
            }
            else {
                console.log("Keine Bestätigung vorhanden");
            }
        });
    };
    AuftragdetailComponent.prototype.openMedia = function (media, art) {
        var _this = this;
        console.log("blob", media, art);
        //
        this.fisFileDownloadService.getfisdateien(this.queryresult.aufnr + this.queryresult.sujetnr, this.queryresult.objekt, this.erschdat, art, media)
            .map(function (res) {
            console.log("res", res);
            var _file = res;
            var dateityp = media.substr((~-media.lastIndexOf(".") >>> 0) + 2).toLowerCase();
            console.log("dateityp", dateityp);
            var mimetype = '';
            switch (dateityp) {
                case 'txt':
                    mimetype = 'text/plain';
                    break;
                case 'pdf':
                    mimetype = 'application/pdf';
                    break;
                case 'jpg':
                case 'jpeg':
                    mimetype = 'image/jpeg';
                    break;
                case 'png':
                    mimetype = 'image/png';
                    break;
                case 'tif':
                case 'tiff':
                    mimetype = 'image/tiff';
                    break;
                case 'doc':
                case 'docx':
                case 'dot':
                case 'dotx':
                    mimetype = 'application/msword';
                    break;
                case 'xls':
                case 'xlsx':
                    mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                    break;
                case 'eps':
                case 'eps':
                case 'epsf':
                case 'epsi':
                    mimetype = 'image/x-eps';
                    break;
                case 'indd':
                    mimetype = 'application/x-indesign';
                    break;
                case 'psd':
                    mimetype = 'application/photoshop';
                    break;
                case 'ai':
                    mimetype = 'application/illustrator';
                    break;
                case 'msg':
                    mimetype = 'application/vnd.ms-outlook';
                    break;
                default:
                    mimetype = 'application/octet-stream';
                    return;
            }
            // var blob = this.base64dataToBlob(_file[0][0], mimetype);
            var blob = _this.base64dataToBlob(_file.FileDownload[0], mimetype);
            var blobUrl = URL.createObjectURL(blob);
            _this.window = _this.windowrefService.getNativeWindow();
            _this.window.open(blobUrl, '_blank');
            // console.log("blobUrl",blobUrl);
        })
            .subscribe(function (res) {
            console.log("doku");
        }, function (err) {
            console.error(err);
        });
    };
    AuftragdetailComponent.prototype.base64dataToBlob = function (base64data, mimeType) {
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
        var blob = new Blob([arrayBuffer], { type: mimeType });
        return blob;
    };
    __decorate([
        core_1.Input()
    ], AuftragdetailComponent.prototype, "kunde");
    __decorate([
        core_1.Input()
    ], AuftragdetailComponent.prototype, "objekt");
    __decorate([
        core_1.Input()
    ], AuftragdetailComponent.prototype, "aufnr");
    __decorate([
        core_1.Input()
    ], AuftragdetailComponent.prototype, "sujetnr");
    __decorate([
        core_1.Input()
    ], AuftragdetailComponent.prototype, "datum");
    __decorate([
        core_1.Output()
    ], AuftragdetailComponent.prototype, "switchback");
    AuftragdetailComponent = __decorate([
        core_1.Component({
            selector: 'app-auftragdetail',
            templateUrl: './auftragdetail.component.html',
            styleUrls: ['./auftragdetail.component.css']
        })
    ], AuftragdetailComponent);
    return AuftragdetailComponent;
}());
exports.AuftragdetailComponent = AuftragdetailComponent;
var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
