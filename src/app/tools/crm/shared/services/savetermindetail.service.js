"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
// import { Http, URLSearchParams, Headers,Response,RequestOptions} from '@angular/http';
var http_1 = require("@angular/common/http");
var SavetermindetailService = /** @class */ (function () {
    function SavetermindetailService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    SavetermindetailService.prototype.saveTermindetail = function (termindetail) {
        //console.log("this.loginparameter",this.loginparameter);
        console.log("service termindetail", termindetail.aktividcd, termindetail.termaktivcd);
        var body = '{"request":{"filter":"restitsavetermdetail%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06firma%05' + this.loginparameter.loginfirma + '%06rowid%05' + termindetail.ROWID +
            '%06mitbeznr%05' + termindetail.mitbeznr + '%06termmitbeznr%05' + termindetail.termmitbeznr + '%06beznr%05' + termindetail.beznr + '%06rapdatum%05' + termindetail.rapdatum + '%06rapzeit%05' + termindetail.rapzeit +
            '%06aktividcd%05' + termindetail.aktividcd + '%06rapptext%05' + termindetail.rapptext + '%06termKontaktBeznr%05' + termindetail.termKontaktBeznr + '%06KontaktBeznr%05' + termindetail.KontaktBeznr +
            '%06termkontaktpers%05' + termindetail.termkontaktpers + '%06kontaktpers%05' + termindetail.termkontaktpers + '%06agentur%05' + termindetail.agenturbeznr +
            '%06termdatum%05' + termindetail.termdatum + '%06termzeit%05' + termindetail.termzeit + '%06termaktivcd%05' + termindetail.termaktivcd + '%06termrapptext%05' + termindetail.termrapptext +
            '%06objekt%05' + termindetail.objekt + '%06aktioncode%05' + termindetail.aktioncode + '%06grundcode%05' + termindetail.grundcode + '%06fazit%05' + termindetail.fazit +
            '%06aschlussel%05' + termindetail.aschlussel + '%06urubrik%05' + termindetail.urubrik + '%06rubrik%05' + termindetail.rubrik + '"}}';
        var jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06firma%05' + this.loginparameter.loginfirma + '%06rowid%05' + termindetail.ROWID +
            '%06mitbeznr%05' + termindetail.mitbeznr + '%06termmitbeznr%05' + termindetail.termmitbeznr + '%06beznr%05' + termindetail.beznr + '%06rapdatum%05' + termindetail.rapdatum + '%06rapzeit%05' + termindetail.rapzeit +
            '%06aktividcd%05' + termindetail.aktividcd + '%06rapptext%05' + termindetail.rapptext + '%06termKontaktBeznr%05' + termindetail.termKontaktBeznr + '%06KontaktBeznr%05' + termindetail.KontaktBeznr +
            '%06termkontaktpers%05' + termindetail.termkontaktpers + '%06kontaktpers%05' + termindetail.termkontaktpers + '%06agentur%05' + termindetail.agenturbeznr +
            '%06termdatum%05' + termindetail.termdatum + '%06termzeit%05' + termindetail.termzeit + '%06termaktivcd%05' + termindetail.termaktivcd + '%06termrapptext%05' + termindetail.termrapptext +
            '%06objekt%05' + termindetail.objekt + '%06aktioncode%05' + termindetail.aktioncode + '%06grundcode%05' + termindetail.grundcode + '%06fazit%05' + termindetail.fazit +
            '%06aschlussel%05' + termindetail.aschlussel + '%06urubrik%05' + termindetail.urubrik + '%06rubrik%05' + termindetail.rubrik;
        var jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
        //let body = '{"request":{"filter":"restitsavetermdetail%04'+jsonbase64+'"}}';   
        var headers = new http_1.HttpHeaders().set("content-type", "application/json");
        return this.http.post(this.loginparameter.loginurl, body, { headers: headers })
            .map(function (res) { return res['REST'][0].messageResponse; })
            .map(function (res) { return JSON.parse(res); })
            .map(function (res) { return res.tt_ittermdetail; });
    };
    SavetermindetailService = __decorate([
        core_1.Injectable()
    ], SavetermindetailService);
    return SavetermindetailService;
}());
exports.SavetermindetailService = SavetermindetailService;
