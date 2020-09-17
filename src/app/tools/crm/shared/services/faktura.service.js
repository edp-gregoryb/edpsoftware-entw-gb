"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var FakturaService = /** @class */ (function () {
    function FakturaService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    FakturaService.prototype.getfaktur = function (faknr) {
        var body = '{"request":{"filter":"restitfaktura%04Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06faknr%05' + faknr + '%06firma%05' + this.loginparameter.loginfirma + '"}}';
        var jsondata = 'Termid%05' + this.loginparameter.logintermid + '%06sprache%05' + this.loginparameter.loginsprache + '%06faknr%05' + faknr + '%06firma%05' + this.loginparameter.loginfirma;
        var jsonbase64 = this.loginparameterService.stringtobase64(jsondata);
        //let body = '{"request":{"filter":"restitfaktura%04'+jsonbase64+'"}}';
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'POST' });
        return this.http.post(this.loginparameter.loginurl, body, options)
            .map(this.extractData);
        //   .map(resp => resp.json());
    };
    FakturaService.prototype.extractData = function (res) {
        var resultJson = res.json();
        var result = resultJson.REST[0].messageResponse;
        var resultJson2 = JSON.parse(result);
        var result2 = resultJson2.tt_itfaktura;
        // console.log("service",result2);
        return result2;
    };
    FakturaService = __decorate([
        core_1.Injectable()
    ], FakturaService);
    return FakturaService;
}());
exports.FakturaService = FakturaService;
