"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LoginparameterService = /** @class */ (function () {
    function LoginparameterService(cookieService) {
        this.cookieService = cookieService;
        //var tempfilelocalstorage = localStorage.getItem('currentUser');
        //var tempfilelocalstorage = sessionStorage.getItem('currentUser');
        var tempfilelocalstorage = this.cookieService.get('currentUser');
        // var tempfilesesisonstorage = sessionStorage.getItem('url');
        var instanz = this.cookieService.get('url');
        //let instanz = sessionStorage.getItem('url');
        if (tempfilelocalstorage) {
            var currentUserstring = atob(tempfilelocalstorage);
            this.currentUser = JSON.parse(currentUserstring);
        }
        if (instanz) {
            //console.log("testlogininstanz",instanz);
            //this.urlinstanz = JSON.parse(sessionStorage.getItem('url'));
            var urlstring = atob(instanz);
            this.urlinstanz = JSON.parse(urlstring);
        }
    }
    LoginparameterService.prototype.getparameter = function () {
        var url = this.urlinstanz.instanz;
        var termid = this.currentUser[0].termid;
        var firma = this.currentUser[0].firma;
        var sprache = this.urlinstanz.sprache;
        var sicht = this.urlinstanz.sicht;
        var user = this.currentUser[0].Beznr;
        var loginparam = { loginurl: url, logintermid: termid, loginfirma: firma, loginsprache: sprache,
            loginsicht: sicht, mitarbeiter: user };
        console.log("loginparam", loginparam);
        return loginparam;
    };
    LoginparameterService.prototype.stringtobase64 = function (offertJson) {
        var stringjson = JSON.stringify(offertJson);
        var stringjsonBase64 = btoa(encodeURIComponent(stringjson).replace(/%([0-9A-F]{2})/g, function (match, p1) { return String.fromCharCode(("0x" + p1)); }));
        return stringjsonBase64;
    };
    LoginparameterService = __decorate([
        core_1.Injectable()
    ], LoginparameterService);
    return LoginparameterService;
}());
exports.LoginparameterService = LoginparameterService;
