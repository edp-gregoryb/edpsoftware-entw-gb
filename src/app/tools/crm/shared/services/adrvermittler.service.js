"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var AdrvermittlerService = (function () {
    function AdrvermittlerService(http, loginparameterService) {
        this.http = http;
        this.loginparameterService = loginparameterService;
        this.loginparameter = this.loginparameterService.getparameter();
    }
    AdrvermittlerService.prototype.showvermittler = function (suche) {
        var body = '{"request":{"filter":"restitadrvermittler%04Termid%05' + this.loginparameter.logintermid + '%06prache%05' + this.loginparameter.loginsprache + '%06suche%05' + suche + '%06start%051%06anzahl%059999%06firma%05' + this.loginparameter.loginfirma + '"}}';
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers, method: 'POST' });
        return this.http.post(this.loginparameter.loginurl, body, options)
            .map(this.extractData);
        //   .map(resp => resp.json());
    };
    AdrvermittlerService.prototype.extractData = function (res) {
        var resultJson = res.json();
        var result = resultJson.REST[0].messageResponse;
        var resultJson2 = JSON.parse(result);
        var result2 = resultJson2.tt_adresse;
        //console.log("service", result2);
        return result2;
    }; /**/
    AdrvermittlerService = __decorate([
        core_1.Injectable()
    ], AdrvermittlerService);
    return AdrvermittlerService;
}());
exports.AdrvermittlerService = AdrvermittlerService;
